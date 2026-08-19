"use client";

import SiteFault from "@/components/site/SiteFault";

export default function Error() {
  return (
    <SiteFault
      kicker="Petra"
      title="Sayfa yüklenemedi"
      lead="Sayfa yenilendi veya bağlantı koptu. Ana sayfadan devam edebilirsiniz."
      primary={{ label: "Ana sayfa", href: "/" }}
      secondary={{ label: "Menü", href: "/menu" }}
    />
  );
}
