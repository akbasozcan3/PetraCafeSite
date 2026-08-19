import SiteFault from "@/components/site/SiteFault";

export default function NotFound() {
  return (
    <SiteFault
      kicker="404"
      title="Bu kapı burada açılmıyor"
      lead="Aradığınız adres yok veya taşındı. Menüye ya da ana sayfaya dönebilirsiniz."
      primary={{ label: "Ana sayfa", href: "/" }}
      secondary={{ label: "Menü", href: "/menu" }}
    />
  );
}
