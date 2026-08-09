import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ provider: string }> };

export async function POST(request: Request, ctx: Ctx) {
  try {
    const session = await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const { provider: id } = await ctx.params;
    const provider = requireProvider(id);
    const result = await provider.testConnection();
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "integrations.test",
      detail: `${provider.meta.name}: ${result.message}`,
    });
    return jsonResponse({
      success: result.ok,
      message: result.message,
      settings: await provider.getPublicSettings(),
    });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(error instanceof Error ? error.message : "Test başarısız.", 400);
  }
}
