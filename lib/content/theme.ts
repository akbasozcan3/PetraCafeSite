import type { CSSProperties } from "react";
import type { ThemeContent } from "./types";

export const DEFAULT_THEME: ThemeContent = {
  ink: "#0D0F0A",
  paper: "#FBF8F1",
  cream: "#F4EEE1",
  cream2: "#EAE1CE",
  muted: "#5C5749",
  brass: "#D9A441",
  brassLo: "#B8842C",
  char: "#12150E",
  char2: "#1E2417",
  olive: "#7C8B4F",
  navSolidBg: "#FBF8F1",
  navSolidText: "#0D0F0A",
  navHeroText: "#FBF8F1",
  ctaBg: "#B8842C",
  ctaText: "#FFFFFF",
  footerBg: "#12150E",
  footerText: "#F4EEE1",
};

export const THEME_PRESETS: { id: string; label: string; hint: string; theme: ThemeContent }[] = [
  {
    id: "petra",
    label: "Petra Gold",
    hint: "Krem zemin, lüks altın ve koyu yazı",
    theme: DEFAULT_THEME,
  },
  {
    id: "midnight",
    label: "Gece (Dark Mode)",
    hint: "Koyu zemin, parlak altın ve beyaz yazı",
    theme: {
      ink: "#F4EEE1",
      paper: "#0D0F0A",
      cream: "#16190F",
      cream2: "#1F2416",
      muted: "#A8A294",
      brass: "#D9A441",
      brassLo: "#B8842C",
      char: "#0A0C08",
      char2: "#16190F",
      olive: "#8FA05A",
      navSolidBg: "#0D0F0A",
      navSolidText: "#F4EEE1",
      navHeroText: "#FBF8F1",
      ctaBg: "#D9A441",
      ctaText: "#0D0F0A",
      footerBg: "#060805",
      footerText: "#F4EEE1",
    },
  },
  {
    id: "olive",
    label: "Zeytin Bahçesi",
    hint: "Doğal zeytin yeşili, krem ve net tipografi",
    theme: {
      ink: "#12170D",
      paper: "#F4F1E6",
      cream: "#E7E3D2",
      cream2: "#D8D2BC",
      muted: "#4A523E",
      brass: "#7C8B4F",
      brassLo: "#5A6838",
      char: "#182010",
      char2: "#26301A",
      olive: "#7C8B4F",
      navSolidBg: "#F4F1E6",
      navSolidText: "#12170D",
      navHeroText: "#F4F1E6",
      ctaBg: "#5A6838",
      ctaText: "#FFFFFF",
      footerBg: "#141A0E",
      footerText: "#E7E3D2",
    },
  },
  {
    id: "terracotta",
    label: "Sıcak Terracotta",
    hint: "Sıcak bakır kahve, sıcak bej zemin",
    theme: {
      ink: "#1A100B",
      paper: "#FBF4ED",
      cream: "#F2E4D6",
      cream2: "#E6D2BF",
      muted: "#665042",
      brass: "#C8703A",
      brassLo: "#A85A2C",
      char: "#1C120D",
      char2: "#2A1C15",
      olive: "#8B6B4F",
      navSolidBg: "#FBF4ED",
      navSolidText: "#1A100B",
      navHeroText: "#FBF4ED",
      ctaBg: "#A85A2C",
      ctaText: "#FFFFFF",
      footerBg: "#170E0A",
      footerText: "#F2E4D6",
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

function getLuminance(hex: string): number {
  const raw = String(hex || "").replace("#", "").trim();
  if (raw.length < 6) return 0.9;
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
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
  const isDark = getLuminance(t.paper) < 0.45;

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
    ["--line" as string]: `rgba(${inkRgb}, 0.14)`,
    ["--line-d" as string]: `rgba(${creamRgb}, 0.16)`,
    ["--nav-solid-bg" as string]: t.navSolidBg,
    ["--nav-solid-text" as string]: t.navSolidText,
    ["--nav-hero-text" as string]: t.navHeroText,
    ["--cta-bg" as string]: t.ctaBg,
    ["--cta-text" as string]: t.ctaText,
    ["--footer-bg" as string]: t.footerBg,
    ["--footer-text" as string]: t.footerText,
    // Akıllı Kontrast Kart & Form Değişkenleri
    ["--card-bg" as string]: isDark ? "#141810" : "#FFFFFF",
    ["--card-border" as string]: isDark ? "rgba(217, 164, 65, 0.3)" : "rgba(184, 132, 44, 0.25)",
    ["--card-text" as string]: isDark ? "#F4EEE1" : "#0D0F0A",
    ["--card-muted" as string]: isDark ? "#A8A294" : "#5C5749",
    ["--input-bg" as string]: isDark ? "#0E120A" : "#FFFFFF",
    ["--input-border" as string]: isDark ? "rgba(217, 164, 65, 0.35)" : "rgba(13, 15, 10, 0.15)",
    ["--input-text" as string]: isDark ? "#F4EEE1" : "#0D0F0A",
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


