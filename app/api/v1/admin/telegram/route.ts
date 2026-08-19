import { requirePermission } from "@/lib/auth";
import { jsonResponse, errorResponse, assertSameOrigin } from "@/lib/api/helpers";
import { getTelegramStatus, sendTelegramTest } from "@/lib/telegram";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("system:read");
    const status = await getTelegramStatus();
    return jsonResponse({ status });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    return errorResponse("Telegram durumu alınamadı.", 500);
  }
}

export async function POST(request: Request) {
  try {
    await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const result = await sendTelegramTest();
    if (!result.ok) return errorResponse(result.error || "Test başarısız", 400);
    const status = await getTelegramStatus();
    return jsonResponse({ success: true, status });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    return errorResponse(error instanceof Error ? error.message : "Test başarısız", 500);
  }
}
