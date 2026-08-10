/**
 * Blog App Router'da — extensionless static shell yazılmaz.
 * Eski public/blog HTML kalıntıları temizlenir.
 */
import fs from "fs";
import path from "path";
import type { SiteContent } from "@/lib/content/types";

const ROOT = process.cwd();

export function syncBlogPages(_content: SiteContent): void {
  function removeExtensionless(dir: string): number {
    if (!fs.existsSync(dir)) return 0;
    let n = 0;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.lstatSync(full);
      if (st.isDirectory()) n += removeExtensionless(full);
      else if (!path.extname(name) && !name.startsWith(".")) {
        try {
          fs.unlinkSync(full);
          n += 1;
        } catch {
          /* ignore */
        }
      }
    }
    return n;
  }
  const cleaned =
    removeExtensionless(path.join(ROOT, "public", "blog")) +
    removeExtensionless(path.join(ROOT, "blog"));
  if (cleaned) {
    console.log(`[syncBlogPages] cleaned ${cleaned} legacy extensionless shells`);
  }
}
