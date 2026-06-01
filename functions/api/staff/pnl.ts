// Staff Profit & Loss API. Lives under /api (outside the /admin middleware),
// so each handler verifies the session cookie itself.
//   GET    /api/staff/pnl?week=YYYY-MM-DD        → one week (or null)
//   GET    /api/staff/pnl?from=...&to=...         → weeks in range (asc)
//   GET    /api/staff/pnl                         → recent weeks (default 26)
//   POST   /api/staff/pnl   { week_start, ...cents fields, extra_expenses }
//                                                → upsert one week
//   DELETE /api/staff/pnl?week=YYYY-MM-DD         → delete one week
//
// All money is stored as integer cents. eBay COGS is NOT stored (derived in
// the UI as 65% of eBay gross). The table is RLS-locked with no policies, so
// only the service-role key used here can read or write it.

import { type Env, json } from "../../_shared/env";
import { getCookie, verifySession } from "../../_shared/session";

const NUMERIC_KEYS = [
  "salesman_revenue_cents", "ebay_gross_cents", "misc_income_cents",
  "salesman_cogs_cents", "shop_supplies_cents",
  "rent_cents", "insurance_cents", "sba_loan_cents", "salaries_cents",
  "phone_internet_cents", "quickbooks_cents", "accounting_cents",
  "power_cents", "vehicle_gas_cents", "shop_car_parts_cents",
  "forklift_tank_cents", "fire_equipment_cents", "maintenance_repairs_cents",
] as const;

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_CENTS = 100_000_000_000; // $1B sanity ceiling
const MAX_EXTRAS = 50;

async function requireAuth(request: Request, env: Env): Promise<boolean> {
  return verifySession(env, getCookie(request));
}

function sbHeaders(env: Env): HeadersInit {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
}

function notConfigured(env: Env): boolean {
  return !env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY;
}

function isMonday(iso: string): boolean {
  if (!ISO_RE.test(iso)) return false;
  const d = new Date(`${iso}T00:00:00Z`);
  return !isNaN(d.getTime()) && d.getUTCDay() === 1;
}

function cleanCents(v: unknown): number {
  const x = Math.round(Number(v));
  if (!Number.isFinite(x) || x < 0) return 0;
  return Math.min(x, MAX_CENTS);
}

function cleanExtras(v: unknown): { name: string; kind: "fixed" | "variable"; amount_cents: number }[] {
  if (!Array.isArray(v)) return [];
  const out: { name: string; kind: "fixed" | "variable"; amount_cents: number }[] = [];
  for (const item of v.slice(0, MAX_EXTRAS)) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const name = String(row.name ?? "").trim().slice(0, 60);
    if (!name) continue;
    const kind = row.kind === "fixed" ? "fixed" : "variable";
    out.push({ name, kind, amount_cents: cleanCents(row.amount_cents) });
  }
  return out;
}

// --- GET: one week, a range, or recent --------------------------------------
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await requireAuth(request, env))) return json({ error: "Unauthorized" }, 401);
  if (notConfigured(env)) return json({ error: "Supabase is not connected yet." }, 503);

  const url = new URL(request.url);
  const week = url.searchParams.get("week");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  let query = `${env.SUPABASE_URL}/rest/v1/pnl_weeks?select=*`;
  if (week && ISO_RE.test(week)) {
    query += `&week_start=eq.${week}`;
  } else {
    if (from && ISO_RE.test(from)) query += `&week_start=gte.${from}`;
    if (to && ISO_RE.test(to)) query += `&week_start=lte.${to}`;
    query += `&order=week_start.asc`;
    if (!from && !to) query += `&limit=26`;
  }

  try {
    const res = await fetch(query, { headers: sbHeaders(env) });
    if (!res.ok) {
      console.error("Supabase pnl fetch failed", res.status, await res.text());
      return json({ error: "Could not load P&L data." }, 502);
    }
    const rows = await res.json();
    if (week) return json({ week: (rows as unknown[])[0] ?? null });
    return json({ weeks: rows });
  } catch (e) {
    console.error("Supabase pnl fetch error", e);
    return json({ error: "Could not load P&L data." }, 502);
  }
};

// --- POST: upsert one week ---------------------------------------------------
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await requireAuth(request, env))) return json({ error: "Unauthorized" }, 401);
  if (notConfigured(env)) return json({ error: "Supabase is not connected yet." }, 503);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const weekStart = String(body.week_start ?? "");
  if (!isMonday(weekStart)) {
    return json({ error: "week_start must be a Monday (YYYY-MM-DD)." }, 400);
  }

  const row: Record<string, unknown> = {
    week_start: weekStart,
    extra_expenses: cleanExtras(body.extra_expenses),
    note: typeof body.note === "string" ? body.note.slice(0, 2000) : null,
    updated_at: new Date().toISOString(),
  };
  for (const k of NUMERIC_KEYS) row[k] = cleanCents(body[k]);

  try {
    // PostgREST upsert on the unique week_start.
    const res = await fetch(
      `${env.SUPABASE_URL}/rest/v1/pnl_weeks?on_conflict=week_start`,
      {
        method: "POST",
        headers: { ...sbHeaders(env), Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(row),
      }
    );
    if (!res.ok) {
      console.error("Supabase pnl upsert failed", res.status, await res.text());
      return json({ error: "Could not save the week." }, 502);
    }
    const saved = (await res.json()) as unknown[];
    return json({ ok: true, week: saved[0] ?? null });
  } catch (e) {
    console.error("Supabase pnl upsert error", e);
    return json({ error: "Could not save the week." }, 502);
  }
};

// --- DELETE: remove one week -------------------------------------------------
export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await requireAuth(request, env))) return json({ error: "Unauthorized" }, 401);
  if (notConfigured(env)) return json({ error: "Supabase is not connected yet." }, 503);

  const url = new URL(request.url);
  const week = url.searchParams.get("week");
  if (!week || !ISO_RE.test(week)) return json({ error: "Invalid week." }, 400);

  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/pnl_weeks?week_start=eq.${week}`, {
      method: "DELETE",
      headers: { ...sbHeaders(env), Prefer: "return=minimal" },
    });
    if (!res.ok) {
      console.error("Supabase pnl delete failed", res.status, await res.text());
      return json({ error: "Could not delete the week." }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    console.error("Supabase pnl delete error", e);
    return json({ error: "Could not delete the week." }, 502);
  }
};
