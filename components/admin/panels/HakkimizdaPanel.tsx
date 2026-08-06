"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api/client";
import Upload from "@/components/admin/ui/Upload";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import SectionHint from "@/components/admin/ui/SectionHint";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import { resolveMediaUrl } from "@/lib/admin/media-url";

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveMediaUrl(content.images.aboutInterior)}
                  alt="Hakkımızda"
                  className="h-28 w-40 rounded-lg object-cover"
                />
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

        <SaveBar onSave={save} saving={saving} />
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
          </div>
          <div className="space-y-4 rounded-xl border border-white/[0.06] bg-[#0D1117]/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB0]">
                  Kapı açılınca görünen yazı
                </p>
                <p className="mt-1 text-xs text-[#6B7A94]">
                  Kapı aralanınca ortada belirir.
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
            )}
          </div>
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

        <SaveBar onSave={save} saving={saving} />
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

  return (
    <>
      <AdminPageHeader
        title="Özel Pastalar"
        description="Ana sayfadaki şeker hamurlu özel tasarım pasta bölümü — tüm yazılar ve görseller."
      />
      <SectionHint anchor="pasta" label="Özel Pastalar" />
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
        <div className="grid gap-3">
          <label className="block text-sm text-[#EEE9E0]">
            Madde listesi (tikli satırlar)
          </label>
          {p.maddeler.map((m, i) => (
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
        <h4 className="pt-2 font-medium text-[#EEE9E0]">Pasta görselleri</h4>
        {p.gorseller.map((g, i) => (
          <div
            key={i}
            className="grid gap-3 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[100px_1fr_1fr_auto]"
          >
            {g.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolveMediaUrl(g.src)}
                alt={g.alt || ""}
                className="h-20 w-full rounded-lg object-cover"
              />
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
                    gorseller: p.gorseller.filter((_, j) => j !== i),
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
                gorseller: [...p.gorseller, { src: "", alt: "" }],
              },
            })
          }
        >
          <Plus className="h-4 w-4" /> Görsel ekle
        </Button>
        <SaveBar
          onSave={async () => {
            setSaving(true);
            try {
              const res = await api.updateContent({ pasta: content.pasta });
              setContent(res.data);
              setMessage("Özel Pastalar kaydedildi.");
            } catch (e) {
              setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
            } finally {
              setSaving(false);
            }
          }}
          saving={saving}
        />
      </section>
    </>
  );
}

export function BolumlarPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;

  const keys = ["menu", "galeri", "yorumlar", "sss"] as const;
  const labels = {
    menu: "Ürünler (Menü)",
    galeri: "Galeri",
    yorumlar: "Yorumlar",
    sss: "S.S.S.",
  };

  return (
    <>
      <AdminPageHeader
        title="Bölüm Başlıkları"
        description="Ana sayfa bölümlerinin üst etiketi, başlığı ve kısa açıklaması. Aynı alanlar ilgili bölüm sayfalarında da vardır."
      />
      <AdminAlert message={message} />
      <div className="space-y-4">
        {keys.map((key) => {
          const b = content.bolumlar[key];
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
                {"lead" in b && (
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
                )}
              </div>
            </section>
          );
        })}
        <SaveBar
          onSave={async () => {
            setSaving(true);
            try {
              const res = await api.updateContent({
                bolumlar: content.bolumlar,
              });
              setContent(res.data);
              setMessage("Bölüm başlıkları kaydedildi.");
            } catch (e) {
              setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
            } finally {
              setSaving(false);
            }
          }}
          saving={saving}
        />
      </div>
    </>
  );
}
