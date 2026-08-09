import { errorResponse, jsonResponse } from "@/lib/api/helpers";
import { requireProvider } from "@/lib/integrations/registry";
import { integrationLog } from "@/lib/integrations/logger";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const provider = requireProvider("yemeksepeti");
  try {
    const body = await request.json().catch(() => null);
    if (!body) return errorResponse("Geçersiz gövde.", 400);
    if (!provider.validateWebhook || !provider.ingestWebhook) {
      return errorResponse("Webhook desteklenmiyor.", 400);
    }
    const auth = await provider.validateWebhook(request, body);
    if (!auth.ok) {
      integrationLog("Yemeksepeti", "warn", auth.reason || "Webhook rejected", { status: 401 });
      return errorResponse(auth.reason || "Yetkisiz webhook.", 401);
    }
    const result = await provider.ingestWebhook(body);
    return jsonResponse({ success: true, ...result });
  } catch (error) {
    integrationLog("Yemeksepeti", "error", error instanceof Error ? error.message : "Webhook error", {
      status: 500,
    });
    return errorResponse("Webhook işlenemedi.", 500);
  }
}

export async function GET() {
  return jsonResponse({ ok: true, service: "yemeksepeti-webhook", auth: "secret" });
}
