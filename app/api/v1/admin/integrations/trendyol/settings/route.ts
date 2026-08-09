import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse, parseBody } from "@/lib/api/helpers";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

/** Legacy → yeni provider API */
export async function GET() {
  try {
    await requirePermission("integrations:manage");
    const p = requireProvider("trendyol_go");
    return jsonResponse({ settings: await p.getPublicSettings() });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    return errorResponse("Unauthorized", 401);
  }
}

export async function PUT(request: Request) {
  try {
    await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const p = requireProvider("trendyol_go");
    const body = await parseBody<Record<string, unknown>>(request);
    return jsonResponse({ success: true, settings: await p.saveSettings(body) });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Kayıt başarısız.", 400);
  }
}
