import { getPublicContent } from "@/lib/db/content";
import { isPostgresEnabled } from "@/lib/db/postgres";
import { jsonResponse, errorResponse } from "@/lib/api/helpers";

export async function GET() {
  try {
    const data = await getPublicContent();
    return jsonResponse({
      // cms-ext / content.js expect kaynak === "db"
      kaynak: "db",
      store: isPostgresEnabled() ? "postgres" : "json",
      ok: true,
      data,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[content]", err);
    return errorResponse("İçerik şu an yüklenemiyor.", 503);
  }
}
