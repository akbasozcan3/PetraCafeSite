import type { MenuGrup, MenuUrun } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { categoryCover, isDeadLocalMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { getCategorySlug } from "@/lib/catalog/catalog";

export type ResolvedProductImage = {
  url: string;
  alt: string;
  source: "admin" | "integration" | "local" | "fallback";
};

const PLACEHOLDER = SITE_PHOTOS.placeholder;

function isRemote(url: string) {
  return /^https?:\/\//i.test(url);
}

function usableLocal(url?: string | null): string {
  if (!url?.trim()) return "";
  if (isDeadLocalMedia(url)) return "";
  return url;
}

/**
 * Öncelik: ADMIN → INTEGRATION → LOCAL → KATEGORİ KAPAĞI
 */
export function resolveProductImage(
  product: MenuUrun,
  category?: MenuGrup | null
): ResolvedProductImage {
  const alt = product.imageAlt || product.ad || "Ürün görseli";
  const catSlug = category ? getCategorySlug(category) : "";
  const cover = categoryCover(catSlug);

  const primaryGallery = (product.images || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .find((img) => img.isPrimary && img.url?.trim());
  const firstGallery = (product.images || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .find((img) => img.url?.trim());

  const adminUrl =
    (primaryGallery?.source === "admin" && usableLocal(primaryGallery.url)) ||
    (firstGallery?.source === "admin" && usableLocal(firstGallery.url)) ||
    (product.image &&
    (product.image.startsWith("/uploads/") ||
      product.image.includes("blob.vercel-storage.com") ||
      product.image.startsWith("uploads/"))
      ? product.image
      : "") ||
    "";

  if (adminUrl) {
    return { url: resolveMediaUrl(adminUrl), alt, source: "admin" };
  }

  const integrationUrl =
    product.externalImageUrl ||
    (primaryGallery?.source === "integration" && primaryGallery.url) ||
    (firstGallery?.source === "integration" && firstGallery.url) ||
    (product.image && isRemote(product.image) ? product.image : "") ||
    "";

  if (integrationUrl) {
    return { url: resolveMediaUrl(integrationUrl), alt, source: "integration" };
  }

  const localUrl =
    usableLocal(product.image) ||
    usableLocal(firstGallery?.url) ||
    usableLocal(category?.image) ||
    "";

  if (localUrl) {
    return { url: resolveMediaUrl(localUrl), alt, source: "local" };
  }

  return { url: cover || PLACEHOLDER, alt, source: "fallback" };
}

export function productGallery(product: MenuUrun, category?: MenuGrup | null) {
  const primary = resolveProductImage(product, category);
  const extras = (product.images || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((img) => resolveMediaUrl(img.url))
    .filter(Boolean)
    .filter((url) => url !== primary.url);

  const urls = [primary.url, ...extras];
  return { primary, urls: Array.from(new Set(urls)) };
}
