/**
 * Apply brand + logo into static HTML so refresh never flashes old branding.
 * Homepage is now SSR React at `/` — index.htm patches are retired (no-op).
 */
import type { SiteContent } from "@/lib/content/types";

export function resolveBrandName(content: SiteContent): string {
  return (
    content.brand?.displayName ||
    content.seo?.siteName ||
    content.footer?.markaAdi ||
    content.navbar?.logoText ||
    "TAŞDELEN"
  );
}

export function resolveShortName(content: SiteContent): string {
  return content.brand?.shortName || content.navbar?.logoText || resolveBrandName(content);
}

/** Keep related CMS fields in sync when brand changes */
export function cascadeBrandFields(content: SiteContent): SiteContent {
  const name = resolveBrandName(content);
  const shortName = resolveShortName(content);
  return {
    ...content,
    brand: { displayName: name, shortName },
    seo: { ...content.seo, siteName: name },
    footer: { ...content.footer, markaAdi: name },
    navbar: { ...content.navbar, logoText: shortName },
    hero: { ...content.hero, fallbackMark: shortName },
  };
}

export function syncStaticBrand(_content: SiteContent): void {
  // no-op: `/` is Next SSR; do not rewrite public/index.htm
}
