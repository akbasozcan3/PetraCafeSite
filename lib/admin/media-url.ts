/** Admin ve sitede göreli medya yollarını mutlak URL'ye çevirir. */
export function resolveMediaUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  if (path.startsWith("/")) return path;
  return `/${path.replace(/^\//, "")}`;
}

/** Lokal `/uploads/` yolu — gitignore, Vercel build'e girmez. */
export function isLocalUploadPath(path?: string | null): boolean {
  return !!path && (path.startsWith("/uploads/") || path.startsWith("uploads/"));
}

/**
 * Vercel'de `/uploads/` dosyaları deploy edilmez.
 * Blob URL yoksa statik fallback kullan (siyah hero / kırık görsel önlenir).
 */
export function resolveProductionMediaPath(
  path: string | undefined,
  fallback?: string
): string {
  if (!path) return fallback ? resolveMediaUrl(fallback) : "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = resolveMediaUrl(path);
  const hosted =
    process.env.VERCEL === "1" || process.env.NETLIFY === "true";
  if (hosted && isLocalUploadPath(normalized)) {
    return fallback ? resolveMediaUrl(fallback) : normalized;
  }
  return normalized;
}

export function withCacheBust(url: string, key?: string | number): string {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}v=${key ?? Date.now()}`;
}

/** Hero görselleri için dosya adından sürüm (admin yüklemeleri anında yansır). */
export function heroMediaVersion(url?: string | null): string {
  if (!url) return "default";
  const clean = url.split("?")[0] || url;
  const uploaded = clean.match(/\/(\d{10,})-/);
  if (uploaded?.[1]) return uploaded[1];
  const base = clean.split("/").pop() || "asset";
  return base.replace(/\.[^.]+$/, "") || "asset";
}

export function withHeroCacheBust(url?: string | null): string {
  if (!url) return "";
  return withCacheBust(resolveMediaUrl(url), heroMediaVersion(url));
}
