import nodemailer from "nodemailer";

export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  secure: boolean;
};

export function getSmtpConfig(): SmtpConfig | null {
  const host = (process.env.SMTP_HOST || "").trim();
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  const from = (process.env.SMTP_FROM || user || "").trim();
  if (!host || !user || !pass || !from) return null;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;
  return { host, port, user, pass, from, secure };
}

export function siteBaseUrl() {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3010"
  ).replace(/\/$/, "");
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const cfg = getSmtpConfig();
  if (!cfg) {
    console.warn("[mail] SMTP yapılandırılmamış — e-posta gönderilmedi:", opts.subject);
    return { ok: false, skipped: true as const };
  }
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  await transporter.sendMail({
    from: cfg.from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });
  return { ok: true, skipped: false as const };
}

export async function sendVerificationEmail(to: string, token: string) {
  const url = `${siteBaseUrl()}/hesabim/dogrula?token=${encodeURIComponent(token)}`;
  return sendMail({
    to,
    subject: "E-posta doğrulama — Petra Cafe Restaurant",
    text: `Hesabınızı doğrulamak için: ${url}`,
    html: `<p>Merhaba,</p><p>Hesabınızı doğrulamak için aşağıdaki bağlantıya tıklayın:</p><p><a href="${url}">${url}</a></p><p>Bağlantı 24 saat geçerlidir.</p>`,
  });
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const url = `${siteBaseUrl()}/hesabim/sifre-sifirla?token=${encodeURIComponent(token)}`;
  return sendMail({
    to,
    subject: "Şifre sıfırlama — Petra Cafe Restaurant",
    text: `Şifrenizi sıfırlamak için: ${url}`,
    html: `<p>Şifre sıfırlama talebi aldık.</p><p><a href="${url}">Şifremi sıfırla</a></p><p>Bu bağlantı 1 saat geçerlidir. Siz talep etmediyseniz bu e-postayı yok sayın.</p>`,
  });
}

export async function sendOrderConfirmationEmail(opts: {
  to: string;
  publicCode: string;
  accessToken: string;
  itemsSummary: string;
}) {
  const url = `${siteBaseUrl()}/hesabim/siparis/${opts.publicCode}?t=${encodeURIComponent(opts.accessToken)}`;
  return sendMail({
    to: opts.to,
    subject: `Sipariş alındı ${opts.publicCode} — Petra Cafe Restaurant`,
    text: `Siparişiniz alındı: ${opts.publicCode}\n${opts.itemsSummary}\nDetay: ${url}`,
    html: `<p>Siparişiniz alındı.</p><p><strong>${opts.publicCode}</strong></p><pre>${opts.itemsSummary}</pre><p><a href="${url}">Sipariş detayı</a></p><p>Kart bilgisi saklanmaz. Ödeme yöntemi sipariş sırasında seçtiğiniz şekildedir.</p>`,
  });
}

export async function notifyInbox(opts: {
  to?: string;
  subject: string;
  html: string;
  text: string;
}) {
  const to = (opts.to || process.env.NOTIFY_EMAIL || process.env.SMTP_TO || "").trim();
  if (!to) return { ok: false, skipped: true as const };
  try {
    return await sendMail({
      to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
  } catch (err) {
    console.warn("[mail] inbox notify:", (err as Error).message);
    return { ok: false, skipped: false as const };
  }
}

export async function testSmtpConnection() {
  const cfg = getSmtpConfig();
  if (!cfg) throw new Error("SMTP ayarları eksik (SMTP_HOST/USER/PASS/FROM).");
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  await transporter.verify();
  return { ok: true, host: cfg.host, from: cfg.from };
}
