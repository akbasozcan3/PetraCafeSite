import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { verifyEmailToken, toPublicCustomer } from "@/lib/customer/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`cust-verify:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "Çok fazla deneme." }, { status: 429 });
  }
  try {
    const body = await request.json();
    const token = String(body.token || "");
    if (!token) return NextResponse.json({ error: "Token gerekli." }, { status: 400 });
    const user = await verifyEmailToken(token);
    if (!user) return NextResponse.json({ error: "Doğrulama başarısız." }, { status: 400 });
    return NextResponse.json({ success: true, customer: toPublicCustomer(user) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Doğrulama başarısız." },
      { status: 400 }
    );
  }
}
