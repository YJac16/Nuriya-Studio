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

## Deployment (Railway)

- Build: `npm run build`
- Start: `npm start` (or `HOSTNAME=0.0.0.0 node .next/standalone/server.js`)
- Health check: `/api/health`
- Node: `20` (see `.nvmrc`)

See [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md) for the full rebrand roadmap.

## Branching

Work happens on `cursor/nuriya-studio-rebrand-9957`.  
Merge to `main` only after explicit approval.
