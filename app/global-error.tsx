"use client";

import SiteFault from "@/components/site/SiteFault";

export default function GlobalError() {
  return (
    <html lang="tr">
      <body style={{ margin: 0 }}>
        <SiteFault
          kicker="Petra"
          title="Bir şeyler ters gitti"
          lead="Sayfayı yenileyin veya ana sayfaya dönün. Rezervasyon için bizi arayabilirsiniz."
          primary={{
            label: "Yenile",
            onClick: () => {
              if (typeof window !== "undefined") window.location.reload();
            },
          }}
          secondary={{ label: "Ana sayfa", href: "/" }}
        />
      </body>
    </html>
  );
}
