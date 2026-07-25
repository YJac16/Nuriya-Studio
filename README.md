# Nuriya Studio

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

## Deployment (Railway)

- Build: `npm run build`
- Start: `npm start` (or `HOSTNAME=0.0.0.0 node .next/standalone/server.js`)
- Health check: `/api/health`
- Node: `20` (see `.nvmrc`)

See [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md) for the full rebrand roadmap.

## Branching

Work happens on `cursor/nuriya-studio-rebrand-9957`.  
Merge to `main` only after explicit approval.
