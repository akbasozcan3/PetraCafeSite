import { jsonResponse, errorResponse, parseBody } from "@/lib/api/helpers";
import { rateLimit } from "@/lib/rate-limit";
import { createReservation, getReservedTimesForDate, isSlotBooked } from "@/lib/db/inbox";
import { getPublicContent } from "@/lib/db/content";
import { notifyInbox } from "@/lib/mail/smtp";
import { brandLogoAbsoluteUrl, buildNotifyEmail } from "@/lib/mail/notify-layout";
import { notifyTelegramReservation } from "@/lib/telegram";
import { sanitizePhoneDigits } from "@/lib/content/contact-utils";
import { publicOrigin } from "@/lib/site/canonical";
import { isAllowedReservationTime, localIsoDate, addDaysIso } from "@/lib/content/hours";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || localIsoDate();
    const bookedTimes = await getReservedTimesForDate(date, true);
    return jsonResponse({ date, bookedTimes });
  } catch {
    return errorResponse("Saatler alınamadı", 500);
  }
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (!rateLimit(`reservation:${ip}`, 5, 10 * 60_000)) {
      return errorResponse("Çok fazla deneme. Lütfen biraz sonra tekrar deneyin.", 429);
    }

    const body = await parseBody<{
      name?: string;
      phone?: string;
      date?: string;
      time?: string;
      guests?: number | string;
      note?: string;
      website?: string;
    }>(request);

    if (body.website) {
      return jsonResponse({ success: true });
    }

    const name = String(body.name || "").trim();
    const phone = sanitizePhoneDigits(String(body.phone || "").trim());
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const guests = Number(body.guests);
    const note = String(body.note || "").trim();

    if (name.length < 2 || name.length > 80) {
      return errorResponse("Lütfen adınızı yazın.", 400);
    }
    if (phone.length < 10 || phone.length > 11) {
      return errorResponse("Geçerli bir telefon numarası girin.", 400);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return errorResponse("Geçerli bir tarih seçin.", 400);
    }
    const today = localIsoDate();
    if (date < today) {
      return errorResponse("Geçmiş güne rezervasyon alınmaz. Lütfen bugün veya sonrası seçin.", 400);
    }
    if (date > addDaysIso(today, 90)) {
      return errorResponse("En fazla 90 gün ileriye rezervasyon alınır.", 400);
    }
    const content = await getPublicContent().catch(() => null);
    if (!isAllowedReservationTime(date, time, content?.iletisim)) {
      return errorResponse(
        "Bu saat artık seçilemez. Lütfen ileri bir saat veya başka bir gün seçin.",
        400
      );
    }

    // Aynı tarih ve saatte önceden onaylanmış rezervasyon çakışma kontrolü
    const slotFull = await isSlotBooked(date, time, true);
    if (slotFull) {
      return errorResponse(
        `Seçtiğiniz ${time} saati doludur. Lütfen farklı bir saat veya gün seçiniz.`,
        400
      );
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
      return errorResponse("Kişi sayısı 1–20 arasında olmalı.", 400);
    }
    if (note.length > 500) {
      return errorResponse("Not en fazla 500 karakter olabilir.", 400);
    }

    const item = await createReservation({
      name,
      phone,
      date,
      time,
      guests,
      note: note || undefined,
    });

    const adminUrl = `${publicOrigin(content)}/admin/rezervasyonlar`;
    const logoHeight = Number(content?.images?.smtpLogoHeight || content?.images?.smtpLogoSize || 96);
    const mail = buildNotifyEmail({
      kicker: "Rezervasyon",
      title: "Yeni masa talebi",
      intro: "Siteden bir rezervasyon geldi. Telefonla onaylayın.",
      logoUrl: brandLogoAbsoluteUrl(content?.images?.logo),
      logoHeight,
      adminUrl,
      rows: [
        { label: "Ad soyad", value: name },
        { label: "Telefon", value: phone },
        { label: "Tarih", value: date },
        { label: "Saat", value: time },
        { label: "Kişi", value: String(guests) },
        { label: "Not", value: note },
      ],
    });
    await Promise.allSettled([
      notifyInbox({
        to: content?.iletisim?.eposta,
        subject: `Rezervasyon — ${name} · ${date} ${time}`,
        text: mail.text,
        html: mail.html,
      }),
      notifyTelegramReservation({
        name,
        phone,
        date,
        time,
        guests,
        note: note || undefined,
        adminUrl,
      }).then((tg) => {
        if (!tg.ok) {
          console.error("[reservations] Telegram gruba düşmedi:", tg.error || tg);
        }
        return tg;
      }),
    ]);

    return jsonResponse({ success: true, id: item.id });
  } catch (error) {
    if (error instanceof Error && /Geçersiz JSON/i.test(error.message)) {
      return errorResponse(error.message, 400);
    }
    console.error("[POST /reservations]", error);
    return errorResponse("Rezervasyon kaydedilemedi. Lütfen telefonla deneyin.", 500);
  }
}
