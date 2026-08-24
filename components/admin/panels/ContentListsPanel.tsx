"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import Upload from "@/components/admin/ui/Upload";
import AdminImage from "@/components/admin/ui/AdminImage";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import SectionHint from "@/components/admin/ui/SectionHint";
import BolumBaslikFields from "@/components/admin/ui/BolumBaslikFields";

function ListPanel<T>({
  title,
  description,
  items,
  onChange,
  onSave,
  saving,
  message,
  messageType = "success",
  renderItem,
  newItem,
  topNode,
  itemsClassName,
  itemAttrs,
}: {
  title: string;
  description: string;
  items: T[];
  onChange: (items: T[]) => void;
  onSave: () => void;
  saving: boolean;
  message: string;
  messageType?: "info" | "success" | "error";
  renderItem: (item: T, index: number, update: (next: T) => void) => React.ReactNode;
  newItem: () => T;
  topNode?: React.ReactNode;
  itemsClassName?: string;
  itemAttrs?: (item: T, index: number) => React.HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <>
      <AdminPageHeader
        title={title}
        description={description}
        actions={
          <Button onClick={onSave} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : `💾 ${title} Kaydet`}</span>
          </Button>
        }
      />
      {topNode}
      <AdminAlert message={message} type={message.includes("başarısız") || message.includes("Unauthorized") || messageType === "error" ? "error" : message ? "success" : "info"} />
      <section className={itemsClassName || "space-y-4"}>
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/[0.12] bg-[#0D1117]/60 px-4 py-10 text-center">
            <p className="text-sm text-[#8A9BB0]">Henüz öğe yok.</p>
            <p className="mt-1 text-xs text-[#6B7A94]">Aşağıdaki Ekle butonuyla başlayın.</p>
          </div>
        )}
        {items.map((item, i) => {
          const attrs = itemAttrs ? itemAttrs(item, i) : {};
          return (
            <div key={i} className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4" {...attrs}>
              {renderItem(item, i, (next) => {
                const copy = [...items];
                copy[i] = next;
                onChange(copy);
              })}
              <Button variant="ghost" size="sm" className="mt-3 text-red-400" onClick={() => onChange(items.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" /> Sil
              </Button>
            </div>
          );
        })}
        <div>
          <Button variant="outline" onClick={() => onChange([...items, newItem()])}><Plus className="h-4 w-4" /> Yeni Öğe Ekle</Button>
        </div>
      </section>
    </>
  );
}

export function GaleriPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        galeri: content.galeri,
        bolumlar: content.bolumlar,
      });
      setContent(res.data);
      setMessage("Galeri kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ListPanel
      title="Galeri"
      description="Ana sayfa galeri başlığı ve fotoğrafları. Görseller telefonda tam genişlik ve ortalı yayınlanır."
      items={content.galeri}
      message={message}
      saving={saving}
      newItem={() => ({ src: "", baslik: "", boy: "third" as const, aktif: true })}
      onChange={(galeri) => setContent({ ...content, galeri })}
      onSave={handleSave}
      topNode={
        <div className="mb-4 space-y-4">
          <SectionHint anchor="galeri" label="Galeri" />
          <BolumBaslikFields
            value={content.bolumlar.galeri}
            onChange={(galeri) =>
              setContent({
                ...content,
                bolumlar: { ...content.bolumlar, galeri },
              })
            }
          />
          <div>
            <label className="mb-2 block text-sm text-[#8A9BB0]">
              Galeriye toplu görsel ekle
            </label>
            <Upload
              accept="image/*"
              multiple
              onComplete={(results) => {
                if (!results || !results.length) return;
                const additions = results.map((r) => ({
                  src: r.url,
                  baslik: "",
                  boy: "third" as const,
                  aktif: true,
                }));
                setContent({
                  ...content,
                  galeri: [...content.galeri, ...additions],
                });
                setMessage(`${additions.length} görsel eklendi.`);
              }}
              onError={(err) => setMessage(err.message)}
            />
          </div>
        </div>
      }
      renderItem={(item, i, update) => (
        <div className="grid gap-4 md:grid-cols-[140px_1fr]">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#0D1117]">
            <AdminImage src={item.src} alt={item.baslik || "Galeri"} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Upload
                accept="image/*"
                onComplete={async (results) => {
                  const first = results?.[0];
                  if (first?.url) update({ ...item, src: first.url });
                }}
                onError={(err) => setMessage(err.message)}
              />
              {item.src && (
                <p className="mt-2 text-[11px] font-medium text-emerald-400">Yayında</p>
              )}
              <div className="mt-2 flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => {
                  if (i <= 0) return;
                  const list = [...content.galeri];
                  const tmp = list[i - 1];
                  list[i - 1] = list[i];
                  list[i] = tmp;
                  setContent({ ...content, galeri: list });
                }}>
                  <ArrowUp className="h-4 w-4" /> Yukarı
                </Button>
                <Button variant="ghost" size="sm" onClick={() => {
                  if (i >= content.galeri.length - 1) return;
                  const list = [...content.galeri];
                  const tmp = list[i + 1];
                  list[i + 1] = list[i];
                  list[i] = tmp;
                  setContent({ ...content, galeri: list });
                }}>
                  <ArrowDown className="h-4 w-4" /> Aşağı
                </Button>
              </div>
            </div>
            <Input label="Başlık" value={item.baslik} onChange={(e) => update({ ...item, baslik: e.target.value })} />
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#EEE9E0]">
              <input
                type="checkbox"
                checked={item.aktif !== false}
                onChange={(e) => update({ ...item, aktif: e.target.checked })}
              />
              Sitede yayınla
            </label>
            <div>
              <label className="mb-2 block text-sm text-[#8A9BB0]">Boyut</label>
              <select value={item.boy || "third"} onChange={(e) => update({ ...item, boy: e.target.value as "wide" | "half" | "third" })} className="h-11 w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0]">
                <option value="wide">Geniş</option>
                <option value="half">Yarım</option>
                <option value="third">Üçte bir</option>
              </select>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export function YorumlarPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;
  const source = (content.yorumlarSource as "manual" | "external") || "manual";
  const apiUrl = content.yorumlarApi || "";
  const meta = content.yorumlarMeta || {
    googleSayacMetin: "30+ Google Yorumu",
    googleSkor: "4.87 / 5.0",
    dogrulamaEtiketi: "Doğrulanmış Google Yorumu",
    googleUrl: "",
  };
  return (
    <ListPanel
      title="Müşteri Yorumları"
      description="Ana sayfadaki yorum slider’ını, Google rozetini ve kaynak ayarını yönetin."
      items={content.yorumlar}
      message={message}
      saving={saving}
      newItem={() => ({ metin: "", ad: "", unvan: "", yildiz: 5 })}
      onChange={(yorumlar) => setContent({ ...content, yorumlar })}
      onSave={async () => {
        setSaving(true);
        try {
          const payload: Record<string, unknown> = {
            yorumlar: content.yorumlar,
            yorumlarSource: source,
            yorumlarMeta: meta,
            bolumlar: content.bolumlar,
          };
          if (source === "external") payload.yorumlarApi = apiUrl;
          const res = await api.updateContent(payload);
          setContent(res.data);
          setMessage("Yorumlar kaydedildi.");
        } catch (e) {
          setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
        } finally {
          setSaving(false);
        }
      }}
      renderItem={(item, _i, update) => (
        <div className="grid gap-3">
          <textarea value={item.metin} onChange={(e) => update({ ...item, metin: e.target.value })} rows={3} className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]" placeholder="Yorum metni" />
          <div className="grid gap-3 md:grid-cols-3">
            <Input label="Ad" value={item.ad} onChange={(e) => update({ ...item, ad: e.target.value })} />
            <Input label="Unvan" value={item.unvan} onChange={(e) => update({ ...item, unvan: e.target.value })} />
            <Input label="Yıldız (1-5)" type="number" min={1} max={5} value={String(item.yildiz ?? 5)} onChange={(e) => update({ ...item, yildiz: Number(e.target.value) })} />
          </div>
        </div>
      )}
      topNode={<div className="mb-4 space-y-4">
        <SectionHint anchor="yorumlar" label="Yorumlar" />
        <BolumBaslikFields
          value={content.bolumlar.yorumlar}
          onChange={(yorumlar) =>
            setContent({
              ...content,
              bolumlar: { ...content.bolumlar, yorumlar },
            })
          }
        />
        <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-[#F8F8F8]">Google rozeti</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Skor"
              value={meta.googleSkor}
              onChange={(e) => setContent({ ...content, yorumlarMeta: { ...meta, googleSkor: e.target.value } })}
            />
            <Input
              label="Sayaç metni"
              value={meta.googleSayacMetin}
              onChange={(e) => setContent({ ...content, yorumlarMeta: { ...meta, googleSayacMetin: e.target.value } })}
            />
            <Input
              label="Doğrulama etiketi"
              value={meta.dogrulamaEtiketi}
              onChange={(e) => setContent({ ...content, yorumlarMeta: { ...meta, dogrulamaEtiketi: e.target.value } })}
            />
            <Input
              label="Google bağlantısı"
              value={meta.googleUrl || ""}
              onChange={(e) => setContent({ ...content, yorumlarMeta: { ...meta, googleUrl: e.target.value } })}
            />
            <Input
              label="Rozet buton yazısı"
              value={meta.badgeCta || ""}
              onChange={(e) => setContent({ ...content, yorumlarMeta: { ...meta, badgeCta: e.target.value } })}
            />
            <Input
              label="Varsayılan unvan"
              value={meta.unvanVarsayilan || ""}
              onChange={(e) => setContent({ ...content, yorumlarMeta: { ...meta, unvanVarsayilan: e.target.value } })}
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="block text-sm text-[#8A9BB0]">Yorum kaynağı</label>
          <div className="flex gap-2">
            <Button variant={source === "manual" ? "primary" : "ghost"} size="sm" onClick={() => setContent({ ...content, yorumlarSource: "manual" })}>Manuel</Button>
            <Button variant={source === "external" ? "primary" : "ghost"} size="sm" onClick={() => setContent({ ...content, yorumlarSource: "external" })}>Dış API</Button>
          </div>
          {source === "external" && (
            <div className="mt-2">
              <Input label="API adresi (yalnızca https://…)" value={apiUrl} onChange={(e) => setContent({ ...content, yorumlarApi: e.target.value })} />
              <p className="text-xs text-[#6B7A94]">Dış API HTTPS olmalı. Site her istekte güvenli şekilde çeker (önbellek 5 dk).</p>
            </div>
          )}
        </div>
      </div>}
    />
  );
}

export function MakalelerPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;
  return (
    <ListPanel
      title="Blog"
      description="Yazı listesi — başlık, özet, kategori, okuma süresi ve HTML gövde. Markadan bağımsız; her mağaza tipi için kullanılabilir."
      items={content.makaleler}
      message={message}
      saving={saving}
      newItem={() => ({
        slug: "yeni-makale",
        baslik: "",
        ozet: "",
        kategori: "Genel",
        tarih: new Date().toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        okumaSuresi: "5 dakika okuma",
        kapak: "",
        govdeHtml: "",
        yayinda: true,
        statik: false,
      })}
      onChange={(makaleler) => setContent({ ...content, makaleler })}
      onSave={async () => {
        setSaving(true);
        try {
          const res = await api.updateContent({ makaleler: content.makaleler });
          setContent(res.data);
          setMessage("Blog kaydedildi.");
        } catch (e) {
          setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
        } finally {
          setSaving(false);
        }
      }}
      topNode={
        <div className="mb-4 space-y-3">
          <SectionHint href="/blog" label="Blog" />
          <p className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs text-[#8A9BB0]">
            Site menüsündeki “Blog” yazısı: <span className="text-[#C8D0DC]">Üst Menü & Logo</span> veya{" "}
            <span className="text-[#C8D0DC]">Alt Sayfa Metinleri → Blog</span>. Yazılar burada yönetilir.
          </p>
        </div>
      }
      renderItem={(item, _i, update) => (
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Slug (URL)" value={item.slug} onChange={(e) => update({ ...item, slug: e.target.value })} placeholder="ornek-makale" />
          <Input label="Başlık" value={item.baslik} onChange={(e) => update({ ...item, baslik: e.target.value })} />
          <Input label="Kategori" value={item.kategori || ""} onChange={(e) => update({ ...item, kategori: e.target.value })} />
          <Input label="Tarih" value={item.tarih || ""} onChange={(e) => update({ ...item, tarih: e.target.value })} />
          <Input
            label="Okuma süresi"
            value={item.okumaSuresi || ""}
            onChange={(e) => update({ ...item, okumaSuresi: e.target.value })}
            placeholder="6 dakika okuma"
          />
          <div className="md:col-span-2">
            <p className="mb-2 text-sm text-[#8A9BB0]">Kapak görseli</p>
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#0D1117]">
                <AdminImage src={item.kapak} alt={item.baslik || "Kapak"} />
              </div>
              <Upload
                label="Kapak yükle"
                accept="image/*"
                enableCrop
                uploadKey={`blog-${item.slug || "yazi"}`}
                onComplete={(results) => {
                  const first = results?.[0];
                  if (first?.url) update({ ...item, kapak: first.url });
                }}
                onError={(err) => setMessage(err.message)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <textarea value={item.ozet || ""} onChange={(e) => update({ ...item, ozet: e.target.value })} rows={2} className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]" placeholder="Özet / lead" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-[#8A9BB0]">Yazı gövdesi (HTML)</label>
            <textarea
              value={item.govdeHtml || ""}
              onChange={(e) => update({ ...item, govdeHtml: e.target.value })}
              rows={10}
              className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 font-mono text-xs text-[#EEE9E0]"
              placeholder="<h2>...</h2><p>...</p>"
            />
          </div>
          <p className="md:col-span-2 text-xs text-[#6B7A94]">Yayın adresi: /blog/{item.slug || "yazi-adi"}</p>
          <label className="flex items-center gap-2 text-sm text-[#EEE9E0]">
            <input type="checkbox" checked={item.yayinda !== false} onChange={(e) => update({ ...item, yayinda: e.target.checked })} /> Yayında (listede görünsün)
          </label>
        </div>
      )}
    />
  );
}

export function SssPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;
  const items = (content.sss?.items as { soru: string; cevap: string }[]) || [];
  const faqImg = liveMedia(
    content.images?.faq || content.images?.aboutInterior,
    SITE_PHOTOS.interior
  );
  return (
    <ListPanel
      title="S.S.S."
      description="Ana sayfa sıkça sorulan sorular — başlık, görsel ve soru/cevap listesi."
      items={items}
      message={message}
      saving={saving}
      newItem={() => ({ soru: "", cevap: "" })}
      onChange={(next) => setContent({ ...content, sss: { items: next } })}
      onSave={async () => {
        setSaving(true);
        try {
          const res = await api.updateContent({
            sss: content.sss,
            bolumlar: content.bolumlar,
          });
          setContent(res.data);
          setMessage("SSS kaydedildi.");
        } catch (e) {
          setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
        } finally {
          setSaving(false);
        }
      }}
      topNode={
        <div className="mb-4 space-y-4">
          <SectionHint anchor="sss" label="S.S.S." />
          <BolumBaslikFields
            value={content.bolumlar.sss}
            onChange={(sss) =>
              setContent({
                ...content,
                bolumlar: { ...content.bolumlar, sss },
              })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Buton yazısı"
              value={content.bolumlar.sss?.ctaLabel || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  bolumlar: {
                    ...content.bolumlar,
                    sss: { ...content.bolumlar.sss, ctaLabel: e.target.value },
                  },
                })
              }
              placeholder="Masa ayırtın"
            />
            <Input
              label="Buton bağlantısı"
              value={content.bolumlar.sss?.ctaHref || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  bolumlar: {
                    ...content.bolumlar,
                    sss: { ...content.bolumlar.sss, ctaHref: e.target.value },
                  },
                })
              }
              placeholder="#rezervasyon"
            />
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
            <h3 className="text-sm font-semibold text-[#F8F8F8]">Bölüm görseli</h3>
            <p className="mt-1 mb-3 text-xs text-[#6B7A94]">
              S.S.S. bölüm görseli. Telefonda tam genişlik ve ortalı; masaüstünde sol kolonda durur. Yükleme kaydı otomatik yayınlanır.
            </p>
            <div className="mb-3 h-40 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0D1117]">
              <AdminImage src={faqImg} alt="SSS görseli" />
            </div>
            <Upload
              uploadKey="faq"
              accept="image/jpeg,image/png,image/webp"
              enableCrop
              label="SSS görseli yükle (yatay 16:10)"
              onComplete={async () => {
                try {
                  const res = await api.getAdminContent();
                  setContent(res.data);
                  setMessage("SSS görseli güncellendi.");
                } catch (err) {
                  setMessage(
                    err instanceof Error ? err.message : "Yükleme sonrası güncelleme başarısız"
                  );
                }
              }}
              onError={(err) => setMessage(err.message)}
            />
          </div>
        </div>
      }
      renderItem={(item: { soru: string; cevap: string }, _i, update) => (
        <div className="grid gap-3">
          <Input label="Soru" value={item.soru} onChange={(e) => update({ ...item, soru: e.target.value })} />
          <label className="block text-xs font-medium text-[#8A9BB0]">Cevap</label>
          <textarea
            value={item.cevap}
            onChange={(e) => update({ ...item, cevap: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
          />
        </div>
      )}
    />
  );
}
