import SiteFault from "@/components/site/SiteFault";
import { getPublicContent } from "@/lib/db/content";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default async function NotFound() {
  const content = await getPublicContent().catch(() => null);
  const logo = resolveMediaUrl(content?.images?.logo) || undefined;

  return (
    <SiteFault
      kicker="404"
      title="Sayfa Bulunamadı"
      lead="Ulaşmaya çalıştığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir. Menüyü inceleyebilir veya ana sayfaya dönebilirsiniz."
      primary={{ label: "Ana Sayfaya Dön", href: "/" }}
      secondary={{ label: "Menüyü İncele", href: "/menu" }}
      logoUrl={logo}
    />
  );
}
