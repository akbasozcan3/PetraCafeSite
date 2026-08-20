import { jsonResponse, errorResponse, parseBody } from "@/lib/api/helpers";
import { rateLimit } from "@/lib/rate-limit";
import {
  createReservation,
  getReservedTimesForDate,
  getBookedTablesForSlot,
  isSlotBooked,
  isTableBooked,
} from "@/lib/db/inbox";
import { findTableById } from "@/lib/content/tables-data";
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
    const time = searchParams.get("time")?.trim() || "";
    const bookedTimes = await getReservedTimesForDate(date, true);
    const bookedTables = time ? await getBookedTablesForSlot(date, time) : [];
    return jsonResponse({ date, time, bookedTimes, bookedTables });
  } catch {
    return errorResponse("Saatler ve masa durumu alınamadı", 500);
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
      email?: string;
      date?: string;
      time?: string;
      guests?: number | string;
      tableId?: string;
      tableName?: string;
      note?: string;
      website?: string;
    }>(request);

    if (body.website) {
      return jsonResponse({ success: true });
    }

    const name = String(body.name || "").trim();
    const phone = sanitizePhoneDigits(String(body.phone || "").trim());
    const email = String(body.email || "").trim();
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const guests = Number(body.guests);
    const tableId = String(body.tableId || "").trim();
    let tableName = String(body.tableName || "").trim();
    const note = String(body.note || "").trim();

    if (name.length < 2 || name.length > 80) {
      return errorResponse("Lütfen adınızı yazın.", 400);
    }
    if (phone.length < 10 || phone.length > 11) {
      return errorResponse("Geçerli bir telefon numarası girin.", 400);
    }
    if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120)) {
      return errorResponse("Geçerli bir e-posta adresi girin veya boş bırakın.", 400);
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

    if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
      return errorResponse("Kişi sayısı 1–20 arasında olmalı.", 400);
    }

    // Masa seçilmişse doğrulama
    if (tableId) {
      const tableDef = findTableById(tableId);
      if (!tableDef) {
        return errorResponse("Seçilen masa geçersiz veya bulunamadı.", 400);
      }
      tableName = tableDef.name;
      if (guests > tableDef.capacity) {
        return errorResponse(
          `${tableDef.tableNumber} maksimum ${tableDef.capacity} kişiliktir. Lütfen daha büyük bir loca veya masa seçin.`,
          400
        );
      }
      const tableOccupied = await isTableBooked(tableId, date, time);
      if (tableOccupied) {
        return errorResponse(
          `Seçtiğiniz ${tableDef.tableNumber} ${date} saat ${time} için başkası tarafından rezerve edilmiştir. Lütfen başka bir masa seçiniz.`,
          400
        );
      }
    }

    if (note.length > 500) {
      return errorResponse("Not en fazla 500 karakter olabilir.", 400);
    }

    const item = await createReservation({
      name,
      phone,
      email: email || undefined,
      date,
      time,
      guests,
      tableId: tableId || undefined,
      tableName: tableName || undefined,
      note: note || undefined,
    });

    const adminUrl = `${publicOrigin(content)}/admin/rezervasyonlar`;
    const logoHeight = Number(content?.images?.smtpLogoHeight || content?.images?.smtpLogoSize || 96);
    const notifyRows = [
      { label: "Ad soyad", value: name },
      { label: "Telefon", value: phone },
    ];
    if (email) {
      notifyRows.push({ label: "E-Posta", value: email });
    }
    notifyRows.push(
      { label: "Tarih", value: date },
      { label: "Saat", value: time },
      { label: "Kişi", value: String(guests) }
    );
    if (tableName) {
      notifyRows.push({ label: "Seçilen Masa", value: tableName });
    }
    if (note) {
      notifyRows.push({ label: "Not", value: note });
    }

    const mail = buildNotifyEmail({
      kicker: "Rezervasyon",
      title: tableName ? `Yeni Masa Talebi (${tableName})` : "Yeni masa talebi",
      intro: "Siteden bir rezervasyon geldi. Müşteriye bildirim onaylandığında gidecektir.",
      logoUrl: brandLogoAbsoluteUrl(content?.images?.logo),
      logoHeight,
      adminUrl,
      rows: notifyRows,
    });
    await Promise.allSettled([
      notifyInbox({
        to: content?.iletisim?.eposta,
        subject: `Rezervasyon — ${name}${tableName ? ` · ${tableName}` : ""} · ${date} ${time}`,
        text: mail.text,
        html: mail.html,
      }),
      notifyTelegramReservation({
        name,
        phone,
        email: email || undefined,
        date,
        time,
        guests,
        tableName: tableName || undefined,
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
