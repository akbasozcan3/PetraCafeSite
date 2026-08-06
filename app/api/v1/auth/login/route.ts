import {
  login,
  setAuthCookie,
  isDefaultJwtSecret,
} from "@/lib/auth";
import { jsonResponse, errorResponse, parseBody } from "@/lib/api/helpers";
import { rateLimit } from "@/lib/rate-limit";
import { appendActivity } from "@/lib/db/activity";

export async function POST(request: Request) {
  try {
    if (isDefaultJwtSecret() && process.env.NODE_ENV === "production") {
      return errorResponse("Sunucu yapılandırması eksik (JWT_SECRET).", 503);
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (!rateLimit(`login:${ip}`, 8, 60_000)) {
      return errorResponse("Çok fazla deneme. Bir dakika bekleyin.", 429);
    }

    const { email, password } = await parseBody<{
      email: string;
      password: string;
    }>(request);
    const result = await login(email, password);
    await setAuthCookie(result.token);
    try {
      await appendActivity({
        userId: result.user.id,
        email: result.user.email,
        name: result.user.name,
        action: "auth.login",
        detail: "Başarılı giriş",
        ip,
      });
    } catch (logErr) {
      console.warn("[auth] activity log skipped:", (logErr as Error).message);
    }
    return jsonResponse({ success: true, user: result.user });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Giriş başarısız.";
    // Never surface filesystem/infra noise as login failure text
    if (/EROFS|EACCES|read-only|activity-log/i.test(msg)) {
      return errorResponse("Giriş başarısız. E-posta veya şifre hatalı.", 401);
    }
    return errorResponse(msg, 401);
  }
}
