import { NextRequest, NextResponse } from "next/server";
import { createPayTrToken } from "@/lib/integrations/paytr/paytr";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Geçersiz istek formatı." },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
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
      return NextResponse.json(
        { success: false, error: "Geçersiz kapora/ödeme tutarı." },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const host = req.headers.get("host") || "petra-cafe-site.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    const merchantOid = orderId || `PETRA_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const userIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip")?.trim() ||
      "127.0.0.1";

    const resolvedBasket = Array.isArray(basket) && basket.length > 0
      ? basket
      : Array.isArray(basketItems) && basketItems.length > 0
      ? basketItems.map((item: any) => ({
          name: Array.isArray(item) ? item[0] : item.name || "Rezervasyon Kaporası",
          price: Array.isArray(item) ? item[1] : item.price || paymentAmount,
          quantity: Array.isArray(item) ? item[2] : item.quantity || 1,
        }))
      : [{ name: "Petra Rezervasyon Kaporası", price: paymentAmount, quantity: 1 }];

    const result = await createPayTrToken({
      merchantOid,
      userEmail: userEmail || email || "misafir@petracafe.com",
      userName: userName || name || "Misafir Müşteri",
      userPhone: userPhone || phone || "05306089051",
      userAddress: userAddress || "Petra Cafe & Restaurant, Çekmeköy / İstanbul",
      paymentAmount,
      userIp,
      basket: resolvedBasket,
      okUrl: `${origin}/odeme/basarili?oid=${merchantOid}`,
      failUrl: `${origin}/odeme/basarisiz?oid=${merchantOid}`,
    });

    if (!result.ok || !result.token) {
      return NextResponse.json(
        {
          success: false,
          error:
            result.error ||
            "PayTR Sanal POS anahtarları (PAYTR_MERCHANT_ID, PAYTR_MERCHANT_KEY, PAYTR_MERCHANT_SALT) henüz Vercel veya Admin Paneline girilmemiş. Lütfen ortam değişkenlerini tanımlayın.",
        },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json(
      {
        success: true,
        token: result.token,
        merchantOid,
        iframeUrl: `https://www.paytr.com/odeme/guvenli/${result.token}`,
      },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[PayTR Create Payment API] Hata:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "PayTR ödeme oturumu başlatılamadı. Lütfen PayTR ortam değişkenlerinizi kontrol edin.",
      },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}