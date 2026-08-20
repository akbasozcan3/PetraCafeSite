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
    const searchParams = new URL(request.url).searchParams;
    const kind = searchParams.get("kind") || "reservation";
    const customH = searchParams.get("h");
    const logoHeight = customH ? Number(customH) : Number(content?.images?.smtpLogoHeight || content?.images?.smtpLogoSize || 96);
    const logoUrl = brandLogoAbsoluteUrl(content?.images?.logo);
    const cfg = getSmtpConfig();
    const to = notificationEmail() || content?.iletisim?.eposta || "";
    const from = cfg?.from || "";

    let mail: { html: string; text: string };
    let subject = "";

    if (kind === "contact") {
      mail = buildNotifyEmail({
        kicker: "İletişim",
        title: "Yeni mesaj",
        intro: "Sitedeki iletişim formundan bir yazı geldi.",
        logoUrl,
        logoHeight,
        adminUrl: `${siteBaseUrl()}/admin/mesajlar`,
        rows: [
          { label: "Ad soyad", value: "Örnek Misafir" },
          { label: "Telefon", value: "0530 608 90 51" },
          { label: "E-posta", value: "misafir@example.com" },
        ],
        body: "Merhaba, bu Gmail’de görünecek örnek bir iletişim mesajıdır.",
      });
      subject = "Yeni mesaj — Örnek Misafir";
    } else if (kind === "reservation_confirmed") {
      mail = buildNotifyEmail({
        kicker: "REZERVASYON ONAYI",
        title: "Rezervasyonunuz Onaylandı",
        intro: "Merhaba Ahmet Yılmaz,<br/><br/>20 Ağustos 2026 saat 12:00 için oluşturduğunuz rezervasyon talebiniz onaylanmıştır. Belirtilen saatte masanız sizler için hazır olacaktır.",
        logoUrl,
        logoHeight,
        rows: [
          { label: "Misafir Adı", value: "Ahmet Yılmaz" },
          { label: "Tarih", value: "20 Ağustos 2026" },
          { label: "Saat", value: "12:00" },
          { label: "Kişi Sayısı", value: "4 Kişi" },
          { label: "Durum", value: "✅ Onaylandı" },
          { label: "Not", value: "Pencere kenarı masa hazırlandı." },
        ],
      });
      subject = "Rezervasyonunuz Onaylandı (20 Ağustos 2026 12:00) — Petra Cafe Restaurant";
    } else if (kind === "reservation_rejected") {
      mail = buildNotifyEmail({
        kicker: "REZERVASYON HAKKINDA",
        title: "Rezervasyon Talebiniz",
        intro: "Merhaba Ahmet Yılmaz,<br/><br/>20 Ağustos 2026 saat 12:00 için oluşturduğunuz rezervasyon talebiniz maalesef onaylanamamıştır.",
        logoUrl,
        logoHeight,
        rows: [
          { label: "Misafir Adı", value: "Ahmet Yılmaz" },
          { label: "Tarih", value: "20 Ağustos 2026" },
          { label: "Saat", value: "12:00" },
          { label: "Kişi Sayısı", value: "4 Kişi" },
          { label: "Durum", value: "❌ Onaylanamadı" },
        ],
      });
      subject = "Rezervasyonunuz hakkında — Petra Cafe Restaurant";
    } else {
      mail = buildNotifyEmail({
        kicker: "Rezervasyon",
        title: "Yeni masa talebi",
        intro: "Siteden bir rezervasyon geldi. Telefonla onaylayın.",
        logoUrl,
        logoHeight,
        adminUrl: `${siteBaseUrl()}/admin/rezervasyonlar`,
        rows: [
          { label: "Ad soyad", value: "Örnek Misafir" },
          { label: "Telefon", value: "0530 608 90 51" },
          { label: "E-Posta", value: "misafir@example.com" },
          { label: "Tarih", value: "20.08.2026" },
          { label: "Saat", value: "20:00" },
          { label: "Kişi", value: "4" },
          { label: "Not", value: "Pencere kenarı lütfen." },
        ],
      });
      subject = "Rezervasyon — Örnek Misafir · 20.08.2026 20:00";
    }

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
