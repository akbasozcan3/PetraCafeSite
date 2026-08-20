import { NextRequest, NextResponse } from "next/server";
import { createPayTrToken, getPayTrConfig } from "@/lib/integrations/paytr/paytr";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      userEmail,
      userName,
      userPhone,
      userAddress,
      basket,
      orderId,
    } = body;

    const paymentAmount = Number(amount);
    if (!paymentAmount || paymentAmount <= 0) {
      return NextResponse.json({ error: "Geçersiz ödeme tutarı" }, { status: 400 });
    }

    const host = req.headers.get("host") || "petra-cafe-site.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    const merchantOid = orderId || `PETRA_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const userIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const basketItems = Array.isArray(basket) && basket.length > 0
      ? basket
      : [{ name: "Petra Cafe Sipariş / Ön Ödeme", price: paymentAmount, quantity: 1 }];

    const result = await createPayTrToken({
      merchantOid,
      userEmail: userEmail || "misafir@petracafe.com",
      userName: userName || "Misafir Müşteri",
      userPhone: userPhone || "05306089051",
      userAddress: userAddress || "Petra Cafe, Çekmeköy / İstanbul",
      paymentAmount,
      userIp,
      basket: basketItems,
      okUrl: `${origin}/odeme/basarili?oid=${merchantOid}`,
      failUrl: `${origin}/odeme/basarisiz?oid=${merchantOid}`,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      token: result.token,
      merchantOid,
      iframeUrl: `https://www.paytr.com/odeme/guvenli/${result.token}`,
    });
  } catch (error) {
    console.error("[PayTR Create Payment API] Hata:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ödeme oturumu başlatılamadı." },
      { status: 500 }
    );
  }
}