import { requirePermission } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/api/helpers";
import { listProviders } from "@/lib/integrations/registry";
import { listIntegrationOrders } from "@/lib/integrations/orders-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requirePermission("integrations:manage");
    const { searchParams } = new URL(request.url);
    if (searchParams.get("orders") === "1") {
      const source = searchParams.get("source") || "all";
      const orders = await listIntegrationOrders({
        source: source === "all" ? "all" : (source as "trendyol_go" | "yemeksepeti"),
        limit: 100,
      });
      return jsonResponse({ orders });
    }

    const providers = await Promise.all(
      listProviders().map(async (p) => {
        const settings = await p.getPublicSettings();
        return {
          id: p.meta.id,
          name: p.meta.name,
          description: p.meta.description,
          docsUrl: p.meta.docsUrl,
          webhookPath: p.meta.webhookPath,
          capabilities: p.meta.capabilities,
          settings,
        };
      })
    );
    return jsonResponse({ providers });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    return errorResponse("Entegrasyonlar yüklenemedi.", 500);
  }
}
