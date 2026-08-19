import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/admin/roles";
import { getContentAsync, saveContentAsync } from "@/lib/db/content";
import type { SiteContent } from "@/lib/content/types";
import { IMAGE_KEYS } from "@/lib/content/image-keys";
import {
  jsonResponse,
  errorResponse,
  parseBody,
  assertSameOrigin,
} from "@/lib/api/helpers";
import { appendActivity } from "@/lib/db/activity";
import { createBackup, listBackups, deleteBackup } from "@/lib/db/backup";
import { revalidatePublicSite } from "@/lib/api/gone";

export const runtime = "nodejs";

function pruneAutoBackups(prefix: string, keep = 15) {
  try {
    const autos = listBackups().filter((b) => b.label?.includes(prefix));
    for (const b of autos.slice(keep)) {
      try {
        deleteBackup(b.id);
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* ignore */
  }
}

export async function GET() {
  try {
    await requirePermission("content:read");
    const data = await getContentAsync();
    return jsonResponse({ data, imageKeys: IMAGE_KEYS });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    console.error("[GET /admin/content]", error);
    return errorResponse("İçerik yüklenemedi.", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requirePermission("content:write");
    assertSameOrigin(request);
    const body = await parseBody<Partial<SiteContent>>(request);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return errorResponse("Geçersiz veri.", 400);
    }
    if (
      (body.seo || body.footer || body.legal) &&
      !hasPermission(session.role, "seo:write")
    ) {
      return errorResponse("SEO/footer için yetkiniz yok.", 403);
    }

    try {
      createBackup({
        label: "Otomatik (kayıt öncesi)",
        createdBy: session.email,
      });
      pruneAutoBackups("Otomatik (kayıt öncesi)", 15);
    } catch {
      /* non-fatal */
    }

    const next = await saveContentAsync(body);
    const keys = Object.keys(body).join(", ");
    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "content.update",
      detail: keys.slice(0, 200),
    });
    revalidatePublicSite();
    return jsonResponse({ data: next });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    if (
      error instanceof Error &&
      /Origin|Cross-origin|Geçersiz JSON/i.test(error.message)
    ) {
      return errorResponse(error.message, 400);
    }
    console.error("[PUT /admin/content]", error);
    const msg =
      error instanceof Error && /DATABASE_URL|Postgres|Neon|yazılamadı|Vercel/i.test(error.message)
        ? error.message
        : "İçerik kaydedilemedi.";
    return errorResponse(msg, 500);
  }
}
