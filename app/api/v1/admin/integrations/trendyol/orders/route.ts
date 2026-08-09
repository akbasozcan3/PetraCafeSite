import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse, parseBody } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requirePermission("integrations:manage");
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get("refresh") === "1";
    const status = searchParams.get("status") || "";
    const p = requireProvider("trendyol_go");
    if (!p.getOrders) return errorResponse("Sipariş API desteklenmiyor.", 400);
    const orders = await p.getOrders({ refresh, status });
    return jsonResponse({ orders });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Siparişler alınamadı.",
      500
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const body = await parseBody<{
      action: string;
      packageId: string;
      preparationTime?: number;
      itemIdList?: string[];
      reasonId?: number;
    }>(request);

    if (!body.packageId || !body.action) {
      return errorResponse("packageId ve action gerekli.", 400);
    }

    const p = requireProvider("trendyol_go");
    if (!p.updateOrderStatus) {
      return errorResponse("Sipariş durumu güncelleme desteklenmiyor.", 400);
    }
    await p.updateOrderStatus(body.action, body.packageId, {
      preparationTime: body.preparationTime,
      itemIdList: body.itemIdList,
      reasonId: body.reasonId,
    });

    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "trendyol.order",
      detail: `${body.action} → ${body.packageId}`,
    });

    return jsonResponse({ success: true });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Sipariş işlemi başarısız.",
      500
    );
  }
}
