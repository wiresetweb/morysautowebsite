# Handoff — Mory's Auto Parts and Glass

You are continuing development of a website for **Mory's Auto Parts and Glass**, a 20+ year auto parts shop in Hialeah, FL. The previous agent built the site through "Phase 1." Read this brief fully before acting, then confirm the current state by reading the repo (don't trust this brief blindly — verify against the code).

## The client
- **Business:** Mory's Auto Parts and Glass — new, used & aftermarket auto parts plus auto glass. Owner **Alex (aka "Mory")**, 20+ years in business, has served thousands of customers.
- **Serves:** Miami-Dade & Broward (South Florida). Bilingual (English/Spanish); many customers are Spanish-speaking.
- **NAP:** 151 E 10th Ave, Hialeah, FL 33010 · **305-835-2777** · mory7373@gmail.com · Mon–Fri 9am–5pm.
- **Domain:** morysautoparts.com (replacing an existing site; client is still getting the agency domain access).
- **Differentiators:** fair/direct pricing, owner's straight talk, finding hard-to-find parts, a supplier/salvage network.
- **Agency:** Wireset Web (Lazaro, hello@wiresetweb.com). This is the git commit identity.

## Stack & architecture (do not change without reason)
- **Astro (static output) + Tailwind v4.** Lives in the **`site/` subfolder** — that's the git repo root.
- **Cloudflare Pages** hosting + **Cloudflare Pages Functions** (`functions/`) for backend. Functions are **zero-runtime-dependency on purpose** (use `fetch` for Supabase REST + Resend REST, Web Crypto for auth). **Do NOT add Node-only SDKs** (`@supabase/supabase-js`, `resend`) into functions — they break the Workers runtime.
- **Supabase** = database (`leads` table, RLS locked so only the service-role key can touch it; schema in `supabase/schema.sql`).
- **Resend** = email (confirmation to submitter + notification to owner on each lead).
- **Design = "Editorial"** (client picked it from 3 options). Magazine/catalog aesthetic: cream bg (`#f6efe1`), **navy primary `#0f1f3d`**, **yellow/orange action `#da861c`**, red `#e11011` minor accent. Fonts: Saira Condensed (display), Lora (serif body), Inter (UI). Section callouts read **"No. 0X — Label"** (the client disliked the `§` symbol that was there before — never reintroduce it). **Light theme only** (client rejected dark). Logo at `public/morys_logo.png` (orange road-sign diamond).

## What's built & verified
- **Pages:** `/` (home), `/about`, `/contact` (lead form), `/service-area` + 8 SEO city pages (`hialeah, miami, hialeah-gardens, opa-locka, doral, north-miami, fontainebleau, kendall`), `/admin/login`, `/admin` (dashboard shell), `/admin/leads` (leads inbox), `404`.
- **Backend functions:** `POST /api/leads` (insert + 2 Resend emails), `POST /api/staff/login` (PIN → `SHA-256(pin+SESSION_SECRET)` compare → HMAC-signed HttpOnly/Secure/SameSite session cookie; optional KV rate-limit via `LOGIN_RL` binding), `POST /api/staff/logout`, `GET/PATCH /api/staff/leads` (session-protected), `functions/admin/_middleware.ts` (edge guard on `/admin/*`).
- **Launch assets:** sized favicons + 1200×630 `og-image.jpg` (generated from logo via `node scripts/gen-assets.mjs`), auto sitemap (`/admin` excluded), `robots.txt`, branded 404.
- **Animations:** subtle scroll-reveal (`data-reveal`, IntersectionObserver, respects `prefers-reduced-motion`). Keep animations restrained — the guiding principle is "less motion, more impact."
- **Content is centralized:** `src/data/content.ts` (business info, reviews, categories) and `src/data/seo.ts` (locations + JSON-LD). Edit copy there, not in components. Icons via `src/components/Icon.astro` (curated Tabler subset).
- **Verified:** `npm run build` = 16 pages clean; functions compile and run under `wrangler pages dev`; auth/leads/validation tested end-to-end (401 unauthed, signed cookie on correct PIN, 400 on bad input, `/admin/*` redirects to login).

## How to work
- `npm run dev` — Astro UI only. **Functions/auth do NOT run here.**
- `npm run preview:cf` — `astro build && wrangler pages dev dist`. **Full stack** (needs a local `.dev.vars`; copy from `.dev.vars.example`).
- `npm run build` — production build → `dist/`.
- `npm run staff:pin -- <pin> <session-secret>` — generate `STAFF_PIN_HASH`.
- Read **`SETUP.md`** — it has the full Supabase/Resend/Cloudflare provisioning steps and env-var list.

## Gotchas (learned the hard way)
- **Never pass `--outfile=/tmp/_worker.js` (or any file named `_worker.js`) to wrangler** — it treats `_worker.js` as special and a stale one poisons later builds with a cryptic `Content-Disposition` parse error.
- On Windows, kill stray `workerd.exe` between wrangler runs (they hold cache locks).
- Repo root is **`site/`**, not the parent folder. When connecting Cloudflare Pages, leave base directory **blank**. The parent folder holds the client brief docs and is intentionally outside the repo.
- Env vars needed: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `FROM_EMAIL`, `OWNER_EMAIL`, `STAFF_PIN_HASH`, `SESSION_SECRET`, optional `LOGIN_RL` (KV).

## What's next (phase plan — confirm priority with the user before starting)
- **Phase 2 — Staging:** user is provisioning Supabase + Resend + Cloudflare. Once keys exist: set env vars, deploy to a `pages.dev` URL, test the real lead flow (DB insert + both emails) and the leads inbox against live data.
- **Phase 3 — Real content:** drop in Alex's photos (placeholders show target ratios), curate real Google reviews into `content.ts`, and scaffold **Spanish (`/es/`) routes** (the brief wants bilingual; audience is heavily Spanish-speaking). Spanish scaffolding is unblocked solo work — a good pick if staging isn't ready.
- **Phase 4 — P&L tool:** the `/admin` "Profit & Loss" tile is a placeholder. Alex will send a spec (weekly P&L entry + history + CSV export, shop + eBay revenue, read/write via the backend). Hold until the spec arrives.
- **Phase 5 — Launch (needs domain):** Resend domain verification, Cloudflare custom domain + DNS cutover, analytics, submit sitemap to Search Console.

**Start by:** reading `SETUP.md` and the `src/data/` files, running `npm run build` to confirm green, then asking the user which phase/task to pick up.
