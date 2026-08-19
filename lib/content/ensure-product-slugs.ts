import type { SiteContent } from "@/lib/content/types";
import {
  categoryHref,
  categorySlugFromHref,
  productHref,
  slugifyTr,
} from "@/lib/content/slugify";

/** Kategori klasör adları — ürün slug’ı bunlarla çakışmamalı */
export const RESERVED_URUNLER_SLUGS = new Set([
  "menu",
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
  "kahvalti",
  "menemen-omlet-gozleme",
  "sandvicler",
  "tostlar",
  "makarnalar",
  "pizzalar",
  "salatalar",
  "izgaralar",
  "beyaz-etler",
  "durumler",
  "ekstralar",
  "hamburger",
  "baslangiclar",
  "ana-yemekler",
  "tatlilar",
  "italyan-kokteyller",
  "kahve",
  "soguk-kahveler",
  "milkshakes",
  "bitki-caylari",
  "smoothie",
  "kokteyller",
  "frozen",
  "ev-yapimi-icecekler",
  "nargile",
]);

export function uniqueSlug(base: string, used: Set<string>): string {
  const root = (base || "urun").replace(/^-+|-+$/g, "") || "urun";
  if (!used.has(root)) {
    used.add(root);
    return root;
  }
  let i = 2;
  while (used.has(`${root}-${i}`)) i += 1;
  const next = `${root}-${i}`;
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
 * Kategorilere ve ürünlere benzersiz slug verir; boş adlı tabakları atar.
 */
export function ensureProductSlugs(content: SiteContent): SiteContent {
  if (!content.menu?.gruplar?.length) return content;

  const catUsed = new Set(["menu", "urunler"]);

  for (const g of content.menu.gruplar) {
    const preferred =
      (g.slug && !catUsed.has(g.slug) ? g.slug : "") ||
      categorySlugFromHref(g.link) ||
      categorySlugFromHref(g.tumLink) ||
      slugifyTr(g.ad) ||
      "kategori";
    g.slug = uniqueSlug(preferred, catUsed);
    if (!g.link || g.link === "/menu" || g.link === "/urunler") {
      g.link = categoryHref(g.slug);
    }
    if (!g.tumLink || g.tumLink === "/menu" || g.tumLink === "/urunler") {
      g.tumLink = categoryHref(g.slug);
    }
    if (g.aktif === undefined) g.aktif = true;
    g.urunler = (g.urunler || []).filter((u) => Boolean(u?.ad?.trim()));
  }

  const used = new Set<string>([...RESERVED_URUNLER_SLUGS, ...catUsed]);

  for (const g of content.menu.gruplar) {
    for (const u of g.urunler || []) {
      if (isUsableProductSlug(u.slug, used)) {
        used.add(u.slug!);
      } else {
        u.slug = uniqueSlug(slugifyTr(u.ad) || "urun", used);
      }

      u.link = productHref(u.slug!, g.slug);
      if (u.aktif === undefined) u.aktif = true;
      if (!u.source) u.source = "local";
      if (!u.id) u.id = `p_${u.slug}`;
      const now = new Date().toISOString();
      if (!u.createdAt) u.createdAt = now;
      u.updatedAt = now;
    }
  }

  return content;
}
