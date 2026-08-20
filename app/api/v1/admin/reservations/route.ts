import { requirePermission } from "@/lib/auth";
import {
  jsonResponse,
  errorResponse,
  parseBody,
  assertSameOrigin,
} from "@/lib/api/helpers";
import {
  listReservations,
  updateReservation,
  type ReservationStatus,
} from "@/lib/db/inbox";
import { appendActivity } from "@/lib/db/activity";

export const runtime = "nodejs";

const STATUSES = new Set<ReservationStatus>([
  "pending",
  "confirmed",
  "rejected",
  "cancelled",
]);

export async function GET() {
  try {
    await requirePermission("content:read");
    const items = await listReservations();
    return jsonResponse({ items });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    console.error("[GET /admin/reservations]", error);
    return errorResponse("Rezervasyonlar yüklenemedi.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requirePermission("content:write");
    assertSameOrigin(request);
    const body = await parseBody<{ id?: string; status?: ReservationStatus }>(
      request
    );
    if (!body.id || !body.status || !STATUSES.has(body.status)) {
      return errorResponse("Geçersiz istek.", 400);
    }
    const item = await updateReservation(body.id, { status: body.status });
    if (!item) return errorResponse("Rezervasyon bulunamadı.", 404);

    // Müşteriye onay veya durum bildirim e-postası gönder
    if (item.email && (body.status === "confirmed" || body.status === "rejected" || body.status === "cancelled")) {
      const { sendReservationStatusEmail } = await import("@/lib/mail/smtp");
      sendReservationStatusEmail({
        to: item.email,
        name: item.name,
        date: item.date,
        time: item.time,
        guests: item.guests,
        status: body.status,
        note: item.note,
      }).then((res) => {
        if (!res.ok) {
          console.warn("[admin reservations] Müşteri onay maili gönderilemedi:", res);
        }
      }).catch((err) => {
        console.error("[admin reservations] Müşteri onay maili hatası:", err);
      });
    }

    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "reservation.update",
      detail: `${item.name} → ${body.status}`,
    });
    return jsonResponse({ item });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    console.error("[PATCH /admin/reservations]", error);
    return errorResponse("Güncellenemedi.", 500);
  }
}
