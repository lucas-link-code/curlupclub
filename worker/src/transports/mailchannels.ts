import type { Env } from '../index';

// MailChannels Email API is the supported transport since the old
// MailChannels-for-Cloudflare-Workers free service was sunset on 31 Aug 2024.
// You must register for an account, set DNS (SPF, DKIM, Domain Lockdown TXT)
// and provide a valid API key as a Worker secret.
const MAILCHANNELS_ENDPOINT = 'https://api.mailchannels.net/tx/v1/send';

export async function sendViaMailChannels(env: Env, subject: string, text: string): Promise<void> {
  if (!env.MAILCHANNELS_API_KEY) {
    throw new Error('MAILCHANNELS_API_KEY is not configured');
  }

  const response = await fetch(MAILCHANNELS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': env.MAILCHANNELS_API_KEY,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: env.RECIPIENT_EMAIL }],
        },
      ],
      from: { email: env.SENDER_EMAIL, name: env.SENDER_NAME },
      subject,
      content: [{ type: 'text/plain', value: text }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MailChannels API error ${response.status}: ${errorText}`);
  }
}
