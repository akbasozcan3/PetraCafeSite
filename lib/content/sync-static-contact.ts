/**
 * Bake contact links (tel / WhatsApp / Instagram / email) into static HTML.
 */
import fs from "fs";
import path from "path";
import type { SiteContent } from "@/lib/content/types";
import { buildWhatsappUrl, phoneToTelHref, phoneToWaDigits } from "@/lib/content/contact-utils";

const ROOT = process.cwd();
const HTML_TARGETS = [
  path.join(ROOT, "public", "index.htm"),
  path.join(ROOT, "index.htm"),
];

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function syncStaticContact(content: SiteContent): void {
  const c = content.iletisim;
  if (!c) return;

  const displayTel = c.telefon || "";
  const telHref = phoneToTelHref(c.telefonHam || c.telefon || "");
  const waDigits = phoneToWaDigits(c.telefonHam || c.telefon || c.whatsapp || "");
  const waBase = waDigits ? `https://wa.me/${waDigits}` : (c.whatsapp || "").split("?")[0];
  const waOrder = buildWhatsappUrl(c.whatsapp || waDigits, "Merhaba, sipariş vermek istiyorum.");
  const ig = c.instagramUrl || "";
  const igHandle = c.instagram || "";
  const email = c.eposta || "";

  for (const file of HTML_TARGETS) {
    try {
      if (!fs.existsSync(file)) continue;
      let html = fs.readFileSync(file, "utf8");

      if (telHref) {
        html = html.replace(/href="tel:[^"]+"/gi, `href="tel:${escapeAttr(telHref)}"`);
        // nav / mobile CTA visible number
        html = html.replace(
          /(<a[^>]*class="[^"]*nav__cta[^"]*"[^>]*>)[^<]*(<\/a>)/i,
          `$1${escapeHtml(displayTel || telHref)}$2`
        );
        html = html.replace(
          /(<a[^>]*class="[^"]*mobile-menu__cta[^"]*"[^>]*>)[^<]*(<\/a>)/i,
          `$1${escapeHtml(displayTel || telHref)}$2`
        );
      }

      if (waBase) {
        html = html.replace(/https:\/\/wa\.me\/\d+/gi, waBase);
      }
      if (waOrder) {
        html = html.replace(
          /(<a class="wa-float"[^>]*href=")[^"]*(")/i,
          `$1${escapeAttr(waOrder)}$2`
        );
      }

      if (ig) {
        html = html.replace(/https:\/\/www\.instagram\.com\/[^"'/\s]+\/?/gi, ig.replace(/\/?$/, "/"));
      }
      if (igHandle) {
        html = html.replace(
          /(<a[^>]*instagram\.com[^>]*>\s*<b>)[^<]*(<\/b>)/gi,
          `$1${escapeHtml(igHandle)}$2`
        );
      }

      if (email) {
        html = html.replace(/href="mailto:[^"]+"/gi, `href="mailto:${escapeAttr(email)}"`);
        html = html.replace(
          /(mailto:[^"']+">)([^<]*@[^<]*)(<\/a>)/gi,
          `$1${escapeHtml(email)}$3`
        );
        html = html.replace(
          /(<a[^>]*mailto:[^>]*>\s*<b>)[^<]*(<\/b>)/gi,
          `$1${escapeHtml(email)}$2`
        );
      }

      if (displayTel) {
        // contact-lines first phone bold
        html = html.replace(
          /(<a href="tel:[^"]+"[^>]*>\s*<b>)[^<]*(<\/b>)/gi,
          `$1${escapeHtml(displayTel)}$2`
        );
        // corp row phone text
        html = html.replace(
          /(<div class="corp__row"><b>Telefon<\/b><span><a href="tel:[^"]+">)[^<]*(<\/a>)/i,
          `$1${escapeHtml(displayTel)}$2`
        );
        html = html.replace(
          /(<div class="corp__row"><b>WhatsApp<\/b><span><a href="https:\/\/wa\.me\/[^"]+"[^>]*>)[^<]*(<\/a>)/i,
          `$1${escapeHtml(displayTel)}$2`
        );
      }

      fs.writeFileSync(file, html, "utf8");
    } catch (err) {
      console.warn("[syncStaticContact]", file, (err as Error).message);
    }
  }
}
