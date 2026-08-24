import { NextResponse } from "next/server";
import { RESTAURANT_TABLES, TABLE_ZONES, RestaurantTable, TableZone } from "@/lib/content/tables-data";
import { getAppSetting, setAppSetting } from "@/lib/db/settings";

const SETTING_KEY = "restaurant_tables_data";
const ZONES_SETTING_KEY = "restaurant_table_zones_data";

export async function GET() {
  let tables = RESTAURANT_TABLES;
  let zones = TABLE_ZONES;

  try {
    const rawTables = await getAppSetting(SETTING_KEY);
    if (rawTables) {
      const parsed = JSON.parse(rawTables);
      if (Array.isArray(parsed) && parsed.length > 0) {
        tables = parsed;
      }
    }
  } catch (err) {
    console.error("[GET /api/v1/tables] Tables Hata:", err);
  }

  try {
    const rawZones = await getAppSetting(ZONES_SETTING_KEY);
    if (rawZones) {
      const parsedZones = JSON.parse(rawZones);
      if (Array.isArray(parsedZones) && parsedZones.length > 0) {
        zones = parsedZones;
      }
    }
  } catch (err) {
    console.error("[GET /api/v1/tables] Zones Hata:", err);
  }

  return NextResponse.json({ success: true, tables, zones });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body?.tables)) {
      return NextResponse.json({ error: "Geçersiz masa verisi." }, { status: 400 });
    }

    await setAppSetting(SETTING_KEY, JSON.stringify(body.tables));

    if (Array.isArray(body?.zones)) {
      await setAppSetting(ZONES_SETTING_KEY, JSON.stringify(body.zones));
    }

    return NextResponse.json({
      success: true,
      message: "Masa ve bölge ayarları başarıyla kaydedildi.",
      tables: body.tables,
      zones: body.zones || TABLE_ZONES,
    });
  } catch (err: any) {
    console.error("[POST /api/v1/tables] Hata:", err);
    return NextResponse.json({ error: err?.message || "Sunucu hatası." }, { status: 500 });
  }
}