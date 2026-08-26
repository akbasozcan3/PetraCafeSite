import type { ReactNode } from "react";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import type { SiteContent } from "@/lib/content/types";
import { withHeroCacheBust } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { themeCssCustomProperties, themeToCssVars } from "@/lib/content/theme";
import ThemeDocument from "@/components/site/ThemeDocument";
import { displayHours } from "@/lib/content/hours";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import HomeHeroScripts from "@/components/home/HomeHeroScripts";
import HomeMotion from "@/components/home/HomeMotion";
import HomeHashScroll from "@/components/home/HomeHashScroll";

/**
 * Ana sayfa kabuğu — sunum sitesi.
 * JS: yalnızca hero/ + HomeMotion (GSAP). Legacy cms-ext/main yok.
 */
export default function HomeShell({
  content,
  children,
  heroPoster,
  heroMobile,
  enableHero = true,
}: {
  content: SiteContent;
  children: ReactNode;
  heroPoster?: string;
  heroMobile?: string;
  enableHero?: boolean;
}) {
  const logo =
    liveMedia(content.images?.logo, SITE_PHOTOS.mark) || SITE_PHOTOS.mark;
  const poster =
    heroPoster ||
    withHeroCacheBust(
      content.images?.heroPoster ||
        content.images?.heroCephe ||
        SITE_PHOTOS.facade
    );
  const mobile =
    heroMobile ||
    withHeroCacheBust(
      content.images?.heroMobile ||
        content.images?.heroPoster ||
        content.images?.heroCephe ||
        SITE_PHOTOS.facade
    );

  return (
    <div className="site-home" style={themeToCssVars(content.theme)}>
      <ThemeDocument vars={themeCssCustomProperties(content.theme)} />
      {/* Google Fonts preconnect — DNS + TLS önceden kurar, LCP iyileştirir */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="/css2.css?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      />
      <link rel="stylesheet" href="/assets/css/style.css?v=20260826v201" />
      <link rel="stylesheet" href="/assets/css/home-next.css?v=20260826v201" />
      <link rel="preload" as="image" href={poster} />
      <link
        rel="preload"
        as="image"
        href={mobile}
        media="(max-width: 860px)"
      />


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
      <main id="icerik">{children}</main>
      <SiteFooter content={content} />

      <HomeHashScroll />
      {enableHero ? (
        <HomeHeroScripts
          boot={{
            images: content.images || {},
            hero: content.hero,
          }}
        />
      ) : null}
      <HomeMotion />
    </div>
  );
}
