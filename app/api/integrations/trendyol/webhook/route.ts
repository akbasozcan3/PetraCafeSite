import { timingSafeEqual } from "crypto";
import { errorResponse, jsonResponse } from "@/lib/api/helpers";
import { trendyolLog } from "@/lib/trendyol/logger";
import { upsertOrders } from "@/lib/trendyol/orders-store";
import { getDecryptedCredentials } from "@/lib/trendyol/store";

export const runtime = "nodejs";

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

function parseBasicAuth(header: string | null): { user: string; pass: string } | null {
  if (!header || !header.startsWith("Basic ")) return null;
  try {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch {
    return null;
  }
}

/**
 * Trendyol Go / Meal inbound webhook.
 * Kimlik doğrulama: Admin'de tanımlı webhook username/password (Basic Auth).
 * Meal GW için panelden webhook kaydı partner sürecine bağlı olabilir.
 */
export async function POST(request: Request) {
  try {
    const creds = await getDecryptedCredentials();
    if (!creds?.enabled) {
      return errorResponse("Entegrasyon kapalı.", 403);
    }
    if (!creds.webhookUsername || !creds.webhookPassword) {
      trendyolLog("warn", "Webhook rejected: credentials not configured", {
        endpoint: "/api/integrations/trendyol/webhook",
      });
      return errorResponse("Webhook kimlik bilgileri yapılandırılmamış.", 401);
    }

    const auth = parseBasicAuth(request.headers.get("authorization"));
    if (
      !auth ||
      !safeEqual(auth.user, creds.webhookUsername) ||
      !safeEqual(auth.pass, creds.webhookPassword)
    ) {
      trendyolLog("warn", "Webhook rejected: invalid auth", {
        endpoint: "/api/integrations/trendyol/webhook",
        status: 401,
      });
      return errorResponse("Yetkisiz webhook.", 401);
    }

    const body = await request.json().catch(() => null);
    if (!body) return errorResponse("Geçersiz gövde.", 400);

    const items = Array.isArray(body)
      ? body
      : body.packages
        ? body.packages
        : body.content
          ? body.content
          : [body];

    const result = await upsertOrders(items, "webhook");
    trendyolLog("info", "Webhook accepted", {
      endpoint: "/api/integrations/trendyol/webhook",
      status: 200,
    });
    return jsonResponse({ success: true, ...result });
  } catch (error) {
    trendyolLog("error", error instanceof Error ? error.message : "Webhook error", {
      endpoint: "/api/integrations/trendyol/webhook",
      status: 500,
    });
    return errorResponse("Webhook işlenemedi.", 500);
  }
}

export async function GET() {
  return jsonResponse({
    ok: true,
    service: "trendyol-go-webhook",
    auth: "Basic",
  });
}
