import { siteBaseUrl } from "@/lib/mail/smtp";
import { SITE_PHOTOS, liveMedia } from "@/lib/content/media-fallbacks";
import { escapeHtml } from "@/lib/security/html";

export function brandLogoAbsoluteUrl(logoPath?: string | null) {
  const raw = liveMedia(logoPath, SITE_PHOTOS.mark) || SITE_PHOTOS.mark;
  if (/^https?:\/\//i.test(raw)) return raw;
  const path = raw.startsWith("/uploads/") ? SITE_PHOTOS.mark : raw;
  const rel = path.startsWith("/") ? path : `/${path}`;
  return `${siteBaseUrl()}${rel}`;
}

export type NotifyRow = { label: string; value: string };

export function buildNotifyEmail(opts: {
  kicker: string;
  title: string;
  intro?: string;
  rows: NotifyRow[];
  body?: string;
  adminUrl?: string;
  logoUrl: string;
}) {
  const rowsHtml = opts.rows
    .filter((r) => r.value.trim())
    .map(
      (r) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee8d8;width:140px;color:#8a7d62;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">${escapeHtml(r.label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee8d8;color:#1a1710;font-size:15px;font-weight:600;">${escapeHtml(r.value)}</td>
        </tr>`
    )
    .join("");
  const bodyHtml = opts.body?.trim()
    ? `<p style="margin:18px 0 0;color:#3d382c;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(opts.body).replace(/\n/g, "<br/>")}</p>`
    : "";
  const cta = opts.adminUrl
    ? `<p style="margin:28px 0 0;"><a href="${escapeHtml(opts.adminUrl)}" style="display:inline-block;background:#1a1710;color:#f7f1e4;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:700;">Admin panelinde aç</a></p>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="tr">
<body style="margin:0;padding:0;background:#f4eee1;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4eee1;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;background:#fffdf8;border-radius:18px;overflow:hidden;border:1px solid #eadfca;">
          <tr>
            <td style="background:#16140f;padding:22px 28px;text-align:center;">
              <img src="${escapeHtml(opts.logoUrl)}" alt="Petra Cafe" width="72" height="72" style="display:inline-block;width:72px;height:72px;object-fit:contain;border-radius:50%;background:#1f1c16;" />
              <p style="margin:12px 0 0;color:#d9a441;font-size:11px;letter-spacing:.22em;text-transform:uppercase;">Petra Cafe Restaurant</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 32px;">
              <p style="margin:0;color:#b8842c;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-family:Arial,sans-serif;">${escapeHtml(opts.kicker)}</p>
              <h1 style="margin:8px 0 6px;font-size:26px;line-height:1.2;color:#16140f;font-weight:600;">${escapeHtml(opts.title)}</h1>
              ${opts.intro ? `<p style="margin:0 0 18px;color:#6e6a5c;font-size:14px;font-family:Arial,sans-serif;">${escapeHtml(opts.intro)}</p>` : ""}
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rowsHtml}</table>
              ${bodyHtml}
              ${cta}
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px 20px;background:#f7f1e4;color:#8a7d62;font-size:11px;font-family:Arial,sans-serif;text-align:center;">
              Çekmeköy · Taşdelen · Petra Yaşam Merkezi
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines = [
    `Petra Cafe Restaurant — ${opts.kicker}`,
    opts.title,
    "",
    ...opts.rows.filter((r) => r.value.trim()).map((r) => `${r.label}: ${r.value}`),
  ];
  if (opts.body?.trim()) textLines.push("", opts.body.trim());
  if (opts.adminUrl) textLines.push("", opts.adminUrl);
  return { html, text: textLines.join("\n") };
}
