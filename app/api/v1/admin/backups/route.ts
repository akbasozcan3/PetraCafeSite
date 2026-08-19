import { requirePermission } from "@/lib/auth";
import {
  createAutoBackup,
  createBackup,
  deleteBackup,
  listBackups,
  readBackup,
  restoreBackup,
} from "@/lib/db/backup";
import {
  jsonResponse,
  errorResponse,
  parseBody,
  assertSameOrigin,
} from "@/lib/api/helpers";
import { revalidatePublicSite } from "@/lib/api/gone";
import { appendActivity } from "@/lib/db/activity";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requirePermission("backup:manage");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      const backup = readBackup(id);
      return jsonResponse(backup);
    }
    return jsonResponse({ backups: listBackups() });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Yedekler yüklenemedi.",
      400
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requirePermission("backup:manage");
    assertSameOrigin(request);
    const body = await parseBody<{
      action?: "create" | "restore" | "delete";
      id?: string;
      label?: string;
    }>(request);

    const action = body.action || "create";

    if (action === "create") {
      const meta = createBackup({
        label: body.label || "Manuel yedek",
        createdBy: session.email,
      });
      await appendActivity({
        userId: session.id,
        email: session.email,
        name: session.name,
        action: "backup.create",
        detail: meta.id,
      });
      return jsonResponse({ backup: meta }, 201);
    }

    if (action === "restore") {
      if (!body.id) return errorResponse("Yedek id gerekli.", 400);
      createAutoBackup(session.email);
      const content = await restoreBackup(body.id);
      revalidatePublicSite();
      await appendActivity({
        userId: session.id,
        email: session.email,
        name: session.name,
        action: "backup.restore",
        detail: body.id,
      });
      return jsonResponse({ success: true, data: content });
    }

    if (action === "delete") {
      if (!body.id) return errorResponse("Yedek id gerekli.", 400);
      deleteBackup(body.id);
      await appendActivity({
        userId: session.id,
        email: session.email,
        name: session.name,
        action: "backup.delete",
        detail: body.id,
      });
      return jsonResponse({ success: true });
    }

    return errorResponse("Geçersiz işlem.", 400);
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Yedek işlemi başarısız.",
      400
    );
  }
}
