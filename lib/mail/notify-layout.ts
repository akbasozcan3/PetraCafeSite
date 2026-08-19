import { siteBaseUrl } from "@/lib/mail/smtp";
import { SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { escapeHtml } from "@/lib/security/html";

export function brandLogoAbsoluteUrl(logoPath?: string | null) {
  let raw = logoPath || SITE_PHOTOS.mark;
  if (/\.(mp4|webm|mov)(\?|$)/i.test(raw)) {
    raw = SITE_PHOTOS.mark;
  }
  if (/^https?:\/\//i.test(raw)) return raw;
  const rel = raw.startsWith("/") ? raw : `/${raw}`;
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
    .filter((r) => r.value && r.value.trim())
    .map(
      (r) =>
        `<tr>
          <td style="padding:13px 0;border-bottom:1px solid #F2ECE0;width:130px;color:#8F8674;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;vertical-align:top;">${escapeHtml(r.label)}</td>
          <td style="padding:13px 0;border-bottom:1px solid #F2ECE0;color:#181B13;font-size:15px;font-weight:600;font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.4;">${escapeHtml(r.value)}</td>
        </tr>`
    )
    .join("");

  const bodyHtml = opts.body?.trim()
    ? `<div style="margin:24px 0 0;padding:18px 20px;background:#FBF9F4;border-left:3px solid #D9A441;border-radius:0 12px 12px 0;">
        <p style="margin:0 0 6px;color:#9E7B30;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;font-family:'Inter',sans-serif;">Mesaj Detayı</p>
        <p style="margin:0;color:#2C2F26;font-size:15px;line-height:1.65;font-family:'Inter',sans-serif;white-space:pre-wrap;">${escapeHtml(opts.body).replace(/\n/g, "<br/>")}</p>
      </div>`
    : "";

  const cta = opts.adminUrl
    ? `<div style="margin:32px 0 0;text-align:center;">
        <a href="${escapeHtml(opts.adminUrl)}" style="display:inline-block;background:#16190F;color:#FBF8F1;border:1px solid #D9A441;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:14px;font-weight:600;font-family:'Inter',system-ui,sans-serif;letter-spacing:0.04em;box-shadow:0 4px 14px rgba(22,25,15,0.15);">Admin Panelinde Aç &rarr;</a>
      </div>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Petra Cafe Restaurant</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, h1, p, a {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F5EFE4;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F5EFE4;padding:40px 14px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="580" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;width:100%;background-color:#FFFFFF;border-radius:20px;overflow:hidden;border:1px solid #E6DCCD;box-shadow:0 12px 40px -10px rgba(22,25,15,0.08);">
          
          <!-- Top Accent Gold Bar -->
          <tr>
            <td height="4" style="background:linear-gradient(90deg, #B8842C 0%, #D9A441 50%, #B8842C 100%);height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Logo Area (Clean White/Ivory Background - No dark header) -->
          <tr>
            <td align="center" style="padding:36px 32px 22px 32px;background-color:#FFFFFF;text-align:center;">
              <a href="${escapeHtml(siteBaseUrl())}" target="_blank" style="text-decoration:none;display:inline-block;">
                <img src="${escapeHtml(opts.logoUrl)}" alt="Petra Cafe Restaurant" height="64" style="display:block;margin:0 auto;height:64px;max-height:64px;width:auto;max-width:240px;object-fit:contain;border:0;outline:none;" />
              </a>
              <div style="margin-top:14px;display:inline-block;padding:4px 14px;background:#F9F5EC;border-radius:999px;border:1px solid #EADBCA;">
                <span style="color:#A1782A;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;font-family:'Inter',sans-serif;display:block;">Petra Cafe &bull; Restaurant &bull; Pool</span>
              </div>
            </td>
          </tr>

          <!-- Thin Decorative Line -->
          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px;background:#EFE6D8;width:100%;"></div>
            </td>
          </tr>

          <!-- Card Content Body -->
          <tr>
            <td style="padding:32px 36px 36px 36px;background-color:#FFFFFF;">
              <p style="margin:0 0 8px;color:#B8842C;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;font-family:'Inter',sans-serif;">${escapeHtml(opts.kicker)}</p>
              <h1 style="margin:0 0 10px;font-size:26px;line-height:1.25;color:#16190F;font-weight:700;font-family:Georgia,'Times New Roman',serif;letter-spacing:-0.01em;">${escapeHtml(opts.title)}</h1>
              ${opts.intro ? `<p style="margin:0 0 24px;color:#666254;font-size:14px;line-height:1.55;font-family:'Inter',sans-serif;">${escapeHtml(opts.intro)}</p>` : `<div style="height:12px;"></div>`}
              
              <!-- Data Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
                ${rowsHtml}
              </table>

              ${bodyHtml}
              ${cta}
            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="padding:22px 32px 24px 32px;background-color:#FAF6EE;border-top:1px solid #ECE3D4;text-align:center;">
              <p style="margin:0 0 6px;color:#16190F;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;">
                Petra Yaşam Merkezi &bull; Çekmeköy / Taşdelen
              </p>
              <p style="margin:0;color:#948C7C;font-size:11px;font-family:'Inter',sans-serif;letter-spacing:0.04em;">
                Dünya Mutfağı &bull; Serpme Kahvaltı &bull; İtalyan Tatlı &amp; Kokteyl &bull; Havuz &amp; Plaj
              </p>
            </td>
          </tr>

        </table>
        
        <!-- Bottom Subtitle -->
        <table role="presentation" width="580" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;width:100%;margin-top:16px;">
          <tr>
            <td align="center" style="color:#A39B8B;font-size:11px;font-family:'Inter',sans-serif;">
              Bu e-posta <a href="${escapeHtml(siteBaseUrl())}" style="color:#8C6A24;text-decoration:none;font-weight:600;">petra-cafe-site.vercel.app</a> üzerinden otomatik gönderilmiştir.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines = [
    `PETRA CAFE RESTAURANT — ${opts.kicker.toUpperCase()}`,
    opts.title,
    "----------------------------------------",
    "",
    ...opts.rows.filter((r) => r.value && r.value.trim()).map((r) => `${r.label}: ${r.value}`),
  ];
  if (opts.body?.trim()) textLines.push("", "MESAJ:", opts.body.trim());
  if (opts.adminUrl) textLines.push("", `Admin Paneli: ${opts.adminUrl}`);
  textLines.push("", "Petra Yaşam Merkezi, Taşdelen · Çekmeköy");
  return { html, text: textLines.join("\n") };
}

