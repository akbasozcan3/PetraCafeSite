/** Site-wide link resolver for nav/footer/CMS hrefs */
export function resolveHref(href: string): string {
  if (!href) return "#";
  if (/^(https?:|tel:|mailto:|whatsapp:)/i.test(href)) return href;
  if (href === "#menu" || href === "/#menu") return "/menu";
  if (href.startsWith("#")) return `/${href}`;
  if (href.startsWith("/")) {
    if (/^\/(sepet|favoriler|checkout|hesabim)(\/|$)/i.test(href)) return "/menu";
    if (/^\/index\.htm/i.test(href)) {
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      return hash ? `/${hash}` : "/";
    }
    if (/^\/blog\/blog\/?$/i.test(href)) return "/blog";
    if (/^\/urunler(\/|$)/i.test(href)) {
      return href.replace(/^\/urunler/i, "/menu");
    }
    return href;
  }
  if (/^index\.htm/i.test(href)) {
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    return hash ? `/${hash}` : "/";
  }
  if (/^(urunler|menu|blog|assets|uploads)\//i.test(href)) {
    const path = `/${href.replace(/^\//, "")}`;
    return path.replace(/^\/urunler/i, "/menu");
  }
  return `/${href.replace(/^\//, "")}`;
}
