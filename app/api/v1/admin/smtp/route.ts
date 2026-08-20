import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse } from "@/lib/api/helpers";
import { getSmtpConfigAsync, notificationEmail, testSmtpConnection } from "@/lib/mail/smtp";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("settings:password");
    const cfg = await getSmtpConfigAsync();
    return jsonResponse({
      configured: Boolean(cfg),
      host: cfg?.host || "",
      from: cfg?.from || "",
      user: cfg?.user || "",
      port: cfg?.port || null,
      to: notificationEmail() || null,
    });
  } catch {
    return errorResponse("Unauthorized", 401);
  }
}

export async function PUT(request: Request) {
  try {
    await requirePermission("settings:password");
    assertSameOrigin(request);
    const body = await request.json();
    const { host, port, user, pass, from, notifyTo } = body || {};

    if (!host || !user) {
      return errorResponse("Host ve Kullanıcı Adı (E-Posta) zorunludur.", 400);
    }

    const { setAppSetting } = await import("@/lib/db/settings");
    await setAppSetting(
      "integration_smtp_config",
      JSON.stringify({
        host: host.trim(),
        port: Number(port || 587),
        user: user.trim(),
        pass: pass ? pass.trim() : "",
        from: from ? from.trim() : user.trim(),
        secure: Number(port) === 465,
        notifyTo: notifyTo ? notifyTo.trim() : "",
      })
    );

    return jsonResponse({ success: true, message: "SMTP E-posta ayarları başarıyla kaydedildi." });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "SMTP ayarları kaydedilemedi.", 500);
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



