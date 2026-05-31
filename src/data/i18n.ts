// Minimal i18n helpers. We statically generate English at `/` and Spanish at
// `/es/`. Slugs (cities, page paths) are identical across locales — only the
// `/es` prefix differs — so locale detection is a simple pathname check and
// path swapping is mechanical.

export type Lang = "en" | "es";

export const LANGS: Lang[] = ["en", "es"];

/** Returns the locale a request belongs to based on its pathname. */
export function getLang(pathname: string): Lang {
  return /^\/es(\/|$)/.test(pathname) ? "es" : "en";
}

/** Prefixes a path with `/es` when needed. Idempotent. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.replace(/^\/es(?=\/|$)/, "") || "/";
  if (lang === "en") return clean;
  return clean === "/" ? "/es/" : `/es${clean}`;
}

/** Returns the equivalent path in the other language. */
export function altPath(pathname: string, target: Lang): string {
  return localizePath(pathname, target);
}

/** Strip trailing slash for cleaner alternates (but keep root "/"). */
export function normalizePath(pathname: string): string {
  if (pathname === "/" || pathname === "/es/") return pathname;
  return pathname.replace(/\/$/, "");
}
