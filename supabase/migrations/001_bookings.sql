-- Nuriya Studio consultation bookings
-- Run in the Supabase SQL editor before enabling the /book form in production.

create extension if not exists pgcrypto;

create table if not exists public.consultation_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  preferred_date date not null,
  preferred_time text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  source text not null default 'website'
);

create index if not exists consultation_bookings_created_at_idx
  on public.consultation_bookings (created_at desc);

create index if not exists consultation_bookings_status_idx
  on public.consultation_bookings (status);

alter table public.consultation_bookings enable row level security;

-- No public policies: inserts go through the Next.js API with the service role key.
