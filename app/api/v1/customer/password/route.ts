import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  resetPasswordWithToken,
  startPasswordReset,
} from "@/lib/customer/auth";
import { sendPasswordResetEmail } from "@/lib/mail/smtp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`cust-reset:${ip}`, 8, 60_000)) {
    return NextResponse.json({ error: "Çok fazla deneme." }, { status: 429 });
  }
  try {
    const body = await request.json();
    const action = String(body.action || "request");
    if (action === "request") {
      const email = String(body.email || "").trim();
      const started = await startPasswordReset(email);
      if (started) {
        await sendPasswordResetEmail(started.user.email, started.resetToken);
      }
      return NextResponse.json({
        success: true,
        message: "E-posta kayıtlıysa sıfırlama bağlantısı gönderildi.",
      });
    }
    if (action === "confirm") {
      await resetPasswordWithToken(String(body.token || ""), String(body.password || ""));
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "İşlem başarısız." },
      { status: 400 }
    );
  }
}
