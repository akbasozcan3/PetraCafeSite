import type { IletisimContent, SiteContent } from "@/lib/content/types";

/** Digits only, Turkey-friendly: 05xx → 905xx */
export function phoneToWaDigits(raw: string): string {
  let d = String(raw || "").replace(/\D/g, "");
  if (!d) return "";
  // Extract from wa.me / api.whatsapp.com if a full URL was passed
  if (d.length > 15) {
    const m = String(raw).match(/(?:wa\.me\/|phone=)(\d{10,15})/i);
    d = m ? m[1] : d.slice(0, 15);
  }
  if (d.startsWith("0") && d.length === 11) d = "90" + d.slice(1);
  if (d.length === 10 && d.startsWith("5")) d = "90" + d;
  return d;
}

export function phoneToTelHref(raw: string): string {
  const d = phoneToWaDigits(raw);
  if (!d) return "";
  return d.startsWith("90") ? `+${d}` : `+${d}`;
}

export function formatDisplayPhone(raw: string): string {
  const d = phoneToWaDigits(raw);
  if (d.length === 12 && d.startsWith("90")) {
    const local = "0" + d.slice(2);
    return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7, 9)} ${local.slice(9)}`;
  }
  return String(raw || "").trim();
}

/** Form input: only digits, TR 05xx… (max 11). Strips +90. */
export function sanitizePhoneDigits(raw: string, max = 11): string {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.startsWith("90") && d.length >= 12) d = "0" + d.slice(2);
  return d.slice(0, max);
}

export function formatPhoneInput(raw: string): string {
  const d = sanitizePhoneDigits(raw);
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
}

export function isPhoneTypingKey(key: string, withModifier: boolean): boolean {
  if (withModifier) return true;
  if (key.length !== 1) return true;
  return /^\d$/.test(key);
}

export const DEFAULT_WA_TEXT =
  "Merhaba, Petra Yaşam Merkezi web siteniz üzerinden iletişime geçiyorum. Bilgi almak istiyorum.";

export function buildWhatsappUrl(phoneOrUrl: string, presetText?: string): string {
  const digits = phoneToWaDigits(phoneOrUrl || "0530 608 90 51");
  const cleanDigits = digits || "905306089051";
  const text = presetText !== undefined ? presetText : DEFAULT_WA_TEXT;
  if (!text) return `https://wa.me/${cleanDigits}`;
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(text)}`;
}

export function buildInstagramUrl(handleOrUrl: string): string {
  const v = String(handleOrUrl || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v.replace(/\/?$/, "/");
  const user = v.replace(/^@/, "");
  return `https://www.instagram.com/${user}/`;
}

/** Keep WhatsApp / tel / Instagram derived fields in sync */
export function cascadeIletisimFields(iletisim: IletisimContent): IletisimContent {
  const next = { ...iletisim };
  const sourcePhone = next.telefonHam || next.telefon || "";
  const digits = phoneToWaDigits(sourcePhone);

  if (digits) {
    next.telefonHam = phoneToTelHref(sourcePhone);
    if (!next.telefon?.trim()) next.telefon = formatDisplayPhone(sourcePhone);

    const waTextMatch = String(next.whatsapp || "").match(/[?&]text=([^&]*)/);
    let preset = "";
    if (waTextMatch) {
      try {
        preset = decodeURIComponent(waTextMatch[1]);
      } catch {
        preset = "";
      }
    }
    next.whatsapp = buildWhatsappUrl(digits, preset || undefined);
  }

  if (next.instagram && !next.instagramUrl?.trim()) {
    next.instagramUrl = buildInstagramUrl(next.instagram);
  } else if (next.instagramUrl && !next.instagram?.trim()) {
    const m = next.instagramUrl.match(/instagram\.com\/([^/?#]+)/i);
    if (m) next.instagram = `@${m[1]}`;
  } else if (next.instagram) {
    if (!/^https?:\/\//i.test(next.instagram)) {
      next.instagramUrl = buildInstagramUrl(next.instagram);
    }
  }

  return next;
}

export function applyIletisimCascade(content: SiteContent): SiteContent {
  if (!content.iletisim) return content;
  return { ...content, iletisim: cascadeIletisimFields(content.iletisim) };
}
