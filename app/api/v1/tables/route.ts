import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { RESTAURANT_TABLES, RestaurantTable } from "@/lib/content/tables-data";

const TABLES_FILE = path.join(process.cwd(), "data", "restaurant-tables.json");

function getStoredTables(): RestaurantTable[] {
  try {
    if (fs.existsSync(TABLES_FILE)) {
      const content = fs.readFileSync(TABLES_FILE, "utf8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading tables file:", err);
  }
  return RESTAURANT_TABLES;
}

function saveStoredTables(tables: RestaurantTable[]) {
  try {
    const dir = path.dirname(TABLES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TABLES_FILE, JSON.stringify(tables, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing tables file:", err);
  }
}

export async function GET() {
  const tables = getStoredTables();
  return NextResponse.json({ success: true, tables });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body?.tables)) {
      return NextResponse.json({ error: "Geçersiz masa verisi." }, { status: 400 });
    }

    saveStoredTables(body.tables);
    return NextResponse.json({ success: true, message: "Masa konumları başarıyla kaydedildi.", tables: body.tables });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Sunucu hatası." }, { status: 500 });
  }
}