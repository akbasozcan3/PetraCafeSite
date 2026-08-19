import { requirePermission } from "@/lib/auth";
import {
  jsonResponse,
  errorResponse,
  parseBody,
  assertSameOrigin,
} from "@/lib/api/helpers";
import {
  listMessages,
  updateMessage,
  type MessageStatus,
} from "@/lib/db/inbox";
import { appendActivity } from "@/lib/db/activity";

export const runtime = "nodejs";

const STATUSES = new Set<MessageStatus>(["new", "read", "archived"]);

export async function GET() {
  try {
    await requirePermission("content:read");
    const items = await listMessages();
    return jsonResponse({ items });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    console.error("[GET /admin/messages]", error);
    return errorResponse("Mesajlar yüklenemedi.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requirePermission("content:write");
    assertSameOrigin(request);
    const body = await parseBody<{ id?: string; status?: MessageStatus }>(
      request
    );
    if (!body.id || !body.status || !STATUSES.has(body.status)) {
      return errorResponse("Geçersiz istek.", 400);
    }
    const item = await updateMessage(body.id, { status: body.status });
    if (!item) return errorResponse("Mesaj bulunamadı.", 404);
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "message.update",
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
    console.error("[PATCH /admin/messages]", error);
    return errorResponse("Güncellenemedi.", 500);
  }
}
