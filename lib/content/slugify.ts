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

export function productHref(slug: string): string {
  const s = String(slug || "").replace(/^\/+|\/+$/g, "");
  return s ? `/urunler/${s}` : "/urunler/urunler";
}

export function categorySlugFromHref(href?: string): string | null {
  if (!href) return null;
  const m = String(href).match(/\/urunler\/([^/?#]+)/i);
  if (!m) return null;
  const slug = m[1];
  if (!slug || slug === "urunler") return null;
  return slug;
}
