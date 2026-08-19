import fs from "fs";
import path from "path";

const EXT_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
  ico: "image/x-icon",
};

export function dataUploadsDir(folder = "site") {
  const dir = path.join(process.cwd(), "data", "uploads", folder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function publicUploadsDir(folder = "site") {
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Yazma hedefi: data/uploads (next start public/ dosyalarını canlı servis etmez). */
export function getWritableUploadsDir(folder = "site") {
  return dataUploadsDir(folder);
}

export function mimeForExt(ext: string): string | undefined {
  return EXT_MIME[ext.replace(/^\./, "").toLowerCase()];
}

export function isSafeUploadRel(parts: string[]): boolean {
  if (!parts.length) return false;
  return parts.every(
    (p) =>
      !!p &&
      p !== "." &&
      p !== ".." &&
      !p.includes("\\") &&
      !p.includes("/") &&
      !p.includes("\0")
  );
}

export function resolveUploadFile(parts: string[]): string | null {
  if (!isSafeUploadRel(parts)) return null;
  const ext = path.extname(parts[parts.length - 1] || "").slice(1).toLowerCase();
  if (!mimeForExt(ext)) return null;

  const roots = [
    path.resolve(process.cwd(), "data", "uploads"),
    path.resolve(process.cwd(), "public", "uploads"),
  ];
  for (const root of roots) {
    const resolved = path.resolve(root, ...parts);
    const rel = path.relative(root, resolved);
    if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      return resolved;
    }
  }
  return null;
}

export async function writeUploadFile(folder: string, filename: string, bytes: Buffer) {
  const dataDir = dataUploadsDir(folder);
  const publicDir = publicUploadsDir(folder);
  const dataPath = path.join(dataDir, filename);
  await fs.promises.writeFile(dataPath, bytes);
  try {
    await fs.promises.writeFile(path.join(publicDir, filename), bytes);
  } catch {
    /* public kopyası isteğe bağlı — asıl kaynak data/uploads */
  }
  return dataPath;
}
