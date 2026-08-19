import { NextResponse } from "next/server";

export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function parseBody<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new Error("Geçersiz JSON gövdesi.");
  }
}

/** Reject cross-site admin mutations (basic CSRF protection). */
export function assertSameOrigin(request: Request) {
  const site = (request.headers.get("sec-fetch-site") || "").toLowerCase();
  if (site === "cross-site") {
    throw new Error("Cross-origin istek reddedildi.");
  }
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    if (!host) throw new Error("Cross-origin istek reddedildi.");
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      throw new Error("Geçersiz Origin.");
    }
    if (originHost !== host) {
      throw new Error("Cross-origin istek reddedildi.");
    }
    return;
  }
  if (site === "same-origin" || site === "none") return;
  throw new Error("Cross-origin istek reddedildi.");
}
