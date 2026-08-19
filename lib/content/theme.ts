import type { CSSProperties } from "react";
import type { ThemeContent } from "./types";

export const DEFAULT_THEME: ThemeContent = {
  ink: "#0D0F0A",
  paper: "#FBF8F1",
  cream: "#F4EEE1",
  cream2: "#EAE1CE",
  muted: "#6E6A5C",
  brass: "#D9A441",
  brassLo: "#B8842C",
  char: "#16190F",
  char2: "#1F2416",
  olive: "#7C8B4F",
  navSolidBg: "#FBF8F1",
  navSolidText: "#0D0F0A",
  navHeroText: "#FBF8F1",
  ctaBg: "#D9A441",
  ctaText: "#0D0F0A",
  footerBg: "#16190F",
  footerText: "#F4EEE1",
};

export const THEME_PRESETS: { id: string; label: string; hint: string; theme: ThemeContent }[] = [
  {
    id: "petra",
    label: "Petra Gold",
    hint: "Krem zemin, pirinç vurgu",
    theme: DEFAULT_THEME,
  },
  {
    id: "midnight",
    label: "Gece",
    hint: "Koyu zemin, altın yazı",
    theme: {
      ink: "#F4EEE1",
      paper: "#12140E",
      cream: "#1A1E14",
      cream2: "#24281C",
      muted: "#A39A86",
      brass: "#D9A441",
      brassLo: "#B8842C",
      char: "#0A0C08",
      char2: "#16190F",
      olive: "#8FA05A",
      navSolidBg: "#12140E",
      navSolidText: "#F4EEE1",
      navHeroText: "#FBF8F1",
      ctaBg: "#D9A441",
      ctaText: "#0D0F0A",
      footerBg: "#0A0C08",
      footerText: "#F4EEE1",
    },
  },
  {
    id: "olive",
    label: "Zeytin",
    hint: "Yeşil-altın, doğal",
    theme: {
      ink: "#14180F",
      paper: "#F3F0E4",
      cream: "#E8E4D2",
      cream2: "#D9D3BB",
      muted: "#5F6454",
      brass: "#7C8B4F",
      brassLo: "#5A6838",
      char: "#1A2212",
      char2: "#2A3320",
      olive: "#7C8B4F",
      navSolidBg: "#F3F0E4",
      navSolidText: "#14180F",
      navHeroText: "#F4EEE1",
      ctaBg: "#5A6838",
      ctaText: "#F4EEE1",
      footerBg: "#1A2212",
      footerText: "#E8E4D2",
    },
  },
  {
    id: "terracotta",
    label: "Terracotta",
    hint: "Sıcak bakır, cafe",
    theme: {
      ink: "#1A120E",
      paper: "#FBF4EC",
      cream: "#F3E6D8",
      cream2: "#E8D4C0",
      muted: "#7A6558",
      brass: "#C8703A",
      brassLo: "#A85A2C",
      char: "#1F1612",
      char2: "#2C211C",
      olive: "#8B6B4F",
      navSolidBg: "#FBF4EC",
      navSolidText: "#1A120E",
      navHeroText: "#FBF4EC",
      ctaBg: "#C8703A",
      ctaText: "#FFF8F2",
      footerBg: "#1F1612",
      footerText: "#F3E6D8",
    },
  },
];

function hexRgb(hex: string): string {
  const raw = String(hex || "").replace("#", "").trim();
  const h =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw.slice(0, 6);
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return "13, 15, 10";
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function resolveTheme(theme?: Partial<ThemeContent> | null): ThemeContent {
  return { ...DEFAULT_THEME, ...(theme || {}) };
}

export function themeToCssVars(
  theme?: Partial<ThemeContent> | null
): CSSProperties {
  const t = resolveTheme(theme);
  const inkRgb = hexRgb(t.ink);
  const creamRgb = hexRgb(t.cream);
  return {
    ["--ink" as string]: t.ink,
    ["--paper" as string]: t.paper,
    ["--cream" as string]: t.cream,
    ["--cream-2" as string]: t.cream2,
    ["--muted" as string]: t.muted,
    ["--brass" as string]: t.brass,
    ["--brass-lo" as string]: t.brassLo,
    ["--char" as string]: t.char,
    ["--char-2" as string]: t.char2,
    ["--olive" as string]: t.olive,
    ["--olive-lo" as string]: t.olive,
    ["--crust" as string]: t.brassLo,
    ["--line" as string]: `rgba(${inkRgb}, 0.12)`,
    ["--line-d" as string]: `rgba(${creamRgb}, 0.14)`,
    ["--nav-solid-bg" as string]: t.navSolidBg,
    ["--nav-solid-text" as string]: t.navSolidText,
    ["--nav-hero-text" as string]: t.navHeroText,
    ["--cta-bg" as string]: t.ctaBg,
    ["--cta-text" as string]: t.ctaText,
    ["--footer-bg" as string]: t.footerBg,
    ["--footer-text" as string]: t.footerText,
    background: t.paper,
    color: t.ink,
  } as CSSProperties;
}

export function themeCssCustomProperties(
  theme?: Partial<ThemeContent> | null
): Record<string, string> {
  const style = themeToCssVars(theme);
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(style)) {
    if (key.startsWith("--") && typeof value === "string") out[key] = value;
  }
  return out;
}
