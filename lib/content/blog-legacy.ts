import fs from "fs";
import path from "path";

/** Extract <article class="article"> inner HTML from legacy static blog files. */
export function readLegacyBlogArticleHtml(slug: string): string | null {
  const candidates = [
    path.join(process.cwd(), "public", "blog", slug, slug),
    path.join(process.cwd(), "blog", slug, slug),
  ];
  for (const file of candidates) {
    try {
      if (!fs.existsSync(file)) continue;
      const html = fs.readFileSync(file, "utf8");
      const m = html.match(/<article class="article">([\s\S]*?)<\/article>/i);
      if (!m) continue;
      let inner = m[1];
      // Drop crumbs + head (we render those in React)
      inner = inner.replace(/<nav class="crumbs"[\s\S]*?<\/nav>/i, "");
      inner = inner.replace(/<header class="article__head">[\s\S]*?<\/header>/i, "");
      // Fix relative homepage links
      inner = inner.replace(/\.\.\/\.\.\/index\.htm/gi, "/");
      inner = inner.replace(/index\.htm#/gi, "/#");
      inner = inner.replace(/\.\.\/blog/gi, "/blog");
      return inner.trim();
    } catch {
      /* try next */
    }
  }
  return null;
}
