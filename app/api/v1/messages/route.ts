import { jsonResponse, errorResponse, parseBody } from "@/lib/api/helpers";
import { rateLimit } from "@/lib/rate-limit";
import { createMessage } from "@/lib/db/inbox";
import { getPublicContent } from "@/lib/db/content";
import { notifyInbox } from "@/lib/mail/smtp";
import { brandLogoAbsoluteUrl, buildNotifyEmail } from "@/lib/mail/notify-layout";
import { notifyTelegramContact } from "@/lib/telegram";
import { sanitizePhoneDigits } from "@/lib/content/contact-utils";
import { publicOrigin } from "@/lib/site/canonical";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (!rateLimit(`message:${ip}`, 5, 10 * 60_000)) {
      return errorResponse("Çok fazla deneme. Lütfen biraz sonra tekrar deneyin.", 429);
    }

    const body = await parseBody<{
      name?: string;
      phone?: string;
      email?: string;
      message?: string;
      website?: string;
    }>(request);

    if (body.website) {
      return jsonResponse({ success: true });
    }

    const name = String(body.name || "").trim();
    const phone = sanitizePhoneDigits(String(body.phone || "").trim());
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (name.length < 2 || name.length > 80) {
      return errorResponse("Lütfen adınızı yazın.", 400);
    }
    if (message.length < 10 || message.length > 2000) {
      return errorResponse("Mesajınız 10–2000 karakter olmalı.", 400);
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorResponse("Geçerli bir e-posta girin.", 400);
    }
    if (phone.length < 10 || phone.length > 11) {
      return errorResponse("Geçerli bir telefon girin.", 400);
    }

    const item = await createMessage({
      name,
      phone: phone || undefined,
      email: email || undefined,
      message,
    });

    const content = await getPublicContent().catch(() => null);
    const adminUrl = `${publicOrigin(content)}/admin/mesajlar`;
    const mail = buildNotifyEmail({
      kicker: "İletişim",
      title: "Yeni mesaj",
      intro: "Sitedeki iletişim formundan bir yazı geldi.",
      logoUrl: brandLogoAbsoluteUrl(content?.images?.logo),
      adminUrl,
      rows: [
        { label: "Ad soyad", value: name },
        { label: "Telefon", value: phone },
        { label: "E-posta", value: email },
      ],
      body: message,
    });
    await Promise.allSettled([
      notifyInbox({
        to: content?.iletisim?.eposta,
        subject: `Yeni mesaj — ${name}`,
        text: mail.text,
        html: mail.html,
      }),
      notifyTelegramContact({
        name,
        phone: phone || undefined,
        email: email || undefined,
        message,
        adminUrl,
      }).then((tg) => {
        if (!tg.ok) {
          console.error("[messages] Telegram gruba düşmedi:", tg.error || tg);
        }
        return tg;
      }),
    ]);

    return jsonResponse({ success: true, id: item.id });
  } catch (error) {
    if (error instanceof Error && /Geçersiz JSON/i.test(error.message)) {
      return errorResponse(error.message, 400);
    }
    console.error("[POST /messages]", error);
    return errorResponse("Mesaj gönderilemedi. Lütfen telefonla deneyin.", 500);
  }
}
