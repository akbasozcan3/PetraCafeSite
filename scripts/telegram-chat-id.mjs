/**
 * Grup chat id'yi bulur. Bot token .env.local içinde olmalı.
 * Kullanım: node -r ./scripts/load-env.cjs scripts/telegram-chat-id.mjs
 *
 * Gruba botu ekleyin, bir mesaj yazın veya botu yönetici yapın, sonra bu scripti çalıştırın.
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

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=50`);
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
  console.log("Chat bulunamadı.");
  console.log("1) Gruba @PetraHavuzBot ekleyin");
  console.log("2) BotFather → /setprivacy → Disable (grup mesajlarını görsün)");
  console.log("3) Gruba bir mesaj yazın, scripti tekrar çalıştırın");
  process.exit(2);
}

console.log("Bulunan sohbetler — TELEGRAM_CHAT_ID olarak eksi sayılı grup id'sini kullanın:\n");
for (const [id, label] of chats) {
  console.log(`  ${id}   ${label}`);
}
