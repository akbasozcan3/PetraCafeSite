"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock, Save } from "lucide-react";
import { api } from "@/lib/api/client";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin/roles";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import AdminPageHeader, { AdminAlert } from "@/components/admin/AdminPageHeader";

export default function SettingsPanel() {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState<AdminRole | null>(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .getSettings()
      .then((s) => {
        setEmail(s.email);
        setName(s.name);
        setRole(s.role);
        setSource(s.source);
      })
      .catch(() => setMessage("Ayarlar yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Yeni şifreler eşleşmiyor.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await api.changePassword(currentPassword, newPassword);
      setMessage("Şifre başarıyla güncellendi.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Şifre güncellenemedi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-[#8A9BB0]" />
      </div>
    );
  }

  const sourceLabel =
    source === "users"
      ? "Çok kullanıcılı depo"
      : source === "auth.json" || source === "db"
        ? "Güvenli kayıt (bcrypt)"
        : "Ortam değişkeni";

  return (
    <>
      <AdminPageHeader
        title="Hesap Ayarları"
        description="Giriş bilgileriniz ve şifre güvenliği."
      />

      <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="text-lg font-semibold text-[#F8F8F8]">Giriş Bilgileri</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-white/[0.04] pb-3">
            <dt className="text-[#8A9BB0]">Ad</dt>
            <dd className="font-medium text-[#EEE9E0]">{name || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/[0.04] pb-3">
            <dt className="text-[#8A9BB0]">E-posta</dt>
            <dd className="font-medium text-[#EEE9E0]">{email || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/[0.04] pb-3">
            <dt className="text-[#8A9BB0]">Rol</dt>
            <dd className="font-medium text-[#EEE9E0]">
              {role ? ROLE_LABELS[role] : "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#8A9BB0]">Kaynak</dt>
            <dd className="text-[#EEE9E0]">{sourceLabel}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-[#6B7A94]">
          Ek kullanıcı eklemek için{" "}
          <a href="/admin/kullanicilar" className="text-[#C8703A] hover:underline">
            Kullanıcılar
          </a>{" "}
          sayfasını kullanın.
        </p>
      </section>

      <SmtpCard />
      <TelegramCard />

      {message && (
        <div className="mt-6">
          <AdminAlert message={message} />
        </div>
      )}

      <form
        onSubmit={handleChangePassword}
        className="mt-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6"
      >
        <h3 className="text-lg font-semibold text-[#F8F8F8]">Şifre Değiştir</h3>
        <Input
          label="Mevcut şifre"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          icon={<Lock className="h-4 w-4" />}
          required
        />
        <Input
          label="Yeni şifre"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          icon={<Lock className="h-4 w-4" />}
          required
          minLength={8}
        />
        <Input
          label="Yeni şifre (tekrar)"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<Lock className="h-4 w-4" />}
          required
          minLength={8}
        />
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Şifreyi Güncelle
        </Button>
      </form>
    </>
  );
}

function SmtpCard() {
  const [info, setInfo] = useState<{
    configured: boolean;
    host?: string;
    from?: string;
    to?: string | null;
  } | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetch("/api/v1/admin/smtp", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setInfo(d))
      .catch(() => setInfo({ configured: false }));
  }, []);

  async function test() {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/v1/admin/smtp", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "SMTP test başarısız");
      setMsg(
        data.sentTo
          ? `SMTP OK — ${data.host} / test mail: ${data.sentTo}`
          : `SMTP OK — ${data.host} / ${data.from} (SMTP_TO ekleyin, test mail gider)`
      );
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
      <h3 className="text-lg font-semibold text-[#F8F8F8]">SMTP / E-posta</h3>
      <p className="mt-2 text-sm text-[#8A9BB0]">
        Vercel ortam değişkenleri: SMTP_HOST, SMTP_PORT (587), SMTP_USER, SMTP_PASS, SMTP_FROM,
        SMTP_TO (bildirimlerin gideceği adres). Gmail için Uygulama Şifresi kullanın.
      </p>
      <p className="mt-3 text-sm text-[#EEE9E0]">
        Durum:{" "}
        {info?.configured ? (
          <span className="text-emerald-300">
            Yapılandırıldı ({info.host} → {info.from}
            {info.to ? ` / alıcı ${info.to}` : " / SMTP_TO yok"})
          </span>
        ) : (
          <span className="text-amber-300">Yapılandırılmadı</span>
        )}
      </p>
      {msg ? <p className="mt-2 text-xs text-[#8A9BB0]">{msg}</p> : null}
      <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0D1117]">
        <p className="border-b border-white/[0.06] px-4 py-2 text-[11px] uppercase tracking-wider text-[#8A9BB0]">
          E-posta görünümü (logo + şablon)
        </p>
        <iframe
          title="SMTP e-posta önizlemesi"
          src="/api/v1/admin/smtp/preview"
          className="h-[420px] w-full bg-[#f4eee1]"
        />
      </div>
      <div className="mt-4">
        <Button type="button" variant="outline" disabled={busy || !info?.configured} onClick={() => void test()}>
          Bağlantıyı Test Et
        </Button>
      </div>
    </section>
  );
}

function TelegramCard() {
  const [info, setInfo] = useState<{
    ready?: boolean;
    tokenConfigured?: boolean;
    chatIdConfigured?: boolean;
    connected?: boolean;
    botUsername?: string | null;
    webhookUrl?: string;
  } | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetch("/api/v1/admin/telegram", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setInfo(d.status || null))
      .catch(() => setInfo(null));
  }, []);

  async function test() {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/v1/admin/telegram", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Telegram test başarısız");
      setInfo(data.status || info);
      setMsg("Test mesajı gruba gönderildi.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
      <h3 className="text-lg font-semibold text-[#F8F8F8]">Telegram bildirimleri</h3>
      <p className="mt-2 text-sm text-[#8A9BB0]">
        Vercel: TELEGRAM_BOT_TOKEN ve TELEGRAM_CHAT_ID. Chat id yoksa botu yönetici yapıp grupta
        etiketleyin; webhook chat id&apos;yi kaydeder.
      </p>
      <p className="mt-3 text-sm text-[#EEE9E0]">
        Durum:{" "}
        {info?.ready ? (
          <span className="text-emerald-300">
            Hazır {info.botUsername ? `(@${info.botUsername})` : ""}
          </span>
        ) : info?.tokenConfigured ? (
          <span className="text-amber-300">Token var, chat id bekleniyor</span>
        ) : (
          <span className="text-amber-300">Yapılandırılmadı</span>
        )}
      </p>
      {msg ? <p className="mt-2 text-xs text-[#8A9BB0]">{msg}</p> : null}
      <div className="mt-4">
        <Button type="button" variant="outline" disabled={busy || !info?.ready} onClick={() => void test()}>
          Test mesajı gönder
        </Button>
      </div>
    </section>
  );
}
