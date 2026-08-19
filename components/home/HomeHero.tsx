import type { SiteContent } from "@/lib/content/types";
import { withHeroCacheBust } from "@/lib/admin/media-url";
import { buildHeroTextCss } from "@/lib/content/hero-text";
import { hexToRgba } from "@/lib/content/color";
import type { CSSProperties } from "react";

export default function HomeHero({ content }: { content: SiteContent }) {
  const hero = content.hero || ({} as SiteContent["hero"]);
  const images = content.images || {};
  const posterSrc = withHeroCacheBust(
    images.heroPoster || images.heroCephe || "/assets/img/hero-cephe.webp"
  );
  const mobileSrc = withHeroCacheBust(
    images.heroMobile ||
      images.heroPoster ||
      images.heroCephe ||
      "/assets/img/hero-mobile.webp"
  );
  const welcomeOn = hero.welcomeAktif === true;
  const welcomeBox = hero.welcomeKutu === true;
  const cardStyle: CSSProperties | undefined = welcomeBox
    ? {
        ["--welcome-card-bg" as string]: hexToRgba(
          hero.welcomeKutuRenk || "#0A0C09",
          (hero.welcomeKutuOpaklik ?? 58) / 100
        ),
        ["--welcome-card-border" as string]: hexToRgba(hero.welcomeKutuKenar || "#E8B84B", 0.45),
      }
    : undefined;

  return (
    <section className="gate" id="top">
      <style dangerouslySetInnerHTML={{ __html: buildHeroTextCss(hero.textStyles, hero.textStylesMobile) }} />
      <div className="gate__stage">
        <picture>
          <source
            media="(max-width: 860px)"
            srcSet={mobileSrc}
            type="image/webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="gate__poster"
            src={posterSrc}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            width={1200}
            height={900}
          />
        </picture>
        <div className="gate__boot" id="gateBoot" role="status" aria-live="polite">
          <div className="gate__boot-spin" aria-hidden="true" />
          <p className="gate__boot-text" data-hero-layer="boot">
            {hero.bootText || "Kapı açılıyor"}
          </p>
        </div>
        <canvas id="scene" aria-hidden="true" />
        <div className="gate__fallback" id="fallback" hidden>
          <div className="gate__fallback-inner">
            <p>{hero.fallbackTagline || "Cafe · Restaurant · Pool & Beach"}</p>
          </div>
        </div>

        <div className="gate__veil" aria-hidden="true" />

        <div className="hero-overlays" id="gateIntro">
          <p className="hero-layer" data-hero-layer="slogan">
            {hero.fallbackTagline || "Cafe · Restaurant · Pool & Beach"}
          </p>
        </div>

        <div className="hero-dock">
          <div
            className={`hero-welcome${welcomeOn ? "" : " is-off"}`}
            id="heroWelcome"
            data-welcome-aktif={welcomeOn ? "1" : "0"}
            hidden={!welcomeOn}
            aria-hidden={!welcomeOn}
          >
            <div
              className={`hero-welcome__card${welcomeBox ? "" : " is-bare"}`}
              style={cardStyle}
            >
              <p className="hero-welcome__eyebrow" data-hero-layer="welcomeEyebrow">
                {hero.welcomeEyebrow || "Çekmeköy · Petra Yaşam Merkezi"}
              </p>
              <h1 className="hero-welcome__title" data-hero-layer="welcomeTitle">
                {hero.welcomeTitle || "Petra Cafe Restaurant"}
              </h1>
              <p className="hero-welcome__lead" data-hero-layer="welcomeLead">
                {hero.welcomeLead ||
                  "Dünya mutfağı, serpme kahvaltı, kahve ve havuz başı."}
              </p>
            </div>
          </div>
        </div>
        <div className="gate__scroll" id="scrollHint" aria-hidden="true">
          <div className="gate__mouse" aria-hidden="true">
            <i />
          </div>
          <span className="gate__scroll-text" data-hero-layer="scroll">
            {hero.scrollHint || "Aşağı kaydırın"}
          </span>
        </div>
      </div>
    </section>
  );
}
