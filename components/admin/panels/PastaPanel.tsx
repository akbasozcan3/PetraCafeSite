"use client";

import { useState } from "react";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import { api } from "@/lib/api/client";
import {
  Waves,
  Plus,
  Trash2,
  GraduationCap,
  Image as ImageIcon,
  ExternalLink,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

export default function PastaPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  const p = content.pasta || {
    eyebrow: "POOL & BEACH KULÜBÜ",
    baslik: "Petra Pool & Beach",
    lead: "Petra Yaşam Merkezi’nde temiz bakımlı havuz, çocuk havuzu, güneşlenme şezlongları, VIP hasır localar, yüzme eğitimleri ve havuz başı kafe-restoran.",
    slogan: "Keyif, Konfor ve Kalite Petra'da Bir Arada!",
    cafeSaat: "08:00 – 02:00",
    havuzSaat: "09:00 – 18:00",
    derinlik: "1.45 m – 1.95 m",
    fiyatBaslik: "GÜNLÜK HAVUZ GİRİŞ ÜCRETLERİMİZ",
    fiyatNot:
      "0–2 yaş ücretsizdir. Giriş ücretine yetişkin havuzu, ayrı çocuk havuzu, şezlong ve şemsiye kullanımı dahildir. Havuz alanı 09:00 - 18:00 saatleri arasında açıktır. Dışarıdan yiyecek ve içecek getirilmez.",
    fiyatlar: [
      { kategori: "0 – 2 Yaş", haftaIci: "Ücretsiz", haftaSonu: "Ücretsiz" },
      { kategori: "2 – 10 Yaş", haftaIci: "400 TL", haftaSonu: "450 TL" },
      { kategori: "10 – 18 Yaş", haftaIci: "600 TL", haftaSonu: "650 TL" },
      { kategori: "Yetişkin", haftaIci: "800 TL", haftaSonu: "850 TL" },
    ],
    yuzmeKursu: {
      baslik: "YÜZME KURSU",
      rozet: "Kayıtlarımız Başlamıştır",
      lead: "Uzman eğitmenlerimiz eşliğinde, çocuklarınızın suya olan güvenini artırmak ve temel yüzme becerilerini öğrenmelerini amaçlıyoruz.",
      programGunler: "SALI - PERŞEMBE",
      programSaat: "08:45 – 09:30",
      yasGruplari: ["5–8 Yaş", "9–12 Yaş"],
      grupFiyat: "7.000 TL",
      ozelFiyat: "9.000 TL",
      telefon: "0530 608 90 51",
      instagram: "@petracaferestaurant",
    },
    gorseller: [
      {
        src: "/assets/cms/petra-pool-beach-loca.jpg",
        alt: "Pool & Beach & VIP Hasır Localar",
        desc: "Güneşlenme şezlongları, yetişkin havuzu ve konforlu hasır localarla gün boyu lüks tatil ve serinlik keyfi.",
        tag: "Açık Yüzme Havuzu",
        position: "center 40%",
      },
      {
        src: "/assets/cms/petra-nargile-havuz-gece.jpg",
        alt: "Gece Havuz Kenarı Lounge & Nargile",
        desc: "Işıklı su havuzu manzarası eşliğinde premium nargile çeşitleri, kokteyller ve ferah açık hava oturma alanı.",
        tag: "Teras & Akşam Keyfi",
        position: "center center",
      },
      {
        src: "/assets/cms/petra-restoran-salon-organizasyon.jpg",
        alt: "Özel Günler & Restoran Salonu",
        desc: "Doğum günleri, evlilik teklifleri ve kurumsal davetler için havuz manzaralı şık masa düzeni ve zengin dünya mutfağı.",
        tag: "Kutlama & Davet",
        position: "center center",
      },
      {
        src: "/assets/cms/hero-cephe.webp",
        alt: "Petra Yaşam Merkezi & Tesis Alanı",
        desc: "Taşdelen'de açık yetişkin havuzu, ayrı çocuk havuzu, modern fitness salonu ve zengin restoranı bir arada sunan yaşam alanı.",
        tag: "Sosyal Yaşam Alanı",
        position: "center center",
      },
    ],
    kurallar: [
      "Tesis bünyesinde çocukların güvenle zaman geçirebileceği ayrı bir çocuk havuzu mevcuttur.",
      "Büyük havuzun derinliği kademeli olarak 1.45 metre ile 1.95 metre arasında değişmektedir.",
      "Havuzda yaş sınırı olmaksızın profesyonel yüzme kursu eğitimi verilmektedir.",
      "Havuz alanı 09:00 - 18:00 saatleri arasında kullanıma açıktır.",
    ],
    instagramEtiket: "@petracaferestaurant",
    instagramHref: "https://www.instagram.com/petracaferestaurant/",
    maddeler: [],
    body: "Bilgi ve rezervasyon: 0530 608 90 51 · Instagram @petracaferestaurant.",
    ctaLabel: "Havuz Rezervasyonu",
    ctaHref: "#rezervasyon",
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await api.updateContent({ pasta: p });
      setContent(res.data);
      setMessage("Havuz & Plaj bilgileri başarıyla kaydedildi. Canlı site güncellendi.");
      setMessageType("success");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kayıt başarısız");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const updatePasta = (patch: Partial<typeof p>) => {
    setContent({
      ...content,
      pasta: { ...p, ...patch },
    });
  };

  return (
    <>
      <AdminPageHeader
        title="Havuz & Plaj (Pool & Beach) Yönetimi"
        description="Petra Havuz & Plaj sayfası (/havuz-plaj), 2026 giriş fiyatları, yüzme kursu programı ve 16:9 görsel vitrinini buradan yönetin."
        actions={
          <a
            href="/havuz-plaj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-[#EEE9E0] border border-white/10 transition"
          >
            <span>Canlı Sayfayı Aç</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#D9A441]" />
          </a>
        }
      />

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            messageType === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          {message}
        </div>
      )}

      <SaveBar saving={saving} onSave={handleSave} label="Havuz & Plaj Sayfasını Kaydet" />

      <div className="space-y-6 pb-28 max-w-6xl">
        {/* 1. GENEL BİLGİLER VE ÇALIŞMA SAATLERİ */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <Waves className="h-5 w-5 text-[#D9A441]" /> 1. Genel Bilgiler & Sayfa Başlığı
            </h3>
            <span className="text-xs text-[#8A9BB0]">/havuz-plaj üst başlık alanı</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Üst Etiket (Eyebrow)"
              value={p.eyebrow || ""}
              onChange={(e) => updatePasta({ eyebrow: e.target.value })}
              placeholder="POOL & BEACH KULÜBÜ"
            />
            <Input
              label="Sayfa Ana Başlığı (H1)"
              value={p.baslik || ""}
              onChange={(e) => updatePasta({ baslik: e.target.value })}
              placeholder="Petra Pool & Beach"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8A9BB0]">
              Tanıtım Açıklama Metni (Lead)
            </label>
            <textarea
              value={p.lead || ""}
              onChange={(e) => updatePasta({ lead: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-2.5 text-sm text-[#EEE9E0] placeholder:text-[#6B7A94] focus:border-[#D9A441] focus:outline-none"
              placeholder="Petra Yaşam Merkezi havuz tanıtım spotu..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-4 pt-2">
            <Input
              label="Kafe / Teras Saatleri"
              value={p.cafeSaat || ""}
              onChange={(e) => updatePasta({ cafeSaat: e.target.value })}
              placeholder="08:00 – 02:00"
            />
            <Input
              label="Havuz Hizmet Saatleri"
              value={p.havuzSaat || ""}
              onChange={(e) => updatePasta({ havuzSaat: e.target.value })}
              placeholder="09:00 – 18:00"
            />
            <Input
              label="Havuz Derinliği"
              value={p.derinlik || ""}
              onChange={(e) => updatePasta({ derinlik: e.target.value })}
              placeholder="1.45 m – 1.95 m"
            />
            <Input
              label="Instagram Hesabı"
              value={p.instagramEtiket || ""}
              onChange={(e) => updatePasta({ instagramEtiket: e.target.value })}
              placeholder="@petracaferestaurant"
            />
          </div>
        </section>

        {/* 2. 2026 SEZONU GİRİŞ FİYAT TARİFESİ */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-400" /> 2. 2026 Sezonu Havuz Giriş Fiyat Tarifesi
              </h3>
              <p className="text-xs text-[#8A9BB0] mt-0.5">
                Müşterilerin /havuz-plaj sayfasında gördüğü karşılaştırmalı fiyat kartları.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [
                  ...(p.fiyatlar || []),
                  { kategori: "Yeni Yaş Grubu", haftaIci: "500 TL", haftaSonu: "550 TL" },
                ];
                updatePasta({ fiyatlar: next });
              }}
              className="border-dashed border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <Plus className="h-4 w-4 mr-1" /> Fiyat Satırı Ekle
            </Button>
          </div>

          <Input
            label="Tarife Bölüm Başlığı"
            value={p.fiyatBaslik || ""}
            onChange={(e) => updatePasta({ fiyatBaslik: e.target.value })}
            placeholder="GÜNLÜK HAVUZ GİRİŞ ÜCRETLERİMİZ"
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(p.fiyatlar || []).map((row, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-white/[0.08] bg-[#0D1117] p-4 relative flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">Tarife #{i + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = (p.fiyatlar || []).filter((_, idx) => idx !== i);
                        updatePasta({ fiyatlar: next });
                      }}
                      className="text-[#8A9BB0] hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Input
                    label="Yaş / Kategori"
                    value={row.kategori}
                    onChange={(e) => {
                      const next = [...(p.fiyatlar || [])];
                      next[i] = { ...next[i], kategori: e.target.value };
                      updatePasta({ fiyatlar: next });
                    }}
                    placeholder="2–10 Yaş"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Hafta İçi"
                      value={row.haftaIci}
                      onChange={(e) => {
                        const next = [...(p.fiyatlar || [])];
                        next[i] = { ...next[i], haftaIci: e.target.value };
                        updatePasta({ fiyatlar: next });
                      }}
                      placeholder="400 TL"
                    />
                    <Input
                      label="Hafta Sonu"
                      value={row.haftaSonu || row.haftaIci}
                      onChange={(e) => {
                        const next = [...(p.fiyatlar || [])];
                        next[i] = { ...next[i], haftaSonu: e.target.value };
                        updatePasta({ fiyatlar: next });
                      }}
                      placeholder="450 TL"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-[#8A9BB0]">
              Fiyat Tarifesi & Hijyen Bilgilendirme Notu
            </label>
            <textarea
              value={p.fiyatNot || ""}
              onChange={(e) => updatePasta({ fiyatNot: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-2.5 text-xs text-[#EEE9E0] placeholder:text-[#6B7A94] focus:border-[#D9A441] focus:outline-none"
              placeholder="0–2 yaş ücretsizdir. Dışarıdan yiyecek getirilmez..."
            />
          </div>
        </section>

        {/* 3. YÜZME KURSU PROGRAMI & ÜCRETLERİ */}
        <section className="space-y-4 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-[#17202E] to-[#121924] p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-amber-400" /> 3. Yüzme Kursu Programı & Ücretleri
              </h3>
              <p className="text-xs text-[#8A9BB0] mt-0.5">
                Salı-Perşembe grup ve özel yüzme dersi kayıt bilgileri.
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              🔥 {p.yuzmeKursu?.rozet || "Kayıtlarımız Başlamıştır"}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Kurs Başlığı"
              value={p.yuzmeKursu?.baslik || "YÜZME KURSU"}
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                updatePasta({ yuzmeKursu: { ...yk, baslik: e.target.value } });
              }}
              placeholder="YÜZME KURSU"
            />
            <Input
              label="Durum Rozeti"
              value={p.yuzmeKursu?.rozet || "Kayıtlarımız Başlamıştır"}
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                updatePasta({ yuzmeKursu: { ...yk, rozet: e.target.value } });
              }}
              placeholder="Kayıtlarımız Başlamıştır"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="Program Günleri"
              value={p.yuzmeKursu?.programGunler || "SALI - PERŞEMBE"}
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                updatePasta({ yuzmeKursu: { ...yk, programGunler: e.target.value } });
              }}
              placeholder="SALI - PERŞEMBE"
            />
            <Input
              label="Ders Saatleri"
              value={p.yuzmeKursu?.programSaat || "08:45 – 09:30"}
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                updatePasta({ yuzmeKursu: { ...yk, programSaat: e.target.value } });
              }}
              placeholder="08:45 – 09:30"
            />
            <Input
              label="Yaş Grupları"
              value={
                Array.isArray(p.yuzmeKursu?.yasGruplari)
                  ? p.yuzmeKursu.yasGruplari.join(", ")
                  : "5–8 Yaş, 9–12 Yaş"
              }
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                updatePasta({ yuzmeKursu: { ...yk, yasGruplari: arr } });
              }}
              placeholder="5–8 Yaş, 9–12 Yaş"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Grup Ders Ücreti"
              value={p.yuzmeKursu?.grupFiyat || "7.000 TL"}
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                updatePasta({ yuzmeKursu: { ...yk, grupFiyat: e.target.value } });
              }}
              placeholder="7.000 TL"
            />
            <Input
              label="Birebir Özel Ders Ücreti"
              value={p.yuzmeKursu?.ozelFiyat || "9.000 TL"}
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                updatePasta({ yuzmeKursu: { ...yk, ozelFiyat: e.target.value } });
              }}
              placeholder="9.000 TL"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8A9BB0]">
              Kurs Tanıtım Açıklaması (Lead)
            </label>
            <textarea
              value={p.yuzmeKursu?.lead || ""}
              onChange={(e) => {
                const yk = p.yuzmeKursu || ({} as any);
                updatePasta({ yuzmeKursu: { ...yk, lead: e.target.value } });
              }}
              rows={2}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-2.5 text-xs text-[#EEE9E0] placeholder:text-[#6B7A94] focus:border-[#D9A441] focus:outline-none"
              placeholder="Uzman eğitmenlerimiz eşliğinde çocuklarınızın suya olan güvenini artırıyoruz..."
            />
          </div>
        </section>

        {/* 4. 4'LÜ GÖRSEL VİTRİNİ KARTLARI (16:9) */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#D9A441]" /> 4. Görsel Vitrini Kartları (16:9 Oranlı)
              </h3>
              <p className="text-xs text-[#8A9BB0] mt-0.5">
                Sayfanın üstünde eşit boyutta 16:9 görsel ve altında başlık/açıklama içeren 4 vitrin kartı.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [
                  ...(p.gorseller || []),
                  {
                    src: "/assets/cms/hero-ic.webp",
                    alt: "Yeni Mekan Kartı",
                    desc: "Petra Yaşam Merkezi'nde konforlu ve ferah alanlar.",
                    tag: "Mekan",
                    position: "center center",
                  },
                ];
                updatePasta({ gorseller: next });
              }}
              className="border-dashed border-white/20 text-[#D9A441] hover:bg-white/5"
            >
              <Plus className="h-4 w-4 mr-1" /> Kart Ekle
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(p.gorseller || []).map((img, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-white/10 bg-[#0D1117] p-3 shadow-md relative flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="relative h-28 w-full overflow-hidden rounded-lg bg-black border border-white/10">
                    <img
                      src={img.src}
                      alt={img.alt || "Önizleme"}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: img.position || "center" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = (p.gorseller || []).filter((_, j) => j !== i);
                        updatePasta({ gorseller: next });
                      }}
                      className="absolute top-1.5 right-1.5 rounded-full bg-red-600/90 p-1 text-white hover:bg-red-500 shadow"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <Input
                    label="Görsel Yolu (URL / CMS)"
                    value={img.src}
                    onChange={(e) => {
                      const next = [...(p.gorseller || [])];
                      next[i] = { ...next[i], src: e.target.value };
                      updatePasta({ gorseller: next });
                    }}
                    placeholder="/assets/cms/..."
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Rozet (Tag)"
                      value={img.tag || ""}
                      onChange={(e) => {
                        const next = [...(p.gorseller || [])];
                        next[i] = { ...next[i], tag: e.target.value };
                        updatePasta({ gorseller: next });
                      }}
                      placeholder="Açık Havuz"
                    />
                    <Input
                      label="Kadraj"
                      value={img.position || "center center"}
                      onChange={(e) => {
                        const next = [...(p.gorseller || [])];
                        next[i] = { ...next[i], position: e.target.value };
                        updatePasta({ gorseller: next });
                      }}
                      placeholder="center 40%"
                    />
                  </div>

                  <Input
                    label="Kart Başlığı (H3)"
                    value={img.alt}
                    onChange={(e) => {
                      const next = [...(p.gorseller || [])];
                      next[i] = { ...next[i], alt: e.target.value };
                      updatePasta({ gorseller: next });
                    }}
                    placeholder="Pool & Beach VIP Localar"
                  />

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#8A9BB0]">
                      Kısa Açıklama
                    </label>
                    <textarea
                      value={img.desc || ""}
                      onChange={(e) => {
                        const next = [...(p.gorseller || [])];
                        next[i] = { ...next[i], desc: e.target.value };
                        updatePasta({ gorseller: next });
                      }}
                      rows={2}
                      className="w-full rounded-xl border border-white/[0.08] bg-[#141E2E] px-3 py-1.5 text-xs text-[#EEE9E0] focus:border-[#D9A441] focus:outline-none"
                      placeholder="Kart açıklama metni..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. HAVUZ KURALLARI & GÜVENLİK STANDARTLARI */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" /> 5. Havuz Kuralları & Hijyen Standartları
              </h3>
              <p className="text-xs text-[#8A9BB0] mt-0.5">
                Sayfa altındaki güvenlik, yaş ve hijyen maddeleri.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [...(p.kurallar || []), ""];
                updatePasta({ kurallar: next });
              }}
              className="border-dashed border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <Plus className="h-4 w-4 mr-1" /> Kural Ekle
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(p.kurallar || []).map((kural, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0D1117] p-2.5"
              >
                <input
                  type="text"
                  value={kural}
                  onChange={(e) => {
                    const next = [...(p.kurallar || [])];
                    next[idx] = e.target.value;
                    updatePasta({ kurallar: next });
                  }}
                  className="w-full bg-transparent text-sm text-[#EEE9E0] focus:outline-none"
                  placeholder="Örn: 0–2 yaş ücretsizdir..."
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = (p.kurallar || []).filter((_, i) => i !== idx);
                    updatePasta({ kurallar: next });
                  }}
                  className="text-[#8A9BB0] hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
