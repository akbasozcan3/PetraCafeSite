import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  clearCustomerSession,
  createCustomerSession,
  getCustomerSession,
  loginCustomer,
  toPublicCustomer,
} from "@/lib/customer/auth";

export const runtime = "nodejs";

export async function GET() {
  const customer = await getCustomerSession();
  return NextResponse.json({ customer });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`cust-login:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Çok fazla deneme." }, { status: 429 });
  }
  try {
    const body = await request.json();
    const action = String(body.action || "login");
    if (action === "logout") {
      await clearCustomerSession();
      return NextResponse.json({ success: true });
    }
    const user = await loginCustomer(String(body.email || ""), String(body.password || ""));
    if (!user) {
      return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
    }
    await createCustomerSession(user);
    return NextResponse.json({ success: true, customer: toPublicCustomer(user) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Giriş başarısız." },
      { status: 400 }
    );
  }
}
