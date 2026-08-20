import SiteFault from "@/components/site/SiteFault";
import { getPublicContent } from "@/lib/db/content";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default async function NotFound() {
  const content = await getPublicContent().catch(() => null);
  const logo = resolveMediaUrl(content?.images?.logo) || undefined;

  return (
    <SiteFault
      kicker="404"
      title="Bu kapı burada açılmıyor"
      lead="Aradığınız adres yok veya taşındı. Menüye ya da ana sayfaya dönebilirsiniz."
      primary={{ label: "Ana sayfa", href: "/" }}
      secondary={{ label: "Menü", href: "/menu" }}
      logoUrl={logo}
    />
  );
}
