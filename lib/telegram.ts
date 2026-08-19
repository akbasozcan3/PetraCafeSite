import { getAppSetting, setAppSetting } from "@/lib/db/settings";
import { siteBaseUrl } from "@/lib/mail/smtp";

const API = "https://api.telegram.org";
const TIMEOUT_MS = 12_000;
const CHAT_SETTING = "telegram_chat_id";

type TelegramApiResponse = {
  ok: boolean;
  description?: string;
  result?: { message_id?: number; username?: string; id?: number } | unknown;
};

type TelegramChat = {
  id: number;
  type?: string;
  title?: string;
  username?: string;
  first_name?: string;
};

export type TelegramUpdate = {
  message?: { chat?: TelegramChat; text?: string };
  edited_message?: { chat?: TelegramChat };
  my_chat_member?: { chat?: TelegramChat };
  channel_post?: { chat?: TelegramChat };
};

function botToken() {
  return (process.env.TELEGRAM_BOT_TOKEN || "").trim();
}

export async function resolveTelegramChatId() {
  const fromEnv = (process.env.TELEGRAM_CHAT_ID || "").trim();
  if (fromEnv) return fromEnv.replace(/^["']|["']$/g, "");
  try {
    return await getAppSetting(CHAT_SETTING);
  } catch {
    return "";
  }
}

export async function saveTelegramChatId(id: string) {
  const value = String(id).trim();
  if (!value) return;
  await setAppSetting(CHAT_SETTING, value);
}

function chatFromUpdate(update: TelegramUpdate): TelegramChat | null {
  return (
    update.message?.chat ||
    update.edited_message?.chat ||
    update.my_chat_member?.chat ||
    update.channel_post?.chat ||
    null
  );
}

export async function ingestTelegramUpdate(update: TelegramUpdate) {
  const chat = chatFromUpdate(update);
  if (!chat?.id) return null;
  const type = chat.type || "";
  if (type === "group" || type === "supergroup" || type === "channel") {
    await saveTelegramChatId(String(chat.id));
    return { id: String(chat.id), type, title: chat.title || "" };
  }
  if (type === "private" && !(await resolveTelegramChatId())) {
    await saveTelegramChatId(String(chat.id));
    return { id: String(chat.id), type, title: chat.first_name || chat.username || "" };
  }
  return { id: String(chat.id), type, title: chat.title || chat.first_name || "" };
}

export async function isTelegramConfigured() {
  return Boolean(botToken() && (await resolveTelegramChatId()));
}

async function telegramFetch(path: string, body?: Record<string, unknown>) {
  const token = botToken();
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN yok.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${API}/bot${token}/${path}`, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const data = (await res.json()) as TelegramApiResponse;
    if (!res.ok || !data.ok) {
      throw new Error(data.description || `Telegram ${res.status}`);
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export function telegramWebhookUrl() {
  const base = siteBaseUrl();
  if (!base.startsWith("https://")) return "";
  return `${base}/api/v1/telegram/webhook`;
}

export async function ensureTelegramWebhook() {
  const url = telegramWebhookUrl();
  if (!botToken() || !url) {
    return { ok: false as const, url: url || null, error: "SITE_URL https olmalı ve TELEGRAM_BOT_TOKEN gerekli." };
  }
  await telegramFetch("setWebhook", { url, drop_pending_updates: false });
  return { ok: true as const, url };
}

export async function sendTelegramMessage(text: string) {
  const id = await resolveTelegramChatId();
  if (!botToken() || !id) {
    console.warn("[telegram] atlandı — TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID yok.");
    return { ok: false as const, skipped: true as const };
  }
  const chatId = /^-?\d+$/.test(id) ? Number(id) : id;
  try {
    const data = await telegramFetch("sendMessage", {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    });
    const result = data.result as { message_id?: number } | undefined;
    return { ok: true as const, skipped: false as const, messageId: result?.message_id };
  } catch (err) {
    console.warn("[telegram]", err instanceof Error ? err.message : err);
    return { ok: false as const, skipped: false as const };
  }
}

function formatTrDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function notifyTelegramReservation(data: {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
  adminUrl?: string;
}) {
  const lines = [
    "YENİ REZERVASYON — Petra Cafe",
    "",
    `Ad: ${data.name}`,
    `Telefon: ${data.phone}`,
    `Tarih: ${formatTrDate(data.date)}`,
    `Saat: ${data.time}`,
    `Kişi: ${data.guests}`,
  ];
  if (data.note) lines.push(`Not: ${data.note}`);
  if (data.adminUrl) {
    lines.push("", data.adminUrl);
  }
  return sendTelegramMessage(lines.join("\n"));
}

export async function notifyTelegramContact(data: {
  name: string;
  phone?: string;
  email?: string;
  message: string;
  adminUrl?: string;
}) {
  const lines = [
    "YENİ İLETİŞİM MESAJI — Petra Cafe",
    "",
    `Ad: ${data.name}`,
  ];
  if (data.phone) lines.push(`Telefon: ${data.phone}`);
  if (data.email) lines.push(`E-posta: ${data.email}`);
  lines.push("", data.message.trim());
  if (data.adminUrl) {
    lines.push("", data.adminUrl);
  }
  return sendTelegramMessage(lines.join("\n"));
}

export async function getTelegramStatus() {
  const tokenConfigured = Boolean(botToken());
  const chatIdConfigured = Boolean(await resolveTelegramChatId());
  const webhookUrl = telegramWebhookUrl();
  if (!tokenConfigured) {
    return {
      ready: false,
      tokenConfigured,
      chatIdConfigured,
      connected: false,
      botUsername: null as string | null,
      webhookUrl,
    };
  }
  try {
    const data = await telegramFetch("getMe");
    const result = data.result as { username?: string } | undefined;
    return {
      ready: tokenConfigured && chatIdConfigured,
      tokenConfigured,
      chatIdConfigured,
      connected: true,
      botUsername: result?.username || null,
      webhookUrl,
    };
  } catch {
    return {
      ready: false,
      tokenConfigured,
      chatIdConfigured,
      connected: false,
      botUsername: null as string | null,
      webhookUrl,
    };
  }
}

export async function sendTelegramTest() {
  if (!(await isTelegramConfigured())) {
    return { ok: false as const, error: "TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID eksik. Gruba bir mesaj yazıp webhook’un chat id kaydetmesini bekleyin." };
  }
  const result = await sendTelegramMessage(
    "Petra Cafe — Telegram bağlantısı çalışıyor. Rezervasyon ve iletişim bildirimleri bu gruba düşecek."
  );
  if (!result.ok) return { ok: false as const, error: "Mesaj gönderilemedi. Botu grup yöneticisi yapın ve tekrar deneyin." };
  return { ok: true as const };
}
