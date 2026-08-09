import { randomUUID } from "crypto";

/** Secrets asla loglanmaz */
export function trendyolLog(
  level: "info" | "warn" | "error",
  message: string,
  meta?: { status?: number; endpoint?: string; correlationId?: string }
) {
  const line = {
    tag: "[Trendyol Go]",
    level,
    message,
    status: meta?.status,
    endpoint: meta?.endpoint,
    correlationId: meta?.correlationId || randomUUID(),
    at: new Date().toISOString(),
  };
  if (level === "error") console.error(JSON.stringify(line));
  else if (level === "warn") console.warn(JSON.stringify(line));
  else console.info(JSON.stringify(line));
}
