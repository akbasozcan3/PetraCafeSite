import bcrypt from "bcryptjs";
import { requirePermission } from "@/lib/auth";
import { getAuthRecordAsync, saveAuthRecordAsync } from "@/lib/db/content";
import { findUserByEmail, updateUser } from "@/lib/db/users";
import { jsonResponse, errorResponse, parseBody, assertSameOrigin } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await requirePermission("settings:password");
    const user = await findUserByEmail(session.email);
    const auth = await getAuthRecordAsync();
    return jsonResponse({
      email: user?.email || auth?.email || session.email,
      name: user?.name || auth?.name || session.name,
      role: user?.role || session.role,
      source: user ? "users" : auth ? "auth.json" : "env",
    });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse("Ayarlar yüklenemedi.", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requirePermission("settings:password");
    assertSameOrigin(request);
    const { currentPassword, newPassword } = await parseBody<{
      currentPassword: string;
      newPassword: string;
    }>(request);

    if (!currentPassword || !newPassword) {
      return errorResponse("Mevcut ve yeni şifre gerekli.", 400);
    }
    if (newPassword.length < 8) {
      return errorResponse("Yeni şifre en az 8 karakter olmalı.", 400);
    }

    const user = await findUserByEmail(session.email);
    if (user) {
      const ok = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!ok) return errorResponse("Mevcut şifre hatalı.", 401);
      await updateUser(user.id, { password: newPassword });
      await appendActivity({
        userId: session.id,
        email: session.email,
        name: session.name,
        action: "settings.password",
        detail: "Şifre güncellendi",
      });
      return jsonResponse({ success: true });
    }

    const auth = await getAuthRecordAsync();
    if (!auth?.passwordHash) {
      return errorResponse(
        "Şifre yönetici dosyasından yapılandırılmamış. init-admin kullanın.",
        400
      );
    }

    const ok = await bcrypt.compare(currentPassword, auth.passwordHash);
    if (!ok) return errorResponse("Mevcut şifre hatalı.", 401);

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await saveAuthRecordAsync({
      email: auth.email || session.email,
      passwordHash,
      name: auth.name || session.name,
    });

    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "settings.password",
      detail: "Şifre güncellendi (legacy)",
    });

    return jsonResponse({ success: true });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    if (error instanceof Error && /Origin|Cross-origin/i.test(error.message)) {
      return errorResponse(error.message, 400);
    }
    return errorResponse("Şifre güncellenemedi.", 500);
  }
}
