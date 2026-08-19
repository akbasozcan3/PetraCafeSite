import { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/api/helpers";
import { ingestTelegramUpdate, type TelegramUpdate } from "@/lib/telegram";

export const runtime = "nodejs";

/** Telegram bu adrese POST atar. Chat id’yi sızdırmaz. */
export async function GET() {
  return jsonResponse({ ok: true });
}

export async function POST(request: NextRequest) {
  let body: TelegramUpdate = {};
  try {
    body = (await request.json()) as TelegramUpdate;
  } catch {
    return jsonResponse({ ok: true });
  }
  const saved = await ingestTelegramUpdate(body);
  return jsonResponse({ ok: true, saved: Boolean(saved?.id) });
}
