import { requirePermission } from "@/lib/auth";
import { listActivity } from "@/lib/db/activity";
import { jsonResponse, errorResponse } from "@/lib/api/helpers";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requirePermission("logs:read");
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit") || 100), 500);
    const entries = await listActivity(limit);
    return jsonResponse({ entries });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse("Loglar yüklenemedi.", 500);
  }
}
