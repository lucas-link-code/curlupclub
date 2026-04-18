# Curl Up Club form Worker

Cloudflare Worker that handles same-origin form submissions for the Curl Up Club static site. It validates input, rejects honeypot hits, verifies Cloudflare Turnstile server-side, applies a per-IP rate limit and forwards the message via a configurable email transport.

## Routes

The Worker is bound to two same-origin routes on the apex domain so the browser does not see a separate origin and no CORS preflight is required:

- `https://curlupclub.com/api/booking-request`  used by `/contact/`
- `https://curlupclub.com/api/client-intake`    used by `/client-intake/`

## Email transports

`EMAIL_TRANSPORT` selects which transport is used.

- `resend` (default) uses the Resend HTTP API. Set `RESEND_API_KEY` as a Worker secret. This is what current Cloudflare Workers email tutorials recommend.
- `mailchannels` uses the MailChannels Email API. Set `MAILCHANNELS_API_KEY` as a Worker secret. The old free MailChannels-for-Workers service was sunset on 31 August 2024, so an account, DNS records and an API key are required.

The recipient is always `RECIPIENT_EMAIL` and the from address is `SENDER_EMAIL` with display name `SENDER_NAME`.

## Spam protection

- A hidden honeypot field `website_url` rejects automated bots with a fake success response.
- Cloudflare Turnstile is verified server-side via Siteverify. Tokens are valid for 300 seconds and are single-use; replays return `timeout-or-duplicate`. The client widget alone is not enough.
- A per-IP rate limit allows `RATE_LIMIT_MAX_SUBMISSIONS` submissions per `RATE_LIMIT_WINDOW_SECONDS` window. With a `RATE_LIMIT_KV` binding the limit is shared across isolates; without it the limit is best-effort per isolate.

## Setup

```bash
npm install
npx wrangler login

# secrets
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put RESEND_API_KEY        # if EMAIL_TRANSPORT=resend
# or
npx wrangler secret put MAILCHANNELS_API_KEY  # if EMAIL_TRANSPORT=mailchannels

npx wrangler deploy
```

After deploy, the routes in `wrangler.toml` are bound automatically as long as `curlupclub.com` is on Cloudflare DNS for the same account.

## Local development

```bash
npx wrangler dev
```

Submit a test request:

```bash
curl -X POST http://127.0.0.1:8787/api/booking-request \
  -F ownerName=Test \
  -F email=test@example.com \
  -F townOrPostcode=LL20 \
  -F startDate=2026-05-01 \
  -F endDate=2026-05-05 \
  -F serviceType=once-daily \
  -F consent=on
```
