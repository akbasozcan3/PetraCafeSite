"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import {
  buildInstagramUrl,
  buildWhatsappUrl,
  formatDisplayPhone,
  phoneToTelHref,
  phoneToWaDigits,
} from "@/lib/content/contact-utils";
import SectionHint from "@/components/admin/ui/SectionHint";
import type { CalismaGunu, IletisimContent } from "@/lib/content/types";
import { formatHoursSummary, resolveHoursProgram } from "@/lib/content/hours";

export default function IletisimPanel() {
  const { content, loading, setContent } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const update = (field: keyof Omit<IletisimContent, "saatProgrami">, value: string) => {
    if (!content) return;
    setContent({ ...content, iletisim: { ...content.iletisim, [field]: value } });
  };

  /** Telefon değişince WhatsApp + tel: linki otomatik üretilir */
  const updatePhone = (visible: string) => {
    if (!content) return;
    const digits = phoneToWaDigits(visible);
    const telefonHam = digits ? phoneToTelHref(visible) : visible;
    const display = visible.trim() || (digits ? formatDisplayPhone(visible) : "");
    const prevText = (() => {
      const m = String(content.iletisim?.whatsapp || "").match(/[?&]text=([^&]*)/);
      if (!m) return "Merhaba, masa ayırtmak istiyorum.";
      try {
        return decodeURIComponent(m[1]);
      } catch {
        return "Merhaba, masa ayırtmak istiyorum.";
      }
    })();
    setContent({
      ...content,
      iletisim: {
        ...content.iletisim,
        telefon: display,
        telefonHam,
        whatsapp: digits ? buildWhatsappUrl(digits, prevText) : content.iletisim.whatsapp,
      },
    });
  };

  const updateInstagramHandle = (handle: string) => {
    if (!content) return;
    setContent({
      ...content,
      iletisim: {
        ...content.iletisim,
        instagram: handle,
        instagramUrl: buildInstagramUrl(handle) || content.iletisim.instagramUrl,
      },
    });
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await api.updateContent({
        iletisim: content.iletisim,
        waFloat: content.waFloat,
      });
      setContent(res.data);
      setMessage("İletişim ve WhatsApp ayarları başarıyla kaydedildi. Değişiklikler anında tüm siteye yansıdı.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  const waPreview = content.iletisim?.whatsapp || "";
  const program = resolveHoursProgram(content.iletisim);
  const patchProgram = (next: CalismaGunu[]) => {
    setContent({
      ...content,
      iletisim: {
        ...content.iletisim,
        saatProgrami: next,
        saatler: formatHoursSummary(next),
      },
    });
  };

  const currentWaPhone =
    content.iletisim?.telefonHam ||
    content.iletisim?.telefon ||
    "0530 608 90 51";
  const currentWaDigits = phoneToWaDigits(currentWaPhone) || "905306089051";

  // Mevcut hazır mesajı waFloat.onYazi veya iletisim.whatsapp text parametresinden al
  const currentWaMessage = (() => {
    if (content.waFloat?.onYazi?.trim()) return content.waFloat.onYazi;
    const m = String(content.iletisim?.whatsapp || "").match(/[?&]text=([^&]*)/);
    if (m) {
      try {
        return decodeURIComponent(m[1]);
      } catch {
        // ignore
      }
    }
    return "Merhaba, Petra Yaşam Merkezi web siteniz üzerinden iletişime geçiyorum. Bilgi almak istiyorum.";
  })();

  const updateWaMessage = (newMsg: string) => {
    if (!content) return;
    const nextWaUrl = buildWhatsappUrl(currentWaPhone, newMsg);
    setContent({
      ...content,
      waFloat: {
        ...(content.waFloat || {
          baslik: "WhatsApp",
          alt: "Bilgi & Rezervasyon",
          ariaLabel: "WhatsApp ile yazın",
        }),
        onYazi: newMsg,
      },
      iletisim: {
        ...content.iletisim,
        whatsapp: nextWaUrl,
      },
    });
  };

  const presetTemplates = [
    {
      title: "🌟 Genel / Standart (Önerilen)",
      text: "Merhaba, Petra Yaşam Merkezi web siteniz üzerinden iletişime geçiyorum. Bilgi almak istiyorum.",
    },
    {
      title: "🏊 Havuz & Plaj & Yüzme Kursu",
      text: "Merhaba, Petra Havuz & Plaj giriş ücretleri, çocuk havuzu ve yüzme kursu hakkında bilgi almak istiyorum.",
    },
    {
      title: "🍽️ Masa & Restoran Rezervasyonu",
      text: "Merhaba, Petra Cafe Restaurant'ta masa rezervasyonu yaptırmak istiyorum. Bilgi alabilir miyim?",
    },
    {
      title: "🏋️ Spor Salonu & Fitness",
      text: "Merhaba, Petra Spor Salonu üyelik, kayıt ve antrenman imkanları hakkında bilgi almak istiyorum.",
    },
    {
      title: "🎂 Özel Gün & Havuz Başı Davet",
      text: "Merhaba, havuz başı özel gün kutlaması ve organizasyon detayları hakkında bilgi almak istiyorum.",
    },
  ];

  const fullLiveWaUrl = buildWhatsappUrl(currentWaPhone, currentWaMessage);

  return (
    <>
      <AdminPageHeader
        title="İletişim & WhatsApp Yönetimi"
        description="Telefon, adres, çalışma saatleri ve interaktif WhatsApp karşılama mesajı önizlemesi."
        actions={
          <Button
            onClick={save}
            disabled={saving}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md"
          >
            <span>{saving ? "Kaydediliyor…" : "💾 İletişimi Kaydet"}</span>
          </Button>
        }
      />
      <SectionHint anchor="iletisim" label="İletişim" />
      <AdminAlert message={message} />

      {/* 1. TELEFON & GENEL İLETİŞİM */}
      <section className="mb-6 space-y-4 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8] flex items-center gap-2">
          📞 Telefon Numaraları & Hızlı Arama
        </h3>
        <p className="text-xs text-[#6B7A94]">
          Tek numarayı yazın — arama linki, yüzen WhatsApp butonu, kategori ürün listeleri ve footer birlikte güncellenir.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="1. Telefon Numarası (Görünen)"
            value={content.iletisim?.telefon ?? ""}
            onChange={(e) => updatePhone(e.target.value)}
            placeholder="0530 608 90 51"
          />
          <Input
            label="1. Telefon (tel: uluslararası link)"
            value={content.iletisim?.telefonHam ?? ""}
            onChange={(e) => {
              if (!content) return;
              const ham = e.target.value;
              const digits = phoneToWaDigits(ham);
              setContent({
                ...content,
                iletisim: {
                  ...content.iletisim,
                  telefonHam: ham,
                  whatsapp: digits
                    ? buildWhatsappUrl(digits, currentWaMessage)
                    : content.iletisim.whatsapp,
                },
              });
            }}
            placeholder="+905306089051"
          />
          <Input
            label="1. Telefon Alt Yazısı"
            value={content.iletisim?.telefonAlt ?? ""}
            onChange={(e) => update("telefonAlt", e.target.value)}
            placeholder="Cafe & Restaurant / Rezervasyon"
          />
          <Input
            label="2. Telefon (Petra Yaşam Merkezi / Tesis)"
            value={content.iletisim?.telefon2 ?? ""}
            onChange={(e) => update("telefon2", e.target.value)}
            placeholder="0532 449 45 99"
          />
          <Input
            label="2. Telefon Alt Yazısı"
            value={content.iletisim?.telefon2Alt ?? ""}
            onChange={(e) => update("telefon2Alt", e.target.value)}
            placeholder="Petra Yaşam Merkezi / Tesis"
          />
          <Input
            label="Doğrudan WhatsApp Bağlantısı (URL)"
            value={fullLiveWaUrl}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="https://wa.me/905306089051?text=..."
          />
        </div>
      </section>

      {/* 2. CANLI WHATSAPP SOHBET ÖNİZLEMESİ & MESAJ ŞABLONU */}
      <section className="mb-6 space-y-5 rounded-2xl border border-emerald-500/30 bg-[#0E1B2A]/90 p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
          <div>
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <span>💬</span> WhatsApp Hazır Mesaj Şablonu & Canlı Sohbet Simülasyonu
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              Kullanıcı sitedeki herhangi bir WhatsApp butonuna tıkladığında mesaj kutusunda otomatik belirecek hazır mesaj.
            </p>
          </div>
          <a
            href={fullLiveWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span>🚀</span> WhatsApp'ta Canlı Test Et
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Sol Taraf: Mesaj Düzenleme & Şablonlar */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#E2E8F0] mb-2">
                Otomatik Karşılama / Hazır Mesaj Metni
              </label>
              <textarea
                rows={4}
                value={currentWaMessage}
                onChange={(e) => updateWaMessage(e.target.value)}
                placeholder="Müşterinin WhatsApp kutusunda otomatik hazır çıkacak mesaj..."
                className="w-full rounded-xl border border-white/10 bg-[#162234] p-3.5 text-sm text-[#F8FAFC] placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <p className="mt-1.5 text-xs text-[#94A3B8]">
                💡 Mesaj otomatik gönderilmez; sadece kullanıcının WhatsApp mesaj kutusuna hazır olarak doldurulur. Kullanıcı isterse düzenleyip gönderir.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                ⚡ Hızlı Şablon Seçiciler (Tek Tıkla Uygula):
              </label>
              <div className="grid gap-2 sm:grid-cols-1">
                {presetTemplates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => updateWaMessage(tpl.text)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                      currentWaMessage === tpl.text
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-300 font-medium"
                        : "border-white/10 bg-[#162234]/70 text-[#CBD5E1] hover:border-emerald-500/50 hover:bg-[#1E2E42]"
                    }`}
                  >
                    <b className="block text-emerald-400 mb-0.5">{tpl.title}</b>
                    <span className="opacity-90">{tpl.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <Input
                label="Kayan WhatsApp Buton Başlığı"
                value={content.waFloat?.baslik ?? "WhatsApp"}
                onChange={(e) => {
                  setContent({
                    ...content,
                    waFloat: {
                      ...(content.waFloat || {
                        alt: "Bilgi & Rezervasyon",
                        onYazi: currentWaMessage,
                        ariaLabel: "WhatsApp ile yazın",
                      }),
                      baslik: e.target.value,
                    },
                  });
                }}
                placeholder="WhatsApp"
              />
              <Input
                label="Kayan WhatsApp Buton Alt Yazısı"
                value={content.waFloat?.alt ?? "Bilgi & Rezervasyon"}
                onChange={(e) => {
                  setContent({
                    ...content,
                    waFloat: {
                      ...(content.waFloat || {
                        baslik: "WhatsApp",
                        onYazi: currentWaMessage,
                        ariaLabel: "WhatsApp ile yazın",
                      }),
                      alt: e.target.value,
                    },
                  });
                }}
                placeholder="Bilgi & Rezervasyon"
              />
            </div>
          </div>

          {/* Sağ Taraf: Canlı WhatsApp Telefon Mockup'ı */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <span>📱</span> Müşteri Ekranında Nasıl Görünür? (Canlı Önizleme)
            </p>

            {/* Mockup Çerçevesi */}
            <div className="w-full max-w-[340px] rounded-[32px] border-[6px] border-[#2C394B] bg-[#0B141A] shadow-2xl overflow-hidden text-white font-sans">
              {/* WhatsApp Header */}
              <div className="bg-[#1F2C34] px-3 py-2.5 flex items-center justify-between border-b border-[#2A3942]">
                <div className="flex items-center gap-2">
                  <div className="text-[#8696A0] text-sm">‹</div>
                  <div className="w-9 h-9 rounded-full bg-[#00A884] flex items-center justify-center font-bold text-white text-xs overflow-hidden border border-[#00A884]">
                    PETRA
                  </div>
                  <div>
                    <b className="block text-xs text-[#E9EDEF] font-semibold truncate max-w-[130px]">
                      Petra Yaşam Merkezi
                    </b>
                    <span className="block text-[10px] text-[#00A884] font-medium leading-none mt-0.5">
                      🟢 çevrimiçi · İşletme
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#8696A0] text-xs">
                  <span>📹</span>
                  <span>📞</span>
                  <span>⋮</span>
                </div>
              </div>

              {/* Sohbet Gövdesi */}
              <div
                className="p-3.5 space-y-3 min-h-[220px] flex flex-col justify-end"
                style={{
                  backgroundColor: "#0B141A",
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, rgba(30, 42, 54, 0.4) 0%, transparent 80%)",
                }}
              >
                {/* Güvenlik Rozeti */}
                <div className="bg-[#182229] border border-[#222E35] rounded-lg p-2 text-center text-[10px] text-[#FFD279] shadow-sm">
                  🔒 Mesajlar uçtan uca şifrelidir. Petra Cafe Restaurant & Yaşam Merkezi
                </div>

                {/* Tarih */}
                <div className="text-center">
                  <span className="bg-[#182229] text-[#8696A0] text-[9px] font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    Bugün
                  </span>
                </div>

                {/* Giden Mesaj Balonu */}
                <div className="flex justify-end">
                  <div className="bg-[#005C4B] text-[#E9EDEF] rounded-2xl rounded-tr-none px-3.5 py-2.5 max-w-[88%] shadow-md text-xs leading-relaxed relative">
                    <p className="whitespace-pre-wrap">{currentWaMessage}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#8696A0]">
                      <span>13:25</span>
                      <span className="text-[#53BDEB] font-bold">✓✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alt Mesaj Yazma Barı Mockup */}
              <div className="bg-[#1F2C34] p-2 flex items-center gap-2 border-t border-[#2A3942]">
                <div className="text-base text-[#8696A0]">😊</div>
                <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-1.5 text-[11px] text-[#8696A0] truncate">
                  Mesaj yazın...
                </div>
                <div className="text-base text-[#8696A0]">📎</div>
                <div className="w-7 h-7 rounded-full bg-[#00A884] flex items-center justify-center text-white text-xs">
                  ➤
                </div>
              </div>
            </div>

            {/* Test Linki ve Bilgi */}
            <div className="mt-3 text-center space-y-1.5">
              <span className="inline-block text-[11px] text-[#94A3B8]">
                Hedef Numara: <b className="text-emerald-400">+{currentWaDigits}</b>
              </span>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={fullLiveWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium"
                >
                  🔗 wa.me/{currentWaDigits} test et →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/80 p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="font-semibold text-[#F8F8F8] flex items-center gap-2">
              🌐 Sosyal Medya Hesapları & İkonlar
            </h3>
            <p className="text-xs text-[#6B7A94] mt-1">
              Footer'da ve iletişim bölümünde WhatsApp boyutuyla uyumlu şık ikonlar olarak görünür.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!content) return;
              const currentSocials = content.iletisim?.socials || [];
              const newSocial = {
                id: `s-${Date.now()}`,
                platform: "instagram" as const,
                label: "Yeni Hesap",
                url: "",
                active: true,
              };
              setContent({
                ...content,
                iletisim: {
                  ...content.iletisim,
                  socials: [...currentSocials, newSocial],
                },
              });
            }}
          >
            + Yeni Hesap Ekle
          </Button>
        </div>

        <div className="space-y-3 pt-2">
          {((content.iletisim?.socials && content.iletisim.socials.length > 0)
            ? content.iletisim.socials
            : [
                { id: "s-ig", platform: "instagram" as const, label: "Instagram", url: content.iletisim?.instagramUrl || "https://www.instagram.com/petracaferestaurant/", active: true },
                { id: "s-wa", platform: "whatsapp" as const, label: "WhatsApp", url: content.iletisim?.whatsapp || "https://wa.me/905306089051", active: true },
                { id: "s-tt", platform: "tiktok" as const, label: "TikTok", url: "https://www.tiktok.com/@petracaferestaurant", active: true },
                { id: "s-maps", platform: "maps" as const, label: "Google Haritalar", url: "https://maps.google.com/?q=Petra+Cafe+Restaurant+Taşdelen", active: true },
              ]
          ).map((s, idx) => (
            <div
              key={s.id || idx}
              className="grid gap-3 p-4 rounded-xl border border-white/[0.08] bg-[#0D1117] sm:grid-cols-[130px_160px_1fr_auto_auto] items-center"
            >
              <div>
                <label className="block text-[11px] text-[#6B7A94] mb-1">Platform</label>
                <select
                  value={s.platform}
                  onChange={(e) => {
                    if (!content) return;
                    const list = [...(content.iletisim?.socials || [])];
                    list[idx] = { ...s, platform: e.target.value as any };
                    setContent({ ...content, iletisim: { ...content.iletisim, socials: list } });
                  }}
                  className="w-full rounded-lg border border-white/10 bg-[#141E2E] px-2.5 py-2 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                >
                  <option value="instagram">Instagram</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="twitter">X (Twitter)</option>
                  <option value="maps">Google Harita</option>
                  <option value="telegram">Telegram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#6B7A94] mb-1">Hesap / Başlık</label>
                <input
                  type="text"
                  value={s.label}
                  onChange={(e) => {
                    if (!content) return;
                    const list = [...(content.iletisim?.socials || [])];
                    list[idx] = { ...s, label: e.target.value };
                    setContent({ ...content, iletisim: { ...content.iletisim, socials: list } });
                  }}
                  placeholder="Örn: Instagram"
                  className="w-full rounded-lg border border-white/10 bg-[#141E2E] px-3 py-2 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#6B7A94] mb-1">Profil Linki / URL *</label>
                <input
                  type="text"
                  value={s.url}
                  onChange={(e) => {
                    if (!content) return;
                    const list = [...(content.iletisim?.socials || [])];
                    list[idx] = { ...s, url: e.target.value };
                    setContent({ ...content, iletisim: { ...content.iletisim, socials: list } });
                  }}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-white/10 bg-[#141E2E] px-3 py-2 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-4 sm:pt-0">
                <label className="flex items-center gap-1.5 text-xs text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={s.active !== false}
                    onChange={(e) => {
                      if (!content) return;
                      const list = [...(content.iletisim?.socials || [])];
                      list[idx] = { ...s, active: e.target.checked };
                      setContent({ ...content, iletisim: { ...content.iletisim, socials: list } });
                    }}
                    className="h-4 w-4 rounded border-white/20 bg-[#141E2E] text-[#D9A441]"
                  />
                  <span>Yayında</span>
                </label>
              </div>

              <div className="pt-4 sm:pt-0">
                <button
                  type="button"
                  title="Hesabı sil"
                  onClick={() => {
                    if (!content) return;
                    const list = (content.iletisim?.socials || []).filter((_, i) => i !== idx);
                    setContent({ ...content, iletisim: { ...content.iletisim, socials: list } });
                  }}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">E-posta & İletişim Notları</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="E-posta"
            type="email"
            value={content.iletisim?.eposta ?? ""}
            onChange={(e) => update("eposta", e.target.value)}
            placeholder="info@ornek.com"
          />
          <Input
            label="E-posta alt yazı"
            value={content.iletisim?.epostaAlt ?? ""}
            onChange={(e) => update("epostaAlt", e.target.value)}
          />
        </div>
      </section>


      <section className="mb-6 space-y-4 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Açılış / kapanış saatleri</h3>
        <p className="text-xs text-[#6B7A94]">
          Gün gün yazın. Navbar, footer, iletişim kartı, ziyaret şeridi, rezervasyon saat listesi ve “hangi saatlerde açıksınız” sorusu buradan gelir.
        </p>
        <div className="space-y-2">
          {program.map((row, i) => (
            <div
              key={row.gun}
              className="grid items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0D1117]/80 px-3 py-2 sm:grid-cols-[7.5rem_auto_1fr_1fr]"
            >
              <p className="text-sm font-semibold text-[#EEE9E0]">{row.gun}</p>
              <label className="flex items-center gap-2 text-xs text-[#8A9BB0]">
                <input
                  type="checkbox"
                  checked={row.kapali === true}
                  onChange={(e) => {
                    const next = program.map((item, idx) =>
                      idx === i ? { ...item, kapali: e.target.checked } : item
                    );
                    patchProgram(next);
                  }}
                />
                Kapalı
              </label>
              <input
                type="time"
                aria-label={`${row.gun} açılış`}
                disabled={row.kapali === true}
                value={row.acilis}
                onChange={(e) => {
                  const next = program.map((item, idx) =>
                    idx === i ? { ...item, acilis: e.target.value || item.acilis } : item
                  );
                  patchProgram(next);
                }}
                className="h-10 rounded-xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0] disabled:opacity-40"
              />
              <input
                type="time"
                aria-label={`${row.gun} kapanış`}
                disabled={row.kapali === true}
                value={row.kapanis}
                onChange={(e) => {
                  const next = program.map((item, idx) =>
                    idx === i ? { ...item, kapanis: e.target.value || item.kapanis } : item
                  );
                  patchProgram(next);
                }}
                className="h-10 rounded-xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0] disabled:opacity-40"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-[#E8B84B] underline-offset-2 hover:underline"
          onClick={() => {
            const first = program[0];
            patchProgram(
              program.map((item) => ({
                ...item,
                acilis: first.acilis,
                kapanis: first.kapanis,
                kapali: first.kapali,
              }))
            );
          }}
        >
          Pazartesi saatini tüm günlere kopyala
        </button>
        <Input
          label="Kısa satır (navbar / footer)"
          value={content.iletisim?.saatler ?? ""}
          onChange={(e) => update("saatler", e.target.value)}
        />
        <p className="text-[11px] text-[#6B7A94]">Günleri değiştirince otomatik dolar. İsterseniz kısaltın.</p>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Adres & harita</h3>
        <p className="text-[12px] leading-relaxed text-[#6B7A94]">
          Adres, koordinat ve buton metni sitedeki haritaya yansır. Masaüstünde harita iletişim bölümünün sağında büyür.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Bölüm üst yazısı" value={content.iletisim?.eyebrow ?? ""} onChange={(e) => update("eyebrow", e.target.value)} placeholder="İletişim" />
          <Input label="Bölüm Başlığı" value={content.iletisim?.baslik ?? ""} onChange={(e) => update("baslik", e.target.value)} />
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Giriş Metni</label>
            <textarea
              value={content.iletisim?.giris ?? ""}
              onChange={(e) => update("giris", e.target.value)}
              rows={2}
              className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Alt Metin</label>
            <textarea
              value={content.iletisim?.metin ?? ""}
              onChange={(e) => update("metin", e.target.value)}
              rows={2}
              className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none"
            />
          </div>
          <Input label="Havuz / organizasyon notu" value={content.iletisim?.ozelPastaNot ?? ""} onChange={(e) => update("ozelPastaNot", e.target.value)} />
          <Input label="Adres satır 1" value={content.iletisim?.adresSatir1 ?? ""} onChange={(e) => update("adresSatir1", e.target.value)} />
          <Input label="Adres satır 2" value={content.iletisim?.adresSatir2 ?? ""} onChange={(e) => update("adresSatir2", e.target.value)} />
          <Input label="Adres satır 3" value={content.iletisim?.adresSatir3 ?? ""} onChange={(e) => update("adresSatir3", e.target.value)} />
          <Input label="Harita buton metni" value={content.iletisim?.haritaButonMetin ?? ""} onChange={(e) => update("haritaButonMetin", e.target.value)} />
          <Input label="Harita iframe başlığı" value={content.iletisim?.haritaIframeBaslik ?? ""} onChange={(e) => update("haritaIframeBaslik", e.target.value)} />
          <Input
            label="Koordinat (lat,lng)"
            value={content.iletisim?.koordinat ?? ""}
            onChange={(e) => {
              update("koordinat", e.target.value);
              update("haritaSorgu", e.target.value);
            }}
            placeholder="41.029976,29.226160"
          />
          <Input label="Harita sorgu metni" value={content.iletisim?.haritaSorgu ?? ""} onChange={(e) => update("haritaSorgu", e.target.value)} />
        </div>
        <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-[#8A9BB0]">Kart etiketleri</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Etiket: Adres" value={content.iletisim?.etiketAdres ?? ""} onChange={(e) => update("etiketAdres", e.target.value)} />
          <Input label="Etiket: Saatler" value={content.iletisim?.etiketSaatler ?? ""} onChange={(e) => update("etiketSaatler", e.target.value)} />
          <Input label="Etiket: Telefon" value={content.iletisim?.etiketTelefon ?? ""} onChange={(e) => update("etiketTelefon", e.target.value)} />
          <Input label="Etiket: WhatsApp" value={content.iletisim?.etiketWhatsapp ?? ""} onChange={(e) => update("etiketWhatsapp", e.target.value)} />
          <Input label="Etiket: Havuz" value={content.iletisim?.etiketOzelPasta ?? ""} onChange={(e) => update("etiketOzelPasta", e.target.value)} />
        </div>
      </section>

      <div className="mt-2">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Kaydet
        </Button>
      </div>
    </>
  );
}
