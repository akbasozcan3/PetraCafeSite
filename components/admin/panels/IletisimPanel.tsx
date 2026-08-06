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

export default function IletisimPanel() {
  const { content, loading, setContent } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const update = (field: string, value: string) => {
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
      if (!m) return "Merhaba, sipariş vermek istiyorum.";
      try {
        return decodeURIComponent(m[1]);
      } catch {
        return "Merhaba, sipariş vermek istiyorum.";
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
      navbar: {
        ...content.navbar,
        ctaLabel: display || content.navbar.ctaLabel,
        ctaHref: telefonHam ? `tel:${telefonHam}` : content.navbar.ctaHref,
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
        navbar: content.navbar,
      });
      setContent(res.data);
      setMessage("İletişim bilgileri kaydedildi. Telefon, WhatsApp, Instagram ve e-posta siteye yansıdı.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  const waPreview = content.iletisim?.whatsapp || "";

  return (
    <>
      <AdminPageHeader
        title="İletişim"
        description="Ana sayfa iletişim bölümü + telefon, WhatsApp, Instagram, e-posta. Telefon değişince tüm site numaraları güncellenir."
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
            placeholder="0552 340 02 02"
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
                    ? buildWhatsappUrl(digits, "Merhaba, sipariş vermek istiyorum.")
                    : content.iletisim.whatsapp,
                },
                navbar: {
                  ...content.navbar,
                  ctaHref: ham ? `tel:${ham}` : content.navbar.ctaHref,
                },
              });
            }}
            placeholder="+905523400202"
          />
          <Input
            label="Telefon alt yazı"
            value={content.iletisim?.telefonAlt ?? ""}
            onChange={(e) => update("telefonAlt", e.target.value)}
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
            <span className="text-[#6B7A94]">Ürün sipariş numarası: </span>
            <a
              href={buildWhatsappUrl(
                content.iletisim?.telefonHam || content.iletisim?.telefon || waPreview,
                "Merhaba, sipariş vermek istiyorum."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-400 underline-offset-2 hover:underline"
            >
              wa.me/{phoneToWaDigits(content.iletisim?.telefonHam || content.iletisim?.telefon || waPreview)}
            </a>
            <p className="mt-1 text-xs text-[#6B7A94]">
              Kategori ürün listeleri bu numaraya gider. Yanlış numarada WhatsApp “bulunamadı” gösterir — kaydettikten sonra siteyi hard-refresh edin.
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

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">E-posta & Instagram</h3>
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
          <Input
            label="Instagram kullanıcı adı"
            value={content.iletisim?.instagram ?? ""}
            onChange={(e) => updateInstagramHandle(e.target.value)}
            placeholder="@magaza"
          />
          <Input
            label="Instagram URL"
            value={content.iletisim?.instagramUrl ?? ""}
            onChange={(e) => update("instagramUrl", e.target.value)}
            placeholder="https://www.instagram.com/..."
          />
          <Input
            label="Instagram alt yazı"
            value={content.iletisim?.instagramAlt ?? ""}
            onChange={(e) => update("instagramAlt", e.target.value)}
          />
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Adres & harita</h3>
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
          <Input label="Çalışma saatleri" value={content.iletisim?.saatler ?? ""} onChange={(e) => update("saatler", e.target.value)} />
          <Input label="Özel pasta notu" value={content.iletisim?.ozelPastaNot ?? ""} onChange={(e) => update("ozelPastaNot", e.target.value)} />
          <Input label="Adres satır 1" value={content.iletisim?.adresSatir1 ?? ""} onChange={(e) => update("adresSatir1", e.target.value)} />
          <Input label="Adres satır 2" value={content.iletisim?.adresSatir2 ?? ""} onChange={(e) => update("adresSatir2", e.target.value)} />
          <Input label="Adres satır 3" value={content.iletisim?.adresSatir3 ?? ""} onChange={(e) => update("adresSatir3", e.target.value)} />
          <Input label="Harita buton metni" value={content.iletisim?.haritaButonMetin ?? ""} onChange={(e) => update("haritaButonMetin", e.target.value)} />
          <Input
            label="Koordinat (lat,lng)"
            value={content.iletisim?.koordinat ?? ""}
            onChange={(e) => {
              update("koordinat", e.target.value);
              update("haritaSorgu", e.target.value);
            }}
            placeholder="41.031267,29.229361"
          />
          <Input label="Harita sorgu metni" value={content.iletisim?.haritaSorgu ?? ""} onChange={(e) => update("haritaSorgu", e.target.value)} />
        </div>
        <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-[#8A9BB0]">Kart etiketleri</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Etiket: Adres" value={content.iletisim?.etiketAdres ?? ""} onChange={(e) => update("etiketAdres", e.target.value)} />
          <Input label="Etiket: Saatler" value={content.iletisim?.etiketSaatler ?? ""} onChange={(e) => update("etiketSaatler", e.target.value)} />
          <Input label="Etiket: Telefon" value={content.iletisim?.etiketTelefon ?? ""} onChange={(e) => update("etiketTelefon", e.target.value)} />
          <Input label="Etiket: WhatsApp" value={content.iletisim?.etiketWhatsapp ?? ""} onChange={(e) => update("etiketWhatsapp", e.target.value)} />
          <Input label="Etiket: Özel pasta" value={content.iletisim?.etiketOzelPasta ?? ""} onChange={(e) => update("etiketOzelPasta", e.target.value)} />
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
