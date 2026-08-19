const API = "https://api.telegram.org";
const TIMEOUT_MS = 12_000;

type TelegramApiResponse = {
  ok: boolean;
  description?: string;
  result?: { message_id?: number; username?: string; id?: number };
};

function botToken() {
  return (process.env.TELEGRAM_BOT_TOKEN || "").trim();
}

function chatId() {
  return (process.env.TELEGRAM_CHAT_ID || "").trim();
}

export function isTelegramConfigured() {
  return Boolean(botToken() && chatId());
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

export async function sendTelegramMessage(text: string) {
  const id = chatId();
  if (!botToken() || !id) {
    return { ok: false as const, skipped: true as const };
  }
  try {
    const data = await telegramFetch("sendMessage", {
      chat_id: id,
      text,
      disable_web_page_preview: true,
    });
    return { ok: true as const, skipped: false as const, messageId: data.result?.message_id };
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
  const chatIdConfigured = Boolean(chatId());
  if (!tokenConfigured) {
    return {
      ready: false,
      tokenConfigured,
      chatIdConfigured,
      connected: false,
      botUsername: null as string | null,
    };
  }
  try {
    const data = await telegramFetch("getMe");
    const username = data.result?.username || null;
    return {
      ready: tokenConfigured && chatIdConfigured,
      tokenConfigured,
      chatIdConfigured,
      connected: true,
      botUsername: username,
    };
  } catch {
    return {
      ready: false,
      tokenConfigured,
      chatIdConfigured,
      connected: false,
      botUsername: null as string | null,
    };
  }
}

export async function sendTelegramTest() {
  if (!isTelegramConfigured()) {
    return { ok: false as const, error: "TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID eksik." };
  }
  const result = await sendTelegramMessage(
    "Petra Cafe — Telegram bağlantısı çalışıyor. Rezervasyon ve iletişim bildirimleri bu gruba düşecek."
  );
  if (!result.ok) return { ok: false as const, error: "Mesaj gönderilemedi. Chat ID ve bot yetkisini kontrol edin." };
  return { ok: true as const };
}
