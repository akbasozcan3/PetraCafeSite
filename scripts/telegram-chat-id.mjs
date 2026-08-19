/**
 * Grup chat id'yi bulur. Token .env.local içinde olmalı — repoya yazmayın.
 * npm run telegram:chat-id
 *
 * Önemli: Adres getUpdatesİ DEĞİL, getUpdates (ASCII I).
 * Önce webhook silinir, sonra güncellemeler okunur.
 */
import fs from "fs";
import path from "path";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.resolve(file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m || process.env[m[1]]) continue;
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  }
}

loadEnv();

const token = (process.env.TELEGRAM_BOT_TOKEN || "").trim();
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN yok. .env.local dosyasına ekleyin.");
  process.exit(1);
}

const api = `https://api.telegram.org/bot${token}`;

await fetch(`${api}/deleteWebhook?drop_pending_updates=false`);
const res = await fetch(`${api}/getUpdates?limit=100`);
const data = await res.json();
if (!data.ok) {
  console.error(data.description || "getUpdates başarısız");
  process.exit(1);
}

const chats = new Map();
for (const u of data.result || []) {
  const chat =
    u.message?.chat ||
    u.my_chat_member?.chat ||
    u.channel_post?.chat ||
    u.edited_message?.chat;
  if (!chat?.id) continue;
  chats.set(String(chat.id), `${chat.type} · ${chat.title || chat.username || chat.first_name || chat.id}`);
}

if (!chats.size) {
  console.log("Chat bulunamadı (result boş).");
  console.log("");
  console.log("Tarayıcıda İ HARFİ OLMADAN açın (Türkçe İ değil):");
  console.log(`  ${api}/getUpdates`);
  console.log("");
  console.log("Sonra:");
  console.log("1) BotFather → /setprivacy → Disable");
  console.log("2) Botu gruptan çıkarıp tekrar ekleyin, yönetici yapın");
  console.log("3) Grupta yeni bir mesaj yazın (ör. merhaba)");
  console.log("4) getUpdates sayfasını yenileyin — chat.id (genelde -100...) TELEGRAM_CHAT_ID");
  console.log("");
  console.log("Canlı sitede webhook: SITE_URL/api/v1/telegram/webhook");
  process.exit(2);
}

console.log("TELEGRAM_CHAT_ID (grup için eksi sayı / -100...):\n");
for (const [id, label] of chats) {
  console.log(`  ${id}   ${label}`);
}
