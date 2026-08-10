import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  createCustomerSession,
  registerCustomer,
  toPublicCustomer,
} from "@/lib/customer/auth";
import { sendVerificationEmail } from "@/lib/mail/smtp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`cust-register:${ip}`, 8, 60_000)) {
    return NextResponse.json({ error: "Çok fazla deneme. Biraz bekleyin." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");
    const password2 = String(body.passwordConfirm || body.password2 || "");

    if (!name || !email) {
      return NextResponse.json({ error: "Ad ve e-posta zorunlu." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Şifre en az 8 karakter olmalı." },
        { status: 400 }
      );
    }
    if (password !== password2) {
      return NextResponse.json({ error: "Şifreler eşleşmiyor." }, { status: 400 });
    }

    const { customer, verifyToken } = await registerCustomer({
      name,
      email,
      phone: phone || "",
      password,
    });
    const mail = await sendVerificationEmail(customer.email, verifyToken);
    await createCustomerSession(customer);

    return NextResponse.json({
      success: true,
      customer: toPublicCustomer(customer),
      emailSent: mail.ok,
      emailSkipped: mail.skipped,
      message: mail.skipped
        ? "Kayıt oluştu. Doğrulama e-postası şu an gönderilemedi — gelen kutunuzu daha sonra kontrol edin veya Hesabım’dan yeniden gönderin."
        : "Kayıt oluştu. E-posta kutunuzu doğrulayın.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Kayıt başarısız." },
      { status: 400 }
    );
  }
}
