# Ops Launch Checklist

Use this after visual polish ships to complete the software-studio launch.

## Environment variables (Railway)

Copy from [`.env.example`](../.env.example) into Railway **production** variables.

| Variable | Required for | Status |
|----------|----------------|--------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG | Set to production domain |
| `RESEND_API_KEY` | Contact, quote, booking emails | Required for form delivery |
| `RESEND_FROM_EMAIL` | Outbound email sender | After Resend domain verification |
| `CONTACT_TO_EMAIL` | Inbox for leads | Defaults to yaseenjacobs97@gmail.com |
| `NEXT_PUBLIC_SUPABASE_URL` | Booking + waitlist storage | Required for book/waitlist |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-side Supabase | Required for book/waitlist |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase | Required for API routes |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS content | Required for portfolio/blog |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS dataset | Usually `production` |
| `SANITY_API_READ_TOKEN` | Draft/preview reads | Optional at launch |
| `SANITY_REVALIDATE_SECRET` | Webhook revalidation | Recommended |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | Optional |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity | Optional |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel | Optional |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp button | Add when number is ready |

## Supabase SQL

Run migrations in `supabase/migrations/`:

1. `001_bookings.sql` — consultation bookings
2. `002_product_waitlist.sql` — product waitlist signups

## Sanity CMS

1. Create project and set env vars above.
2. Open `/studio` on production.
3. Publish: portfolio projects, blog posts, testimonials, FAQs (fallbacks exist until published).

## SEO

1. Verify domain in Google Search Console.
2. Submit `https://<domain>/sitemap.xml`.
3. Confirm `robots.txt` and JSON-LD on production.

## Smoke tests (post-deploy)

- [ ] `/` — header readable over hero (light + dark)
- [ ] Mobile nav opens/closes with backdrop
- [ ] `/api/health` returns 200
- [ ] `/contact` — form submits or shows clear error without keys
- [ ] `/book` — booking flow
- [ ] `/studio` — Sanity loads when configured

## Railway

- Build: `npm run build`
- Start: `npm run start` (see `railway.toml`)
- Health: `/api/health`
