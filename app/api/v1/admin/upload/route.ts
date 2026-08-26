import { randomBytes } from "crypto";
import { requirePermission } from "@/lib/auth";
import { getContentAsync, saveContentAsync } from "@/lib/db/content";
import { IMAGE_KEYS, type ImageKey } from "@/lib/content/image-keys";
import { jsonResponse, errorResponse, assertSameOrigin } from "@/lib/api/helpers";
import { put, del } from "@vercel/blob";
import { appendActivity } from "@/lib/db/activity";
import { revalidatePublicSite } from "@/lib/api/gone";
import { revalidatePath } from "next/cache";
import { writeUploadFile } from "@/lib/uploads/fs";
import { getBlobReadWriteToken, isVercelBlobUrl } from "@/lib/uploads/blob";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "video/mp4",
  "video/webm",
]);

const EXT_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  mp4: "video/mp4",
  webm: "video/webm",
};

function decodeSvgText(bytes: Buffer): string {
  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return bytes.subarray(3).toString("utf8");
  }
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return bytes.subarray(2).toString("utf16le");
  }
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    const swapped = Buffer.alloc(bytes.length - 2);
    for (let i = 2; i + 1 < bytes.length; i += 2) {
      swapped[i - 2] = bytes[i + 1];
      swapped[i - 1] = bytes[i];
    }
    return swapped.toString("utf16le");
  }
  return bytes.toString("utf8");
}

function resolveMime(file: File, bytes?: Buffer): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (ext && EXT_MIME[ext]) return EXT_MIME[ext];
  if (file.type && ALLOWED_TYPES.has(file.type)) return file.type;
  if (
    bytes &&
    (file.type === "application/octet-stream" ||
      file.type === "application/xml" ||
      file.type === "text/xml" ||
      file.type === "text/plain" ||
      !file.type) &&
    /<svg[\s>]/i.test(decodeSvgText(bytes))
  ) {
    return "image/svg+xml";
  }
  return null;
}

function looksLikeMp4(bytes: Buffer): boolean {
  return bytes.length > 12 && bytes.slice(4, 8).toString("ascii") === "ftyp";
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
  if (mime === "image/x-icon" || mime === "image/vnd.microsoft.icon") {
    const icoHeader = bytes[0] === 0 && bytes[1] === 0 && bytes[2] === 1 && bytes[3] === 0;
    const png = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    return icoHeader || png;
  }
  return false;
}

/** Strip scripts / event handlers from SVG logos (safe for <img>). */
function sanitizeSvg(bytes: Buffer): Buffer | null {
  let text = decodeSvgText(bytes);
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
  if (dangerous && /<script/i.test(decodeSvgText(bytes))) {
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
    case "image/x-icon":
    case "image/vnd.microsoft.icon":
      return "ico";
    case "video/mp4":
      return "mp4";
    case "video/webm":
      return "webm";
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

    if (file.size > MAX_BYTES) {
      return errorResponse("Dosya boyutu en fazla 8MB olabilir.", 400);
    }
    if (file.size === 0) {
      return errorResponse("Boş dosya yüklenemez.", 400);
    }

    const blobToken = getBlobReadWriteToken();

    let bytes = Buffer.from(await file.arrayBuffer());
    const mime = resolveMime(file, bytes);
    if (!mime || !ALLOWED_TYPES.has(mime)) {
      return errorResponse(
        "Yalnızca JPEG, PNG, WebP, GIF, AVIF, SVG, ICO veya MP4 yüklenebilir.",
        400
      );
    }
    const ext = extensionForMime(mime);
    const filename = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
    if (mime === "video/mp4" || mime === "video/webm") {
      if (mime === "video/mp4" && !looksLikeMp4(bytes)) {
        return errorResponse("Dosya geçerli bir MP4 video değil.", 400);
      }
    } else if (!looksLikeImage(bytes, mime)) {
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

    let publicPath: string = "";

    if (blobToken) {
      try {
        const folder =
          key && (key.includes("pasta") || key.includes("havuz"))
            ? "pasta"
            : key && key.includes("spor")
              ? "spor-salonu"
              : key && key in IMAGE_KEYS
                ? "site"
                : key || "media";
        const result = await put(`${folder}/${filename}`, bytes, {
          access: "public",
          token: blobToken,
          contentType: mime === "image/svg+xml" ? "image/svg+xml; charset=utf-8" : mime,
        });
        if (result?.url) {
          publicPath = result.url;
        }
      } catch (blobErr) {
        console.warn("[Upload] Vercel Blob failed:", blobErr);
      }
    }

    if (!publicPath) {
      const isProd = process.env.VERCEL || process.env.NODE_ENV === "production";
      if (isProd) {
        return errorResponse(
          blobToken
            ? "Vercel Blob'a yükleme başarısız. Lütfen tekrar deneyin."
            : "BLOB_READ_WRITE_TOKEN tanımlı değil. Vercel Blob yapılandırmasını kontrol edin.",
          503
        );
      }
      try {
        await writeUploadFile("site", filename, bytes);
        publicPath = `/uploads/site/${filename}`;
      } catch {
        return errorResponse("Görsel yüklenemedi.", 500);
      }
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
      detail: key ? `${key} → ${publicPath.slice(0, 80)}` : publicPath.slice(0, 80),
    });

    revalidatePublicSite();
    revalidatePath("/admin/images");

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
    const detail = error instanceof Error ? error.message : "Görsel yüklenemedi.";
    return errorResponse(detail, 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requirePermission("media:write");
    assertSameOrigin(request);

    const body = (await request.json().catch(() => ({}))) as { url?: string };
    const url = String(body.url || "").trim();

    if (!url) {
      return errorResponse("URL gerekli.", 400);
    }

    const blobToken = getBlobReadWriteToken();

    if (isVercelBlobUrl(url) && blobToken) {
      try {
        await del(url, { token: blobToken });
      } catch (delErr) {
        console.warn("[Upload Delete] Blob deletion warning:", delErr);
      }
    }

    await appendActivity({
      userId: session.id,
      email: session.email,
      name: session.name,
      action: "media.delete",
      detail: url.slice(0, 80),
    });

    return jsonResponse({ success: true, url });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return errorResponse("Unauthorized", 401);
    }
    if (error instanceof Error && /forbidden/i.test(error.message)) {
      return errorResponse("Bu işlem için yetkiniz yok.", 403);
    }
    console.error("[Upload Delete Error]", error);
    return errorResponse("Görsel silinemedi.", 500);
  }
}
