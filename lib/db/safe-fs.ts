/**
 * Safe filesystem helpers for Vercel (read-only except /tmp).
 */
import fs from "fs";
import path from "path";

export function isServerlessReadonly(): boolean {
  return process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME != null;
}

/** Writable data dir: /tmp on Vercel, otherwise preferred */
export function writableDataDir(preferred: string): string {
  if (isServerlessReadonly()) {
    return path.join("/tmp", "firinci-data");
  }
  return preferred;
}

export function safeWriteJson(file: string, data: unknown): boolean {
  try {
    const dir = path.dirname(file);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    const msg = (err as Error).message || String(err);
    if (/EROFS|EACCES|read-only/i.test(msg) || isServerlessReadonly()) {
      console.warn("[safe-fs] skip write:", file, msg);
      return false;
    }
    throw err;
  }
}

export function safeReadJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}
