# Nūriya Studios

A software studio building digital products that help businesses grow.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** design system (light + dark)
- **Sanity** CMS (Phase 3)
- **Supabase** booking (Phase 2)
- **Railway** deployment (`output: 'standalone'`)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development (Turbopack) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run build` | Production build + standalone prep |
| `npm start` | Serve standalone build |

## Environment

Copy `.env.example` to `.env.local` and fill values as phases land.

WhatsApp CTA stays hidden until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set.  
Booking uses an owned Supabase flow (not Calendly).

### Phase 2 wiring

1. **Resend** — set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optional `RESEND_FROM_EMAIL`.
2. **Supabase booking** — create a project, run [`supabase/migrations/001_bookings.sql`](supabase/migrations/001_bookings.sql), set `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.
3. Forms degrade gracefully until keys are present (clear fallback messaging).

### Phase 3 — Sanity CMS

1. Create a Sanity project and set `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`.
2. Open `/studio` to manage Portfolio, Blog, Testimonials, FAQs, Team, and Settings.
3. Optional: set `SANITY_API_READ_TOKEN` and webhook to `/api/revalidate?secret=...`.
4. Until Sanity is connected, FAQ/static fallbacks keep commercial pages working.

### Phase 4 extras

- Product waitlist: run `supabase/migrations/002_product_waitlist.sql` (or rely on Resend-only capture).
- Resources can be expanded in Sanity (`resource` documents) or use the static scaffold.

### Phase 5 — SEO & analytics

- Sitemap: `/sitemap.xml` · Robots: `/robots.txt` (blocks `/studio` and `/api`)
- Set `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, optional `NEXT_PUBLIC_META_PIXEL_ID`
- Analytics scripts load only after cookie consent is accepted
- Submit sitemap in Google Search Console after production deploy

## Deployment (Railway)

- Build: `npm run build`
- Start: `npm start` (`next start --hostname 0.0.0.0`, uses `PORT`)
- Health check: `/api/health`
- Node: `20` (see `.nvmrc` / `nixpacks.toml`)
- Optional standalone: `npm run build:standalone` then `node .next/standalone/server.js`

See [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md) for the full rebrand roadmap.

## Docs

| Doc | Purpose |
|-----|---------|
| [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md) | Full audit + phased plan |
| [`docs/FINAL_REVIEW.md`](docs/FINAL_REVIEW.md) | Phases 1–6 ship summary |
| [`docs/CLIENT_PORTAL_ARCHITECTURE.md`](docs/CLIENT_PORTAL_ARCHITECTURE.md) | Future portal (not built) |
| [`docs/AI_ROADMAP.md`](docs/AI_ROADMAP.md) | Future AI tools (not built) |
| [`docs/SAAS_ROADMAP.md`](docs/SAAS_ROADMAP.md) | Product/SaaS sequencing |

## Branching

Work happens on `cursor/nuriya-studio-rebrand-9957`.  
Merge to `main` only after explicit approval.
