import { clearAuthCookie, getSession } from "@/lib/auth";
import { jsonResponse } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { permissionsFor } from "@/lib/admin/roles";

export async function POST(request: Request) {
  const session = await getSession();
  await clearAuthCookie();
  if (session) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "auth.logout",
      detail: "Çıkış yapıldı",
      ip,
    });
  }
  return jsonResponse({ success: true });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return jsonResponse({ authenticated: false, user: null });
  }
  return jsonResponse({
    authenticated: true,
    user: {
      ...session,
      permissions: permissionsFor(session.role),
    },
  });
}
