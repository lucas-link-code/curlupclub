# Deployment Guide

This site has two independent deploys: the static site to GitHub Pages, and the form backend Worker to Cloudflare. Both are required for the contact form to work end to end.

## 1. GitHub Pages static site

The site is built and deployed by `.github/workflows/deploy.yml` on every push to `main`.

### One-time repository setup

1. In the repo on GitHub, go to Settings then Pages.
2. Under Build and deployment, set Source to GitHub Actions.
3. Under Custom domain, enter `curlupclub.com` and save. This is the binding mechanism. The `public/CNAME` file in the repo is kept for portability only and does not bind the domain when publishing via a custom Actions workflow.
4. Tick Enforce HTTPS once the certificate is provisioned.
5. Optionally verify the domain under Settings then Pages then Verified domains. This reduces the risk of subdomain takeover.

### Cloudflare DNS for the apex and www

The DNS is already managed at Cloudflare. The records that GitHub Pages expects are:

- Apex `curlupclub.com`: A records to the four GitHub Pages addresses
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www.curlupclub.com`: CNAME to `<your-github-username>.github.io`

DNS-only mode (grey cloud) is recommended at Cloudflare so the GitHub-issued certificate is used and the apex resolves directly. Confirm both `curlupclub.com` and `www.curlupclub.com` resolve before trusting Pages.

### Build environment

The workflow runs on Node 22 and uses `npm ci`. The build step reads:

- `PUBLIC_SITE_URL` (literal in workflow)
- `PUBLIC_FORM_ENDPOINT` (literal)
- `PUBLIC_INTAKE_ENDPOINT` (literal)
- `PUBLIC_TURNSTILE_SITE_KEY` (from repo Variables, optional)

To enable the Turnstile widget on the live site, add a repo Variable named `PUBLIC_TURNSTILE_SITE_KEY` under Settings then Secrets and variables then Actions then Variables.

### First deploy

1. Push to `main`.
2. Watch Actions tab for the `Deploy site to GitHub Pages` workflow.
3. The job exposes a Pages URL at the bottom of the deploy step on success.
4. Visit `https://curlupclub.com/` to confirm.

## 2. Cloudflare Worker form backend

The Worker lives in `worker/`. It is bound to two same-origin routes on the apex so the static site can POST to `/api/*` without any CORS handshake.

### One-time Worker setup

```bash
cd worker
npm install
npx wrangler login
```

Set Worker secrets:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
# choose ONE email transport
npx wrangler secret put RESEND_API_KEY        # if EMAIL_TRANSPORT=resend (default)
npx wrangler secret put MAILCHANNELS_API_KEY  # if EMAIL_TRANSPORT=mailchannels
```

Email transport selection lives in `wrangler.toml` under `[vars]`. Default is `resend`. Set `EMAIL_TRANSPORT = "mailchannels"` to use the MailChannels Email API instead. The old free MailChannels-for-Workers service was sunset on 31 August 2024; you must register, set DNS records (SPF, DKIM, Domain Lockdown TXT) and use a valid API key.

### Optional rate-limit KV namespace

Without a KV binding, rate limiting is per isolate and best-effort. To make it shared:

```bash
npx wrangler kv namespace create RATE_LIMIT_KV
```

Add the printed binding to `wrangler.toml` under `[[kv_namespaces]]`.

### Deploy

```bash
npx wrangler deploy
```

The routes declared in `wrangler.toml` bind automatically as long as `curlupclub.com` is on Cloudflare DNS for the same account.

### Verify

```bash
curl -X POST https://curlupclub.com/api/booking-request \
  -F ownerName=Test \
  -F email=test@example.com \
  -F townOrPostcode=LL20 \
  -F startDate=2026-05-01 \
  -F endDate=2026-05-05 \
  -F serviceType=once-daily \
  -F consent=on
```

Expected response: `{"ok":true}` and an email arriving at `RECIPIENT_EMAIL`.

## 3. Going live checklist

- All TODOs in `src/config/` and `src/content/` reviewed and replaced or accepted
- Pricing, phone, served areas confirmed
- Privacy Policy and Terms last updated date set
- Gallery images replaced with real photos shared with permission
- Custom domain bound under Settings then Pages, HTTPS enforced
- Worker deployed and a test enquiry email received
- Turnstile site key set as repo Variable, secret set on the Worker
- Confirm no analytics or non-essential cookies before publishing the cookie note in the Privacy Policy stays accurate
