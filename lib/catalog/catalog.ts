import type { MenuGrup, MenuUrun, SiteContent } from "@/lib/content/types";
import {
  categorySlugFromHref,
  productHref,
  slugifyTr,
} from "@/lib/content/slugify";
import { RESERVED_URUNLER_SLUGS } from "@/lib/content/ensure-product-slugs";

export type CatalogProduct = MenuUrun & {
  categorySlug: string;
  categoryName: string;
  category: MenuGrup;
  href: string;
};

export function getCategorySlug(g: MenuGrup): string {
  return (
    g.slug ||
    categorySlugFromHref(g.link) ||
    categorySlugFromHref(g.tumLink) ||
    slugifyTr(g.ad) ||
    "kategori"
  );
}

export function getProductSlug(u: MenuUrun): string {
  if (u.slug && !RESERVED_URUNLER_SLUGS.has(u.slug)) return u.slug;
  const fromLink = String(u.link || "").match(
    /\/(?:urunler|menu)\/(?:[^/]+\/)?([^/?#]+)/i
  );
  if (fromLink?.[1] && !RESERVED_URUNLER_SLUGS.has(fromLink[1])) {
    return fromLink[1];
  }
  return slugifyTr(u.ad) || "urun";
}

export function isProductActive(u: MenuUrun): boolean {
  return u.aktif !== false && Boolean(u.ad?.trim());
}

export function isCategoryActive(g: MenuGrup): boolean {
  return g.aktif !== false && Boolean(g.ad?.trim());
}

export function listCategories(content: SiteContent): MenuGrup[] {
  return (content.menu?.gruplar || []).filter(isCategoryActive);
}

export function findCategory(
  content: SiteContent,
  categorySlug: string
): MenuGrup | null {
  const slug = decodeURIComponent(categorySlug);
  return (
    listCategories(content).find((g) => getCategorySlug(g) === slug) || null
  );
}

export function listProducts(content: SiteContent): CatalogProduct[] {
  const out: CatalogProduct[] = [];
  for (const g of listCategories(content)) {
    const categorySlug = getCategorySlug(g);
    for (const u of g.urunler || []) {
      if (!isProductActive(u)) continue;
      const productSlug = getProductSlug(u);
      out.push({
        ...u,
        slug: productSlug,
        categorySlug,
        categoryName: g.ad,
        category: g,
        href: productHref(productSlug, categorySlug),
      });
    }
  }
  return out;
}

export function findProduct(
  content: SiteContent,
  categorySlug: string,
  productSlug: string
): CatalogProduct | null {
  const cat = findCategory(content, categorySlug);
  if (!cat) return null;
  const pSlug = decodeURIComponent(productSlug);
  const u = (cat.urunler || []).find(
    (x) => isProductActive(x) && getProductSlug(x) === pSlug
  );
  if (!u) return null;
  return {
    ...u,
    slug: getProductSlug(u),
    categorySlug: getCategorySlug(cat),
    categoryName: cat.ad,
    category: cat,
    href: productHref(getProductSlug(u), getCategorySlug(cat)),
  };
}

/** Eski düz URL: /urunler/{productSlug} */
export function findProductBySlugOnly(
  content: SiteContent,
  productSlug: string
): CatalogProduct | null {
  const slug = decodeURIComponent(productSlug);
  return listProducts(content).find((p) => p.slug === slug) || null;
}

export function searchProducts(
  content: SiteContent,
  query: string,
  limit = 24
): CatalogProduct[] {
  const q = query.trim().toLocaleLowerCase("tr-TR");
  if (!q) return [];
  return listProducts(content)
    .filter((p) => {
      const hay = [p.ad, p.aciklama, p.not, p.categoryName, p.kategori]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr-TR");
      return hay.includes(q);
    })
    .slice(0, limit);
}

export function relatedProducts(
  content: SiteContent,
  product: CatalogProduct,
  limit = 6
): CatalogProduct[] {
  return listProducts(content)
    .filter(
      (p) =>
        p.categorySlug === product.categorySlug && p.slug !== product.slug
    )
    .slice(0, limit);
}

export function formatPriceLabel(fiyat?: string): string {
  if (!fiyat?.trim()) return "";
  const t = fiyat.trim();
  if (/tl/i.test(t)) return t;
  return `${t} TL`;
}

export function parsePriceNumber(fiyat?: string): number | null {
  if (!fiyat) return null;
  const n = Number(
    String(fiyat)
      .replace(/[^\d.,]/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
  );
  return Number.isFinite(n) ? n : null;
}
