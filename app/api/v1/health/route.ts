import { jsonResponse } from "@/lib/api/helpers";
import { isPostgresEnabled, getPool } from "@/lib/db/postgres";
import { getContentAsync } from "@/lib/db/content";
import { isDefaultJwtSecret } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const deep = url.searchParams.get("deep") === "1";

  const base = {
    ok: true as boolean,
    service: "firinci-api",
    time: new Date().toISOString(),
  };

  if (!deep) {
    return jsonResponse(base);
  }

  const checks: Record<string, { ok: boolean; detail?: string }> = {
    jwt: {
      ok: !isDefaultJwtSecret(),
      detail: isDefaultJwtSecret() ? "JWT_SECRET eksik veya zayıf" : "ok",
    },
    content: { ok: false },
    database: { ok: !isPostgresEnabled(), detail: isPostgresEnabled() ? undefined : "json-mode" },
  };

  try {
    await getContentAsync();
    checks.content = { ok: true };
  } catch (err) {
    checks.content = { ok: false, detail: (err as Error).message };
  }

  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("Pool yok");
      await pool.query("SELECT 1");
      checks.database = { ok: true, detail: "postgres" };
    } catch (err) {
      checks.database = { ok: false, detail: (err as Error).message };
    }
  }

  const ok = Object.values(checks).every((c) => c.ok);
  return jsonResponse({ ...base, ok, checks }, ok ? 200 : 503);
}
