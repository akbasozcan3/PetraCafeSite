import type { SiteContent } from "@/lib/content/types";

export function publicOrigin(content?: Pick<SiteContent, "seo"> | null): string {
  const fromEnv = (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    ""
  ).replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const fromSeo = String(content?.seo?.canonicalUrl || "")
    .trim()
    .replace(/\/$/, "");
  if (fromSeo && /^https?:\/\//i.test(fromSeo) && !/firinci/i.test(fromSeo)) {
    return fromSeo;
  }

  const vercel = (process.env.VERCEL_URL || "").replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3010";
}

export function parseOpeningHours(saatler?: string): {
  opens: string;
  closes: string;
} {
  const m = String(saatler || "").match(
    /(\d{1,2})[:.](\d{2})\s*[–\-]\s*(\d{1,2})[:.](\d{2})/
  );
  if (!m) return { opens: "08:00", closes: "24:00" };
  const pad = (h: string, min: string) =>
    `${h.padStart(2, "0")}:${min}`;
  return { opens: pad(m[1], m[2]), closes: pad(m[3], m[4]) };
}

export function parseGeo(koordinat?: string): {
  latitude: number;
  longitude: number;
} | null {
  const m = String(koordinat || "").match(
    /(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/
  );
  if (!m) return null;
  const latitude = Number(m[1]);
  const longitude = Number(m[2]);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  return { latitude, longitude };
}
