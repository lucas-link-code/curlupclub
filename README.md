# Curl Up Club Cat Sitting

Production static site for Curl Up Club Cat Sitting. Built with Astro, TypeScript and Tailwind, deployed to GitHub Pages on `curlupclub.com`. Form submissions are handled by a Cloudflare Worker bound to same-origin `/api/*` routes.

## Tech stack

- Astro static site generator with TypeScript strict mode
- Tailwind CSS v4 via the official Vite plugin
- Self-hosted variable Inter and Fraunces fonts plus Caveat for script accents
- Leaflet plus OpenStreetMap tiles for the service area map
- Cloudflare Worker plus Turnstile for form submission, with a pluggable email transport (Resend by default, MailChannels Email API as an alternative)

## Prerequisites

- Node 20.3 or newer (Node 22 recommended). The deploy workflow uses Node 22.
- npm 10 or newer

## Local development

```bash
npm install
npm run dev
```

Then open the URL printed by Astro. Edits to files in `src/config/`, `src/content/` and `src/components/` hot reload.

## Build and preview

```bash
npm run build
npm run preview
```

## Project layout

```
.github/workflows/deploy.yml   GitHub Pages deploy job
public/                        static assets, robots.txt, CNAME, favicon, site.webmanifest
src/
  assets/                      source images for Astro Image
  components/
    layout/                    Header, Footer, MainLayout, SeoHead
    sections/                  page section primitives (Hero, Pricing, etc.)
    ui/                        Button, Card, SectionHeading, Badge, Lightbox
    forms/                     BookingRequestForm, ClientIntakeForm, FormField, FormNotice
    map/                       ServiceAreaMap (Leaflet island)
  config/                      site, business, brand, navigation, form
  content/                     all editable copy for every page
  lib/                         seo, jsonld, formatters, validate
  pages/                       Astro routes
  styles/global.css            Tailwind plus brand tokens plus font imports
worker/                        Cloudflare Worker form backend (own README inside)
DEPLOYMENT.md                  full deploy guide
```

## Editing content

All copy lives in `src/config/` and `src/content/`. There is no CMS. To change pricing, services, FAQs or testimonials, edit the relevant TS file and rebuild. Each file is typed.

### Outstanding content TODOs

The following items are marked with `TODO` in code and still need confirmation before publishing:

- Meet-and-greet wording in `src/content/faq.ts`
- Privacy Policy and Terms last updated date in `src/content/legal.ts`
- Additional gallery photos in `src/content/gallery.ts` and `public/images/gallery/` once more are supplied from the Curl Up Club Facebook page

Search the repo for `TODO` to find them all.

### Adding photos to the gallery

1. Drop the image file into `public/images/gallery/`. PNG and JPG both work. Keep file names lowercase with hyphens.
2. Open `src/content/gallery.ts` and add a new entry to the `images` array:

```ts
{
  src: '/images/gallery/your-new-photo.png',
  alt: 'Short, descriptive alt text. Avoid identifying the cat owner by name.',
  caption: 'Optional caption shown under the image in the grid.',
},
```

3. Run `npm run build` and check the `/gallery/` page. The grid is responsive and the lightbox picks up the new entry automatically.

The same pattern applies to other image areas: `public/images/about/` for About page imagery and `public/images/cards/` for service-card imagery.

## Forms

Two forms are shipped:

- Public booking request at `/contact/`. Submits to `PUBLIC_FORM_ENDPOINT`, default `/api/booking-request`.
- Private client intake at `/client-intake/`. Not in nav, marked `noindex`. Submits to `PUBLIC_INTAKE_ENDPOINT`, default `/api/client-intake`.

Both routes are served by the same Cloudflare Worker in `worker/`. The Worker performs honeypot, Turnstile siteverify, rate limit and email send.

If `PUBLIC_TURNSTILE_SITE_KEY` is set at build time, the Turnstile widget is rendered and the matching `TURNSTILE_SECRET_KEY` Worker secret is required for verification.

## Environment variables

Set at build time. See `.env.example`.

```
PUBLIC_SITE_URL=https://curlupclub.com
PUBLIC_FORM_ENDPOINT=/api/booking-request
PUBLIC_INTAKE_ENDPOINT=/api/client-intake
PUBLIC_TURNSTILE_SITE_KEY=
```

## Deployment

See `DEPLOYMENT.md` for the full guide covering GitHub Pages, the custom domain binding, DNS at Cloudflare and the Worker deploy.

## Non-goals

This site intentionally does not include analytics, tracking pixels, ad scripts, AI features, accounts, login, real-time booking calendars, third-party CDN fonts or Google Maps. There is no claim of insurance, DBS check, qualifications, training or veterinary certification because none of those are in source material; do not add such claims without supporting evidence.

## QA status at handover

- `npx astro check` passes with 0 errors, 0 warnings, 0 hints across all 61 source files
- `npm run build` produces 13 prerendered HTML pages plus a sitemap and robots
- All 13 routes were smoke-tested locally and return the expected status codes, including a working 404 page
- Booking request form was exercised with an empty submit. All required fields are blocked, eight inline accessible alerts are rendered with descriptive messages and the consent checkbox blocks submission until ticked
- Honeypot field is present in the DOM but visually hidden and removed from the keyboard tab order
- Skip-to-content link, document landmarks and h1 are in place on every page
- All confirmed brand colours meet WCAG AA against the canvas background
- Outstanding content TODOs are listed above and are the only remaining gating items before going public
