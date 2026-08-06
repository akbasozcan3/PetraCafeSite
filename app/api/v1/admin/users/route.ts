import { requirePermission } from "@/lib/auth";
import {
  createUser,
  deleteUser,
  listUsers,
  publicUser,
  updateUser,
} from "@/lib/db/users";
import { isAdminRole, type AdminRole } from "@/lib/admin/roles";
import {
  jsonResponse,
  errorResponse,
  parseBody,
  assertSameOrigin,
} from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("users:manage");
    const users = await listUsers();
    return jsonResponse({ users: users.map(publicUser) });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse("Kullanıcılar yüklenemedi.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requirePermission("users:manage");
    assertSameOrigin(request);
    const body = await parseBody<{
      email: string;
      password: string;
      name: string;
      role: string;
    }>(request);

    if (!isAdminRole(body.role)) {
      return errorResponse("Geçersiz rol.", 400);
    }
    if (body.role === "owner" && session.role !== "owner") {
      return errorResponse("Sahip rolü yalnızca sahip tarafından verilebilir.", 403);
    }

    const user = await createUser({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role as AdminRole,
    });

    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "users.create",
      detail: `${user.email} (${user.role})`,
    });

    return jsonResponse({ user: publicUser(user) }, 201);
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Kullanıcı oluşturulamadı.",
      400
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requirePermission("users:manage");
    assertSameOrigin(request);
    const body = await parseBody<{
      id: string;
      name?: string;
      role?: string;
      active?: boolean;
      password?: string;
    }>(request);

    if (!body.id) return errorResponse("Kullanıcı id gerekli.", 400);
    if (body.role && !isAdminRole(body.role)) {
      return errorResponse("Geçersiz rol.", 400);
    }
    if (body.role === "owner" && session.role !== "owner") {
      return errorResponse("Sahip rolü yalnızca sahip tarafından verilebilir.", 403);
    }

    const user = await updateUser(body.id, {
      name: body.name,
      role: body.role as AdminRole | undefined,
      active: body.active,
      password: body.password,
    });

    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "users.update",
      detail: `${user.email}`,
    });

    return jsonResponse({ user: publicUser(user) });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Kullanıcı güncellenemedi.",
      400
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requirePermission("users:manage");
    assertSameOrigin(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "";
    if (!id) return errorResponse("Kullanıcı id gerekli.", 400);
    if (id === session.id) {
      return errorResponse("Kendi hesabınızı silemezsiniz.", 400);
    }

    await deleteUser(id);
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "users.delete",
      detail: id,
    });
    return jsonResponse({ success: true });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Kullanıcı silinemedi.",
      400
    );
  }
}
