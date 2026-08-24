import type { ReactNode } from "react";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import { getPublicContent } from "@/lib/db/content";
import { themeCssCustomProperties, themeToCssVars } from "@/lib/content/theme";
import ThemeDocument from "@/components/site/ThemeDocument";
import { displayHours } from "@/lib/content/hours";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import HomeMotion from "@/components/home/HomeMotion";

/** Menü, blog ve diğer iç sayfalar — ana sayfa ile aynı kabuk (Hero hariç). */
export default async function SiteShell({
  children,
}: {
  children: ReactNode;
}) {
  const content = await getPublicContent();
  const logo = liveMedia(content.images?.logo, SITE_PHOTOS.mark) || SITE_PHOTOS.mark;

  return (
    <div className="site-home site-shop" style={themeToCssVars(content.theme)}>
      <ThemeDocument vars={themeCssCustomProperties(content.theme)} />
      <link
        rel="stylesheet"
        href="/css2.css?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      />
      <link rel="stylesheet" href="/assets/css/style.css?v=20260819nav9" />
      <link rel="stylesheet" href="/assets/css/home-next.css?v=70" />
      <link rel="stylesheet" href="/assets/css/storefront.css?v=55" />
      <link rel="stylesheet" href="/assets/css/hakkimizda-barber.css?v=2" />

      <SiteNav
        navbar={content.navbar}
        logoUrl={logo}
        homeHref="/"
        hours={displayHours(content.iletisim)}
        phone={content.iletisim?.telefon}
        phoneHref={phoneToTelHref(
          content.iletisim?.telefonHam || content.iletisim?.telefon || ""
        )}
      />

      <div className="site-shop__body">
        <div className="oc-shell wrap">
          <main id="icerik" className="shop-main oc-main">
            {children}
          </main>
        </div>
      </div>

      <SiteFooter content={content} />
      <HomeMotion />
    </div>
  );
}
