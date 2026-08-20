import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse } from "@/lib/api/helpers";
import { getSmtpConfigAsync, notificationEmail, testSmtpConnection } from "@/lib/mail/smtp";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("settings:password");
    const cfg = await getSmtpConfigAsync();
    return jsonResponse({
      configured: Boolean(cfg),
      host: cfg?.host || "",
      from: cfg?.from || "",
      user: cfg?.user || "",
      port: cfg?.port || null,
      to: notificationEmail() || null,
    });
  } catch {
    return errorResponse("Unauthorized", 401);
  }
}

export async function PUT(request: Request) {
  try {
    await requirePermission("settings:password");
    assertSameOrigin(request);
    const body = await request.json();
    const { host, port, user, pass, from, notifyTo } = body || {};

    if (!host || !user) {
      return errorResponse("Host ve Kullanıcı Adı (E-Posta) zorunludur.", 400);
    }

    const { setAppSetting } = await import("@/lib/db/settings");
    await setAppSetting(
      "integration_smtp_config",
      JSON.stringify({
        host: host.trim(),
        port: Number(port || 587),
        user: user.trim(),
        pass: pass ? pass.trim() : "",
        from: from ? from.trim() : user.trim(),
        secure: Number(port) === 465,
        notifyTo: notifyTo ? notifyTo.trim() : "",
      })
    );

    return jsonResponse({ success: true, message: "SMTP E-posta ayarları başarıyla kaydedildi." });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "SMTP ayarları kaydedilemedi.", 500);
  }
}

export async function POST(request: Request) {
  try {
    await requirePermission("settings:password");
    assertSameOrigin(request);
    let body: any = {};
    try {
      body = await request.json();
    } catch {}

    const { kind } = body || {};

    const { getSmtpConfigAsync, notificationEmail, sendMail } = await import("@/lib/mail/smtp");
    const cfg = await getSmtpConfigAsync();
    if (!cfg) {
      return errorResponse("SMTP ayarları henüz girilmemiş. Lütfen formu doldurup kaydedin.", 400);
    }

    const { getContentAsync } = await import("@/lib/db/content");
    const content = await getContentAsync();
    const { brandLogoAbsoluteUrl, buildNotifyEmail } = await import("@/lib/mail/notify-layout");
    const logoHeight = Number(content?.images?.smtpLogoHeight || content?.images?.smtpLogoSize || 120);
    const logoUrl = brandLogoAbsoluteUrl(content?.images?.logo);

    const to = notificationEmail() || cfg.user;

    let mail: { html: string; text: string };
    let subject = "";

    if (kind === "contact") {
      mail = buildNotifyEmail({
        kicker: "İletişim Mesajı",
        title: "Yeni İletişim Formu Mesajı",
        intro: "Petra Cafe Restaurant web sitesinden yeni bir iletişim mesajı gönderildi.",
        logoUrl,
        logoHeight,
        rows: [
          { label: "Misafir Adı", value: "Özcan Akbaş" },
          { label: "Telefon", value: "0532 710 43 55" },
          { label: "E-Posta", value: to },
          { label: "Mesaj", value: "Bu, Petra Cafe sisteminden gönderilen gerçek bir canlı test iletişim mesajıdır." },
        ],
      });
      subject = "Yeni İletişim Mesajı — Özcan Akbaş (Test)";
    } else if (kind === "reservation_confirmed") {
      mail = buildNotifyEmail({
        kicker: "REZERVASYON ONAYI",
        title: "Rezervasyonunuz Onaylandı",
        intro: `Merhaba Özcan Akbaş,<br/><br/>Talebiniz başarıyla onaylanmıştır. Belirtilen saatte masanız sizler için hazır olacaktır.`,
        logoUrl,
        logoHeight,
        rows: [
          { label: "Misafir Adı", value: "Özcan Akbaş" },
          { label: "Tarih & Saat", value: "Bugün 20:00" },
          { label: "Kişi Sayısı", value: "4 Kişi" },
          { label: "Ayrılan Masa", value: "Loca 1 (VIP Havuz Başı)" },
          { label: "Durum", value: "✅ Onaylandı" },
        ],
      });
      subject = "✅ Rezervasyonunuz Onaylandı — Petra Cafe Restaurant (Canlı Test)";
    } else if (kind === "reservation_rejected") {
      mail = buildNotifyEmail({
        kicker: "REZERVASYON HAKKINDA",
        title: "Rezervasyon Talebiniz",
        intro: `Merhaba Özcan Akbaş,<br/><br/>Talep ettiğiniz saatte tüm masalarımız dolu olduğu için rezervasyonunuz maalesef onaylanamamıştır.`,
        logoUrl,
        logoHeight,
        rows: [
          { label: "Misafir Adı", value: "Özcan Akbaş" },
          { label: "Tarih & Saat", value: "Bugün 20:00" },
          { label: "Durum", value: "❌ Onaylanamadı (Dolu)" },
        ],
      });
      subject = "Rezervasyon Talebiniz Hakkında — Petra Cafe Restaurant (Canlı Test)";
    } else {
      mail = buildNotifyEmail({
        kicker: "Yeni Talep",
        title: "Yeni Masa Rezervasyonu Geldi",
        intro: "Siteden yeni bir rezervasyon talebi alındı. Yönetim panelinden onaylayabilirsiniz.",
        logoUrl,
        logoHeight,
        rows: [
          { label: "Misafir Adı", value: "Özcan Akbaş" },
          { label: "Telefon", value: "0532 710 43 55" },
          { label: "Tarih & Saat", value: "Bugün 20:00" },
          { label: "Masa", value: "Masa A-2 (Havuz Yanı)" },
          { label: "Kişi Sayısı", value: "2 Kişi" },
        ],
      });
      subject = "🔔 Yeni Rezervasyon Talebi: Özcan Akbaş · Masa A-2 (Test)";
    }

    const sendRes = await sendMail({
      to,
      subject,
      text: mail.text,
      html: mail.html,
    });

    if (!sendRes.ok) {
      return errorResponse(sendRes.error || "E-posta gönderilemedi. Lütfen Gmail kullanıcı adı ve şifrenizi kontrol edin.", 500);
    }

    return jsonResponse({
      success: true,
      sentTo: to,
      host: cfg.host,
      from: cfg.from,
      kind,
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "SMTP test başarısız.", 400);
  }
}




