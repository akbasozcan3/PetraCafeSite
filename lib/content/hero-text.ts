import { safeCssHex } from "@/lib/content/color";

export const HERO_TEXT_KEYS = [
  "mark",
  "slogan",
  "scroll",
  "boot",
  "welcomeEyebrow",
  "welcomeTitle",
  "welcomeLead",
] as const;

export type HeroTextKey = (typeof HERO_TEXT_KEYS)[number];

export type HeroTextStyle = {
  x: number;
  y: number;
  size: number;
  color: string;
  font: "serif" | "sans";
  weight: 400 | 500 | 600 | 700;
  gizle?: boolean;
};

export type HeroTextMap = Partial<Record<HeroTextKey, Partial<HeroTextStyle>>>;

export const HERO_TEXT_LABELS: Record<HeroTextKey, string> = {
  mark: "Marka",
  slogan: "Slogan",
  scroll: "Kaydır ipucu",
  boot: "Yüklenirken",
  welcomeEyebrow: "Karşılama üst etiket",
  welcomeTitle: "Karşılama başlık",
  welcomeLead: "Karşılama alt metin",
};

export const DEFAULT_HERO_TEXT: Record<HeroTextKey, HeroTextStyle> = {
  mark: {
    x: 50,
    y: 16,
    size: 34,
    color: "#E8B84B",
    font: "serif",
    weight: 600,
    gizle: true,
  },
  slogan: {
    x: 50,
    y: 23,
    size: 13,
    color: "#FBF8F1",
    font: "sans",
    weight: 500,
    gizle: true,
  },
  scroll: {
    x: 50,
    y: 90,
    size: 12,
    color: "#FBF8F1",
    font: "sans",
    weight: 600,
  },
  boot: {
    x: 50,
    y: 58,
    size: 14,
    color: "#F3F1EB",
    font: "sans",
    weight: 500,
  },
  welcomeEyebrow: {
    x: 50,
    y: 42,
    size: 12,
    color: "#E8B84B",
    font: "sans",
    weight: 700,
  },
  welcomeTitle: {
    x: 50,
    y: 50,
    size: 36,
    color: "#FFFEFA",
    font: "serif",
    weight: 700,
  },
  welcomeLead: {
    x: 50,
    y: 62,
    size: 16,
    color: "#F4EEE1",
    font: "sans",
    weight: 400,
  },
};

export function clampHeroText(partial?: Partial<HeroTextStyle> | null, fallback?: HeroTextStyle): HeroTextStyle {
  const base = fallback || DEFAULT_HERO_TEXT.mark;
  const s = { ...base, ...(partial || {}) };
  return {
    x: Math.max(4, Math.min(96, Number(s.x) || base.x)),
    y: Math.max(4, Math.min(96, Number(s.y) || base.y)),
    size: Math.max(10, Math.min(96, Number(s.size) || base.size)),
    color: safeCssHex(String(s.color || base.color), base.color),
    font: s.font === "sans" ? "sans" : "serif",
    weight: ([400, 500, 600, 700] as const).includes(s.weight as 400)
      ? (s.weight as 400 | 500 | 600 | 700)
      : base.weight,
    gizle: s.gizle === true,
  };
}

export function resolveHeroTextMap(
  map?: HeroTextMap | null,
  mobile?: HeroTextMap | null,
  isMobile = false
): Record<HeroTextKey, HeroTextStyle> {
  const out = {} as Record<HeroTextKey, HeroTextStyle>;
  for (const key of HERO_TEXT_KEYS) {
    out[key] = clampHeroText(
      {
        ...DEFAULT_HERO_TEXT[key],
        ...(map?.[key] || {}),
        ...(isMobile ? mobile?.[key] || {} : {}),
      },
      DEFAULT_HERO_TEXT[key]
    );
  }
  return out;
}

function fontStack(font: "serif" | "sans") {
  return font === "sans"
    ? 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'
    : '"Playfair Display", Georgia, serif';
}

function typeCss(sel: string, s: HeroTextStyle, maxPx?: number) {
  if (s.gizle) return `${sel}{display:none!important}`;
  const size = maxPx ? Math.min(s.size, maxPx) : s.size;
  return `${sel}{color:${s.color}!important;font-size:${size}px!important;font-weight:${s.weight}!important;font-family:${fontStack(s.font)}!important;}`;
}

function layerCss(sel: string, s: HeroTextStyle) {
  if (s.gizle) return `${sel}{display:none!important}`;
  return `${sel}{
    position:absolute!important;
    left:${s.x}%;
    top:${s.y}%;
    transform:translate(-50%,-50%);
    margin:0;
    color:${s.color};
    font-size:${s.size}px;
    font-weight:${s.weight};
    font-family:${fontStack(s.font)};
    text-align:center;
    max-width:min(90%, 640px);
    z-index:7;
    pointer-events:none;
  }`;
}

export function buildHeroTextCss(desktop?: HeroTextMap | null, mobile?: HeroTextMap | null): string {
  const d = resolveHeroTextMap(desktop, undefined, false);
  const m = resolveHeroTextMap(desktop, mobile, true);
  const overlay = (map: Record<HeroTextKey, HeroTextStyle>, titleMax: number, leadMax: number, eyeMax: number) =>
    [
      layerCss('.gate [data-hero-layer="mark"]', { ...map.mark, gizle: true }),
      layerCss('.gate [data-hero-layer="slogan"]', map.slogan),
      map.scroll.gizle
        ? "#scrollHint.gate__scroll,.gate .gate__scroll{display:none!important}"
        : typeCss(".gate .gate__scroll-text,#scrollHint .gate__scroll-text", map.scroll, 12),
      layerCss(".gate .gate__boot-text", map.boot),
      typeCss(".gate .hero-welcome__eyebrow", map.welcomeEyebrow, eyeMax),
      typeCss(".gate .hero-welcome__title", map.welcomeTitle, titleMax),
      typeCss(".gate .hero-welcome__lead", map.welcomeLead, leadMax),
    ].join("");

  return `
.gate #gateIntro.hero-overlays{position:absolute;inset:0;z-index:6;pointer-events:none}
${overlay(d, 44, 18, 13)}
@media (max-width:860px){${overlay(m, 28, 14, 11)}}
`.replace(/\s+/g, " ");
}
