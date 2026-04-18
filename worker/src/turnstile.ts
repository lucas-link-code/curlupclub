// Server-side verification for Cloudflare Turnstile.
// Tokens are valid for 300 seconds and are single-use; replays return
// timeout-or-duplicate. The client widget alone does not protect anything.
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

export async function verifyTurnstile(
  secretKey: string,
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secretKey);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);

  let response: Response;
  try {
    response = await fetch(SITEVERIFY_URL, { method: 'POST', body });
  } catch (error) {
    console.error('Turnstile siteverify network error', error);
    return false;
  }

  if (!response.ok) {
    console.error('Turnstile siteverify HTTP error', response.status);
    return false;
  }

  let data: TurnstileResponse;
  try {
    data = (await response.json()) as TurnstileResponse;
  } catch {
    return false;
  }

  if (!data.success) {
    console.warn('Turnstile siteverify rejected', data['error-codes']);
    return false;
  }

  return true;
}
