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
  const origin = request.headers.get("origin");
  if (!origin) return;
  const host = request.headers.get("host");
  if (!host) return;
  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new Error("Geçersiz Origin.");
  }
  if (originHost !== host) {
    throw new Error("Cross-origin istek reddedildi.");
  }
}
