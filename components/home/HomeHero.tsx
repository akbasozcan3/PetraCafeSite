import type { ReactNode } from "react";
import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl, withHeroCacheBust } from "@/lib/admin/media-url";

function GateCorner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const paths: Record<"tl" | "tr" | "bl" | "br", ReactNode> = {
    tl: (
      <>
        <path
          d="M2 58V8C2 4.7 4.7 2 8 2h50"
          stroke="rgba(232,184,75,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="2" cy="2" r="2" fill="rgba(232,184,75,0.6)" />
        <path
          d="M2 22V8C2 4.7 4.7 2 8 2h14"
          stroke="rgba(232,184,75,0.35)"
          strokeWidth="0.8"
        />
      </>
    ),
    tr: (
      <>
        <path
          d="M58 58V8C58 4.7 55.3 2 52 2H2"
          stroke="rgba(232,184,75,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="58" cy="2" r="2" fill="rgba(232,184,75,0.6)" />
        <path
          d="M58 22V8C58 4.7 55.3 2 52 2H38"
          stroke="rgba(232,184,75,0.35)"
          strokeWidth="0.8"
        />
      </>
    ),
    bl: (
      <>
        <path
          d="M2 2v50c0 3.3 2.7 6 6 6h50"
          stroke="rgba(232,184,75,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="2" cy="58" r="2" fill="rgba(232,184,75,0.5)" />
      </>
    ),
    br: (
      <>
        <path
          d="M58 2v50c0 3.3-2.7 6-6 6H2"
          stroke="rgba(232,184,75,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="58" cy="58" r="2" fill="rgba(232,184,75,0.5)" />
      </>
    ),
  };

  return (
    <div className={`gate__corner gate__corner--${position}`} aria-hidden="true">
      <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
        {paths[position]}
      </svg>
    </div>
  );
}

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
  // Match hero JS / admin: only when explicitly true
  const welcomeOn = hero.welcomeAktif === true;

  return (
    <section className="gate" id="top">
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
          <p className="gate__boot-text">
            {hero.bootText || "Kapı açılıyor"}
          </p>
        </div>
        <canvas id="scene" aria-hidden="true" />
        <div className="gate__fallback" id="fallback" hidden>
          <div className="gate__fallback-inner">
            <div className="gate__mark">{hero.fallbackMark || "FIRINCI"}</div>
            <p>{hero.fallbackTagline || "Taze · Lezzetli · Doğal"}</p>
          </div>
        </div>
        <div className="gate__scroll" id="scrollHint" aria-hidden="true">
          <div className="gate__mouse" aria-hidden="true">
            <i />
          </div>
          <span className="gate__scroll-text">
            {hero.scrollHint || "Aşağı kaydırın"}
          </span>
        </div>

        <div
          className={`hero-welcome${welcomeOn ? "" : " is-off"}`}
          id="heroWelcome"
          data-welcome-aktif={welcomeOn ? "1" : "0"}
          hidden={!welcomeOn}
          aria-hidden={!welcomeOn}
        >
          <p className="hero-welcome__eyebrow" data-hero="welcomeEyebrow">
            {hero.welcomeEyebrow || "Taşdelen Fırıncı"}
          </p>
          <h1 className="hero-welcome__title" data-hero="welcomeTitle">
            {hero.welcomeTitle || "Hoş Geldiniz"}
          </h1>
          <p className="hero-welcome__lead" data-hero="welcomeLead">
            {hero.welcomeLead ||
              "Her gün taze ekmek, sıcak poğaça ve özenle hazırlanan lezzetler."}
          </p>
        </div>

        <GateCorner position="tl" />
        <GateCorner position="tr" />
        <GateCorner position="bl" />
        <GateCorner position="br" />
      </div>
    </section>
  );
}
