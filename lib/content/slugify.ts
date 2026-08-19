/** Türkçe karakterleri ASCII’ye çevirip URL slug üretir. */
export function slugifyTr(input: string): string {
  return String(input || "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const MENU_ROOT = "/menu";
const LEGACY_ROOT = "/urunler";

/** Eski /urunler bağlantılarını /menu altına taşır. */
export function toMenuPath(href?: string): string {
  if (!href) return MENU_ROOT;
  return String(href).replace(/\/urunler(?=\/|$)/gi, MENU_ROOT);
}

/** /menu/[categorySlug]/[productSlug] — categorySlug yoksa düz URL */
export function productHref(slug: string, categorySlug?: string): string {
  const s = String(slug || "").replace(/^\/+|\/+$/g, "");
  if (!s) return MENU_ROOT;
  const cat = String(categorySlug || "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^(urunler|menu)$/i, "");
  if (cat) return `${MENU_ROOT}/${cat}/${s}`;
  return `${MENU_ROOT}/${s}`;
}

export function categoryHref(categorySlug: string): string {
  const cat = String(categorySlug || "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^(urunler|menu)$/i, "");
  return cat ? `${MENU_ROOT}/${cat}` : MENU_ROOT;
}

export function categorySlugFromHref(href?: string): string | null {
  if (!href) return null;
  const nested = String(href).match(/\/(?:urunler|menu)\/([^/?#]+)\/[^/?#]+/i);
  if (nested?.[1] && !/^(urunler|menu)$/i.test(nested[1])) return nested[1];
  const m = String(href).match(/\/(?:urunler|menu)\/([^/?#]+)/i);
  if (!m) return null;
  const slug = m[1];
  if (!slug || /^(urunler|menu)$/i.test(slug)) return null;
  return slug;
}

export { MENU_ROOT, LEGACY_ROOT };
