import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse, parseBody } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ provider: string }> };

export async function GET(request: Request, ctx: Ctx) {
  try {
    await requirePermission("integrations:manage");
    const { provider: id } = await ctx.params;
    const provider = requireProvider(id);
    if (!provider.getOrders) {
      return errorResponse("Bu entegrasyon sipariş çekmeyi desteklemiyor.", 400);
    }
    const { searchParams } = new URL(request.url);
    const orders = await provider.getOrders({
      refresh: searchParams.get("refresh") === "1",
      status: searchParams.get("status") || undefined,
    });
    return jsonResponse({ orders });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(error instanceof Error ? error.message : "Siparişler alınamadı.", 400);
  }
}

export async function POST(request: Request, ctx: Ctx) {
  try {
    const session = await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const { provider: id } = await ctx.params;
    const provider = requireProvider(id);
    if (!provider.updateOrderStatus) {
      return errorResponse("Bu entegrasyon sipariş durumu güncellemeyi desteklemiyor.", 400);
    }
    const body = await parseBody<{
      action: string;
      orderId: string;
      preparationTime?: number;
      itemIdList?: string[];
      reasonId?: number;
    }>(request);
    if (!body.action || !body.orderId) {
      return errorResponse("action ve orderId gerekli.", 400);
    }
    await provider.updateOrderStatus(body.action, body.orderId, body);
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "integrations.order",
      detail: `${provider.meta.name} ${body.action} ${body.orderId}`,
    });
    return jsonResponse({ success: true });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(error instanceof Error ? error.message : "İşlem başarısız.", 400);
  }
}
