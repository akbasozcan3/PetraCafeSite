/** Admin ve sitede göreli medya yollarını mutlak URL'ye çevirir. */
export function resolveMediaUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  if (path.startsWith("/")) return path;
  return `/${path.replace(/^\//, "")}`;
}

export function withCacheBust(url: string, key?: string | number): string {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}v=${key ?? Date.now()}`;
}
