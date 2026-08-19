import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";

export function siteFaviconHref(content?: {
  images?: { favicon?: string; logo?: string } | null;
} | null): string {
  const raw = liveMedia(content?.images?.favicon, SITE_PHOTOS.favicon);
  return resolveMediaUrl(raw) || SITE_PHOTOS.favicon;
}

export function faviconLinkType(href: string): string | undefined {
  if (/\.svg(\?|$)/i.test(href)) return "image/svg+xml";
  if (/\.ico(\?|$)/i.test(href)) return "image/x-icon";
  if (/\.png(\?|$)/i.test(href)) return "image/png";
  return undefined;
}
