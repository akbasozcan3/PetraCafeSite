/** Hex (#RGB / #RRGGBB) → rgba() */
export function hexToRgba(hex: string, alpha = 1): string {
  const raw = String(hex || "").trim();
  const m = raw.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return `rgba(10, 12, 9, ${alpha})`;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = Number.parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const a = Math.min(1, Math.max(0, alpha));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Yalnızca #RGB / #RRGGBB — CMS rengi CSS'e enjekte edilmeden önce. */
export function safeCssHex(value: string, fallback = "#E8B84B"): string {
  const v = String(value || "").trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) return v;
  return fallback;
}

/** Rengin koyu mu açık mı olduğunu algılar (Luminance < 0.55 ise koyu) */
export function isDarkHex(hex: string): boolean {
  const raw = String(hex || "").trim();
  const m = raw.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return true;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = Number.parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.55;
}

