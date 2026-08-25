import SiteFault from "@/components/site/SiteFault";
import { getPublicContent } from "@/lib/db/content";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default async function NotFound() {
  const content = await getPublicContent().catch(() => null);
  const logo = resolveMediaUrl(content?.images?.logo) || undefined;
  const nf = content?.sayfalar?.notFound;

  return (
    <SiteFault
      kicker={nf?.kicker || "404 · HATALI ADRES"}
      title={nf?.title || "Aradığınız Sayfa Bulunamadı"}
      lead={
        nf?.lead ||
        "Girdiğiniz web adresi hatalı yazılmış, sayfa taşınmış veya geçici olarak yayından kaldırılmış olabilir. Aşağıdaki hızlı bağlantılardan dilediğiniz bölüme geçebilirsiniz."
      }
      primary={{
        label: nf?.primaryLabel || "Ana Sayfaya Dön",
        href: nf?.primaryHref || "/",
      }}
      secondary={{
        label: nf?.secondaryLabel || "Menüyü İncele",
        href: nf?.secondaryHref || "/menu",
      }}
      waLabel={nf?.waLabel || "WhatsApp Destek"}
      showQuickLinks={nf?.showQuickLinks !== false}
      logoUrl={logo}
    />
  );
}
