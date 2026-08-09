import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse, parseBody } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { getPublicSettings, saveSettings } from "@/lib/trendyol/store";
import type { TrendyolGoSavePayload } from "@/lib/trendyol/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("integrations:manage");
    return jsonResponse({ settings: await getPublicSettings() });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse("Trendyol ayarları yüklenemedi.", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const body = await parseBody<TrendyolGoSavePayload>(request);
    const settings = await saveSettings(body);
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "trendyol.settings",
      detail: `Trendyol Go ayarları güncellendi (enabled=${settings.enabled})`,
    });
    return jsonResponse({ success: true, settings });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    if (error instanceof Error && /Origin|Cross-origin|JWT_SECRET|şifreleme/i.test(error.message)) {
      return errorResponse(error.message, 400);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Ayarlar kaydedilemedi.",
      500
    );
  }
}
