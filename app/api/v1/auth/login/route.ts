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
    await appendActivity({
      userId: result.user.id,
      email: result.user.email,
      name: result.user.name,
      action: "auth.login",
      detail: "Başarılı giriş",
      ip,
    });
    return jsonResponse({ success: true, user: result.user });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Giriş başarısız.",
      401
    );
  }
}
