/**
 * Admin kayıtlarında da mjs script kullanılır (lib/db/content.ts).
 * Bu modül tip güvenliği / test için ince bir sarmalayıcıdır.
 */
import { execFileSync } from "child_process";
import path from "path";
import type { SiteContent } from "@/lib/content/types";

export function syncProductPages(_content?: SiteContent): { ok: boolean } {
  try {
    execFileSync(process.execPath, [path.join(process.cwd(), "scripts", "sync-product-pages.mjs")], {
      cwd: process.cwd(),
      stdio: "pipe",
      timeout: 120_000,
    });
    return { ok: true };
  } catch (err) {
    console.warn("[syncProductPages]", (err as Error).message);
    return { ok: false };
  }
}
