import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { TrendyolApiError, TrendyolMealClient } from "@/lib/trendyol/client";
import { getDecryptedCredentials, getPublicSettings, patchMeta } from "@/lib/trendyol/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const session = await requirePermission("integrations:manage");
    assertSameOrigin(request);

    const creds = await getDecryptedCredentials();
    if (!creds?.apiKey || !creds.apiSecret || !creds.supplierId) {
      return errorResponse("API Key, API Secret ve Supplier ID gerekli.", 400);
    }

    const client = new TrendyolMealClient(creds);
    await client.testConnection();
    const message = "Trendyol Go bağlantısı başarılı.";
    await patchMeta({
      lastTestAt: new Date().toISOString(),
      lastTestOk: true,
      lastTestMessage: message,
    });
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "trendyol.test",
      detail: message,
    });
    return jsonResponse({
      success: true,
      message,
      settings: await getPublicSettings(),
    });
  } catch (error) {
    const message =
      error instanceof TrendyolApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Bağlantı testi başarısız.";
    await patchMeta({
      lastTestAt: new Date().toISOString(),
      lastTestOk: false,
      lastTestMessage: message,
    }).catch(() => undefined);

    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(message, error instanceof TrendyolApiError ? error.status || 400 : 400);
  }
}
