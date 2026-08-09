import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getCustomerSession } from "@/lib/customer/auth";
import {
  createWebOrder,
  listOrdersForCustomer,
  getOrderForAccess,
  sanitizeOrderForCustomer,
} from "@/lib/customer/orders";
import { sendOrderConfirmationEmail } from "@/lib/mail/smtp";
import type { CartLine, CustomerAddress, PaymentMethod } from "@/lib/customer/types";

export const runtime = "nodejs";

const PAYMENTS: PaymentMethod[] = ["cash_on_delivery", "store_pickup", "whatsapp"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  const token = searchParams.get("t") || "";

  if (id) {
    const session = await getCustomerSession();
    const order = await getOrderForAccess({
      orderId: id,
      accessToken: token || undefined,
      customerId: session?.id,
    });
    if (!order) {
      return NextResponse.json({ error: "Sipariş bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({
      order: sanitizeOrderForCustomer(order),
      accessToken: token && order.accessToken === token ? order.accessToken : undefined,
    });
  }

  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await listOrdersForCustomer(session.id);
  return NextResponse.json({
    orders: orders.map(sanitizeOrderForCustomer),
  });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`cust-order:${ip}`, 12, 60_000)) {
    return NextResponse.json({ error: "Çok fazla sipariş denemesi." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const items = (Array.isArray(body.items) ? body.items : []) as CartLine[];
    if (!items.length) {
      return NextResponse.json({ error: "Sepet boş." }, { status: 400 });
    }
    const cleanItems = items
      .filter((i) => i && i.ad && Number(i.qty) > 0)
      .map((i) => ({
        slug: String(i.slug || ""),
        ad: String(i.ad),
        fiyat: i.fiyat ? String(i.fiyat) : "",
        qty: Math.min(99, Math.max(1, Number(i.qty) || 1)),
      }));
    if (!cleanItems.length) {
      return NextResponse.json({ error: "Geçersiz sepet." }, { status: 400 });
    }

    const paymentMethod = PAYMENTS.includes(body.paymentMethod)
      ? (body.paymentMethod as PaymentMethod)
      : "cash_on_delivery";

    const session = await getCustomerSession();
    const guestName = String(body.guestName || body.name || "").trim();
    const guestEmail = String(body.guestEmail || body.email || "").trim();
    const guestPhone = String(body.guestPhone || body.phone || "").trim();

    if (!session && (!guestName || !guestPhone)) {
      return NextResponse.json(
        { error: "Misafir siparişte ad ve telefon zorunlu." },
        { status: 400 }
      );
    }

    const address = body.address
      ? ({
          id: String(body.address.id || "checkout"),
          title: String(body.address.title || "Teslimat"),
          fullName: String(body.address.fullName || guestName || session?.name || ""),
          phone: String(body.address.phone || guestPhone || session?.phone || ""),
          city: String(body.address.city || ""),
          district: String(body.address.district || ""),
          addressLine: String(body.address.addressLine || ""),
          notes: String(body.address.notes || ""),
        } as CustomerAddress)
      : null;

    if (paymentMethod !== "store_pickup" && (!address?.addressLine || !address.city)) {
      return NextResponse.json(
        { error: "Teslimat için şehir ve adres gerekli (veya mağazadan teslim seçin)." },
        { status: 400 }
      );
    }

    const totalText = cleanItems
      .map((i) => `${i.ad} x${i.qty}${i.fiyat ? ` (${i.fiyat})` : ""}`)
      .join(", ");

    const order = await createWebOrder({
      customerId: session?.id || null,
      guestEmail: guestEmail || session?.email || null,
      guestName: guestName || session?.name || null,
      guestPhone: guestPhone || session?.phone || null,
      items: cleanItems,
      address,
      paymentMethod,
      note: String(body.note || ""),
      totalText,
    });

    const to = order.guestEmail || session?.email;
    if (to) {
      await sendOrderConfirmationEmail({
        to,
        publicCode: order.publicCode,
        accessToken: order.accessToken,
        itemsSummary: totalText,
      });
    }

    return NextResponse.json({
      success: true,
      order: sanitizeOrderForCustomer(order),
      accessToken: order.accessToken,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sipariş oluşturulamadı." },
      { status: 400 }
    );
  }
}
