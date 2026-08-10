import type { MenuGrup, MenuUrun } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export type ResolvedProductImage = {
  url: string;
  alt: string;
  source: "admin" | "integration" | "local" | "fallback";
};

const PLACEHOLDER = "/assets/img/product-placeholder.svg";

function isRemote(url: string) {
  return /^https?:\/\//i.test(url);
}

function isLocalAsset(url: string) {
  return (
    url.startsWith("/assets/") ||
    url.startsWith("assets/") ||
    url.startsWith("/uploads/") ||
    url.startsWith("uploads/")
  );
}

/**
 * Öncelik: ADMIN → INTEGRATION → LOCAL → FALLBACK
 * Fake görsel üretmez; API/admin yoksa placeholder.
 */
export function resolveProductImage(
  product: MenuUrun,
  category?: MenuGrup | null
): ResolvedProductImage {
  const alt = product.imageAlt || product.ad || "Ürün görseli";

  const primaryGallery = (product.images || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .find((img) => img.isPrimary && img.url?.trim());
  const firstGallery = (product.images || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .find((img) => img.url?.trim());

  const adminUrl =
    (primaryGallery?.source === "admin" && primaryGallery.url) ||
    (firstGallery?.source === "admin" && firstGallery.url) ||
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
    (product.image && isLocalAsset(product.image) ? product.image : "") ||
    (firstGallery?.url && isLocalAsset(firstGallery.url) ? firstGallery.url : "") ||
    (category?.image && isLocalAsset(category.image) ? category.image : "") ||
    "";

  if (localUrl) {
    return { url: resolveMediaUrl(localUrl), alt, source: "local" };
  }

  if (product.image) {
    return { url: resolveMediaUrl(product.image), alt, source: "local" };
  }

  if (category?.image) {
    return {
      url: resolveMediaUrl(category.image),
      alt,
      source: "local",
    };
  }

  return { url: PLACEHOLDER, alt, source: "fallback" };
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
