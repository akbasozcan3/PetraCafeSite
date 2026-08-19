import { requirePermission } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/api/helpers";
import { getContentAsync } from "@/lib/db/content";
import { getSmtpConfig, notificationEmail, siteBaseUrl } from "@/lib/mail/smtp";
import { brandLogoAbsoluteUrl, buildNotifyEmail } from "@/lib/mail/notify-layout";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requirePermission("settings:password");
    const content = await getContentAsync();
    const kind = new URL(request.url).searchParams.get("kind") === "contact" ? "contact" : "reservation";
    const logoUrl = brandLogoAbsoluteUrl(content?.images?.logo);
    const cfg = getSmtpConfig();
    const to = notificationEmail() || content?.iletisim?.eposta || "";
    const from = cfg?.from || "";

    const mail =
      kind === "contact"
        ? buildNotifyEmail({
            kicker: "İletişim",
            title: "Yeni mesaj",
            intro: "Sitedeki iletişim formundan bir yazı geldi.",
            logoUrl,
            adminUrl: `${siteBaseUrl()}/admin/mesajlar`,
            rows: [
              { label: "Ad soyad", value: "Örnek Misafir" },
              { label: "Telefon", value: "0530 608 90 51" },
              { label: "E-posta", value: "misafir@example.com" },
            ],
            body: "Merhaba, bu Gmail’de görünecek örnek bir iletişim mesajıdır.",
          })
        : buildNotifyEmail({
            kicker: "Rezervasyon",
            title: "Yeni masa talebi",
            intro: "Siteden bir rezervasyon geldi. Telefonla onaylayın.",
            logoUrl,
            adminUrl: `${siteBaseUrl()}/admin/rezervasyonlar`,
            rows: [
              { label: "Ad soyad", value: "Örnek Misafir" },
              { label: "Telefon", value: "0530 608 90 51" },
              { label: "Tarih", value: "20.08.2026" },
              { label: "Saat", value: "20:00" },
              { label: "Kişi", value: "4" },
              { label: "Not", value: "Pencere kenarı lütfen." },
            ],
          });

    const subject =
      kind === "contact"
        ? "Yeni mesaj — Örnek Misafir"
        : "Rezervasyon — Örnek Misafir · 20.08.2026 20:00";

    return jsonResponse({
      kind,
      from,
      to,
      subject,
      html: mail.html,
    });
  } catch {
    return errorResponse("Unauthorized", 401);
  }
}
