import SiteFault from "@/components/site/SiteFault";

export default function MenuNotFound() {
  return (
    <SiteFault
      kicker="404"
      title="Bu tabak menüde yok"
      lead="Kategori veya ürün bulunamadı. Güncel menüye dönebilirsiniz."
      primary={{ label: "Menüye dön", href: "/menu" }}
      secondary={{ label: "Ana sayfa", href: "/" }}
    />
  );
}
