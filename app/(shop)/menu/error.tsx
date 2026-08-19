"use client";

import SiteFault from "@/components/site/SiteFault";

export default function MenuError() {
  return (
    <SiteFault
      kicker="Menü"
      title="Menü yüklenemedi"
      lead="Liste şu an açılamadı. Ana sayfadan veya menüden devam edebilirsiniz."
      primary={{ label: "Menüye dön", href: "/menu" }}
      secondary={{ label: "Ana sayfa", href: "/" }}
    />
  );
}
