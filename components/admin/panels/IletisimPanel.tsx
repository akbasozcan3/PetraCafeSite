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
      });
      setContent(res.data);
      setMessage("İletişim kaydedildi. Telefon, adres ve çalışma saatleri siteye yansıdı.");
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

  return (
    <>
      <AdminPageHeader
        title="İletişim"
        description="Telefon, adres, WhatsApp ve gün gün açılış–kapanış. Saatler footer, menü, rezervasyon ve S.S.S. ile aynı kaynaktan gelir."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 İletişimi Kaydet"}</span>
          </Button>
        }
      />
      <SectionHint anchor="iletisim" label="İletişim" />
      <AdminAlert message={message} />

      <section className="mb-6 space-y-4 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Telefon & WhatsApp</h3>
        <p className="text-xs text-[#6B7A94]">
          Tek numarayı yazın — arama linki, yüzen WhatsApp butonu, kategori ürün listeleri ve footer birlikte güncellenir.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Telefon numarası"
            value={content.iletisim?.telefon ?? ""}
            onChange={(e) => updatePhone(e.target.value)}
            placeholder="0530 608 90 51"
          />
          <Input
            label="Telefon (tel: linki)"
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
                    ? buildWhatsappUrl(digits, "Merhaba, masa ayırtmak istiyorum.")
                    : content.iletisim.whatsapp,
                },
              });
            }}
            placeholder="+905306089051"
          />
          <Input
            label="Telefon alt yazı"
            value={content.iletisim?.telefonAlt ?? ""}
            onChange={(e) => update("telefonAlt", e.target.value)}
          />
          <Input
            label="2. Telefon (Petra Yaşam Merkezi / Tesis)"
            value={content.iletisim?.telefon2 ?? ""}
            onChange={(e) => update("telefon2", e.target.value)}
            placeholder="0532 449 45 99"
          />
          <Input
            label="2. Telefon alt yazı"
            value={content.iletisim?.telefon2Alt ?? ""}
            onChange={(e) => update("telefon2Alt", e.target.value)}
            placeholder="Petra Yaşam Merkezi / Tesis"
          />
          <Input
            label="WhatsApp linki (otomatik)"
            value={waPreview}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="https://wa.me/905..."
          />
        </div>
        {phoneToWaDigits(content.iletisim?.telefonHam || content.iletisim?.telefon || waPreview) ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-[#C8D0DC]">
            <span className="text-[#6B7A94]">WhatsApp rezervasyon numarası: </span>
            <a
              href={buildWhatsappUrl(
                content.iletisim?.telefonHam || content.iletisim?.telefon || waPreview,
                "Merhaba, masa ayırtmak istiyorum."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-400 underline-offset-2 hover:underline"
            >
              wa.me/{phoneToWaDigits(content.iletisim?.telefonHam || content.iletisim?.telefon || waPreview)}
            </a>
            <p className="mt-1 text-xs text-[#6B7A94]">
              Kategori ve menü sayfalarındaki WhatsApp bu numaraya gider. Kaydettikten sonra siteyi yenileyin.
            </p>
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="WhatsApp başlık"
            value={content.iletisim?.whatsappBaslik ?? ""}
            onChange={(e) => update("whatsappBaslik", e.target.value)}
          />
          <Input
            label="WhatsApp alt yazı"
            value={content.iletisim?.whatsappAlt ?? ""}
            onChange={(e) => update("whatsappAlt", e.target.value)}
          />
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
