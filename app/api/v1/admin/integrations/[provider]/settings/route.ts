import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse, parseBody } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ provider: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  try {
    await requirePermission("integrations:manage");
    const { provider: id } = await ctx.params;
    const provider = requireProvider(id);
    return jsonResponse({
      meta: provider.meta,
      settings: await provider.getPublicSettings(),
    });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(error instanceof Error ? error.message : "Yüklenemedi.", 400);
  }
}

export async function PUT(request: Request, ctx: Ctx) {
  try {
    const session = await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const { provider: id } = await ctx.params;
    const provider = requireProvider(id);
    const body = await parseBody<Record<string, unknown>>(request);
    const settings = await provider.saveSettings(body);
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "integrations.settings",
      detail: `${provider.meta.name} ayarları güncellendi`,
    });
    return jsonResponse({ success: true, settings });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(error instanceof Error ? error.message : "Kayıt başarısız.", 400);
  }
}
