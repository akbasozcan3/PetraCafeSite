import type { ReactNode } from "react";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import type { SiteContent } from "@/lib/content/types";
import { withHeroCacheBust } from "@/lib/admin/media-url";
import HomeHeroScripts from "@/components/home/HomeHeroScripts";
import HomeMotion from "@/components/home/HomeMotion";

/**
 * Ana sayfa kabuğu — sunum sitesi.
 * JS: yalnızca hero/ + HomeMotion (GSAP). Legacy cms-ext/main yok.
 */
export default function HomeShell({
  content,
  children,
  heroPoster,
  heroMobile,
}: {
  content: SiteContent;
  children: ReactNode;
  heroPoster?: string;
  heroMobile?: string;
}) {
  const logo = content.images?.logo || "/assets/img/logo.webp";
  const poster =
    heroPoster ||
    withHeroCacheBust(
      content.images?.heroPoster ||
        content.images?.heroCephe ||
        "/assets/img/hero-cephe.webp"
    );
  const mobile =
    heroMobile ||
    withHeroCacheBust(
      content.images?.heroMobile ||
        content.images?.heroPoster ||
        content.images?.heroCephe ||
        "/assets/img/hero-mobile.webp"
    );

  return (
    <div className="site-home">
      <link
        rel="stylesheet"
        href="/css2.css?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      />
      <link rel="stylesheet" href="/assets/css/style.css?v=20260817x5" />
      <link rel="stylesheet" href="/assets/css/home-next.css?v=10" />
      <link rel="preload" as="image" href={poster} />
      <link
        rel="preload"
        as="image"
        href={mobile}
        media="(max-width: 860px)"
      />

      <a className="skip" href="#hakkimizda">
        İçeriğe geç
      </a>

      <SiteNav navbar={content.navbar} logoUrl={logo} homeHref="/" />
      <main id="icerik">{children}</main>
      <SiteFooter content={content} />

      <HomeHeroScripts
        boot={{
          images: content.images || {},
          hero: content.hero,
        }}
      />
      <HomeMotion />
    </div>
  );
}
