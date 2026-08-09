import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse } from "@/lib/api/helpers";
import { getSmtpConfig, testSmtpConnection } from "@/lib/mail/smtp";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("settings:password");
    const cfg = getSmtpConfig();
    return jsonResponse({
      configured: Boolean(cfg),
      host: cfg?.host || "",
      from: cfg?.from || "",
      port: cfg?.port || null,
    });
  } catch {
    return errorResponse("Unauthorized", 401);
  }
}

export async function POST(request: Request) {
  try {
    await requirePermission("settings:password");
    assertSameOrigin(request);
    const result = await testSmtpConnection();
    return jsonResponse({ success: true, ...result });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "SMTP test başarısız.", 400);
  }
}
