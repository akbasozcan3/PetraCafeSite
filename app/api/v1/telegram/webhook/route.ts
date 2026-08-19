import { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/api/helpers";
import {
  ensureTelegramWebhook,
  ingestTelegramUpdate,
  resolveTelegramChatId,
  type TelegramUpdate,
} from "@/lib/telegram";

export const runtime = "nodejs";

export async function GET() {
  const webhook = await ensureTelegramWebhook().catch((err: Error) => ({
    ok: false as const,
    url: null,
    error: err.message,
  }));
  const chatId = await resolveTelegramChatId();
  return jsonResponse({
    ok: webhook.ok,
    webhook: webhook.url,
    chatId: chatId || null,
    chatIdSaved: Boolean(chatId),
    hint: chatId
      ? "Chat ID kayıtlı. Bildirimler bu sohbete gidecek."
      : "Botu gruba yönetici yapın, grupta @bot yazın. Bu adres webhook olarak ayarlandı; mesaj gelince chat id kaydolur.",
    error: "error" in webhook ? webhook.error : undefined,
  });
}

export async function POST(request: NextRequest) {
  let body: TelegramUpdate = {};
  try {
    body = (await request.json()) as TelegramUpdate;
  } catch {
    return jsonResponse({ ok: true });
  }
  const saved = await ingestTelegramUpdate(body);
  return jsonResponse({ ok: true, saved: saved?.id || null });
}
