import SiteFault from "@/components/site/SiteFault";

export default function MenuNotFound() {
  return (
    <SiteFault
      kicker="404 · ÜRÜN VEYA KATEGORİ BULUNAMADI"
      title="Bu Lezzet Menüde Bulunamadı"
      lead="Aradığınız yemek, tatlı veya içecek menüden kaldırılmış ya da adresi değişmiş olabilir. Tüm güncel çeşitlerimizi menü sayfamızdan inceleyebilirsiniz."
      primary={{ label: "Menüyü İncele", href: "/menu" }}
      secondary={{ label: "Ana Sayfaya Dön", href: "/" }}
      waLabel="Masa & Sipariş Danışın"
    />
  );
}

