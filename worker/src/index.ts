import { verifyTurnstile } from './turnstile';
import { sendViaResend } from './transports/resend';
import { sendViaMailChannels } from './transports/mailchannels';

export interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY?: string;
  MAILCHANNELS_API_KEY?: string;
  RECIPIENT_EMAIL: string;
  SENDER_EMAIL: string;
  SENDER_NAME: string;
  EMAIL_TRANSPORT: 'resend' | 'mailchannels';
  RATE_LIMIT_WINDOW_SECONDS: string;
  RATE_LIMIT_MAX_SUBMISSIONS: string;
  RATE_LIMIT_KV?: KVNamespace;
}

const HONEYPOT_FIELD = 'website_url';
const IN_MEMORY_HITS_MAX_ENTRIES = 5000;

const REQUIRED_BOOKING_FIELDS = [
  'ownerName',
  'email',
  'townOrPostcode',
  'startDate',
  'endDate',
  'serviceType',
];

const REQUIRED_INTAKE_FIELDS = [
  'ownerFullName',
  'contactEmail',
  'contactPhone',
  'serviceAddress',
  'catNames',
  'feedingInstructions',
  'litterInstructions',
];

interface FieldError {
  field: string;
  message: string;
}

const inMemoryHits = new Map<string, { count: number; expiresAt: number }>();

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    if (request.method !== 'POST') {
      return jsonResponse(405, { error: 'Method not allowed' });
    }

    const url = new URL(request.url);
    let formType: 'booking-request' | 'client-intake';
    if (url.pathname.endsWith('/api/booking-request')) {
      formType = 'booking-request';
    } else if (url.pathname.endsWith('/api/client-intake')) {
      formType = 'client-intake';
    } else {
      return jsonResponse(404, { error: 'Not found' });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return jsonResponse(400, { error: 'Invalid form submission.' });
    }

    if (String(formData.get(HONEYPOT_FIELD) ?? '').trim() !== '') {
      return jsonResponse(200, { ok: true });
    }

    const requiredFields =
      formType === 'booking-request' ? REQUIRED_BOOKING_FIELDS : REQUIRED_INTAKE_FIELDS;
    const fieldErrors: FieldError[] = [];
    for (const field of requiredFields) {
      const value = String(formData.get(field) ?? '').trim();
      if (!value) {
        fieldErrors.push({ field, message: 'Please complete this field.' });
      }
    }
    if (!formData.get('consent')) {
      fieldErrors.push({ field: 'consent', message: 'Consent is required.' });
    }
    const email = String(formData.get('email') ?? formData.get('contactEmail') ?? '');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.push({ field: 'email', message: 'Email address is invalid.' });
    }
    if (fieldErrors.length > 0) {
      return jsonResponse(400, { error: 'Please correct the highlighted fields.', fieldErrors });
    }

    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
    const limited = await checkRateLimit(env, ip);
    if (limited) {
      return jsonResponse(429, {
        error: 'Too many submissions from your network. Please try again later.',
      });
    }

    if (env.TURNSTILE_SECRET_KEY) {
      const token = String(formData.get('cf-turnstile-response') ?? '');
      if (!token) {
        return jsonResponse(400, {
          error: 'Spam protection check failed. Please refresh the page and try again.',
        });
      }
      const turnstileOk = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip);
      if (!turnstileOk) {
        return jsonResponse(403, {
          error: 'Spam protection check failed. Please refresh the page and try again.',
        });
      }
    }

    const subject =
      formType === 'booking-request'
        ? 'Curl Up Club: new booking request'
        : 'Curl Up Club: new client intake form';

    const text = renderEmailText(formType, formData);

    try {
      if (env.EMAIL_TRANSPORT === 'mailchannels') {
        await sendViaMailChannels(env, subject, text);
      } else {
        await sendViaResend(env, subject, text);
      }
    } catch (error) {
      logEvent('error', 'email_transport_failed', {
        formType,
        transport: env.EMAIL_TRANSPORT,
        message: error instanceof Error ? error.message : String(error),
      });
      return jsonResponse(502, {
        error:
          'We could not send your message right now. Please try again or email contact@curlupclub.com.',
      });
    }

    logEvent('info', 'form_submission_ok', { formType });

    return jsonResponse(200, { ok: true });
  },
} satisfies ExportedHandler<Env>;

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  const windowSeconds = parseInt(env.RATE_LIMIT_WINDOW_SECONDS ?? '300', 10);
  const maxSubmissions = parseInt(env.RATE_LIMIT_MAX_SUBMISSIONS ?? '5', 10);
  const key = `rl:${ip}`;
  const now = Math.floor(Date.now() / 1000);

  if (env.RATE_LIMIT_KV) {
    const raw = await env.RATE_LIMIT_KV.get(key);
    const count = raw ? parseInt(raw, 10) : 0;
    if (count >= maxSubmissions) return true;
    await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: windowSeconds });
    return false;
  }

  // Fallback: best-effort per-isolate counter. Bounded to avoid unbounded
  // growth across long-lived isolates. Cleared opportunistically below.
  const existing = inMemoryHits.get(ip);
  if (existing && existing.expiresAt > now) {
    if (existing.count >= maxSubmissions) return true;
    existing.count += 1;
    inMemoryHits.set(ip, existing);
    return false;
  }
  if (inMemoryHits.size >= IN_MEMORY_HITS_MAX_ENTRIES) {
    pruneExpired(now);
    if (inMemoryHits.size >= IN_MEMORY_HITS_MAX_ENTRIES) {
      // Drop oldest insertion-order entry (Map iteration order is insertion).
      const oldestKey = inMemoryHits.keys().next().value;
      if (oldestKey !== undefined) inMemoryHits.delete(oldestKey);
    }
  }
  inMemoryHits.set(ip, { count: 1, expiresAt: now + windowSeconds });
  return false;
}

function pruneExpired(now: number): void {
  for (const [k, v] of inMemoryHits) {
    if (v.expiresAt <= now) inMemoryHits.delete(k);
  }
}

function logEvent(
  level: 'info' | 'warn' | 'error',
  event: string,
  fields: Record<string, unknown> = {},
): void {
  const payload = { level, event, ...fields };
  if (level === 'error') {
    console.error(JSON.stringify(payload));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(payload));
  } else {
    console.log(JSON.stringify(payload));
  }
}

function renderEmailText(formType: string, formData: FormData): string {
  const lines: string[] = [];
  lines.push(`Form: ${formType}`);
  lines.push(`Received: ${new Date().toISOString()}`);
  lines.push('');
  for (const [key, value] of formData.entries()) {
    if (key === HONEYPOT_FIELD) continue;
    if (key === 'cf-turnstile-response') continue;
    if (typeof value === 'string') {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: [file omitted]`);
    }
  }
  return lines.join('\n');
}
