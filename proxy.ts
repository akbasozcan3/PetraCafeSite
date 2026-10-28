import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "firinci_admin_token";
const FALLBACK_SECRET =
  "petra-cafe-restaurant-production-secure-jwt-secret-key-2026-v2-safe-key";
const EXAMPLE_SECRETS = new Set([
  "firinci-super-secret-key-change-in-production",
  "degistir-benzersiz-uzun-gizli-anahtar-32-karakter-veya-daha-uzun",
  "change-me",
  "secret",
]);

function getEffectiveJwtSecret(): string {
  const secret = (
    process.env.JWT_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.ADMIN_SECRET ||
    ""
  ).trim();
  if (secret && secret.length >= 16 && !EXAMPLE_SECRETS.has(secret)) {
    return secret;
  }
  return FALLBACK_SECRET;
}

function getJwtKey() {
  const secret = getEffectiveJwtSecret();
  return new TextEncoder().encode(secret);
}

const SHOP_GONE = [
  "/sepet",
  "/favoriler",
  "/checkout",
  "/hesabim",
  "/admin/musteriler",
  "/admin/web-siparisler",
];

const API_GONE = ["/api/v1/customer", "/api/v1/admin/web-shop"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/uploads/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/media/")) {
    const rest = pathname.replace(/^\/(uploads|media)\//, "");
    if (!rest || rest.includes("..")) {
      return new NextResponse("Not found", { status: 404 });
    }
    const url = request.nextUrl.clone();
    url.pathname = `/api/v1/media/${rest}`;
    return NextResponse.rewrite(url);
  }

  if (API_GONE.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.json({ error: "Bu özellik kapatıldı." }, { status: 410 });
  }

  if (
    SHOP_GONE.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    )
  ) {
    const dest = pathname.startsWith("/admin") ? "/admin" : "/menu";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const key = getJwtKey();
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!key || !token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, key);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/uploads/:path*",
    "/media/:path*",
    "/sepet",
    "/sepet/:path*",
    "/favoriler",
    "/favoriler/:path*",
    "/checkout",
    "/checkout/:path*",
    "/hesabim",
    "/hesabim/:path*",
    "/api/v1/customer",
    "/api/v1/customer/:path*",
    "/api/v1/admin/:path*",
  ],
};
