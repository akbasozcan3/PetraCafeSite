import { NextResponse } from "next/server";
import { RESTAURANT_TABLES, RestaurantTable } from "@/lib/content/tables-data";
import { getAppSetting, setAppSetting } from "@/lib/db/settings";

const SETTING_KEY = "restaurant_tables_data";

export async function GET() {
  try {
    const raw = await getAppSetting(SETTING_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return NextResponse.json({ success: true, tables: parsed });
      }
    }
  } catch (err) {
    console.error("[GET /api/v1/tables] Hata:", err);
  }
  return NextResponse.json({ success: true, tables: RESTAURANT_TABLES });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body?.tables)) {
      return NextResponse.json({ error: "Geçersiz masa verisi." }, { status: 400 });
    }

    await setAppSetting(SETTING_KEY, JSON.stringify(body.tables));
    return NextResponse.json({ success: true, message: "Masa konumları başarıyla kaydedildi.", tables: body.tables });
  } catch (err: any) {
    console.error("[POST /api/v1/tables] Hata:", err);
    return NextResponse.json({ error: err?.message || "Sunucu hatası." }, { status: 500 });
  }
}