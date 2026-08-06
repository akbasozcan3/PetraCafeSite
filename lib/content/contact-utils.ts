import type { IletisimContent, SiteContent } from "@/lib/content/types";

/** Digits only, Turkey-friendly: 05xx → 905xx */
export function phoneToWaDigits(raw: string): string {
  let d = String(raw || "").replace(/\D/g, "");
  if (!d) return "";
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

export function buildWhatsappUrl(phoneOrUrl: string, presetText?: string): string {
  const existing = String(phoneOrUrl || "").trim();
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(existing)) {
    const base = existing.split("?")[0];
    if (presetText) return `${base}?text=${encodeURIComponent(presetText)}`;
    return existing;
  }
  const digits = phoneToWaDigits(existing);
  if (!digits) return "";
  const base = `https://wa.me/${digits}`;
  if (presetText) return `${base}?text=${encodeURIComponent(presetText)}`;
  return base;
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
    // Keep URL aligned with handle when handle looks like a username
    if (!/^https?:\/\//i.test(next.instagram)) {
      next.instagramUrl = buildInstagramUrl(next.instagram);
    }
  }

  return next;
}

export function applyIletisimCascade(content: SiteContent): SiteContent {
  if (!content.iletisim) return content;
  const iletisim = cascadeIletisimFields(content.iletisim);
  const digits = phoneToWaDigits(iletisim.telefonHam || iletisim.telefon || "");
  let navbar = content.navbar;
  if (digits && navbar) {
    const telHref = `tel:${iletisim.telefonHam || phoneToTelHref(digits)}`;
    // Sync navbar CTA when it is (or was) a phone link
    if (!navbar.ctaHref || /^tel:/i.test(navbar.ctaHref) || /wa\.me/i.test(navbar.ctaHref)) {
      navbar = {
        ...navbar,
        ctaHref: telHref,
        ctaLabel: iletisim.telefon || navbar.ctaLabel,
      };
    }
  }
  return { ...content, iletisim, navbar };
}
