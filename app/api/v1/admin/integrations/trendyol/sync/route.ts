import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { getDecryptedCredentials } from "@/lib/trendyol/store";
import { syncMenuFromTrendyol } from "@/lib/trendyol/sync-menu";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const session = await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const creds = await getDecryptedCredentials();
    if (!creds?.enabled) {
      return errorResponse("Trendyol Go entegrasyonu kapalı. Önce aktif edin.", 400);
    }
    const result = await syncMenuFromTrendyol();
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "trendyol.sync",
      detail: `Menü senkron: ${result.productCount} ürün (yeni ${result.created}, güncellenen ${result.updated})`,
    });
    return jsonResponse({ success: true, result });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Senkronizasyon başarısız.",
      500
    );
  }
}
