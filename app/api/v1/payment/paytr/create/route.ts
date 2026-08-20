import { NextRequest, NextResponse } from "next/server";
import { createPayTrToken } from "@/lib/integrations/paytr/paytr";

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Geçersiz istek gövdesi (JSON bekleniyor)." }, { status: 400 });
    }

    const {
      amount,
      userEmail,
      email,
      userName,
      name,
      userPhone,
      phone,
      userAddress,
      basket,
      basketItems,
      orderId,
    } = body || {};

    const paymentAmount = Number(amount) || 250;
    if (paymentAmount <= 0) {
      return NextResponse.json({ error: "Geçersiz ödeme tutarı." }, { status: 400 });
    }

    const host = req.headers.get("host") || "petra-cafe-site.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    const merchantOid = orderId || `PETRA_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const userIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const resolvedBasket = Array.isArray(basket) && basket.length > 0
      ? basket
      : Array.isArray(basketItems) && basketItems.length > 0
      ? basketItems.map((item: any) => ({
          name: Array.isArray(item) ? item[0] : item.name || "Rezervasyon Kaporası",
          price: Array.isArray(item) ? item[1] : item.price || paymentAmount,
          quantity: Array.isArray(item) ? item[2] : item.quantity || 1,
        }))
      : [{ name: "Petra Masa Rezervasyon Kaporası", price: paymentAmount, quantity: 1 }];

    const result = await createPayTrToken({
      merchantOid,
      userEmail: userEmail || email || "misafir@petracafe.com",
      userName: userName || name || "Misafir Müşteri",
      userPhone: userPhone || phone || "05306089051",
      userAddress: userAddress || "Petra Cafe, Çekmeköy / İstanbul",
      paymentAmount,
      userIp,
      basket: resolvedBasket,
      okUrl: `${origin}/odeme/basarili?oid=${merchantOid}`,
      failUrl: `${origin}/odeme/basarisiz?oid=${merchantOid}`,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error || "PayTR token üretilemedi." }, { status: 400 });
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