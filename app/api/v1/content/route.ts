import { getPublicContent } from "@/lib/db/content";
import { isPostgresEnabled } from "@/lib/db/postgres";
import { jsonResponse, errorResponse } from "@/lib/api/helpers";
import { toPublicSiteContent } from "@/lib/content/public-content";

export async function GET() {
  try {
    const raw = await getPublicContent();
    const data = toPublicSiteContent(raw);
    const res = jsonResponse({
      // cms-ext / content.js expect kaynak === "db"
      kaynak: "db",
      store: isPostgresEnabled() ? "postgres" : "json",
      ok: true,
      data,
      updatedAt: new Date().toISOString(),
    });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (err) {
    console.error("[content]", err);
    return errorResponse("İçerik şu an yüklenemiyor.", 503);
  }
}
