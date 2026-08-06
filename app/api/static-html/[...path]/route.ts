import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_DIR = path.resolve(/* turbopackIgnore: true */ process.cwd(), "public");
const ALLOWED_ROOTS = [
  PUBLIC_DIR,
  path.resolve(/* turbopackIgnore: true */ process.cwd(), "urunler"),
  path.resolve(/* turbopackIgnore: true */ process.cwd(), "blog"),
];
const BLOCKED_SEGMENTS = new Set([
  "data",
  "node_modules",
  ".next",
  ".git",
  "app",
  "lib",
  "components",
  "scripts",
]);

function isInside(base: string, target: string) {
  const rel = path.relative(base, target);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function resolveFile(segments: string[]): string | null {
  if (!segments.length) return null;
  if (
    segments.some(
      (s) =>
        s === ".." ||
        s === "." ||
        s.includes("\0") ||
        s.startsWith(".") ||
        BLOCKED_SEGMENTS.has(s.toLowerCase())
    )
  ) {
    return null;
  }

  let fileSegments = [...segments];
  if (fileSegments.length === 1) {
    if (fileSegments[0] === "urunler") fileSegments = ["urunler", "urunler"];
    else if (fileSegments[0] === "blog") fileSegments = ["blog", "blog"];
  }

  const candidates: string[] = [];
  for (const root of ALLOWED_ROOTS) {
    candidates.push(path.resolve(path.join(root, ...fileSegments)));
    // public/urunler/... and root urunler/... both supported
    if (root === PUBLIC_DIR && (fileSegments[0] === "urunler" || fileSegments[0] === "blog")) {
      // already covered
    }
  }
  // Also try cwd/urunler when rewrite targets extensionless pages outside public
  if (fileSegments[0] === "urunler" || fileSegments[0] === "blog") {
    candidates.push(path.resolve(/* turbopackIgnore: true */ process.cwd(), ...fileSegments));
  }

  for (const candidate of candidates) {
    const allowed = ALLOWED_ROOTS.some((root) => isInside(root, candidate)) ||
      isInside(path.resolve(/* turbopackIgnore: true */ process.cwd(), "urunler"), candidate) ||
      isInside(path.resolve(/* turbopackIgnore: true */ process.cwd(), "blog"), candidate);
    if (!allowed) continue;
    if (!fs.existsSync(candidate)) continue;

    if (!fs.statSync(candidate).isDirectory()) {
      return candidate;
    }

    const basename = path.basename(candidate);
    const innerFile = path.join(candidate, basename);
    if (fs.existsSync(innerFile) && !fs.statSync(innerFile).isDirectory()) {
      const innerAllowed =
        ALLOWED_ROOTS.some((root) => isInside(root, innerFile)) ||
        isInside(path.resolve(/* turbopackIgnore: true */ process.cwd(), "urunler"), innerFile) ||
        isInside(path.resolve(/* turbopackIgnore: true */ process.cwd(), "blog"), innerFile);
      if (innerAllowed) return innerFile;
    }
  }

  return null;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await context.params;
  const file = resolveFile(segments);
  if (!file) {
    return new NextResponse("Not Found", { status: 404 });
  }

  let content = fs.readFileSync(file, "utf8");
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);

  const ext = path.extname(file).toLowerCase();
  let contentType = "text/html; charset=utf-8";
  if (ext === ".css") contentType = "text/css; charset=utf-8";
  else if (ext === ".js") contentType = "application/javascript; charset=utf-8";
  else if (ext === ".json") contentType = "application/json; charset=utf-8";
  else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
  else if (ext === ".png") contentType = "image/png";
  else if (ext === ".svg") contentType = "image/svg+xml";
  else if (ext !== "" && ext !== ".html" && ext !== ".htm") {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (ext === "" || ext === ".html" || ext === ".htm") {
    try {
      const { getContentAsync } = await import("@/lib/db/content");
      const siteData = await getContentAsync();
      if (siteData?.menu?.gruplar) {
        siteData.menu.gruplar.forEach((grup: { ad?: string; image?: string }) => {
          if (grup.ad && grup.image) {
            const escapedAd = grup.ad.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const katRegex = new RegExp(
              `(<a[^>]*class="kat"[^>]*>[\\s\\S]*?<h2>\\s*${escapedAd}\\s*<[\\s\\S]*?<img[^>]*src=")([^"]+)("[^>]*>)`,
              "gi"
            );
            content = content.replace(katRegex, (_match, p1, _oldSrc, p3) => {
              const cleanedP3 = p3.replace(/\s*srcset="[^"]*"/gi, "");
              const finalImage =
                grup.image!.startsWith("http") || grup.image!.startsWith("/")
                  ? grup.image!
                  : "/" + grup.image!.replace(/^\//, "");
              return `${p1}${finalImage}${cleanedP3}`;
            });
          }
        });
      }
    } catch {
      // Ignore if DB/content read fails
    }
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
