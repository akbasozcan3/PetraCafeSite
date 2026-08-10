import { NextResponse } from "next/server";
import crypto from "crypto";
import { requireCustomer, toPublicCustomer } from "@/lib/customer/auth";
import { updateCustomer } from "@/lib/customer/store";
import type { CustomerAddress } from "@/lib/customer/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireCustomer();
    return NextResponse.json({ customer: toPublicCustomer(user) });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const patch: Record<string, unknown> = {};
    if (typeof body.name === "string") patch.name = body.name.trim();
    if (typeof body.phone === "string") patch.phone = body.phone.trim();

    if (Array.isArray(body.addresses)) {
      let sawDefault = false;
      const addresses: CustomerAddress[] = body.addresses.map(
        (a: Partial<CustomerAddress>) => {
          let isDefault = Boolean(a.isDefault);
          if (isDefault) {
            if (sawDefault) isDefault = false;
            else sawDefault = true;
          }
          return {
            id: a.id || crypto.randomUUID(),
            title: String(a.title || "Adres").trim(),
            fullName: String(a.fullName || user.name).trim(),
            phone: String(a.phone || user.phone).trim(),
            city: String(a.city || "").trim(),
            district: String(a.district || "").trim(),
            addressLine: String(a.addressLine || "").trim(),
            notes: a.notes ? String(a.notes) : "",
            isDefault,
          };
        }
      );
      if (addresses.length && !addresses.some((a) => a.isDefault)) {
        addresses[0].isDefault = true;
      }
      patch.addresses = addresses;
    }

    const next = await updateCustomer(user.id, patch as never);
    return NextResponse.json({
      success: true,
      customer: next ? toPublicCustomer(next) : null,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Kayıt başarısız.";
    const status = /unauthorized/i.test(msg) ? 401 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
