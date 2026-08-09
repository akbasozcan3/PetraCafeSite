import { requirePermission } from "@/lib/auth";
import { errorResponse, jsonResponse, assertSameOrigin, parseBody } from "@/lib/api/helpers";
import { listCustomers } from "@/lib/customer/store";
import { listWebOrders, updateWebOrderStatus } from "@/lib/customer/orders";
import type { WebOrderStatus } from "@/lib/customer/types";
import { toPublicCustomer } from "@/lib/customer/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requirePermission("content:write");
    const { searchParams } = new URL(request.url);
    const kind = searchParams.get("kind") || "orders";
    if (kind === "customers") {
      const list = await listCustomers();
      return jsonResponse({
        customers: list.map((c) => ({
          ...toPublicCustomer(c),
          createdAt: c.createdAt,
          active: c.active,
        })),
      });
    }
    const orders = await listWebOrders(200);
    return jsonResponse({
      orders: orders.map((o) => ({
        id: o.id,
        publicCode: o.publicCode,
        status: o.status,
        paymentMethod: o.paymentMethod,
        guestName: o.guestName,
        guestPhone: o.guestPhone,
        guestEmail: o.guestEmail,
        customerId: o.customerId,
        totalText: o.totalText,
        createdAt: o.createdAt,
        items: o.items,
        address: o.address,
      })),
    });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    return errorResponse("Yüklenemedi.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    await requirePermission("content:write");
    assertSameOrigin(request);
    const body = await parseBody<{ id: string; status: WebOrderStatus }>(request);
    if (!body.id || !body.status) return errorResponse("id ve status gerekli.", 400);
    const order = await updateWebOrderStatus(body.id, body.status);
    if (!order) return errorResponse("Sipariş bulunamadı.", 404);
    return jsonResponse({ success: true, order });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Güncelleme başarısız.", 400);
  }
}
