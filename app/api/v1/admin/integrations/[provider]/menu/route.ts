import { requirePermission } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/api/helpers";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ provider: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  try {
    await requirePermission("integrations:manage");
    const { provider: id } = await ctx.params;
    const provider = requireProvider(id);
    if (!provider.getMenu) {
      return errorResponse("Bu entegrasyon menü çekmeyi desteklemiyor.", 400);
    }
    const products = await provider.getMenu();
    return jsonResponse({ products, count: products.length });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(error instanceof Error ? error.message : "Menü alınamadı.", 400);
  }
}
