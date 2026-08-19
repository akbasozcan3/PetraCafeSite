import { readFile } from "fs/promises";
import { mimeForExt, resolveUploadFile } from "@/lib/uploads/fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const parts = (await context.params).path || [];
  const abs = resolveUploadFile(parts);
  if (!abs) {
    return new Response("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const bytes = await readFile(abs);
    const ext = path.extname(abs).slice(1).toLowerCase();
    const type = mimeForExt(ext) || "application/octet-stream";
    return new Response(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type":
          type === "image/svg+xml" ? "image/svg+xml; charset=utf-8" : type,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        ...(ext === "svg"
          ? {
              "Content-Security-Policy":
                "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:; sandbox",
            }
          : {}),
      },
    });
  } catch {
    return new Response("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
