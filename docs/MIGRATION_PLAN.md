# Nuriya Studio — Full Audit & Migration Plan

**Status:** Phases 1–6 complete — awaiting approval to merge `main`  
**Branch:** `cursor/nuriya-studio-rebrand-9957`  
**Stack decision:** Next.js App Router + TypeScript + Sanity CMS + Supabase (booking)  
**Positioning:** A software studio building digital products that help businesses grow.

**Approval notes (2026-07-25):**
- WhatsApp number to be added later via env (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- Booking: **own system on Supabase** (not Calendly). Calendly references removed from target architecture.

---

## 1. Full Audit (Current State)

### 1.1 Codebase snapshot

| Dimension | Current state |
|-----------|---------------|
| Stack | Vite 5.4 + vanilla ES modules (no React, no TypeScript) |
| Scale | ~1,200 LOC across shell, CSS, and 7 page modules |
| Routing | Custom History API SPA in `main.js` |
| Styling | Single global `style.css` + CSS variables |
| Components | None — each page returns an HTML template string |
| CMS | None — all copy hardcoded |
| Tests / lint | None |
| CI | None |

### 1.2 Folder structure (today)

```
/
├── index.html
├── main.js                 # Router, nav, EXTERNAL_URLS
├── style.css               # All design tokens + layout
├── package.json            # vite only
├── vite.config.js          # PORT, Railway allowedHosts
├── pages/                  # home, about, work, videos, athariq, founder, contact
└── public/                 # Logos, favicons, ~18MB assets
```

### 1.3 Brand & content

- Tagline today: *“A creative studio building thoughtful digital and interactive experiences.”*
- About frames a **production company** (“Shaping Light into Story”).
- Work lists unpriced categories: Web Experiences, Interactive Storytelling, Game Systems, Digital Design.
- Ecosystem links: Āthariq (games), Little Light Studios (education), Founder profile.
- No pricing, packages, process, testimonials, portfolio case studies, or blog.

### 1.4 SEO

| Item | Status |
|------|--------|
| Title / description | Static in `index.html` only |
| Per-route metadata | Missing (SPA never updates `document.title`) |
| Open Graph / Twitter | Missing |
| Canonical URLs | Missing |
| `sitemap.xml` / `robots.txt` | Missing |
| JSON-LD | Missing |
| SSR / prerender | Missing |

### 1.5 Lead generation

- Contact: `mailto:hello@nuriyastudio.com` only.
- Contact-form CSS exists; no form is rendered.
- No WhatsApp, Calendly, quote flow, or consultation booking.

### 1.6 Analytics & consent

- No GA, Search Console wiring, Clarity, Meta Pixel, or cookie banner.

### 1.7 Performance & responsiveness

- Founder photo ~15MB; Little Light logo ~1.7MB.
- System font stack; no next/image equivalent; no lazy loading.
- Breakpoints at 768px / 480px; no mobile nav drawer (7 nav items wrap).
- `prefers-reduced-motion` present; focus-visible present; home lacks `<h1>`.

### 1.8 Railway & environment

| Item | Status |
|------|--------|
| `railway.toml` / `railway.json` | Missing (README example only) |
| Production serve | `vite preview --host` (not ideal for production) |
| Health check | Missing |
| Node engines / `.nvmrc` | Missing (README says Node 16; Vite 5 needs ≥18) |
| Env vars | Only `PORT`; no `.env.example` |
| Secrets in repo | None found |

### 1.9 Audit verdict

The site is a thoughtful brand hub for a creative/production identity. It is **not** a conversion-ready software company website. Meeting the new brief requires a **platform migration**, not a restyle.

---

## 2. Information Architecture

### 2.1 Primary navigation

| Route | Purpose |
|-------|---------|
| `/` | Homepage — brand, offer, proof, CTA |
| `/services` | Service overview |
| `/services/[slug]` | Landing Pages, Business Website, Booking System, Custom Software, Enterprise |
| `/solutions` | Industry / use-case solutions (SME, transport, medical, hospitality, etc.) |
| `/products` | Future SaaS products (Coming Soon) |
| `/products/[slug]` | Product detail / waitlist |
| `/portfolio` | Case studies (CMS) |
| `/portfolio/[slug]` | Case study detail |
| `/pricing` | One-time packages + monthly plans |
| `/about` | Studio story, mission, team, brands |
| `/blog` | Insights (CMS) |
| `/blog/[slug]` | Article |
| `/resources` | Guides, checklists, downloads (CMS-ready) |
| `/contact` | Contact form + WhatsApp + quote |
| `/book` | Book consultation (Supabase-backed) |
| `/brands` | Our Brands (Athariq, Little Light) — restrained |

### 2.2 Utility / system routes

- `/studio` — Sanity Studio (protected / noindex)
- `/api/contact`, `/api/quote`, `/api/book` — form/booking handlers (Supabase + Resend)
- `/robots.txt`, `/sitemap.xml` — generated
- `/privacy`, `/terms` — legal

### 2.3 Homepage section order

1. Hero (brand + one headline + one sentence + CTA group + dominant visual)
2. Services
3. Software / Products
4. Portfolio
5. Process
6. Pricing (teaser → full pricing page)
7. Testimonials
8. FAQ
9. Final CTA
10. Footer

### 2.4 Lead CTAs (every page)

- Book Consultation → owned booking flow backed by Supabase
- Request Quote
- WhatsApp (env-gated until number provided)
- Contact form (where relevant)

---

## 3. Wireframes (structural)

### 3.1 Homepage (first viewport)

```
┌────────────────────────────────────────────────────────────┐
│  Nav: Logo · Services · Products · Work · Pricing · Contact │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  NURIYA STUDIO                                             │
│  Digital products that help businesses grow.               │
│  Websites, software, and automation — built to scale.      │
│                                                            │
│  [Book Consultation]  [View Services]                      │
│                                                            │
│  ████████ full-bleed product/atmosphere visual ████████    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

Rules: one composition; brand as hero signal; no stats strip, no cards in hero, no overlay badges.

### 3.2 Service detail

```
Header → Price / starting from → Includes list → Delivery window
→ Related solutions → Portfolio proof → Quote / Book CTA
```

### 3.3 Case study

```
Overview → Problem → Solution → Tech stack → Screenshots → Results → CTA
```

### 3.4 Pricing

```
One-time packages (5) → Monthly plans (3) → Enterprise note → FAQ → CTA
```

---

## 4. Design System

### 4.1 Direction

Premium, minimal, technical, confident. Light-first with refined dark mode.  
**Explicitly avoid:** cream/terracotta agency look (current site), purple-indigo AI defaults, broadsheet newspaper layouts, pill clusters, card-heavy heroes.

### 4.2 Colour tokens (CSS variables)

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `--bg` | `#FAFAF9` | `#0A0A0A` | Page |
| `--bg-elevated` | `#FFFFFF` | `#141414` | Surfaces |
| `--fg` | `#0A0A0A` | `#F5F5F4` | Primary text |
| `--fg-muted` | `#57534E` | `#A8A29E` | Secondary |
| `--border` | `#E7E5E4` | `#292524` | Hairlines |
| `--accent` | `#0F766E` | `#2DD4BF` | Teal — technical, not purple |
| `--accent-fg` | `#FFFFFF` | `#042F2E` | On-accent |
| `--success` / `--danger` | semantic | semantic | Forms / status |

### 4.3 Typography

- Display: **Instrument Serif** or **Newsreader** — used sparingly for brand/hero only
- UI / body: **Geist** or **Satoshi** — modern product UI (not Inter/Roboto/Arial/system as primary)
- Mono: **Geist Mono** — prices, tech stacks, code-ish labels
- Scale: fluid `clamp()` type scale; clear H1–H3 hierarchy; one job per section

### 4.4 Spacing & layout

- 4px base grid; section padding `6–10 rem` desktop / `3–5 rem` mobile
- Content max width ~1120–1200px; prose ~680px
- Full-bleed hero media only on marketing surfaces

### 4.5 Components (primitives)

Buttons (primary / secondary / ghost / destructive), links, badges, inputs, textareas, selects, checkboxes, tables, dialogs, tabs, accordion (FAQ), toast, skeleton, avatar, logo mark, section header, CTA band, price card (interaction container only), form field, WhatsApp FAB (optional, restrained).

### 4.6 Motion

2–3 intentional motions sitewide:

1. Hero brand/headline entrance (subtle fade + translate)
2. Section reveal on scroll (once, reduced-motion safe)
3. Button / link hover state (opacity or underline — not glow)

### 4.7 Accessibility

WCAG 2.2 AA targets: contrast, focus rings, skip link, landmark regions, labelled forms, keyboard nav, `prefers-reduced-motion`, theme toggle with `color-scheme`.

---

## 5. Component Plan

### 5.1 App shell

- `SiteHeader`, `SiteFooter`, `MobileNav`, `ThemeToggle`
- `SkipToContent`, `CookieConsent`

### 5.2 Marketing

- `Hero`, `Section`, `SectionHeading`
- `ServiceGrid`, `ServiceCard` (list interaction only)
- `ProductGrid`, `ComingSoonBadge`
- `ProcessSteps`, `PricingTable`, `PlanCard`
- `TestimonialList`, `FaqAccordion`
- `CtaBand`, `BrandStrip` (Our Brands — footer/about only)

### 5.3 Lead gen

- `ContactForm`, `QuoteForm`, `BookConsultation`, `BookingForm` (Supabase)
- `WhatsAppButton` (renders only if `NEXT_PUBLIC_WHATSAPP_NUMBER` set)

### 5.4 Content

- `PortableText`, `PostCard`, `CaseStudyHero`, `TechStack`, `ResultMetrics`
- `MDX` not primary — Sanity Portable Text

### 5.5 SEO / analytics

- `JsonLd`, `Analytics`, `Clarity`, `MetaPixel` (optional, consent-gated)

**Rule:** No duplicated UI. Shared primitives in `components/ui`; domain in `components/marketing`, `components/forms`, `components/content`.

---

## 6. Migration Strategy

### 6.1 Approach

Greenfield Next.js app in-repo (replace Vite SPA). Preserve:

- Brand assets (optimised)
- External brand URLs (Athariq, Little Light, Founder) via env
- Domain / Railway project continuity on `main` deploy
- Email `hello@nuriyastudio.com`

Do **not** preserve cream theme, SPA router, or “production company” positioning as primary message.

### 6.2 Cutover

1. Build on `feature/nuriya-studio-rebrand`
2. Phase commits + quality gates
3. Preview deploy (Railway PR environment or Vercel preview if added)
4. Final approval → merge `main` → Railway auto-deploy
5. Verify production health + Search Console resubmit sitemap

### 6.3 Content migration

| Old | New |
|-----|-----|
| Home creative tagline | Software studio positioning |
| Work categories | Priced services + solutions |
| Athariq / Little Light / Founder pages | `/brands` + footer links (not primary nav) |
| About poetic copy | Mission + capability + team (keep nūr etymology lightly if it still fits) |
| Contact mailto | Form + WhatsApp + Book |

---

## 7. SEO Strategy

- Next.js Metadata API on every route (title template, description, canonical, OG, Twitter)
- Organization + WebSite + Service + FAQ + Article + CreativeWork schema via JSON-LD
- `app/sitemap.ts`, `app/robots.ts`
- Semantic HTML, one H1 per page, internal linking Service ↔ Portfolio ↔ Pricing
- Image optimisation (`next/image`), font subsetting, RSC by default
- Target: Lighthouse Performance / SEO / Accessibility **95+**
- Search Console + sitemap submit post-launch
- ZA-relevant keywords: business website Cape Town/SA, booking system, custom software SME, transport software — without keyword stuffing

---

## 8. Conversion Strategy

| Funnel stage | Mechanism |
|--------------|-----------|
| Awareness | Clear software-studio hero; SEO content; brands secondary |
| Consideration | Priced packages, process, case studies, FAQs |
| Conversion | Book / Quote / WhatsApp on every page; low-friction forms |
| Retention | Monthly plans (Starter / Growth / Business) |
| Expansion | Products waitlist → future SaaS |

Primary CTA: **Book Consultation**  
Secondary: **Request Quote**  
Tertiary: **WhatsApp**

Forms → Resend (or equivalent) to `hello@nuriyastudio.com` with spam honeypot + rate limit.

---

## 9. Folder Architecture (target)

```
/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home
│   │   ├── services/...
│   │   ├── solutions/...
│   │   ├── products/...
│   │   ├── portfolio/...
│   │   ├── pricing/page.tsx
│   │   ├── about/page.tsx
│   │   ├── blog/...
│   │   ├── resources/...
│   │   ├── contact/page.tsx
│   │   ├── book/page.tsx
│   │   ├── brands/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── studio/[[...tool]]/page.tsx     # Sanity
│   ├── api/contact/route.ts
│   ├── api/quote/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── marketing/
│   ├── forms/
│   ├── content/
│   └── analytics/
├── lib/
│   ├── sanity/                         # client, queries, image
│   ├── seo.ts
│   ├── constants.ts
│   └── email.ts
├── sanity/
│   ├── schemas/
│   ├── structure.ts
│   └── env.ts
├── public/                             # optimised assets only
├── docs/
│   ├── MIGRATION_PLAN.md               # this file
│   ├── CLIENT_PORTAL_ARCHITECTURE.md
│   ├── AI_ROADMAP.md
│   └── SAAS_ROADMAP.md
├── railway.toml
├── .nvmrc                              # 20
├── .env.example
└── package.json
```

---

## 10. CMS Strategy (Sanity)

### 10.1 Schemas

| Document | Key fields |
|----------|------------|
| `service` | title, slug, summary, priceLabel, priceAmount, includes[], delivery, body, order |
| `project` (portfolio) | title, slug, client, industry, overview, problem, solution, techStack[], gallery, results[], featured |
| `post` | title, slug, excerpt, cover, body, publishedAt, author |
| `testimonial` | quote, author, role, company, logo?, featured |
| `faq` | question, answer, category, order |
| `teamMember` | name, role, bio, image, links |
| `siteSettings` | singleton: nav CTAs, WhatsApp number, socials, brands[] |
| `product` | title, slug, status (`comingSoon`/`live`), summary, body |
| `resource` | title, slug, type, body/file |
| `page` | optional flexible pages if needed later |

### 10.2 Editorial UX

- Desk structure grouped: Content / Commercial / Settings
- Preview pane for posts & projects
- Role: editor token for production reads; write access via Studio auth

### 10.3 Next.js integration

- `next-sanity` + GROQ
- ISR / `revalidateTag` on webhook
- Images via Sanity CDN + `next/image`

---

## 11. SaaS Roadmap (site-ready, product later)

| Product | Site treatment | Future |
|---------|----------------|--------|
| Transport Management | `/products/transport` Coming Soon + waitlist | Core vertical SaaS |
| Fleet Management | Coming Soon | Adjacent vertical |
| Booking Platform | Coming Soon | Productise service #3 |
| Invoice Platform | Coming Soon | Cashflow product |
| AI Automation Suite | Coming Soon | Upsell + retainers |
| Productivity Apps | Coming Soon | Athariq-adjacent tooling |

Site architecture uses a generic `product` schema so new brands/products ship without redesign.

**Our Brands (secondary):**

- Nuriya Studio — Software (this site)
- Athariq — Games
- Little Light — Education

Linked from About + Footer only — never compete with primary commercial CTA.

---

## 12. Twelve-Month Roadmap

| Window | Focus |
|--------|-------|
| Month 1 | Launch rebrand site; services + pricing live; forms + WhatsApp; Sanity baseline; Railway hardened |
| Month 2–3 | 3–5 case studies; blog cadence; Search Console traction; Clarity heatmaps; refine conversion |
| Month 4–5 | Solutions pages by industry; first product waitlist; monthly plan packaging polish |
| Month 6 | Client portal MVP architecture → build start (auth, projects, invoices view) |
| Month 7–8 | AI assist: lead qualification + quote draft (internal tool) |
| Month 9–10 | Booking Platform beta (productise delivery) |
| Month 11–12 | Transport/Fleet discovery; multi-brand hub polish; recurring revenue target review |

---

## 13. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| SEO regression on SPA→SSR cutover | Medium | Preserve critical URLs or 301; sitemap; Search Console |
| Content empty at launch (no case studies) | High for trust | Launch with 2–3 strong case studies or anonymised process proofs; avoid fake metrics |
| Sanity/env misconfig on Railway | High | `.env.example`, healthcheck, build-time validation |
| Scope creep (portal + AI + multi-SaaS) | High | Architecture docs only until commercial site converts |
| Design drift to agency clichés | Medium | Locked tokens + component PR checklist |
| Image/asset bloat | Medium | Compress before commit; budget <200KB hero assets |
| Form spam | Medium | Honeypot + rate limit + Resend validation |
| Branch / deploy confusion | Medium | Feature branch only; merge `main` after approval |

---

## 14. Build Phases

### Phase 0 — Plan approval (current)

- Deliver this document
- No product code until approved

### Phase 1 — Foundation

- Scaffold Next.js App Router + TS + ESLint + Prettier
- Design tokens, fonts, light/dark, `components/ui`
- `railway.toml`, `.nvmrc`, `.env.example`, `output: 'standalone'`
- Optimise/replace public assets
- Shell: header, footer, mobile nav, theme toggle
- Quality gate: lint, typecheck, build

### Phase 2 — Commercial core

- Home (full section stack)
- Services index + 5 service pages (prices as specified)
- Pricing (packages + monthly)
- Contact + Quote API (Resend)
- Book page (Supabase booking schema + form; WhatsApp env-gated)
- Quality gate + commit

### Phase 3 — CMS + proof

- Sanity project + schemas + Studio route
- Portfolio list/detail
- Blog list/detail
- Testimonials + FAQs from CMS
- About + Team + Brands
- Quality gate + commit

### Phase 4 — Products, solutions, resources

- Solutions pages
- Products Coming Soon + waitlist
- Resources scaffold
- Legal pages
- Quality gate + commit

### Phase 5 — SEO, analytics, performance

- Metadata everywhere, JSON-LD, sitemap, robots
- GA4, Clarity, cookie consent (Meta Pixel optional)
- Lighthouse pass 95+ on key routes
- Quality gate + commit

### Phase 6 — Architecture docs (no product build)

- `CLIENT_PORTAL_ARCHITECTURE.md`
- `AI_ROADMAP.md`
- `SAAS_ROADMAP.md`
- Final review summary → ask approval to merge `main`

### Post-merge

- Push `main` → confirm Railway deploy
- Verify production
- Submit sitemap to Search Console

---

## 15. Railway Recommendations

```toml
# railway.toml (to be added in Phase 1)
[build]
builder = "NIXPACKS"
buildCommand = "npm run build"

[deploy]
startCommand = "node .next/standalone/server.js"
healthcheckPath = "/api/health"
healthcheckTimeout = 30
restartPolicyType = "ON_FAILURE"
```

**Env vars (names only):**

- `NODE_ENV`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional until provided)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_REVALIDATE_SECRET`
- `NEXT_PUBLIC_GA_ID` (optional)
- `NEXT_PUBLIC_CLARITY_ID` (optional)
- `NEXT_PUBLIC_META_PIXEL_ID` (optional)
- Athariq / Little Light / Founder URLs as `NEXT_PUBLIC_*`

**Also:** pin Node 20; stop using `vite preview`; ensure standalone copies `public` + static assets in build script.

---

## 16. Future Architecture (docs only in Phase 6)

### Client portal (not built yet)

Auth (Clerk/Auth.js) → roles `client` / `admin` → modules: Projects, Invoices, Approvals, Revisions, Assets, Support messages. Separate `/portal` route group, shared design system.

### AI roadmap (not built yet)

Internal tools first: quote generator, lead qualification, proposal assistant, content assistant, support draft replies, workflow automation. Pattern: Next.js route handlers → queue → model provider → Sanity/CRM writes. Human-in-the-loop required for client-facing output.

---

## 17. Pricing content (source of truth for Phase 2)

### One-time

| Package | Price | Delivery |
|---------|-------|----------|
| Landing Pages | R2,499 | 3–5 business days |
| Business Website | R5,999 | 1–2 weeks |
| Booking System | from R9,999 | 2–4 weeks |
| Custom Software | from R15,000 | Quotation |
| Enterprise | Custom | Quotation |

### Monthly

| Plan | Price | Highlights |
|------|-------|------------|
| Starter | R299/mo | Hosting, SSL, monitoring, backups |
| Growth | R699/mo | + content updates, SEO checks, analytics, support |
| Business | R1,299/mo | + priority support, feature updates, reports, 4h development |

---

## 18. Git & quality workflow

1. Work only on `feature/nuriya-studio-rebrand` (never directly on `main`).
2. After each phase: self-review → lint → typecheck → build → **ask permission to commit**.
3. Commit in logical stages with professional messages.
4. Push feature branch; open/update PR for review.
5. **Merge to `main` only after explicit approval.**
6. Confirm Railway production deploy success.

### Pre-commit quality gate (mandatory)

- No duplicate components, unused imports/vars, dead code, `console.log`, stray TODOs
- Consistent naming/structure; sound TypeScript; a11y + responsive + both themes
- SEO metadata + intact internal links
- `npm run lint` · `npm run typecheck` · `npm run build` clean

---

## 19. Approval checklist

Reply **“Approve plan”** (or list changes) to unlock Phase 1.

Confirm or override defaults:

- [x] Next.js App Router + TypeScript
- [x] Sanity CMS
- [x] Resend for forms
- [x] Teal accent, light-first + dark mode
- [x] Branch `cursor/nuriya-studio-rebrand-9957`
- [x] Booking: own Supabase system (not Calendly)
- [ ] WhatsApp number (env later when ready)

---

## 20. Implementation log

- **2026-07-25 — Plan approved.** WhatsApp number deferred. Booking confirmed as owned Supabase system (not Calendly).
- **Phase 1 complete:** Next.js foundation, design system, shell, Railway hardening, route stubs.
- **Phase 2 complete:** Commercial core — services, pricing, forms (Resend), Supabase booking.
- **Phase 3 complete:** Sanity CMS — portfolio, blog, testimonials, FAQs, team, studio.
- **Phase 4 complete:** Solutions, product waitlists, resources, legal polish.
- **Phase 5 complete:** SEO, analytics consent, performance polish.
- **Phase 6 complete:** Architecture docs — portal, AI, SaaS + final review (`docs/FINAL_REVIEW.md`).

---

*Plan approved. Implementation proceeds phase by phase with quality gates before each commit.*
