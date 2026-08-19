import { requirePermission } from "@/lib/auth";
import { errorResponse } from "@/lib/api/helpers";
import { getContentAsync } from "@/lib/db/content";
import { siteBaseUrl } from "@/lib/mail/smtp";
import { brandLogoAbsoluteUrl, buildNotifyEmail } from "@/lib/mail/notify-layout";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("settings:password");
    const content = await getContentAsync();
    const mail = buildNotifyEmail({
      kicker: "Önizleme",
      title: "Yeni masa talebi",
      intro: "Rezervasyon ve iletişim e-postaları müşteriye değil size, bu görünümle gider.",
      logoUrl: brandLogoAbsoluteUrl(content?.images?.logo),
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
    return new Response(mail.html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return errorResponse("Unauthorized", 401);
  }
}
