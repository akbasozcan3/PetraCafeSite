/** Site-wide link resolver for nav/footer/CMS hrefs */
export function resolveHref(href: string): string {
  if (!href) return "#";
  if (/^(https?:|tel:|mailto:|whatsapp:)/i.test(href)) return href;
  if (href.startsWith("#")) return `/${href}`;
  if (href.startsWith("/")) {
    if (/^\/index\.htm/i.test(href)) {
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      return hash ? `/${hash}` : "/";
    }
    if (/^\/blog\/blog\/?$/i.test(href)) return "/blog";
    return href;
  }
  if (/^index\.htm/i.test(href)) {
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    return hash ? `/${hash}` : "/";
  }
  if (/^(urunler|blog|assets|uploads)\//i.test(href)) {
    return `/${href.replace(/^\//, "")}`;
  }
  return `/${href.replace(/^\//, "")}`;
}
