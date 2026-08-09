import { requirePermission } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/api/helpers";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("integrations:manage");
    const p = requireProvider("trendyol_go");
    if (!p.getMenu) return errorResponse("Menü API desteklenmiyor.", 400);
    const products = await p.getMenu();
    return jsonResponse({ products, count: products.length });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Menü alınamadı.",
      500
    );
  }
}
