import nodemailer from "nodemailer";

export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  secure: boolean;
};

export function notificationEmail() {
  return (process.env.SMTP_TO || process.env.NOTIFY_EMAIL || "").trim();
}

export async function getSmtpConfigAsync(): Promise<SmtpConfig | null> {
  const envCfg = getSmtpConfig();
  if (envCfg) return envCfg;

  try {
    const { getAppSetting } = await import("@/lib/db/settings");
    const raw = await getAppSetting("integration_smtp_config");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.host && parsed.user && parsed.pass) {
        const port = Number(parsed.port || 587);
        const secure = parsed.secure === true || port === 465;
        const from = parsed.from || parsed.user;
        return { host: parsed.host, port, user: parsed.user, pass: parsed.pass, from, secure };
      }
    }
  } catch {
    /* fallback */
  }

  return null;
}

export function getSmtpConfig(): SmtpConfig | null {
  const host = (process.env.SMTP_HOST || "").trim();
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  const from = (process.env.SMTP_FROM || user || "").trim();
  if (!host || !user || !pass || !from) return null;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  return { host, port, user, pass, from, secure };
}

function createTransport(cfg: SmtpConfig) {
  const requireTls =
    process.env.SMTP_REQUIRE_TLS === "true" ||
    (!cfg.secure && cfg.port === 587);
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    requireTLS: requireTls,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
    tls: { minVersion: "TLSv1.2" },
  });
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
  const cfg = await getSmtpConfigAsync();
  if (!cfg) {
    console.warn("[mail] SMTP yapılandırılmamış — e-posta gönderilmedi:", opts.subject);
    return { ok: false, skipped: true as const };
  }
  try {
    const transporter = createTransport(cfg);
    await transporter.sendMail({
      from: cfg.from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
    return { ok: true, skipped: false as const };
  } catch (err) {
    console.error("[mail] sendMail hatası:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Mail gönderilemedi" };
  }
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

export async function sendReservationStatusEmail(opts: {
  to: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  tableName?: string;
  status: "confirmed" | "rejected" | "cancelled";
  note?: string;
}) {
  const { getPublicContent } = await import("@/lib/db/content");
  const content = await getPublicContent().catch(() => null);
  const { brandLogoAbsoluteUrl, buildNotifyEmail } = await import("@/lib/mail/notify-layout");
  const logoHeight = Number(content?.images?.smtpLogoHeight || content?.images?.smtpLogoSize || 120);

  const isConfirmed = opts.status === "confirmed";
  const isCancelled = opts.status === "cancelled";

  let kicker = "REZERVASYON ONAYI";
  let title = "Rezervasyonunuz Onaylandı";
  let intro = `Merhaba Sayın ${opts.name},\n\n${opts.date} saat ${opts.time} için oluşturduğunuz rezervasyon talebiniz onaylanmıştır. Belirtilen saatte masanız sizler için hazır olacaktır.`;
  let subject = `Rezervasyonunuz Onaylandı (${opts.date} ${opts.time}) — Petra Cafe Restaurant`;
  let durumLabel = "✅ Onaylandı";

  if (isCancelled) {
    kicker = "REZERVASYON İPTALİ";
    title = "Rezervasyonunuz İptal Edildi";
    intro = `Merhaba Sayın ${opts.name},\n\n${opts.date} saat ${opts.time} için oluşturulan rezervasyon kaydınız talebiniz doğrultusunda iptal edilmiştir.`;
    subject = `Rezervasyon İptali (${opts.date} ${opts.time}) — Petra Cafe Restaurant`;
    durumLabel = "❌ İptal Edildi";
  } else if (opts.status === "rejected") {
    kicker = "REZERVASYON BİLGİLENDİRMESİ";
    title = "Rezervasyon Talebiniz";
    intro = `Merhaba Sayın ${opts.name},\n\n${opts.date} saat ${opts.time} için oluşturduğunuz rezervasyon talebiniz, talep edilen saatteki yoğunluk ve kontenjan doluluğu sebebiyle maalesef onaylanamamıştır.`;
    subject = `Rezervasyon Talebiniz Hakkında — Petra Cafe Restaurant`;
    durumLabel = "❌ Kontenjan Dolu / Reddedildi";
  }

  const mail = buildNotifyEmail({
    kicker,
    title,
    intro,
    logoUrl: brandLogoAbsoluteUrl(content?.images?.logo),
    logoHeight,
    rows: [
      { label: "Misafir Adı", value: opts.name },
      { label: "Tarih", value: opts.date },
      { label: "Saat", value: opts.time },
      { label: "Kişi Sayısı", value: `${opts.guests} Kişi` },
      ...(opts.tableName ? [{ label: "Ayrılan Masa / Yer", value: opts.tableName }] : []),
      { label: "Durum", value: durumLabel },
      ...(opts.note ? [{ label: "Not", value: opts.note }] : []),
    ],
  });

  return sendMail({
    to: opts.to,
    subject,
    text: mail.text,
    html: mail.html,
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
  const to = (notificationEmail() || opts.to || "").trim();
  if (!to) {
    console.warn("[mail] SMTP_TO / NOTIFY_EMAIL yok — bildirim atlandı:", opts.subject);
    return { ok: false, skipped: true as const };
  }
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
  if (!cfg) throw new Error("SMTP ayarları eksik (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM).");
  const transporter = createTransport(cfg);
  await transporter.verify();
  const to = notificationEmail();
  if (to) {
    const { getPublicContent } = await import("@/lib/db/content");
    const content = await getPublicContent().catch(() => null);
    const { brandLogoAbsoluteUrl, buildNotifyEmail } = await import("@/lib/mail/notify-layout");
    const logoHeight = Number(content?.images?.smtpLogoHeight || content?.images?.smtpLogoSize || 96);
    const mail = buildNotifyEmail({
      kicker: "Sistem Bildirimi",
      title: "E-Posta Bildirim Sistemi Aktif",
      intro: "Petra Cafe Restaurant kurumsal e-posta bildirim entegrasyonu başarıyla aktif edildi.",
      logoUrl: brandLogoAbsoluteUrl(content?.images?.logo),
      logoHeight,
      rows: [
        { label: "Durum", value: "Bağlantı Başarılı & Aktif" },
        { label: "Sunucu", value: cfg.host },
        { label: "Gönderen", value: cfg.from },
        { label: "Alıcı E-Posta", value: to },
      ],
    });
    await sendMail({
      to,
      subject: "Petra Cafe Restaurant — E-Posta Bildirim Sistemi Aktif",
      text: mail.text,
      html: mail.html,
    });
  }
  return { ok: true, host: cfg.host, from: cfg.from, sentTo: to || null };
}
