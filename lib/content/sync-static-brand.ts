/**
 * Apply brand + logo into static HTML so refresh never flashes old branding.
 */
import fs from "fs";
import path from "path";
import type { SiteContent } from "@/lib/content/types";

const ROOT = process.cwd();
const HTML_TARGETS = [
  path.join(ROOT, "public", "index.htm"),
  path.join(ROOT, "index.htm"),
];

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function resolveBrandName(content: SiteContent): string {
  return (
    content.brand?.displayName ||
    content.seo?.siteName ||
    content.footer?.markaAdi ||
    content.navbar?.logoText ||
    "Fırıncı"
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

export function syncStaticBrand(content: SiteContent): void {
  const logo = content.images?.logo || "";
  const size = Math.max(32, Math.min(120, Number(content.navbar?.logoSize) || 64));
  const hideText = content.navbar?.logoTextGizle !== false;
  const brandName = resolveBrandName(content);
  const shortName = resolveShortName(content);
  const alt = escapeAttr(`${brandName} logosu`);
  const title = content.seo?.title || brandName;
  const siteName = content.seo?.siteName || brandName;

  const logoUrl = logo
    ? logo.startsWith("http") || logo.startsWith("/")
      ? logo
      : `/${logo.replace(/^\//, "")}`
    : "";
  const bust = logoUrl
    ? `${logoUrl}${logoUrl.includes("?") ? "&" : "?"}v=${Date.now().toString().slice(-8)}`
    : "";
  const safeSrc = escapeAttr(bust);

  const navBlock = logoUrl
    ? hideText
      ? `<a class="nav__logo has-logo" href="#top" aria-label="${escapeAttr(brandName)} ana sayfa">
    <img class="nav__logo-img${/\.svg(\?|$)/i.test(logoUrl) ? " is-svg" : ""}" data-site="logo" src="${safeSrc}" alt="${alt}" style="--nav-logo-size:${size}px;height:${size}px;width:auto" decoding="async">
    <svg class="nav__logo-fallback" hidden viewBox="0 0 36 36" width="26" height="26" aria-hidden="true" fill="none">
      <circle cx="18" cy="18" r="10" stroke="currentColor" stroke-width="1.8" opacity=".5"/>
    </svg>
    <span class="nav__logo-text" hidden>${escapeHtml(shortName)}</span>
  </a>`
      : `<a class="nav__logo has-logo" href="#top" aria-label="${escapeAttr(brandName)} ana sayfa">
    <img class="nav__logo-img${/\.svg(\?|$)/i.test(logoUrl) ? " is-svg" : ""}" data-site="logo" src="${safeSrc}" alt="${alt}" style="--nav-logo-size:${size}px;height:${size}px;width:auto" decoding="async">
    <span class="nav__logo-text">${escapeHtml(shortName)}</span>
  </a>`
    : null;

  for (const file of HTML_TARGETS) {
    try {
      if (!fs.existsSync(file)) continue;
      let html = fs.readFileSync(file, "utf8");

      if (navBlock) {
        const navRe = /<a class="nav__logo[^"]*"[\s\S]*?<\/a>/i;
        if (navRe.test(html)) html = html.replace(navRe, navBlock);
      }

      html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
      html = html.replace(
        /(<meta\s+property="og:site_name"\s+content=")[^"]*(")/i,
        `$1${escapeAttr(siteName)}$2`
      );
      html = html.replace(
        /(<meta\s+property="og:title"\s+content=")[^"]*(")/i,
        `$1${escapeAttr(content.seo?.ogTitle || title)}$2`
      );

      // JSON-LD name fields (best-effort)
      html = html.replace(
        /("name"\s*:\s*")Taşdelen Fırıncı(")/g,
        `$1${escapeHtml(brandName).replace(/"/g, '\\"')}$2`
      );
      html = html.replace(
        /("name"\s*:\s*")FIRINCI(")/g,
        `$1${escapeHtml(shortName).replace(/"/g, '\\"')}$2`
      );

      if (logoUrl && /class="foot__mark"/.test(html)) {
        html = html.replace(
          /<img([^>]*class="[^"]*foot__mark[^"]*"[^>]*)>/gi,
          (_m, attrs: string) => {
            let next = attrs;
            if (/\ssrc=/.test(next)) next = next.replace(/\ssrc="[^"]*"/, ` src="${safeSrc}"`);
            else next += ` src="${safeSrc}"`;
            if (!/\salt=/.test(next)) next += ` alt="${alt}"`;
            else next = next.replace(/\salt="[^"]*"/, ` alt="${alt}"`);
            if (!/data-site=/.test(next)) next += ` data-site="logo"`;
            return `<img${next}>`;
          }
        );
      }

      const cache = `20260806prod`;
      html = html.replace(/assets\/css\/style\.css\?v=[^"']+/g, `assets/css/style.css?v=${cache}`);
      html = html.replace(/assets\/js\/site-loader\.js\?v=[^"']+/g, `assets/js/site-loader.js?v=${cache}`);
      html = html.replace(/assets\/js\/cms-ext\.js\?v=[^"']+/g, `assets/js/cms-ext.js?v=${cache}`);

      fs.writeFileSync(file, html, "utf8");
    } catch (err) {
      console.warn("[syncStaticBrand]", file, (err as Error).message);
    }
  }
}
