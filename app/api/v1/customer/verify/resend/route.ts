import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  issueEmailVerification,
  requireCustomer,
  toPublicCustomer,
} from "@/lib/customer/auth";
import { sendVerificationEmail } from "@/lib/mail/smtp";

export const runtime = "nodejs";

/** Oturum açmış kullanıcıya doğrulama e-postasını yeniden gönder */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`cust-resend-verify:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Biraz bekleyin." },
      { status: 429 }
    );
  }

  try {
    const user = await requireCustomer();
    if (user.emailVerifiedAt) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        customer: toPublicCustomer(user),
        message: "E-posta zaten doğrulanmış.",
      });
    }
    const { customer, verifyToken } = await issueEmailVerification(user.id);
    const mail = await sendVerificationEmail(customer.email, verifyToken);
    return NextResponse.json({
      success: true,
      customer: toPublicCustomer(customer),
      emailSent: mail.ok,
      emailSkipped: mail.skipped,
      message: mail.skipped
        ? "SMTP ayarlanmadığı için e-posta gönderilemedi. Daha sonra tekrar deneyin."
        : "Doğrulama e-postası gönderildi. Gelen kutunuzu kontrol edin.",
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Gönderilemedi.";
    const status = /unauthorized/i.test(msg) ? 401 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
