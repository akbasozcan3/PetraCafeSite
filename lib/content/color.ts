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
