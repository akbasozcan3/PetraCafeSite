import { getAppSetting, setAppSetting } from "@/lib/db/settings";
import { siteBaseUrl } from "@/lib/mail/smtp";
import { escapeHtml } from "@/lib/security/html";

const API = "https://api.telegram.org";
const TIMEOUT_MS = 12_000;
const CHAT_SETTING = "telegram_chat_id";

type TelegramApiResponse = {
  ok: boolean;
  description?: string;
  result?: { message_id?: number; username?: string; id?: number; title?: string; type?: string } | unknown;
  parameters?: { migrate_to_chat_id?: number };
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

export type TelegramSendResult = {
  ok: boolean;
  skipped: boolean;
  messageId?: number;
  error?: string;
};

function botToken() {
  return (process.env.TELEGRAM_BOT_TOKEN || "").trim();
}

function maskChatId(id: string) {
  const clean = id.trim();
  if (clean.length <= 4) return "••••";
  return `…${clean.slice(-4)}`;
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
    const migrated = data.parameters?.migrate_to_chat_id;
    if (migrated) {
      await saveTelegramChatId(String(migrated));
    }
    if (!res.ok || !data.ok) {
      throw new Error(data.description || `Telegram ${res.status}`);
    }
    return data;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Telegram zaman aşımı — bot yanıt vermedi.");
    }
    throw err;
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

function httpsAdminButton(adminUrl?: string) {
  if (!adminUrl || !/^https:\/\//i.test(adminUrl)) return undefined;
  return {
    inline_keyboard: [[{ text: "Admin panelinde aç", url: adminUrl }]],
  };
}

export async function sendTelegramMessage(
  text: string,
  opts?: {
    parseMode?: "HTML";
    adminUrl?: string;
  }
): Promise<TelegramSendResult> {
  const id = await resolveTelegramChatId();
  if (!botToken() || !id) {
    console.warn("[telegram] atlandı — TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID yok.");
    return {
      ok: false,
      skipped: true,
      error: "TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID eksik.",
    };
  }

  const payload: Record<string, unknown> = {
    chat_id: id,
    text: text.slice(0, 3900),
    disable_web_page_preview: true,
  };
  if (opts?.parseMode) payload.parse_mode = opts.parseMode;
  const keyboard = httpsAdminButton(opts?.adminUrl);
  if (keyboard) payload.reply_markup = keyboard;

  const attempt = async () =>
    telegramFetch("sendMessage", payload);

  try {
    let data: TelegramApiResponse;
    try {
      data = await attempt();
    } catch (first) {
      const migrated = await resolveTelegramChatId();
      if (migrated && migrated !== id) {
        payload.chat_id = migrated;
        data = await attempt();
      } else {
        throw first;
      }
    }
    const result = data.result as { message_id?: number } | undefined;
    return { ok: true, skipped: false, messageId: result?.message_id };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[telegram] gönderilemedi:", error);
    return { ok: false, skipped: false, error };
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
    "<b>Petra Cafe Restaurant</b>",
    "Yeni rezervasyon — müşteri siteden gönderdi",
    "",
    `👤 <b>${escapeHtml(data.name)}</b>`,
    `📞 ${escapeHtml(data.phone)}`,
    `📅 ${escapeHtml(formatTrDate(data.date))}`,
    `🕐 ${escapeHtml(data.time)}`,
    `👥 ${escapeHtml(String(data.guests))} kişi`,
  ];
  if (data.note) lines.push(`📝 ${escapeHtml(data.note)}`);
  return sendTelegramMessage(lines.join("\n"), {
    parseMode: "HTML",
    adminUrl: data.adminUrl,
  });
}

export async function notifyTelegramContact(data: {
  name: string;
  phone?: string;
  email?: string;
  message: string;
  adminUrl?: string;
}) {
  const lines = [
    "<b>Petra Cafe Restaurant</b>",
    "Yeni iletişim mesajı — müşteri siteden gönderdi",
    "",
    `👤 <b>${escapeHtml(data.name)}</b>`,
  ];
  if (data.phone) lines.push(`📞 ${escapeHtml(data.phone)}`);
  if (data.email) lines.push(`✉️ ${escapeHtml(data.email)}`);
  lines.push("", escapeHtml(data.message.trim()).slice(0, 2500));
  return sendTelegramMessage(lines.join("\n"), {
    parseMode: "HTML",
    adminUrl: data.adminUrl,
  });
}

export async function getTelegramStatus() {
  const tokenConfigured = Boolean(botToken());
  const chatId = await resolveTelegramChatId();
  const chatIdConfigured = Boolean(chatId);
  const webhookUrl = telegramWebhookUrl();
  const base = {
    ready: false,
    tokenConfigured,
    chatIdConfigured,
    connected: false,
    chatReachable: false,
    botUsername: null as string | null,
    chatTitle: null as string | null,
    chatType: null as string | null,
    chatIdMasked: chatId ? maskChatId(chatId) : null,
    webhookUrl,
    hint: "",
  };

  if (!tokenConfigured) {
    return { ...base, hint: "Vercel’de TELEGRAM_BOT_TOKEN tanımlayın." };
  }

  try {
    const me = await telegramFetch("getMe");
    const bot = me.result as { username?: string } | undefined;
    base.connected = true;
    base.botUsername = bot?.username || null;
  } catch (err) {
    return {
      ...base,
      hint: err instanceof Error ? err.message : "Bot token geçersiz.",
    };
  }

  if (!chatIdConfigured) {
    return {
      ...base,
      hint: "TELEGRAM_CHAT_ID ekleyin (grup id, örnek: -100…). Botu gruba yönetici alın.",
    };
  }

  try {
    const chat = await telegramFetch("getChat", { chat_id: chatId });
    const info = chat.result as { title?: string; type?: string } | undefined;
    return {
      ...base,
      ready: true,
      chatReachable: true,
      chatTitle: info?.title || null,
      chatType: info?.type || null,
      hint: "Hazır. Müşteri rezervasyon/iletişim gönderince bu gruba düşer. Admin onayı ayrıdır, grup mesajı tekrar gitmez.",
    };
  } catch (err) {
    return {
      ...base,
      hint:
        (err instanceof Error ? err.message : "Grup bulunamadı") +
        " — botu gruba ekleyip yönetici yapın; grup süpergruba döndüyse yeni chat id (-100…) gerekir.",
    };
  }
}

export async function sendTelegramTest() {
  const status = await getTelegramStatus();
  if (!status.tokenConfigured) {
    return { ok: false as const, error: "TELEGRAM_BOT_TOKEN yok.", status };
  }
  if (!status.chatIdConfigured) {
    return {
      ok: false as const,
      error: "TELEGRAM_CHAT_ID yok. Vercel env’e grup id’sini yazın.",
      status,
    };
  }
  const result = await notifyTelegramReservation({
    name: "Örnek Misafir (test)",
    phone: "0530 608 90 51",
    date: new Date().toISOString().slice(0, 10),
    time: "20:00",
    guests: 4,
    note: "Bu bir test mesajıdır. Gerçek rezervasyon, müşteri siteden gönderince gelir.",
    adminUrl: `${siteBaseUrl()}/admin/rezervasyonlar`,
  });
  if (!result.ok) {
    return { ok: false as const, error: result.error || "Mesaj gönderilemedi.", status };
  }
  return { ok: true as const, status: await getTelegramStatus() };
}
