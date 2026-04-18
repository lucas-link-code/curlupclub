import type { Env } from '../index';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export async function sendViaResend(env: Env, subject: string, text: string): Promise<void> {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${env.SENDER_NAME} <${env.SENDER_EMAIL}>`,
      to: [env.RECIPIENT_EMAIL],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error ${response.status}: ${errorText}`);
  }
}
