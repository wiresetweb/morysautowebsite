// Profit & Loss — shared domain logic for the staff dashboard.
// Pure functions, no DOM, no deps. Imported by the entry page, the history
// page, and the CSV exporter so every derived number is computed one way.
//
// Money is handled in integer CENTS everywhere to avoid floating-point drift.

/** eBay COGS is estimated at 65% of eBay gross sales (a 35% margin). */
export const EBAY_COGS_RATE = 0.65;

export type ExpenseKind = "fixed" | "variable";

export interface ExtraExpense {
  name: string;
  kind: ExpenseKind;
  amount_cents: number;
}

/** A stored week = raw inputs only. Everything else is derived in `compute`. */
export interface PnlWeek {
  week_start: string; // YYYY-MM-DD, always a Monday
  // Revenue
  salesman_revenue_cents: number;
  ebay_gross_cents: number;
  misc_income_cents: number;
  // COGS inputs (eBay COGS is derived, never stored)
  salesman_cogs_cents: number;
  shop_supplies_cents: number;
  // Fixed operating expenses
  rent_cents: number;
  insurance_cents: number;
  sba_loan_cents: number;
  salaries_cents: number;
  phone_internet_cents: number;
  quickbooks_cents: number;
  accounting_cents: number;
  // Variable operating expenses
  power_cents: number;
  vehicle_gas_cents: number;
  shop_car_parts_cents: number;
  forklift_tank_cents: number;
  fire_equipment_cents: number;
  maintenance_repairs_cents: number;
  // Dynamic, user-defined extras
  extra_expenses: ExtraExpense[];
  note?: string;
}

export interface FieldDef {
  key: keyof PnlWeek & string;
  label: string;
}

// Field metadata drives the form and the history table from one place.
export const REVENUE_FIELDS: FieldDef[] = [
  { key: "salesman_revenue_cents", label: "Salesman (shop parts & labor)" },
  { key: "ebay_gross_cents", label: "eBay gross sales" },
  { key: "misc_income_cents", label: "Miscellaneous income" },
];

export const COGS_INPUT_FIELDS: FieldDef[] = [
  { key: "salesman_cogs_cents", label: "Salesman job costs (actual parts)" },
  { key: "shop_supplies_cents", label: "Shop supplies & materials" },
];

export const FIXED_FIELDS: FieldDef[] = [
  { key: "rent_cents", label: "Rent" },
  { key: "insurance_cents", label: "Insurance" },
  { key: "sba_loan_cents", label: "SBA loan" },
  { key: "salaries_cents", label: "Employee salaries" },
  { key: "phone_internet_cents", label: "Phone & internet" },
  { key: "quickbooks_cents", label: "QuickBooks" },
  { key: "accounting_cents", label: "Accounting" },
];

export const VARIABLE_FIELDS: FieldDef[] = [
  { key: "power_cents", label: "Power" },
  { key: "vehicle_gas_cents", label: "Vehicle gas" },
  { key: "shop_car_parts_cents", label: "Car parts (shop use)" },
  { key: "forklift_tank_cents", label: "Forklift tank" },
  { key: "fire_equipment_cents", label: "Fire equipment" },
  { key: "maintenance_repairs_cents", label: "Maintenance & repairs" },
];

/** Every numeric input key (used for validation + zeroing a blank week). */
export const NUMERIC_KEYS: string[] = [
  ...REVENUE_FIELDS,
  ...COGS_INPUT_FIELDS,
  ...FIXED_FIELDS,
  ...VARIABLE_FIELDS,
].map((f) => f.key);

export function emptyWeek(week_start = ""): PnlWeek {
  const w = { week_start, extra_expenses: [] as ExtraExpense[], note: "" } as Record<string, unknown>;
  for (const k of NUMERIC_KEYS) w[k] = 0;
  return w as unknown as PnlWeek;
}

export interface PnlTotals {
  totalRevenue: number;
  ebayCogs: number;
  totalCogs: number;
  grossProfit: number;
  grossMargin: number; // ratio 0..1 (0 when no revenue)
  totalFixed: number;
  totalVariable: number;
  totalOpex: number;
  netProfit: number;
  netMargin: number; // ratio
}

const n = (v: unknown): number => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

const sumFields = (w: PnlWeek, fields: FieldDef[]): number =>
  fields.reduce((t, f) => t + n((w as Record<string, unknown>)[f.key]), 0);

const sumExtras = (w: PnlWeek, kind: ExpenseKind): number =>
  (w.extra_expenses || [])
    .filter((e) => e.kind === kind)
    .reduce((t, e) => t + n(e.amount_cents), 0);

/** All derived numbers for one week. */
export function compute(w: PnlWeek): PnlTotals {
  const totalRevenue = sumFields(w, REVENUE_FIELDS);
  const ebayCogs = Math.round(n(w.ebay_gross_cents) * EBAY_COGS_RATE);
  const totalCogs = sumFields(w, COGS_INPUT_FIELDS) + ebayCogs;
  const grossProfit = totalRevenue - totalCogs;
  const totalFixed = sumFields(w, FIXED_FIELDS) + sumExtras(w, "fixed");
  const totalVariable = sumFields(w, VARIABLE_FIELDS) + sumExtras(w, "variable");
  const totalOpex = totalFixed + totalVariable;
  const netProfit = grossProfit - totalOpex;
  return {
    totalRevenue,
    ebayCogs,
    totalCogs,
    grossProfit,
    grossMargin: totalRevenue ? grossProfit / totalRevenue : 0,
    totalFixed,
    totalVariable,
    totalOpex,
    netProfit,
    netMargin: totalRevenue ? netProfit / totalRevenue : 0,
  };
}

// --- A flat list of display lines for the history table + CSV ----------------
// Extras are dynamic and handled by the page; these are the fixed lines.

export interface LineRow {
  id: string;
  label: string;
  group: "revenue" | "cogs" | "opex" | "result";
  format: "money" | "pct";
  /** true → an increase is favorable (revenue, profit); false → unfavorable. */
  goodWhenUp: boolean;
  emphasis?: boolean; // subtotal / bold row
  estimate?: boolean; // the eBay COGS estimate (rendered in italic gold)
  value: (w: PnlWeek, t: PnlTotals) => number;
}

const field = (f: FieldDef, goodWhenUp: boolean, group: LineRow["group"]): LineRow => ({
  id: f.key,
  label: f.label,
  group,
  format: "money",
  goodWhenUp,
  value: (w) => n((w as Record<string, unknown>)[f.key]),
});

/** Rows up to (and excluding) the dynamic extras + opex total. */
export const LINE_ROWS_BEFORE_EXTRAS: LineRow[] = [
  ...REVENUE_FIELDS.map((f) => field(f, true, "revenue")),
  { id: "total_revenue", label: "Total revenue", group: "revenue", format: "money", goodWhenUp: true, emphasis: true, value: (_w, t) => t.totalRevenue },
  ...COGS_INPUT_FIELDS.map((f) => field(f, false, "cogs")),
  { id: "ebay_cogs", label: "eBay COGS (est. 65%)", group: "cogs", format: "money", goodWhenUp: false, estimate: true, value: (_w, t) => t.ebayCogs },
  { id: "total_cogs", label: "Total COGS", group: "cogs", format: "money", goodWhenUp: false, emphasis: true, value: (_w, t) => t.totalCogs },
  { id: "gross_profit", label: "Gross profit", group: "result", format: "money", goodWhenUp: true, emphasis: true, value: (_w, t) => t.grossProfit },
  { id: "gross_margin", label: "Gross margin", group: "result", format: "pct", goodWhenUp: true, value: (_w, t) => t.grossMargin },
  ...FIXED_FIELDS.map((f) => field(f, false, "opex")),
  ...VARIABLE_FIELDS.map((f) => field(f, false, "opex")),
];

/** Rows after the dynamic extras. */
export const LINE_ROWS_AFTER_EXTRAS: LineRow[] = [
  { id: "total_opex", label: "Total operating expenses", group: "opex", format: "money", goodWhenUp: false, emphasis: true, value: (_w, t) => t.totalOpex },
  { id: "net_profit", label: "Net profit", group: "result", format: "money", goodWhenUp: true, emphasis: true, value: (_w, t) => t.netProfit },
  { id: "net_margin", label: "Net margin", group: "result", format: "pct", goodWhenUp: true, value: (_w, t) => t.netMargin },
];

// --- Formatting --------------------------------------------------------------

export function centsToInput(c: number): string {
  return (n(c) / 100).toFixed(2);
}

export function dollarsToCents(v: string | number): number {
  const num = typeof v === "number" ? v : parseFloat(String(v).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(num) ? Math.round(num * 100) : 0;
}

export function fmtMoney(c: number): string {
  return (n(c) / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function fmtSignedMoney(c: number): string {
  const s = fmtMoney(Math.abs(c));
  return c > 0 ? `+${s}` : c < 0 ? `-${s}` : s;
}

export function fmtPct(ratio: number): string {
  return `${(n(ratio) * 100).toFixed(1)}%`;
}

// --- Week / date helpers (Monday-based, UTC to keep dates stable) -------------

export function isIsoDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(`${s}T00:00:00Z`).getTime());
}

export function mondayOfIso(iso: string): string {
  if (!isIsoDate(iso)) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  const day = d.getUTCDay(); // 0 Sun .. 6 Sat
  d.setUTCDate(d.getUTCDate() + (day === 0 ? -6 : 1 - day));
  return d.toISOString().slice(0, 10);
}

export function isMonday(iso: string): boolean {
  return isIsoDate(iso) && new Date(`${iso}T00:00:00Z`).getUTCDay() === 1;
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function currentMonday(): string {
  return mondayOfIso(todayIso());
}

/** "Mon, Jun 1 – Sun, Jun 7, 2026" for a given week-start. */
export function weekRangeLabel(weekStart: string): string {
  if (!isIsoDate(weekStart)) return "";
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", timeZone: "UTC" };
  const start = new Date(`${weekStart}T00:00:00Z`);
  const end = new Date(`${addDaysIso(weekStart, 6)}T00:00:00Z`);
  const y = end.getUTCFullYear();
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}, ${y}`;
}
