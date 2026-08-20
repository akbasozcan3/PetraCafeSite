"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock, Save } from "lucide-react";
import { api } from "@/lib/api/client";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin/roles";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import AdminPageHeader, { AdminAlert } from "@/components/admin/AdminPageHeader";
import AdminSplash from "@/components/admin/ui/AdminSplash";

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
    return <AdminSplash compact label="Ayarlar yükleniyor" />;
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
  const [kind, setKind] = useState<
    "reservation" | "reservation_confirmed" | "reservation_rejected" | "contact"
  >("reservation");
  const [logoHeight, setLogoHeight] = useState<number>(96);
  const [savingLogo, setSavingLogo] = useState(false);
  const [logoSaveMsg, setLogoSaveMsg] = useState("");
  const [preview, setPreview] = useState<{
    from?: string;
    to?: string;
    subject?: string;
    html?: string;
  } | null>(null);
  const [previewErr, setPreviewErr] = useState("");

  useEffect(() => {
    void fetch("/api/v1/admin/smtp", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setInfo(d))
      .catch(() => setInfo({ configured: false }));

    void api.getAdminContent().then((res) => {
      const h = Number(res.data?.images?.smtpLogoHeight || res.data?.images?.smtpLogoSize);
      if (h && !isNaN(h)) {
        setLogoHeight(h);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setPreviewErr("");
    void fetch(`/api/v1/admin/smtp/preview?kind=${kind}&h=${logoHeight}`, { credentials: "include" })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Önizleme alınamadı");
        setPreview(data);
      })
      .catch((e) => setPreviewErr(e instanceof Error ? e.message : "Önizleme yok"));
  }, [kind, logoHeight]);

  async function saveLogoHeight() {
    setSavingLogo(true);
    setLogoSaveMsg("");
    try {
      const res = await api.getAdminContent();
      const current = res.data;
      const updated = {
        ...current,
        images: {
          ...(current.images || {}),
          smtpLogoHeight: String(logoHeight),
          smtpLogoSize: String(logoHeight),
        },
      };
      await api.updateContent(updated);
      setLogoSaveMsg("✓ Logo boyutu kaydedildi!");
      setTimeout(() => setLogoSaveMsg(""), 3500);
    } catch (e) {
      setLogoSaveMsg(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSavingLogo(false);
    }
  }

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
          ? `SMTP OK — Gmail’e test mail gitti: ${data.sentTo}`
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
      <h3 className="text-lg font-semibold text-[#F8F8F8]">SMTP / E-Posta Şablonları & Gmail Görünümü</h3>
      <p className="mt-2 text-sm text-[#8A9BB0]">
        Müşteriye giden onay/red bildirimleri ile yöneticiye giden rezervasyon ve iletişim maillerinin canlı şablon önizlemesi.
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

      {/* Logo Boyutu Ayar Kartı */}
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-white">E-Posta Logo Boyutu</h4>
            <p className="text-xs text-[#8A9BB0]">E-postalardaki logo yüksekliğini dilediğiniz gibi ayarlayın.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-sm font-bold text-[#D9A441]">
              {logoHeight} px
            </span>
            <Button
              type="button"
              variant="primary"
              disabled={savingLogo}
              onClick={() => void saveLogoHeight()}
            >
              {savingLogo ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Boyutu Kaydet
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="range"
            min={40}
            max={200}
            step={2}
            value={logoHeight}
            onChange={(e) => setLogoHeight(Number(e.target.value))}
            className="h-2 w-full flex-1 cursor-pointer accent-[#D9A441]"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            {[64, 80, 96, 120, 150].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setLogoHeight(size)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  logoHeight === size
                    ? "bg-[#D9A441] text-[#0D0F0A]"
                    : "bg-white/5 text-[#8A9BB0] hover:bg-white/10 hover:text-white"
                }`}
              >
                {size}px
              </button>
            ))}
          </div>
        </div>

        {logoSaveMsg && (
          <p className="mt-2 text-xs font-medium text-emerald-400">{logoSaveMsg}</p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={kind === "reservation" ? "primary" : "outline"}
          onClick={() => setKind("reservation")}
        >
          Yeni Talep (Admin)
        </Button>
        <Button
          type="button"
          size="sm"
          variant={kind === "reservation_confirmed" ? "primary" : "outline"}
          onClick={() => setKind("reservation_confirmed")}
        >
          ✅ Onaylandı (Müşteri)
        </Button>
        <Button
          type="button"
          size="sm"
          variant={kind === "reservation_rejected" ? "primary" : "outline"}
          onClick={() => setKind("reservation_rejected")}
        >
          ❌ Reddedildi (Müşteri)
        </Button>
        <Button
          type="button"
          size="sm"
          variant={kind === "contact" ? "primary" : "outline"}
          onClick={() => setKind("contact")}
        >
          İletişim Mesajı
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
        <div className="flex items-center gap-2 border-b border-[#e6e6e6] bg-[#f2f2f2] px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ea4335]" />
          <span className="text-[11px] font-medium tracking-wide text-[#5f6368]">Gmail</span>
        </div>
        <div className="space-y-1 border-b border-[#ececec] bg-white px-5 py-3">
          <p className="text-lg font-normal text-[#202124]">{preview?.subject || "…"}</p>
          <p className="text-xs text-[#5f6368]">
            <span className="font-medium text-[#202124]">{preview?.from || "gönderen"}</span>
            {" → "}
            {preview?.to || "SMTP_TO"}
          </p>
        </div>
        {previewErr ? (
          <p className="px-5 py-8 text-sm text-red-600">{previewErr}</p>
        ) : (
          <iframe
            title="Gmail e-posta önizlemesi"
            srcDoc={preview?.html || "<p style='padding:24px;font-family:sans-serif;color:#888'>Yükleniyor…</p>"}
            className="h-[520px] w-full border-0 bg-[#f4eee1]"
            sandbox="allow-same-origin"
          />
        )}
      </div>

      <div className="mt-4">
        <Button type="button" variant="outline" disabled={busy || !info?.configured} onClick={() => void test()}>
          Gmail’e gerçek test maili gönder
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
    chatReachable?: boolean;
    botUsername?: string | null;
    chatTitle?: string | null;
    chatType?: string | null;
    chatIdMasked?: string | null;
    hint?: string;
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
      setMsg("Grup mesajı gitti — Telegram’da Petra grubunu açın. Admin onayı ayrıca bildirim göndermez.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  const canTest = Boolean(info?.tokenConfigured && info?.chatIdConfigured);

  return (
    <section className="mt-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
      <h3 className="text-lg font-semibold text-[#F8F8F8]">Telegram grubu</h3>
      <p className="mt-2 text-sm text-[#8A9BB0]">
        Müşteri siteden rezervasyon veya iletişim gönderince mesaj gruba düşer. Admin’de onay/red
        gruba tekrar gitmez.
      </p>
      <p className="mt-3 text-sm text-[#EEE9E0]">
        Durum:{" "}
        {info?.ready && info?.chatReachable ? (
          <span className="text-emerald-300">
            Hazır {info.botUsername ? `(@${info.botUsername})` : ""}
            {info.chatTitle ? ` · ${info.chatTitle}` : ""}
            {info.chatIdMasked ? ` · ${info.chatIdMasked}` : ""}
          </span>
        ) : (
          <span className="text-amber-300">{info?.hint || "Kontrol ediliyor…"}</span>
        )}
      </p>
      {info?.hint && info.ready ? (
        <p className="mt-2 text-xs text-[#8A9BB0]">{info.hint}</p>
      ) : null}
      {msg ? <p className="mt-2 text-xs text-[#8A9BB0]">{msg}</p> : null}

      <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4 text-sm leading-relaxed text-[#D5DEE8]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C8703A]">
          Gruba düşecek örnek
        </p>
        <p className="mt-2 font-semibold text-white">Petra Cafe Restaurant</p>
        <p className="text-[#8A9BB0]">Yeni rezervasyon — müşteri siteden gönderdi</p>
        <p className="mt-3">👤 Örnek Misafir</p>
        <p>📞 0530 608 90 51</p>
        <p>📅 tarih · saat · kişi</p>
      </div>

      <div className="mt-4">
        <Button type="button" variant="outline" disabled={busy || !canTest} onClick={() => void test()}>
          Gruba test rezervasyonu gönder
        </Button>
      </div>
    </section>
  );
}
