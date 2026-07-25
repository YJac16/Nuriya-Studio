-- Product waitlist signups for Coming Soon pages.

create table if not exists public.product_waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  name text,
  company text,
  product_slug text not null,
  product_name text not null,
  notes text,
  source text not null default 'website'
);

create unique index if not exists product_waitlist_email_product_idx
  on public.product_waitlist (lower(email), product_slug);

create index if not exists product_waitlist_created_at_idx
  on public.product_waitlist (created_at desc);

alter table public.product_waitlist enable row level security;

-- No public policies: inserts go through the Next.js API with the service role key.
