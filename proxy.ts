import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "firinci_admin_token";
const FALLBACK_SECRET = "firinci-super-secret-key-change-in-production";
const EXAMPLE_SECRETS = new Set([
  FALLBACK_SECRET,
  "degistir-benzersiz-uzun-gizli-anahtar-32-karakter-veya-daha-uzun",
  "change-me",
  "secret",
]);

function isWeakJwtSecret() {
  const secret = (process.env.JWT_SECRET || "").trim();
  if (!secret || secret.length < 32) return true;
  return EXAMPLE_SECRETS.has(secret);
}

function getJwtKey() {
  const secret = (process.env.JWT_SECRET || "").trim();
  const weak = isWeakJwtSecret();
  if (process.env.NODE_ENV === "production" && weak) return null;
  return new TextEncoder().encode(weak ? FALLBACK_SECRET : secret);
}

const SHOP_GONE = [
  "/sepet",
  "/favoriler",
  "/checkout",
  "/hesabim",
  "/admin/musteriler",
  "/admin/web-siparisler",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    SHOP_GONE.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    )
  ) {
    const dest = pathname.startsWith("/admin") ? "/admin" : "/urunler";
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
    "/admin/:path*",
    "/sepet",
    "/sepet/:path*",
    "/favoriler",
    "/favoriler/:path*",
    "/checkout",
    "/checkout/:path*",
    "/hesabim",
    "/hesabim/:path*",
  ],
};
