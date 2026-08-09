import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse, parseBody } from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { TrendyolMealClient } from "@/lib/trendyol/client";
import { listOrders, upsertOrders } from "@/lib/trendyol/orders-store";
import { getDecryptedCredentials, patchMeta } from "@/lib/trendyol/store";

export const runtime = "nodejs";

function asOrderArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.content)) return o.content;
    if (Array.isArray(o.packages)) return o.packages;
    if (Array.isArray(o.items)) return o.items;
  }
  return [];
}

export async function GET(request: Request) {
  try {
    await requirePermission("integrations:manage");
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get("refresh") === "1";
    const status = searchParams.get("status") || "";

    if (refresh) {
      const creds = await getDecryptedCredentials();
      if (!creds?.enabled) {
        return errorResponse("Trendyol Go entegrasyonu kapalı.", 400);
      }
      const client = new TrendyolMealClient(creds);
      const raw = await client.getPackages(status || "Created");
      await upsertOrders(asOrderArray(raw), "poll");
      await patchMeta({ lastOrderPollAt: new Date().toISOString() });
    }

    return jsonResponse({ orders: await listOrders(100) });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
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
      action: "picked" | "invoiced" | "ship" | "deliver" | "cancel";
      packageId: string;
      preparationTime?: number;
      itemIdList?: string[];
      reasonId?: number;
    }>(request);

    if (!body.packageId || !body.action) {
      return errorResponse("packageId ve action gerekli.", 400);
    }

    const client = await TrendyolMealClient.fromStore();
    switch (body.action) {
      case "picked":
        await client.pickPackage(body.packageId, body.preparationTime ?? 30);
        break;
      case "invoiced":
        await client.invoicePackage(body.packageId);
        break;
      case "ship":
        await client.manualShip(body.packageId);
        break;
      case "deliver":
        await client.manualDeliver(body.packageId);
        break;
      case "cancel":
        await client.unsupplyPackage(body.packageId, body.itemIdList || [], body.reasonId);
        break;
      default:
        return errorResponse("Desteklenmeyen aksiyon.", 400);
    }

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
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse(
      error instanceof Error ? error.message : "Sipariş işlemi başarısız.",
      500
    );
  }
}
