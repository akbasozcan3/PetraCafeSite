import { requirePermission } from "@/lib/auth";
import { assertSameOrigin, errorResponse, jsonResponse } from "@/lib/api/helpers";
import { requireProvider } from "@/lib/integrations/registry";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requirePermission("integrations:manage");
    assertSameOrigin(request);
    const p = requireProvider("trendyol_go");
    const result = await p.testConnection();
    return jsonResponse({
      success: result.ok,
      message: result.message,
      settings: await p.getPublicSettings(),
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Test başarısız.", 400);
  }
}
