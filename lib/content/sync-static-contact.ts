/**
 * Bake contact links into static HTML.
 * Homepage is now SSR React at `/` — index.htm patches are retired (no-op).
 */
import type { SiteContent } from "@/lib/content/types";

export function syncStaticContact(_content: SiteContent): void {
  // no-op: `/` is Next SSR; do not rewrite public/index.htm
}
