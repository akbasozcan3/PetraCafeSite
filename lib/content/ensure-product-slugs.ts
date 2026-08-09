import type { SiteContent } from "@/lib/content/types";
import { categorySlugFromHref, productHref, slugifyTr } from "@/lib/content/slugify";

/** Kategori klasör adları — ürün slug’ı bunlarla çakışmamalı */
export const RESERVED_URUNLER_SLUGS = new Set([
  "urunler",
  "ekmek-cesitleri",
  "eksi-mayali-ekmekler",
  "simit-pogaca-acma",
  "kurabiye-cesitleri",
  "buyuk-kurabiyeler",
  "galeta-cubuk-kokteyl",
  "baklava-serbetli",
  "sutlu-tatlilar",
  "zeytinyagli-urunler",
  "pastalar",
  "tek-pasta-dilim",
  "tartolet-rulo-lezzet-toplari",
  "donut",
  "icecekler",
]);

function uniqueSlug(base: string, used: Set<string>): string {
  let slug = base || "urun";
  if (!used.has(slug)) {
    used.add(slug);
    return slug;
  }
  let i = 2;
  while (used.has(`${base}-${i}`)) i += 1;
  const next = `${base}-${i}`;
  used.add(next);
  return next;
}

function isUsableProductSlug(slug: string | undefined, used: Set<string>): boolean {
  if (!slug) return false;
  if (RESERVED_URUNLER_SLUGS.has(slug)) return false;
  if (used.has(slug)) return false;
  return true;
}

/**
 * Menüdeki tüm ürünlere benzersiz SEO slug atar.
 * Mevcut geçerli slug korunur; kategori klasörleriyle çakışmaz.
 */
export function ensureProductSlugs(content: SiteContent): SiteContent {
  if (!content.menu?.gruplar?.length) return content;

  const used = new Set<string>(RESERVED_URUNLER_SLUGS);

  for (const g of content.menu.gruplar) {
    const cat =
      g.slug ||
      categorySlugFromHref(g.link) ||
      categorySlugFromHref(g.tumLink) ||
      slugifyTr(g.ad);
    if (cat) {
      used.add(cat);
      if (!g.slug) g.slug = cat;
    }
  }

  for (const g of content.menu.gruplar) {
    for (const u of g.urunler || []) {
      if (!u?.ad?.trim()) continue;

      if (isUsableProductSlug(u.slug, used)) {
        used.add(u.slug!);
      } else {
        const base = slugifyTr(u.ad) || "urun";
        u.slug = uniqueSlug(base, used);
      }

      u.link = productHref(u.slug!);
      if (u.aktif === undefined) u.aktif = true;
    }
  }

  return content;
}
