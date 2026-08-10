import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { requirePermission } from "@/lib/auth";
import { getContentAsync, saveContentAsync, getUploadsDir } from "@/lib/db/content";
import { IMAGE_KEYS, type ImageKey } from "@/lib/content/image-keys";
import { jsonResponse, errorResponse, assertSameOrigin } from "@/lib/api/helpers";
import { put } from "@vercel/blob";
import { appendActivity } from "@/lib/db/activity";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
]);

const EXT_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
};

function resolveMime(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const fromExt = EXT_MIME[ext];
  if (file.type && ALLOWED_TYPES.has(file.type)) {
    // Extension must also match when present
    if (fromExt && fromExt !== file.type) return null;
    return file.type;
  }
  if (fromExt) return fromExt;
  return null;
}

function looksLikeImage(bytes: Buffer, mime: string): boolean {
  if (bytes.length < 12) return false;
  if (mime === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8;
  if (mime === "image/png") {
    return (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47
    );
  }
  if (mime === "image/gif") {
    return bytes.slice(0, 3).toString("ascii") === "GIF";
  }
  if (mime === "image/webp") {
    return (
      bytes.slice(0, 4).toString("ascii") === "RIFF" &&
      bytes.slice(8, 12).toString("ascii") === "WEBP"
    );
  }
  if (mime === "image/avif") {
    // ISO BMFF: ....ftyp....
    return bytes.slice(4, 8).toString("ascii") === "ftyp";
  }
  if (mime === "image/svg+xml") {
    return sanitizeSvg(bytes) !== null;
  }
  return false;
}

/** Strip scripts / event handlers from SVG logos (safe for <img>). */
function sanitizeSvg(bytes: Buffer): Buffer | null {
  let text = bytes.toString("utf8");
  if (!/<svg[\s>]/i.test(text)) return null;

  const dangerous =
    /<script[\s\S]*?<\/script>/gi.test(text) ||
    /<foreignObject[\s\S]*?<\/foreignObject>/gi.test(text) ||
    /\bjavascript\s*:/i.test(text);

  text = text
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(
      /\s(href|xlink:href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi,
      ' $1="#"'
    );

  if (!/<svg[\s>]/i.test(text)) return null;
  if (dangerous && /<script/i.test(bytes.toString("utf8"))) {
    // Scripts were present — only accept after strip if <svg> remains and no leftover handlers
    if (/\son[a-z]+\s*=/i.test(text) || /\bjavascript\s*:/i.test(text)) return null;
  }
  // Ensure xmlns for broader browser compatibility
  if (!/\sxmlns\s*=/i.test(text)) {
    text = text.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return Buffer.from(text, "utf8");
}

function extensionForMime(mime: string): string {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/avif":
      return "avif";
    case "image/svg+xml":
      return "svg";
    default:
      return "jpg";
  }
}

export async function POST(request: Request) {
  try {
    const session = await requirePermission("media:write");
    assertSameOrigin(request);

    const formData = await request.formData();
    const file = formData.get("file");
    const keyRaw = String(formData.get("key") || "").trim();
    const key = (keyRaw || null) as ImageKey | null;

    if (!(file instanceof File)) {
      return errorResponse("Dosya gerekli.", 400);
    }

    const mime = resolveMime(file);
    if (!mime || !ALLOWED_TYPES.has(mime)) {
      return errorResponse(
        "Yalnızca JPEG, PNG, WebP, GIF, AVIF veya SVG yüklenebilir.",
        400
      );
    }
    if (file.size > MAX_BYTES) {
      return errorResponse("Dosya boyutu en fazla 8MB olabilir.", 400);
    }
    if (file.size === 0) {
      return errorResponse("Boş dosya yüklenemez.", 400);
    }

    if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
      return errorResponse(
        "Vercel Blob yapılandırması eksik (BLOB_READ_WRITE_TOKEN).",
        503
      );
    }

    const ext = extensionForMime(mime);
    const filename = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
    let bytes = Buffer.from(await file.arrayBuffer());
    if (!looksLikeImage(bytes, mime)) {
      return errorResponse(
        mime === "image/svg+xml"
          ? "Geçersiz veya güvensiz SVG (script / zararlı içerik)."
          : "Dosya geçerli bir görsel değil.",
        400
      );
    }
    if (mime === "image/svg+xml") {
      const clean = sanitizeSvg(bytes);
      if (!clean) {
        return errorResponse("SVG temizlenemedi. Geçerli bir logo SVG’si yükleyin.", 400);
      }
      bytes = Buffer.from(clean);
    }

    let publicPath: string;

    if (process.env.VERCEL) {
      // Vercel Blob Storage
      const folder = key ? "site" : "menu";
      const result = await put(`${folder}/${filename}`, bytes, {
        access: "public",
        contentType: mime === "image/svg+xml" ? "image/svg+xml; charset=utf-8" : mime,
      });
      publicPath = result.url;
    } else {
      // Local filesystem
      const uploadDir = getUploadsDir("site");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), bytes);
      publicPath = `/uploads/site/${filename}`;
    }

    // If the caller provided a known image key, save it into content.images
    let responseData: { url: string; key: ImageKey | null; data?: unknown } = {
      url: publicPath,
      key,
    };

    if (key && key in IMAGE_KEYS) {
      const content = await getContentAsync();
      content.images = { ...content.images, [key]: publicPath };
      const next = await saveContentAsync({ images: content.images });
      responseData.data = next;
    }

    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "media.upload",
      detail: key ? `${key} → ${publicPath}` : publicPath,
    });

    revalidatePath("/");
    revalidatePath("/urunler");
    revalidatePath("/blog");

    return jsonResponse(responseData);
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    if (error instanceof Error && /Origin|Cross-origin/i.test(error.message)) {
      return errorResponse(error.message, 400);
    }
    console.error("[Upload Error]", error);
    return errorResponse("Görsel yüklenemedi.", 500);
  }
}
