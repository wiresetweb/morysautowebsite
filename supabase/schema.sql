-- Mory's Auto Parts — Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) once per project.

create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  phone          text not null,
  email          text not null,
  vehicle_year   text,
  vehicle_make   text,
  vehicle_model  text,
  part_needed    text not null,
  condition_pref text default 'any',   -- new | used | aftermarket | any
  language_pref  text default 'en',    -- en | es
  message        text,
  source         text default 'website',
  status         text default 'new'    -- new | contacted | quoted | closed
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

-- Lock the table down. With RLS enabled and NO policies, the anon and
-- authenticated API keys can neither read nor write this table. Our Cloudflare
-- function uses the SERVICE ROLE key, which bypasses RLS — so the website
-- backend can insert leads, but a browser can never touch this data directly.
alter table public.leads enable row level security;


-- ---------------------------------------------------------------------------
-- Profit & Loss — one row per week (Monday-based). All money is integer cents.
-- eBay COGS is NOT stored; it's derived at read time as 65% of eBay gross.
-- ---------------------------------------------------------------------------
create table if not exists public.pnl_weeks (
  id                        uuid primary key default gen_random_uuid(),
  week_start                date not null unique,
  -- revenue
  salesman_revenue_cents    bigint not null default 0,
  ebay_gross_cents          bigint not null default 0,
  misc_income_cents         bigint not null default 0,
  -- cogs inputs
  salesman_cogs_cents       bigint not null default 0,
  shop_supplies_cents       bigint not null default 0,
  -- fixed operating expenses
  rent_cents                bigint not null default 0,
  insurance_cents           bigint not null default 0,
  sba_loan_cents            bigint not null default 0,
  salaries_cents            bigint not null default 0,
  phone_internet_cents      bigint not null default 0,
  quickbooks_cents          bigint not null default 0,
  accounting_cents          bigint not null default 0,
  -- variable operating expenses
  power_cents               bigint not null default 0,
  vehicle_gas_cents         bigint not null default 0,
  shop_car_parts_cents      bigint not null default 0,
  forklift_tank_cents       bigint not null default 0,
  fire_equipment_cents      bigint not null default 0,
  maintenance_repairs_cents bigint not null default 0,
  -- dynamic extras: [{ "name": text, "kind": 'fixed'|'variable', "amount_cents": int }]
  extra_expenses            jsonb not null default '[]'::jsonb,
  note                      text,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists pnl_weeks_week_start_idx on public.pnl_weeks (week_start desc);

-- Same lockdown as leads: RLS on, no policies → service-role key only.
alter table public.pnl_weeks enable row level security;
