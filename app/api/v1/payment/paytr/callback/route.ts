import { NextRequest, NextResponse } from "next/server";
import { verifyPayTrCallback } from "@/lib/integrations/paytr/paytr";
import { updateOrderStatusByPaymentId } from "@/lib/integrations/orders-store";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const merchant_oid = formData.get("merchant_oid")?.toString() || "";
    const status = formData.get("status")?.toString() || "";
    const total_amount = formData.get("total_amount")?.toString() || "";
    const hash = formData.get("hash")?.toString() || "";
    const failed_reason_code = formData.get("failed_reason_code")?.toString() || "";
    const failed_reason_msg = formData.get("failed_reason_msg")?.toString() || "";

    if (!merchant_oid || !status || !hash) {
      return new NextResponse("PAYTR ERROR: BAD REQUEST", { status: 400 });
    }

    const isValid = await verifyPayTrCallback({
      merchant_oid,
      status,
      total_amount,
      hash,
    });

    if (!isValid) {
      console.error("[PayTR Callback] Hash doğrulaması başarısız! OID:", merchant_oid);
      return new NextResponse("PAYTR ERROR: INVALID HASH", { status: 400 });
    }

    if (status === "success") {
      console.log(`[PayTR Callback] Ödeme Başarılı: OID=${merchant_oid}, Tutar=${total_amount}`);
      // Sipariş durumunu güncelle
      try {
        await updateOrderStatusByPaymentId(merchant_oid, "paid");
      } catch (err) {
        console.warn("[PayTR Callback] Sipariş durumu güncellenirken uyarı:", err);
      }
    } else {
      console.warn(`[PayTR Callback] Ödeme Başarısız: OID=${merchant_oid}, Hata=${failed_reason_code} - ${failed_reason_msg}`);
      try {
        await updateOrderStatusByPaymentId(merchant_oid, "payment_failed");
      } catch (err) {
        console.warn("[PayTR Callback] Sipariş durumu güncellenirken uyarı:", err);
      }
    }

    // PayTR sistemine işlemin alındığını bildirmek için kesinlikle OK dönülmelidir.
    return new NextResponse("OK", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("[PayTR Callback] Kritik Hata:", error);
    return new NextResponse("PAYTR ERROR", { status: 500 });
  }
}