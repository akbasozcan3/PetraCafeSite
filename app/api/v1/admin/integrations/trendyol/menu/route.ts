import { requirePermission } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/api/helpers";
import { TrendyolMealClient } from "@/lib/trendyol/client";
import { getDecryptedCredentials } from "@/lib/trendyol/store";
import { normalizeMenuPayload } from "@/lib/trendyol/sync-menu";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("integrations:manage");
    const creds = await getDecryptedCredentials();
    if (!creds?.enabled) {
      return errorResponse("Trendyol Go entegrasyonu kapalı.", 400);
    }
    if (!creds.restaurantId) {
      return errorResponse("Restaurant ID gerekli.", 400);
    }
    const client = new TrendyolMealClient(creds);
    const raw = await client.getProducts();
    return jsonResponse({
      products: normalizeMenuPayload(raw),
      count: normalizeMenuPayload(raw).length,
    });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Menü alınamadı.",
      500
    );
  }
}
