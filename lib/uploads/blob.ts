/** Vercel Blob public URL (admin + site). */
export function isVercelBlobUrl(url?: string | null): boolean {
  return !!url && url.includes("blob.vercel-storage.com");
}

/** Server-side only — never expose to client bundles. */
export function getBlobReadWriteToken(): string {
  return (process.env.BLOB_READ_WRITE_TOKEN || "").trim();
}
