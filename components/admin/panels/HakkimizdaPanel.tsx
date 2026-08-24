"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api/client";
import Upload from "@/components/admin/ui/Upload";
import AdminImage from "@/components/admin/ui/AdminImage";
import HeroTextEditor from "@/components/admin/ui/HeroTextEditor";
import ColorField from "@/components/admin/ui/ColorField";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import SectionHint from "@/components/admin/ui/SectionHint";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import type { BolumBaslik } from "@/lib/content/types";
import { SITE_ICON_OPTIONS } from "@/lib/content/site-icons";

const fieldClass =
  "w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none focus:ring-1 focus:ring-[#C8703A]/20";

export default function HakkimizdaPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (loading || !content) return <AdminLoading />;
  const h = content.hakkimizda;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        hakkimizda: content.hakkimizda,
        images: content.images,
      });
      setContent(res.data);
      setMessage("Hakkımızda kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Hakkımızda"
        description="Ana sayfadaki Hakkımızda bölümünün tüm yazıları, özet kartları ve görseli."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 Hakkımızda Kaydet"}</span>
          </Button>
        }
      />
      <SectionHint anchor="hakkimizda" label="Hakkımızda" />
      <AdminAlert message={message} />
      <div className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Başlıklar</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Üst etiket (HAKKIMIZDA)"
              value={h.eyebrow}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, eyebrow: e.target.value },
                })
              }
            />
            <Input
              label="Ana başlık"
              value={h.baslik}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, baslik: e.target.value },
                })
              }
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Kısaca kutusu</h3>
          <Input
            label="Kutu etiketi"
            value={h.answerBaslik}
            onChange={(e) =>
              setContent({
                ...content,
                hakkimizda: { ...h, answerBaslik: e.target.value },
              })
            }
            placeholder="Kısaca"
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
              Kısaca metni
            </label>
            <textarea
              value={h.answerMetin}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, answerMetin: e.target.value },
                })
              }
              rows={4}
              className={fieldClass}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Paragraflar</h3>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
              Giriş paragrafı
            </label>
            <textarea
              value={h.lead}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, lead: e.target.value },
                })
              }
              rows={3}
              className={fieldClass}
            />
          </div>
          {(h.body || []).map((p, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#8A9BB0]">
                  Paragraf {i + 1}
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400"
                  onClick={() =>
                    setContent({
                      ...content,
                      hakkimizda: {
                        ...h,
                        body: h.body.filter((_, j) => j !== i),
                      },
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" /> Sil
                </Button>
              </div>
              <textarea
                value={p}
                onChange={(e) => {
                  const body = [...h.body];
                  body[i] = e.target.value;
                  setContent({
                    ...content,
                    hakkimizda: { ...h, body },
                  });
                }}
                rows={3}
                className={fieldClass}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContent({
                ...content,
                hakkimizda: { ...h, body: [...(h.body || []), ""] },
              })
            }
          >
            <Plus className="h-4 w-4" /> Paragraf ekle
          </Button>
        </section>

        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Özet kartları</h3>
          <p className="text-xs text-[#6B7A94]">
            Metnin altındaki küçük istatistik kutuları (ör. Her gün / taze üretim).
          </p>
          <div className="space-y-2">
            {(h.ozet || []).map((item, i) => (
              <div
                key={i}
                className="grid gap-2 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 md:grid-cols-[1fr_1fr_auto]"
              >
                <Input
                  label="Kalın satır"
                  value={item.b}
                  onChange={(e) => {
                    const ozet = [...h.ozet];
                    ozet[i] = { ...ozet[i], b: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, ozet },
                    });
                  }}
                />
                <Input
                  label="Alt satır"
                  value={item.span}
                  onChange={(e) => {
                    const ozet = [...h.ozet];
                    ozet[i] = { ...ozet[i], span: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, ozet },
                    });
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  onClick={() =>
                    setContent({
                      ...content,
                      hakkimizda: {
                        ...h,
                        ozet: h.ozet.filter((_, j) => j !== i),
                      },
                    })
                  }
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setContent({
                  ...content,
                  hakkimizda: {
                    ...h,
                    ozet: [...(h.ozet || []), { b: "", span: "" }],
                  },
                })
              }
            >
              <Plus className="h-4 w-4" /> Kart ekle
            </Button>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Fotoğraf ve rozet</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Rozet başlık"
              value={h.badgeBaslik}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, badgeBaslik: e.target.value },
                })
              }
              placeholder="Taze"
            />
            <Input
              label="Rozet alt metin"
              value={h.badgeAlt}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, badgeAlt: e.target.value },
                })
              }
              placeholder="Lezzetli · Doğal"
            />
          </div>
          <div>
            <h4 className="mb-2 font-medium text-[#EEE9E0]">Hakkımızda görseli</h4>
            {content.images?.aboutInterior ? (
              <div className="mb-3 flex items-center gap-3">
                <div className="h-28 w-40 overflow-hidden rounded-lg">
                  <AdminImage src={content.images.aboutInterior} alt="Hakkımızda" />
                </div>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    try {
                      const images = {
                        ...content.images,
                        aboutInterior: "",
                      };
                      const res = await api.updateContent({ images });
                      setContent(res.data);
                      setMessage("Görsel kaldırıldı.");
                    } catch (err) {
                      setMessage(
                        err instanceof Error ? err.message : "Kaldırılamadı"
                      );
                    }
                  }}
                >
                  Kaldır
                </Button>
              </div>
            ) : (
              <p className="mb-2 text-sm text-[#8A9BB0]">
                Henüz görsel yok — boş bırakılırsa sitedeki mevcut fotoğraf kalır.
              </p>
            )}
            <Upload
              uploadKey="aboutInterior"
              accept="image/*"
              onComplete={async () => {
                try {
                  const res = await api.getAdminContent();
                  setContent(res.data);
                  setMessage("Görsel yüklendi.");
                } catch (err) {
                  setMessage(
                    err instanceof Error
                      ? err.message
                      : "Yükleme sonrası güncelleme başarısız"
                  );
                }
              }}
              onError={(err) => setMessage(err.message)}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export function HeroPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (loading || !content) return <AdminLoading />;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        hero: content.hero,
        marquee: content.marquee,
      });
      setContent(res.data);
      setMessage("Hero ve şerit kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Kapı / Hero"
        description="Ana sayfa giriş sahnesi, karşılama yazısı ve kayan şerit kelimeleri."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 Hero Kaydet"}</span>
          </Button>
        }
      />
      <AdminAlert message={message} />
      <div className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Hero (Giriş)</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="Marka"
              value={content.hero.fallbackMark}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, fallbackMark: e.target.value },
                })
              }
            />
            <Input
              label="Slogan"
              value={content.hero.fallbackTagline}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, fallbackTagline: e.target.value },
                })
              }
            />
            <Input
              label="Kaydır ipucu"
              value={content.hero.scrollHint}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, scrollHint: e.target.value },
                })
              }
            />
            <p className="-mt-2 text-xs text-[#6B7A94]">
              Metin Admin’den gelir. Konum sabit: hero sahnesinin alt ortası. Karşılama yazısıyla birlikte kaymaz.
            </p>
            <Input
              label="Yüklenirken metin"
              value={content.hero.bootText || "Kapı açılıyor"}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, bootText: e.target.value },
                })
              }
            />
          </div>
          <div className="space-y-4 rounded-xl border border-white/[0.06] bg-[#0D1117]/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB0]">
                  Kapı açılınca görünen yazı
                </p>
                <p className="mt-1 text-xs text-[#6B7A94]">
                  Telefon ve bilgisayarda aynı: kapı açılıp içeri girince belirir, sonra kaybolur. “Aşağı kaydırın” ayrı, altta sabit.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={content.hero.welcomeAktif === true}
                onClick={() =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      welcomeAktif: !(content.hero.welcomeAktif === true),
                    },
                  })
                }
                className={
                  content.hero.welcomeAktif === true
                    ? "inline-flex items-center gap-2 rounded-full border border-[#C8703A]/40 bg-[#C8703A]/15 px-4 py-2 text-sm font-semibold text-[#E8B84B]"
                    : "inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#8A9BB0]"
                }
              >
                <span
                  className={
                    content.hero.welcomeAktif === true
                      ? "h-2.5 w-2.5 rounded-full bg-[#E8B84B]"
                      : "h-2.5 w-2.5 rounded-full bg-[#4A5568]"
                  }
                />
                {content.hero.welcomeAktif === true ? "Gözüksün" : "Gözükmesin"}
              </button>
            </div>
            {content.hero.welcomeAktif === true && (
              <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117]/80 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#EEE9E0]">Koyu kutu</p>
                  <p className="text-xs text-[#6B7A94]">Yazının arkasındaki cam / renk. Kapalıysa yazı fotoğrafın üstünde durur.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={content.hero.welcomeKutu === true}
                  onClick={() =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeKutu: !(content.hero.welcomeKutu === true),
                      },
                    })
                  }
                  className={
                    content.hero.welcomeKutu === true
                      ? "inline-flex items-center gap-2 rounded-full border border-[#C8703A]/40 bg-[#C8703A]/15 px-4 py-2 text-sm font-semibold text-[#E8B84B]"
                      : "inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#8A9BB0]"
                  }
                >
                  {content.hero.welcomeKutu === true ? "Açık" : "Kapalı"}
                </button>
              </div>
              {content.hero.welcomeKutu === true ? (
                <div className="grid gap-3 md:grid-cols-3">
                  <ColorField
                    label="Kutu rengi"
                    value={content.hero.welcomeKutuRenk || "#0A0C09"}
                    onChange={(next) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, welcomeKutuRenk: next },
                      })
                    }
                    hint="Yazının arkasındaki dolgu"
                  />
                  <ColorField
                    label="Çerçeve rengi"
                    value={content.hero.welcomeKutuKenar || "#E8B84B"}
                    onChange={(next) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, welcomeKutuKenar: next },
                      })
                    }
                  />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[#8A9BB0]">
                      Yoğunluk ({content.hero.welcomeKutuOpaklik ?? 58}%)
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={content.hero.welcomeKutuOpaklik ?? 58}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: {
                            ...content.hero,
                            welcomeKutuOpaklik: Number(e.target.value),
                          },
                        })
                      }
                      className="mt-3 w-full accent-[#C8703A]"
                    />
                    <p className="text-[11px] text-[#6B7A94]">0 şeffaf, 90 koyu.</p>
                  </div>
                </div>
              ) : null}
              <div className="grid gap-3 md:grid-cols-3">
                <Input
                  label="Üst etiket"
                  value={content.hero.welcomeEyebrow || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeEyebrow: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label="Başlık"
                  value={content.hero.welcomeTitle || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeTitle: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label="Alt metin"
                  value={content.hero.welcomeLead || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeLead: e.target.value,
                      },
                    })
                  }
                />
              </div>
              </>
            )}

            {/* Hero Loadingi (Kapı Açılıyor) */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-3">
              <h4 className="text-sm font-semibold text-[#E8B84B]">Hero Loadingi (Kapı Açılıyor)</h4>
              <p className="text-xs text-[#8A9BB0]">
                3D kapı ve hero sahneleri yüklenirken ekranda dönen çemberin ve yükleme yazısının içeriği ve rengi.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Hero Loading Metni"
                  value={content.hero.bootText || ""}
                  placeholder="Kapı açılıyor"
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        bootText: e.target.value,
                      },
                    })
                  }
                />
                <ColorField
                  label="Hero Loading Rengi (Metin & Dönen İkon)"
                  value={content.hero.textStyles?.boot?.color || "#D9A441"}
                  onChange={(val) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        textStyles: {
                          ...(content.hero.textStyles || {}),
                          boot: {
                            ...(content.hero.textStyles?.boot || {}),
                            color: val,
                          },
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <HeroTextEditor
            imageUrl={
              liveMedia(content.images?.heroPoster || content.images?.heroCephe, SITE_PHOTOS.facade) ||
              SITE_PHOTOS.facade
            }
            phoneImageUrl={
              liveMedia(
                content.images?.heroMobile ||
                  content.images?.heroPoster ||
                  content.images?.heroCephe,
                SITE_PHOTOS.facade
              ) || SITE_PHOTOS.facade
            }
            welcomeAktif={content.hero.welcomeAktif === true}
            welcomeKutu={content.hero.welcomeKutu === true}
            welcomeKutuRenk={content.hero.welcomeKutuRenk}
            welcomeKutuKenar={content.hero.welcomeKutuKenar}
            welcomeKutuOpaklik={content.hero.welcomeKutuOpaklik}
            desktop={content.hero.textStyles}
            phone={content.hero.textStylesMobile}
            preview={{
              mark: content.hero.fallbackMark || "PETRA",
              slogan: content.hero.fallbackTagline || "Slogan",
              scroll: content.hero.scrollHint || "Aşağı kaydırın",
              boot: content.hero.bootText || "Kapı açılıyor",
              welcomeEyebrow: content.hero.welcomeEyebrow || "Üst etiket",
              welcomeTitle: content.hero.welcomeTitle || "Başlık",
              welcomeLead: content.hero.welcomeLead || "Alt metin",
            }}
            onChange={(device, next) =>
              setContent({
                ...content,
                hero: {
                  ...content.hero,
                  ...(device === "phone"
                    ? { textStylesMobile: next }
                    : { textStyles: next }),
                },
              })
            }
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Kayan şerit kelimeleri</h3>
          {content.marquee.map((word, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={word}
                onChange={(e) => {
                  const marquee = [...content.marquee];
                  marquee[i] = e.target.value;
                  setContent({ ...content, marquee });
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setContent({
                    ...content,
                    marquee: content.marquee.filter((_, j) => j !== i),
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContent({
                ...content,
                marquee: [...content.marquee, "YENİ"],
              })
            }
          >
            <Plus className="h-4 w-4" /> Kelime ekle
          </Button>
        </section>
      </div>
    </>
  );
}

export function PastaPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;
  const p = content.pasta;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({ pasta: content.pasta });
      setContent(res.data);
      setMessage("Havuz & Plaj kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Havuz, Plaj ve Organizasyon"
        description="Saatler, tarife, yüzme dersi, kurallar ve Instagram — afiş bilgileri burada. Görsel zorunlu değil."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 Havuz & Plaj Kaydet"}</span>
          </Button>
        }
      />
      <SectionHint anchor="pasta" label="Havuz & Plaj" />
      <AdminAlert message={message} />
      <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Üst etiket"
            value={p.eyebrow}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, eyebrow: e.target.value },
              })
            }
          />
          <Input
            label="Başlık"
            value={p.baslik}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, baslik: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
            Açıklama
          </label>
          <textarea
            value={p.lead}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, lead: e.target.value },
              })
            }
            rows={3}
            className={fieldClass}
          />
        </div>
        <Input
          label="Slogan"
          value={p.slogan || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, slogan: e.target.value } })
          }
          placeholder="Lezzet, keyif ve serinliğin buluştuğu yer"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Cafe saatleri"
            value={p.cafeSaat || ""}
            onChange={(e) =>
              setContent({ ...content, pasta: { ...p, cafeSaat: e.target.value } })
            }
            placeholder="08:00 – 24:00"
          />
          <Input
            label="Havuz saatleri"
            value={p.havuzSaat || ""}
            onChange={(e) =>
              setContent({ ...content, pasta: { ...p, havuzSaat: e.target.value } })
            }
            placeholder="09:00 – 18:00"
          />
          <Input
            label="Havuz derinliği"
            value={p.derinlik || ""}
            onChange={(e) =>
              setContent({ ...content, pasta: { ...p, derinlik: e.target.value } })
            }
            placeholder="1.45 m – 1.95 m"
          />
        </div>
        <Input
          label="Instagram"
          value={p.instagramHref || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, instagramHref: e.target.value } })
          }
          placeholder="https://www.instagram.com/petracaferestaurant/"
        />
        <Input
          label="Instagram etiketi"
          value={p.instagramEtiket || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, instagramEtiket: e.target.value } })
          }
          placeholder="@petracaferestaurant"
        />

        <h4 className="pt-2 font-medium text-[#EEE9E0]">Petra House fiyatları</h4>
        <Input
          label="Tablo başlığı"
          value={p.fiyatBaslik || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, fiyatBaslik: e.target.value } })
          }
        />
        {(p.fiyatlar || []).map((row, i) => (
          <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
            <Input
              label={i === 0 ? "Kategori" : undefined}
              value={row.kategori}
              onChange={(e) => {
                const fiyatlar = [...(p.fiyatlar || [])];
                fiyatlar[i] = { ...fiyatlar[i], kategori: e.target.value };
                setContent({ ...content, pasta: { ...p, fiyatlar } });
              }}
            />
            <Input
              label={i === 0 ? "Hafta içi" : undefined}
              value={row.haftaIci}
              onChange={(e) => {
                const fiyatlar = [...(p.fiyatlar || [])];
                fiyatlar[i] = { ...fiyatlar[i], haftaIci: e.target.value };
                setContent({ ...content, pasta: { ...p, fiyatlar } });
              }}
            />
            <Input
              label={i === 0 ? "Hafta sonu" : undefined}
              value={row.haftaSonu}
              onChange={(e) => {
                const fiyatlar = [...(p.fiyatlar || [])];
                fiyatlar[i] = { ...fiyatlar[i], haftaSonu: e.target.value };
                setContent({ ...content, pasta: { ...p, fiyatlar } });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="self-end"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: { ...p, fiyatlar: (p.fiyatlar || []).filter((_, j) => j !== i) },
                })
              }
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setContent({
              ...content,
              pasta: {
                ...p,
                fiyatlar: [...(p.fiyatlar || []), { kategori: "", haftaIci: "", haftaSonu: "" }],
              },
            })
          }
        >
          <Plus className="h-4 w-4" /> Fiyat satırı
        </Button>
        <textarea
          value={p.fiyatNot || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, fiyatNot: e.target.value } })
          }
          rows={2}
          placeholder="0–2 yaş ücretsiz · mayo ve bone zorunlu…"
          className={fieldClass}
        />

        <h4 className="pt-2 font-medium text-[#EEE9E0]">Yüzme dersleri</h4>
        <Input
          label="Ders başlığı"
          value={p.dersBaslik || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, dersBaslik: e.target.value } })
          }
        />
        <Input
          label="Ders özeti"
          value={p.dersLead || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, dersLead: e.target.value } })
          }
        />
        {(p.dersler || []).map((d, i) => (
          <div key={i} className="grid gap-2 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[1fr_1fr_auto]">
            <Input
              label="Tür"
              value={d.baslik}
              onChange={(e) => {
                const dersler = [...(p.dersler || [])];
                dersler[i] = { ...dersler[i], baslik: e.target.value };
                setContent({ ...content, pasta: { ...p, dersler } });
              }}
            />
            <Input
              label="Kısa vurgu"
              value={d.kicker || ""}
              onChange={(e) => {
                const dersler = [...(p.dersler || [])];
                dersler[i] = { ...dersler[i], kicker: e.target.value };
                setContent({ ...content, pasta: { ...p, dersler } });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="self-end"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: { ...p, dersler: (p.dersler || []).filter((_, j) => j !== i) },
                })
              }
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
            <textarea
              value={d.metin}
              onChange={(e) => {
                const dersler = [...(p.dersler || [])];
                dersler[i] = { ...dersler[i], metin: e.target.value };
                setContent({ ...content, pasta: { ...p, dersler } });
              }}
              rows={2}
              className={`${fieldClass} md:col-span-3`}
            />
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setContent({
              ...content,
              pasta: {
                ...p,
                dersler: [...(p.dersler || []), { baslik: "", kicker: "", metin: "" }],
              },
            })
          }
        >
          <Plus className="h-4 w-4" /> Ders türü
        </Button>

        <h4 className="pt-2 font-medium text-[#EEE9E0]">Kurallar (küçük yazı)</h4>
        {(p.kurallar || []).map((k, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={k}
              onChange={(e) => {
                const kurallar = [...(p.kurallar || [])];
                kurallar[i] = e.target.value;
                setContent({ ...content, pasta: { ...p, kurallar } });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: { ...p, kurallar: (p.kurallar || []).filter((_, j) => j !== i) },
                })
              }
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setContent({
              ...content,
              pasta: { ...p, kurallar: [...(p.kurallar || []), ""] },
            })
          }
        >
          <Plus className="h-4 w-4" /> Kural
        </Button>

        <div className="grid gap-3">
          <label className="block text-sm text-[#EEE9E0]">
            Madde listesi (tikli satırlar)
          </label>
          {(p.maddeler || []).map((m, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={m}
                onChange={(e) => {
                  const maddeler = [...p.maddeler];
                  maddeler[i] = e.target.value;
                  setContent({
                    ...content,
                    pasta: { ...p, maddeler },
                  });
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const maddeler = p.maddeler.filter((_, j) => j !== i);
                  setContent({
                    ...content,
                    pasta: { ...p, maddeler },
                  });
                }}
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContent({
                ...content,
                pasta: { ...p, maddeler: [...p.maddeler, ""] },
              })
            }
          >
            <Plus className="h-4 w-4" /> Madde ekle
          </Button>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
            Alt metin (CTA üstü)
          </label>
          <textarea
            value={p.body}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, body: e.target.value },
              })
            }
            rows={2}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Buton yazısı"
            value={p.ctaLabel}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, ctaLabel: e.target.value },
              })
            }
          />
          <Input
            label="Buton linki"
            value={p.ctaHref}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, ctaHref: e.target.value },
              })
            }
          />
        </div>
        <h4 className="pt-2 font-medium text-[#EEE9E0]">Bölüm görselleri</h4>
        {(p.gorseller || []).map((g, i) => (
          <div
            key={i}
            className="grid gap-3 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[100px_1fr_1fr_auto]"
          >
            {g.src ? (
              <div className="h-20 overflow-hidden rounded-lg">
                <AdminImage src={g.src} alt={g.alt || ""} />
              </div>
            ) : (
              <div className="h-20 rounded-lg bg-[#0D1117]" />
            )}
            <div>
              <label className="mb-1 block text-sm text-[#EEE9E0]">
                Görsel yükle
              </label>
              <Upload
                accept="image/*"
                onComplete={async (results) => {
                  const first = results?.[0];
                  if (first?.url) {
                    const gorseller = [...p.gorseller];
                    gorseller[i] = { ...gorseller[i], src: first.url };
                    setContent({
                      ...content,
                      pasta: { ...p, gorseller },
                    });
                    setMessage("Görsel yüklendi.");
                  }
                }}
                onError={(err) => setMessage(err.message)}
                uploadKey="pasta"
              />
            </div>
            <Input
              label="Alt metin"
              value={g.alt}
              onChange={(e) => {
                const gorseller = [...p.gorseller];
                gorseller[i] = { ...gorseller[i], alt: e.target.value };
                setContent({
                  ...content,
                  pasta: { ...p, gorseller },
                });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="self-end"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: {
                    ...p,
                    gorseller: (p.gorseller || []).filter((_, j) => j !== i),
                  },
                })
              }
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setContent({
              ...content,
              pasta: {
                ...p,
                gorseller: [...(p.gorseller || []), { src: "", alt: "" }],
              },
            })
          }
        >
          <Plus className="h-4 w-4" /> Görsel ekle
        </Button>
      </section>
    </>
  );
}

export function BolumlarPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        bolumlar: content.bolumlar,
        ziyaret: content.ziyaret,
        hizmetler: content.hizmetler,
        rezervasyon: content.rezervasyon,
      });
      setContent(res.data);
      setMessage("Bölüm metinleri kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const keys = ["hizmetler", "menu", "galeri", "yorumlar", "sss", "rezervasyon"] as const;
  const labels: Record<(typeof keys)[number], string> = {
    hizmetler: "Hizmetler (Instagram)",
    menu: "Menü",
    galeri: "Galeri",
    yorumlar: "Yorumlar",
    sss: "S.S.S.",
    rezervasyon: "Rezervasyon",
  };
  const emptyBolum: BolumBaslik = { eyebrow: "", baslik: "", lead: "" };
  const ziyaret = content.ziyaret || [
    { k: "Saatler", v: "", n: "" },
    { k: "Rezervasyon", v: "", n: "" },
    { k: "Havuz & Plaj", v: "", n: "" },
    { k: "Konum", v: "", n: "" },
  ];
  const hizmetler = content.hizmetler?.length
    ? content.hizmetler
    : [
        { label: "Restoran", icon: "utensils", href: "/menu", aciklama: "Salon ve teras servisi" },
        { label: "Serpme Kahvaltı", icon: "sunrise", href: "/menu/kahvalti", aciklama: "Tabak ve 2 kişilik serpme" },
        { label: "Pizzalar", icon: "chef", href: "/menu/pizzalar", aciklama: "Fırın pizza" },
        { label: "POOL & BEACH", icon: "waves", href: "#pasta", aciklama: "Havuz 09:00–18:00" },
        { label: "Yüzme dersleri", icon: "calendar", href: "#yuzme", aciklama: "Birebir ve grup" },
        { label: "Kahve", icon: "coffee", href: "/menu/kahve", aciklama: "Sıcak ve soğuk kahve" },
        { label: "Kokteyller", icon: "wine", href: "/menu/kokteyller", aciklama: "Mocktail ve frozen" },
        { label: "Tatlılar", icon: "cake", href: "/menu/tatlilar", aciklama: "Tatlı menüsü" },
        { label: "Nargile", icon: "flame", href: "/menu/nargile", aciklama: "Nakhla, El Fakher, Adalya" },
      ];
  const rsv = content.rezervasyon || {
    maddeler: [],
    ctaLabel: "",
    successMetin: "",
  };

  return (
    <>
      <AdminPageHeader
        title="Bölüm Başlıkları"
        description="Ana sayfa bölüm başlıkları, Instagram hizmet kartları ve ziyaret şeridi. Hepsi sitede görünür."
      />
      <AdminAlert message={message} />
      <div className="space-y-4">
        {keys.map((key) => {
          const b = content.bolumlar[key] || emptyBolum;
          return (
            <section
              key={key}
              className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4"
            >
              <h3 className="mb-3 font-medium text-[#C8703A]">{labels[key]}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <Input
                  label="Üst etiket"
                  value={b.eyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      bolumlar: {
                        ...content.bolumlar,
                        [key]: { ...b, eyebrow: e.target.value },
                      },
                    })
                  }
                />
                <Input
                  label="Başlık"
                  value={b.baslik}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      bolumlar: {
                        ...content.bolumlar,
                        [key]: { ...b, baslik: e.target.value },
                      },
                    })
                  }
                />
                <Input
                  label="Kısa açıklama"
                  value={b.lead || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      bolumlar: {
                        ...content.bolumlar,
                        [key]: { ...b, lead: e.target.value },
                      },
                    })
                  }
                />
              </div>
              {key === "menu" ? (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <Input
                    label="Birincil buton"
                    value={b.ctaLabel || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, ctaLabel: e.target.value },
                        },
                      })
                    }
                    placeholder="Masa ayırtın"
                  />
                  <Input
                    label="Birincil link"
                    value={b.ctaHref || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, ctaHref: e.target.value },
                        },
                      })
                    }
                    placeholder="#rezervasyon"
                  />
                  <Input
                    label="İkinci buton"
                    value={b.cta2Label || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, cta2Label: e.target.value },
                        },
                      })
                    }
                    placeholder="Tüm menü"
                  />
                  <Input
                    label="İkinci link"
                    value={b.cta2Href || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, cta2Href: e.target.value },
                        },
                      })
                    }
                    placeholder="/menu"
                  />
                </div>
              ) : null}
            </section>
          );
        })}

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <h3 className="mb-1 font-medium text-[#C8703A]">Ziyaret şeridi</h3>
          <p className="mb-3 text-xs text-[#6B7A94]">
            Ana sayfadaki bilgi kartları. Değer boşsa saat / telefon iletişimden gelir.
          </p>
          <div className="space-y-3">
            {ziyaret.map((item, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
                <Input
                  label="Etiket"
                  value={item.k}
                  onChange={(e) => {
                    const next = [...ziyaret];
                    next[i] = { ...item, k: e.target.value };
                    setContent({ ...content, ziyaret: next });
                  }}
                />
                <Input
                  label="Değer"
                  value={item.v}
                  onChange={(e) => {
                    const next = [...ziyaret];
                    next[i] = { ...item, v: e.target.value };
                    setContent({ ...content, ziyaret: next });
                  }}
                />
                <Input
                  label="Alt satır"
                  value={item.n}
                  onChange={(e) => {
                    const next = [...ziyaret];
                    next[i] = { ...item, n: e.target.value };
                    setContent({ ...content, ziyaret: next });
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  onClick={() =>
                    setContent({
                      ...content,
                      ziyaret: ziyaret.filter((_, j) => j !== i),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setContent({
                  ...content,
                  ziyaret: [...ziyaret, { k: "", v: "", n: "" }],
                })
              }
            >
              <Plus className="h-4 w-4" /> Kart ekle
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-medium text-[#C8703A]">Hizmet kartları</h3>
              <p className="mt-1 text-xs text-[#6B7A94]">
                Instagram bio satırları. Link boşsa kart tıklanmaz. Menü / havuz sayfalarına bağlayın.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setContent({
                  ...content,
                  hizmetler: [
                    ...hizmetler,
                    { label: "", icon: "utensils", href: "", aciklama: "" },
                  ],
                })
              }
            >
              <Plus className="h-4 w-4" />
              Ekle
            </Button>
          </div>
          <div className="space-y-3">
            {hizmetler.map((item, i) => (
              <div
                key={i}
                className="grid gap-2 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[160px_1fr_1fr_auto]"
              >
                <label className="block text-sm font-medium text-[#8A9BB0]">
                  İkon
                  <select
                    className="mt-2 h-11 w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0]"
                    value={item.icon || ""}
                    onChange={(e) => {
                      const next = [...hizmetler];
                      next[i] = { ...item, icon: e.target.value };
                      setContent({ ...content, hizmetler: next });
                    }}
                  >
                    <option value="">Otomatik</option>
                    {SITE_ICON_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <Input
                  label="Başlık"
                  value={item.label}
                  onChange={(e) => {
                    const next = [...hizmetler];
                    next[i] = { ...item, label: e.target.value };
                    setContent({ ...content, hizmetler: next });
                  }}
                />
                <Input
                  label="Link"
                  value={item.href || ""}
                  onChange={(e) => {
                    const next = [...hizmetler];
                    next[i] = { ...item, href: e.target.value };
                    setContent({ ...content, hizmetler: next });
                  }}
                  placeholder="/menu/kahve veya #pasta"
                />
                <button
                  type="button"
                  className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-[#8A9BB0] hover:text-red-400"
                  aria-label="Kartı sil"
                  onClick={() => {
                    const next = hizmetler.filter((_, idx) => idx !== i);
                    setContent({ ...content, hizmetler: next });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="md:col-span-4">
                  <Input
                    label="Kısa açıklama"
                    value={item.aciklama || ""}
                    onChange={(e) => {
                      const next = [...hizmetler];
                      next[i] = { ...item, aciklama: e.target.value };
                      setContent({ ...content, hizmetler: next });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <h3 className="mb-3 font-medium text-[#C8703A]">Rezervasyon formu</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Gönder butonu"
              value={rsv.ctaLabel || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  rezervasyon: { ...rsv, ctaLabel: e.target.value },
                })
              }
            />
            <Input
              label="Başarı mesajı"
              value={rsv.successMetin || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  rezervasyon: { ...rsv, successMetin: e.target.value },
                })
              }
            />
          </div>
          <label className="mb-2 mt-3 block text-sm font-medium text-[#8A9BB0]">
            Maddeler (her satır bir madde)
          </label>
          <textarea
            className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
            rows={4}
            value={(rsv.maddeler || []).join("\n")}
            onChange={(e) =>
              setContent({
                ...content,
                rezervasyon: {
                  ...rsv,
                  maddeler: e.target.value.split("\n"),
                },
              })
            }
          />
        </section>

      </div>
    </>
  );
}
