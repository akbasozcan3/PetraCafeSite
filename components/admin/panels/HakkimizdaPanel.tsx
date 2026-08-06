"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api/client";
import Upload from "@/components/admin/ui/Upload";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default function HakkimizdaPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (loading || !content) return <AdminLoading />;
  const h = content.hakkimizda;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({ hakkimizda: content.hakkimizda, hero: content.hero, marquee: content.marquee });
      setContent(res.data);
      setMessage("İçerik kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader title="Ana Sayfa Metinleri" description="Hakkımızda, hero ve kayan şerit metinlerini düzenleyin." />
      <AdminAlert message={message} />
      <div className="space-y-6">
        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 space-y-4">
          <h3 className="font-semibold text-[#F8F8F8]">Hero (Giriş)</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Marka" value={content.hero.fallbackMark} onChange={(e) => setContent({ ...content, hero: { ...content.hero, fallbackMark: e.target.value } })} />
            <Input label="Slogan" value={content.hero.fallbackTagline} onChange={(e) => setContent({ ...content, hero: { ...content.hero, fallbackTagline: e.target.value } })} />
            <Input label="Kaydır ipucu" value={content.hero.scrollHint} onChange={(e) => setContent({ ...content, hero: { ...content.hero, scrollHint: e.target.value } })} />
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#0D1117]/60 p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB0]">
                  Kapı açılınca görünen yazı
                </p>
                <p className="mt-1 text-xs text-[#6B7A94]">
                  Kapı aralanınca ortada belirir. Şu an varsayılan: kapalı.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={content.hero.welcomeAktif === true}
                onClick={() =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, welcomeAktif: !(content.hero.welcomeAktif === true) },
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
                      hero: { ...content.hero, welcomeEyebrow: e.target.value },
                    })
                  }
                  placeholder="Taşdelen Fırıncı"
                />
                <Input
                  label="Başlık"
                  value={content.hero.welcomeTitle || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, welcomeTitle: e.target.value },
                    })
                  }
                  placeholder="Hoş Geldiniz"
                />
                <Input
                  label="Alt metin"
                  value={content.hero.welcomeLead || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, welcomeLead: e.target.value },
                    })
                  }
                  placeholder="Her gün taze…"
                />
              </div>
            )}

            {content.hero.welcomeAktif !== true && (
              <p className="text-xs text-[#6B7A94]">
                Açınca etiket, başlık ve alt metni buradan düzenleyebilirsiniz. Kaydet’e basmayı unutmayın.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 space-y-4">
          <h3 className="font-semibold text-[#F8F8F8]">Kayan şerit kelimeleri</h3>
          {content.marquee.map((word, i) => (
            <div key={i} className="flex gap-2">
              <Input value={word} onChange={(e) => {
                const marquee = [...content.marquee];
                marquee[i] = e.target.value;
                setContent({ ...content, marquee });
              }} />
              <Button variant="ghost" size="icon" onClick={() => setContent({ ...content, marquee: content.marquee.filter((_, j) => j !== i) })}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setContent({ ...content, marquee: [...content.marquee, "YENİ"] })}><Plus className="h-4 w-4" /> Kelime Ekle</Button>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 space-y-4">
          <h3 className="font-semibold text-[#F8F8F8]">Hakkımızda</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Üst etiket" value={h.eyebrow} onChange={(e) => setContent({ ...content, hakkimizda: { ...h, eyebrow: e.target.value } })} />
            <Input label="Ana başlık (H1)" value={h.baslik} onChange={(e) => setContent({ ...content, hakkimizda: { ...h, baslik: e.target.value } })} />
          </div>
          <Input label="Kısaca başlık" value={h.answerBaslik} onChange={(e) => setContent({ ...content, hakkimizda: { ...h, answerBaslik: e.target.value } })} />
          <textarea value={h.answerMetin} onChange={(e) => setContent({ ...content, hakkimizda: { ...h, answerMetin: e.target.value } })} rows={3} className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]" />
          <textarea value={h.lead} onChange={(e) => setContent({ ...content, hakkimizda: { ...h, lead: e.target.value } })} rows={2} className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]" placeholder="Lead paragraf" />
          {h.body.map((p, i) => (
            <textarea key={i} value={p} onChange={(e) => {
              const body = [...h.body];
              body[i] = e.target.value;
              setContent({ ...content, hakkimizda: { ...h, body } });
            }} rows={2} className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]" />
          ))}
          <Button variant="outline" size="sm" onClick={() => setContent({ ...content, hakkimizda: { ...h, body: [...h.body, ""] } })}><Plus className="h-4 w-4" /> Paragraf Ekle</Button>

          {/* Özet Maddeleri */}
          <div className="border-t border-white/[0.04] pt-4">
            <p className="mb-3 text-sm font-medium text-[#8A9BB0]">Özet istatistikler (rozet kartları)</p>
            <div className="space-y-2">
              {h.ozet.map((item, i) => (
                <div key={i} className="grid gap-2 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 md:grid-cols-[1fr_1fr_auto]">
                  <Input label="Kalın metin" value={item.b} onChange={(e) => {
                    const ozet = [...h.ozet]; ozet[i] = { ...ozet[i], b: e.target.value };
                    setContent({ ...content, hakkimizda: { ...h, ozet } });
                  }} />
                  <Input label="Normal metin" value={item.span} onChange={(e) => {
                    const ozet = [...h.ozet]; ozet[i] = { ...ozet[i], span: e.target.value };
                    setContent({ ...content, hakkimizda: { ...h, ozet } });
                  }} />
                  <Button variant="ghost" size="icon" className="self-end" onClick={() => {
                    setContent({ ...content, hakkimizda: { ...h, ozet: h.ozet.filter((_, j) => j !== i) } });
                  }}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setContent({ ...content, hakkimizda: { ...h, ozet: [...h.ozet, { b: "", span: "" }] } })}>
                <Plus className="h-4 w-4" /> Madde Ekle
              </Button>
            </div>
          </div>

          {/* Badge alanları */}
          <div className="grid gap-4 border-t border-white/[0.04] pt-4 md:grid-cols-2">
            <Input label="Rozet başlık" value={h.badgeBaslik} onChange={(e) => setContent({ ...content, hakkimizda: { ...h, badgeBaslik: e.target.value } })} placeholder="Taze" />
            <Input label="Rozet alt metin" value={h.badgeAlt} onChange={(e) => setContent({ ...content, hakkimizda: { ...h, badgeAlt: e.target.value } })} placeholder="Lezzetli · Doğal" />
          </div>

          <div className="mt-3">
            <h4 className="mb-2 font-medium text-[#EEE9E0]">Hakkımızda Görseli</h4>
            {content.images?.aboutInterior ? (
              <div className="flex items-center gap-3">
                <img src={resolveMediaUrl(content.images.aboutInterior)} alt="Hakkımızda" className="h-28 w-40 rounded-lg object-cover" />
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={async () => {
                    try {
                      const updated = { ...content };
                      updated.images = { ...updated.images, aboutInterior: "" };
                      const res = await api.updateContent({ images: updated.images });
                      setContent(res.data);
                      setMessage("Görsel kaldırıldı.");
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : "Kaldırılamadı");
                    }
                  }}>Kaldır</Button>
                </div>
              </div>
            ) : (
              <div className="mb-2 text-sm text-[#AAA]">Henüz görsel yüklenmedi.</div>
            )}
            <div className="mt-2">
              <Upload
                uploadKey="aboutInterior"
                accept="image/*"
                onComplete={async () => {
                  try {
                    const res = await api.getAdminContent();
                    setContent(res.data);
                    setMessage("Görsel yüklendi.");
                  } catch (err) {
                    setMessage(err instanceof Error ? err.message : "Yükleme sonrası güncelleme başarısız");
                  }
                }}
                onError={(err) => setMessage(err.message)}
              />
            </div>
          </div>
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
      <AdminPageHeader title="Özel Pastalar" description="Pasta bölümü metinleri ve görselleri." />
      <AdminAlert message={message} />
      <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Üst etiket" value={p.eyebrow} onChange={(e) => setContent({ ...content, pasta: { ...p, eyebrow: e.target.value } })} />
          <Input label="Başlık" value={p.baslik} onChange={(e) => setContent({ ...content, pasta: { ...p, baslik: e.target.value } })} />
        </div>
        <textarea value={p.lead} onChange={(e) => setContent({ ...content, pasta: { ...p, lead: e.target.value } })} rows={3} className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]" />
        <div className="grid gap-3">
          <label className="block text-sm text-[#EEE9E0]">Maddeler (liste)</label>
          {p.maddeler.map((m, i) => (
            <div key={i} className="flex gap-2">
              <Input value={m} onChange={(e) => { const maddeler = [...p.maddeler]; maddeler[i] = e.target.value; setContent({ ...content, pasta: { ...p, maddeler } }); }} />
              <Button variant="ghost" size="icon" onClick={() => { const maddeler = p.maddeler.filter((_, j) => j !== i); setContent({ ...content, pasta: { ...p, maddeler } }); }}><Trash2 className="h-4 w-4 text-red-400" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setContent({ ...content, pasta: { ...p, maddeler: [...p.maddeler, ""] } })}><Plus className="h-4 w-4" /> Madde Ekle</Button>
        </div>
        <div>
          <label className="block text-sm text-[#EEE9E0]">Body metni</label>
          <textarea value={p.body} onChange={(e) => setContent({ ...content, pasta: { ...p, body: e.target.value } })} rows={2} className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="CTA Etiketi" value={p.ctaLabel} onChange={(e) => setContent({ ...content, pasta: { ...p, ctaLabel: e.target.value } })} />
          <Input label="CTA Href" value={p.ctaHref} onChange={(e) => setContent({ ...content, pasta: { ...p, ctaHref: e.target.value } })} />
        </div>
        {p.gorseller.map((g, i) => (
          <div key={i} className="grid gap-3 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[100px_1fr_1fr_auto]">
            {g.src ? <img src={resolveMediaUrl(g.src)} alt={g.alt || ""} className="h-20 w-full rounded-lg object-cover" /> : <div className="h-20 rounded-lg bg-[#0D1117]" />}
            <div>
              <label className="block text-sm text-[#EEE9E0]">Görsel dosyası</label>
              <Upload
                accept="image/*"
                onComplete={async (results) => {
                  const first = results?.[0];
                  if (first?.url) {
                    const gorseller = [...p.gorseller];
                    gorseller[i] = { ...gorseller[i], src: first.url };
                    setContent({ ...content, pasta: { ...p, gorseller } });
                    setMessage("Görsel yüklendi.");
                  }
                }}
                onError={(err) => setMessage(err.message)}
                uploadKey="pasta"
              />
            </div>
            <Input label="Alt metin" value={g.alt} onChange={(e) => { const gorseller = [...p.gorseller]; gorseller[i] = { ...gorseller[i], alt: e.target.value }; setContent({ ...content, pasta: { ...p, gorseller } }); }} />
            <Button variant="ghost" size="icon" className="self-end" onClick={() => setContent({ ...content, pasta: { ...p, gorseller: p.gorseller.filter((_, j) => j !== i) } })}><Trash2 className="h-4 w-4 text-red-400" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setContent({ ...content, pasta: { ...p, gorseller: [...p.gorseller, { src: "", alt: "" }] } })}><Plus className="h-4 w-4" /> Görsel Ekle</Button>
        <SaveBar onSave={async () => {
          setSaving(true);
          try {
            const res = await api.updateContent({ pasta: content.pasta });
            setContent(res.data);
            setMessage("Pasta bölümü kaydedildi.");
          } catch (e) {
            setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
          } finally {
            setSaving(false);
          }
        }} saving={saving} />
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
  const labels = { menu: "Menü", galeri: "Galeri", yorumlar: "Yorumlar", sss: "S.S.S." };

  return (
    <>
      <AdminPageHeader title="Bölüm Başlıkları" description="Menü, galeri, yorumlar ve SSS bölüm başlıklarını düzenleyin." />
      <AdminAlert message={message} />
      <div className="space-y-4">
        {keys.map((key) => {
          const b = content.bolumlar[key];
          return (
            <section key={key} className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
              <h3 className="mb-3 font-medium text-[#C8703A]">{labels[key]}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <Input label="Etiket" value={b.eyebrow} onChange={(e) => setContent({ ...content, bolumlar: { ...content.bolumlar, [key]: { ...b, eyebrow: e.target.value } } })} />
                <Input label="Başlık" value={b.baslik} onChange={(e) => setContent({ ...content, bolumlar: { ...content.bolumlar, [key]: { ...b, baslik: e.target.value } } })} />
                {"lead" in b && (
                  <Input label="Alt metin" value={b.lead || ""} onChange={(e) => setContent({ ...content, bolumlar: { ...content.bolumlar, [key]: { ...b, lead: e.target.value } } })} />
                )}
              </div>
            </section>
          );
        })}
        <SaveBar onSave={async () => {
          setSaving(true);
          try {
            const res = await api.updateContent({ bolumlar: content.bolumlar });
            setContent(res.data);
            setMessage("Bölüm başlıkları kaydedildi.");
          } catch (e) {
            setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
          } finally {
            setSaving(false);
          }
        }} saving={saving} />
      </div>
    </>
  );
}
