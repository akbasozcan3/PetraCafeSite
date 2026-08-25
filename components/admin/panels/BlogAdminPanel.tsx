"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  ExternalLink,
  BookOpen,
  Sparkles,
  Calendar,
  Clock,
  Bookmark,
  CheckCircle2,
  XCircle,
  Save,
  Image as ImageIcon,
  Heading2,
  Heading3,
  Quote,
  List,
  CalendarCheck,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Upload from "@/components/admin/ui/Upload";
import AdminImage from "@/components/admin/ui/AdminImage";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import SectionHint from "@/components/admin/ui/SectionHint";
import { slugifyTr } from "@/lib/content/slugify";
import type { MakaleItem } from "@/lib/content/types";

const POPULAR_CATEGORIES = [
  "Mutfak Sanatı",
  "Gastronomi",
  "Rezervasyon",
  "Kahvaltı Rehberi",
  "Havuz & Yaşam",
  "Özel Günler",
];

export default function BlogAdminPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (loading || !content) return <AdminLoading />;

  const makaleler = content.makaleler || [];

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleSave = async (updatedMakaleler?: MakaleItem[]) => {
    setSaving(true);
    try {
      const itemsToSave = updatedMakaleler || content.makaleler;
      const res = await api.updateContent({ makaleler: itemsToSave });
      setContent(res.data);
      showMessage("Blog yazıları başarıyla kaydedildi.", "success");
    } catch (e) {
      showMessage(e instanceof Error ? e.message : "Kayıt başarısız oldu", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddPost = () => {
    const newPost: MakaleItem = {
      slug: `yazi-${Date.now()}`,
      baslik: "Yeni Blog Yazısı",
      ozet: "Bu yazının kısa özeti veya spot açıklaması buraya gelecek.",
      kategori: "Gastronomi",
      tarih: new Date().toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      okumaSuresi: "4 dakika okuma",
      kapak: "/assets/cms/hero-ic.webp",
      govdeHtml: `<h2>Lezzetin ve Keyfin Buluşma Noktası</h2>
<p>Petra Cafe Restaurant olarak en taze yerel malzemelerle hazırladığımız özel tatları ve benzersiz atmosferi sizlerle buluşturuyoruz.</p>
<div class="answer">
  <b>Şefin Notu</b>
  <p>Her mevsim menümüzü taze ürünlerle zenginleştiriyor, misafirlerimize unutulmaz deneyimler sunuyoruz.</p>
</div>
<h3>Öne Çıkanlar</h3>
<ul>
  <li>Taş fırından taze çıkan artisan hamurlar</li>
  <li>Özel kavrum kahve çekirdekleri</li>
  <li>Geniş ve ferah bahçe alanı</li>
</ul>`,
      yayinda: true,
      statik: false,
    };

    const updated = [newPost, ...makaleler];
    setContent({ ...content, makaleler: updated });
    setExpandedIndex(0);
    showMessage("Yeni blog yazısı eklendi. Düzenleyip kaydedebilirsiniz.", "success");
  };

  const handleUpdateItem = (index: number, updatedItem: MakaleItem) => {
    const updated = [...makaleler];
    updated[index] = updatedItem;
    setContent({ ...content, makaleler: updated });
  };

  const handleDeleteItem = (index: number) => {
    if (confirm(`"${makaleler[index]?.baslik || "Bu yazıyı"}" silmek istediğinize emin misiniz?`)) {
      const updated = makaleler.filter((_, i) => i !== index);
      setContent({ ...content, makaleler: updated });
      showMessage("Yazı silindi. Değişikliği kalıcı yapmak için kaydetmeyi unutmayın.", "success");
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= makaleler.length) return;
    const updated = [...makaleler];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setContent({ ...content, makaleler: updated });
    setExpandedIndex(targetIndex);
  };

  const insertHtmlSnippet = (index: number, snippet: string) => {
    const item = makaleler[index];
    if (!item) return;
    const currentHtml = item.govdeHtml || "";
    handleUpdateItem(index, {
      ...item,
      govdeHtml: `${currentHtml}\n${snippet}`,
    });
    showMessage("Şablon metin yazı gövdesine eklendi.", "success");
  };

  // Filtrelenmiş liste
  const filteredPosts = makaleler.map((item, originalIndex) => ({ item, originalIndex })).filter(({ item }) => {
    const matchSearch =
      !search ||
      item.baslik?.toLowerCase().includes(search.toLowerCase()) ||
      item.ozet?.toLowerCase().includes(search.toLowerCase()) ||
      item.slug?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || item.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  const activeCount = makaleler.filter((m) => m.yayinda !== false).length;

  return (
    <div className="space-y-6">
      {/* 1. ÜST HEADER & AKSİYONLAR */}
      <AdminPageHeader
        title="Blog & Defter Yönetimi"
        description="Web sitesindeki blog yazılarını, editoryal makaleleri, kapak görsellerini ve içerikleri buradan yönetin."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleAddPost}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Yeni Yazı Ekle</span>
            </Button>
            <Button
              onClick={() => handleSave()}
              disabled={saving}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Kaydediliyor…" : "💾 Blogu Kaydet"}</span>
            </Button>
          </div>
        }
      />

      <AdminAlert
        message={message}
        type={messageType}
      />

      {/* 2. İSTATİSTİK & HIZLI BİLGİ KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <p className="text-xs font-semibold text-[#8A9BB0] uppercase tracking-wider">Toplam Makale</p>
          <p className="mt-1 text-2xl font-bold text-white">{makaleler.length}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Yayındaki Yazılar</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Taslak / Gizli</p>
          <p className="mt-1 text-2xl font-bold text-amber-400">{makaleler.length - activeCount}</p>
        </div>
      </div>

      {/* 3. ARAMA VE FİLTRELEME ÇUBUĞU */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 min-w-[260px]">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A9BB0]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Yazı başlığı, özet veya slug ara…"
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] pl-10 pr-4 py-2.5 text-sm text-[#EEE9E0] placeholder-[#6B7A94] focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white/[0.05] text-[#8A9BB0] hover:bg-white/[0.1]"
            }`}
          >
            Tümü ({makaleler.length})
          </button>
          {POPULAR_CATEGORIES.map((cat) => {
            const count = makaleler.filter((m) => m.kategori === cat).length;
            if (!count) return null;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white/[0.05] text-[#8A9BB0] hover:bg-white/[0.1]"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. YAZI LİSTESİ (AKORDEON KARTLARI) */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.12] bg-[#0D1117]/60 px-4 py-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-[#8A9BB0]/60 mb-2" />
            <p className="text-sm text-[#8A9BB0]">Aradığınız kriterlere uygun blog yazısı bulunamadı.</p>
            <Button
              onClick={handleAddPost}
              variant="outline"
              className="mt-4"
            >
              Yeni Yazı Ekle
            </Button>
          </div>
        ) : (
          filteredPosts.map(({ item, originalIndex }) => {
            const isExpanded = expandedIndex === originalIndex;
            return (
              <div
                key={item.slug || originalIndex}
                className={`rounded-2xl border transition-all duration-200 ${
                  isExpanded
                    ? "border-blue-500/40 bg-[#141E2E] shadow-xl"
                    : "border-white/[0.08] bg-[#141E2E]/70 hover:border-white/[0.15]"
                }`}
              >
                {/* Kart Başlık Çubuğu */}
                <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-3.5 flex-1 min-w-[280px] cursor-pointer"
                    onClick={() => setExpandedIndex(isExpanded ? null : originalIndex)}
                  >
                    {/* Küçük Kapak Thumbnail */}
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-[#0D1117] flex-shrink-0 border border-white/[0.08]">
                      <AdminImage src={item.kapak} alt={item.baslik} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                            item.yayinda !== false
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {item.yayinda !== false ? "Yayında" : "Taslak"}
                        </span>
                        {item.kategori && (
                          <span className="text-[11px] font-semibold text-[#8A9BB0] bg-white/[0.04] px-2 py-0.5 rounded-md">
                            {item.kategori}
                          </span>
                        )}
                        {item.tarih && (
                          <span className="text-[11px] text-[#6B7A94] hidden sm:inline">
                            {item.tarih}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white truncate mt-0.5">
                        {item.baslik || "Başlıksız Makale"}
                      </h3>
                      <p className="text-xs text-[#8A9BB0] font-mono truncate">
                        /blog/{item.slug}
                      </p>
                    </div>
                  </div>

                  {/* Sağ Aksiyon Butonları */}
                  <div className="flex items-center gap-1.5">
                    {item.slug && item.yayinda !== false && (
                      <a
                        href={`/blog/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-[#8A9BB0] hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="Canlıda Gör"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleMove(originalIndex, "up")}
                      disabled={originalIndex === 0}
                      className="p-2 rounded-xl text-[#8A9BB0] hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Yukarı Taşı"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMove(originalIndex, "down")}
                      disabled={originalIndex === makaleler.length - 1}
                      className="p-2 rounded-xl text-[#8A9BB0] hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Aşağı Taşı"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(originalIndex)}
                      className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                      title="Yazıyı Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedIndex(isExpanded ? null : originalIndex)}
                      className="p-2 rounded-xl text-[#8A9BB0] hover:text-white hover:bg-white/[0.06]"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Açılır Düzenleme Formu */}
                {isExpanded && (
                  <div className="border-t border-white/[0.08] p-5 space-y-5 bg-[#0D1117]/40">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Başlık */}
                      <div>
                        <Input
                          label="Makale Başlığı"
                          value={item.baslik}
                          onChange={(e) => {
                            const newTitle = e.target.value;
                            handleUpdateItem(originalIndex, {
                              ...item,
                              baslik: newTitle,
                            });
                          }}
                          placeholder="Örn: Taşdelen'de Serpme Kahvaltı Keyfi"
                        />
                      </div>

                      {/* Slug / URL */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-[#8A9BB0]">
                            Yayın Adresi (Slug URL)
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const autoSlug = slugifyTr(item.baslik) || `yazi-${Date.now()}`;
                              handleUpdateItem(originalIndex, { ...item, slug: autoSlug });
                            }}
                            className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <Sparkles className="h-3 w-3" /> Başlıktan Üret
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.slug}
                          onChange={(e) =>
                            handleUpdateItem(originalIndex, {
                              ...item,
                              slug: slugifyTr(e.target.value) || e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 text-sm text-[#EEE9E0] font-mono focus:border-blue-500 focus:outline-none"
                          placeholder="tasdelende-serpme-kahvalti"
                        />
                      </div>

                      {/* Kategori */}
                      <div>
                        <label className="block text-xs font-semibold text-[#8A9BB0] mb-1">
                          Kategori
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.kategori || ""}
                            onChange={(e) =>
                              handleUpdateItem(originalIndex, {
                                ...item,
                                kategori: e.target.value,
                              })
                            }
                            className="flex-1 rounded-xl border border-white/[0.08] bg-[#0D1117] px-3.5 py-2.5 text-sm text-[#EEE9E0] focus:border-blue-500 focus:outline-none"
                            placeholder="Mutfak Sanatı"
                          />
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                handleUpdateItem(originalIndex, {
                                  ...item,
                                  kategori: e.target.value,
                                });
                              }
                            }}
                            className="rounded-xl border border-white/[0.08] bg-[#0D1117] px-2.5 text-xs text-[#8A9BB0] focus:outline-none"
                          >
                            <option value="">Örnekler</option>
                            {POPULAR_CATEGORIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Okuma Süresi ve Tarih */}
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Yayın Tarihi"
                          value={item.tarih || ""}
                          onChange={(e) =>
                            handleUpdateItem(originalIndex, {
                              ...item,
                              tarih: e.target.value,
                            })
                          }
                          placeholder="25 Ağustos 2026"
                        />
                        <Input
                          label="Okuma Süresi"
                          value={item.okumaSuresi || ""}
                          onChange={(e) =>
                            handleUpdateItem(originalIndex, {
                              ...item,
                              okumaSuresi: e.target.value,
                            })
                          }
                          placeholder="4 dakika okuma"
                        />
                      </div>

                      {/* Kapak Görseli Yükleme */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-[#8A9BB0] mb-2">
                          Kapak Fotoğrafı (Sinematik 16:9 Format)
                        </label>
                        <div className="grid gap-4 sm:grid-cols-[200px_1fr] items-start">
                          <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#0D1117] border border-white/[0.1] shadow-inner relative">
                            <AdminImage src={item.kapak} alt={item.baslik} />
                          </div>

                          <div className="space-y-2">
                            <Upload
                              label="Yeni Kapak Görseli Yükle"
                              accept="image/*"
                              enableCrop
                              uploadKey={`blog-${item.slug || "kapak"}`}
                              onComplete={(results) => {
                                const first = results?.[0];
                                if (first?.url) {
                                  handleUpdateItem(originalIndex, {
                                    ...item,
                                    kapak: first.url,
                                  });
                                  showMessage("Kapak görseli yüklendi.", "success");
                                }
                              }}
                              onError={(err) => showMessage(err.message, "error")}
                            />
                            <p className="text-[11px] text-[#6B7A94]">
                              Önerilen oran: 16:9 yatay (Örn: 1200x675 px). Otomatik kırpma desteklidir.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Özet / Lead Metni */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-[#8A9BB0] mb-1">
                          Özet / Spot Açıklama (Listede ve Başlık Altında Görünür)
                        </label>
                        <textarea
                          value={item.ozet || ""}
                          onChange={(e) =>
                            handleUpdateItem(originalIndex, {
                              ...item,
                              ozet: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-blue-500 focus:outline-none"
                          placeholder="Yazının ana temasını özetleyen 1-2 cümlelik spot metin…"
                        />
                      </div>

                      {/* Yazı Gövdesi (HTML) + Hızlı Şablon Araç Çubuğu */}
                      <div className="md:col-span-2 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label className="block text-xs font-semibold text-[#8A9BB0]">
                            Yazı Gövdesi (Zengin HTML İçerik)
                          </label>

                          {/* Hızlı HTML Snippet Butonları */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] text-[#6B7A94] mr-1">Hızlı Ekle:</span>
                            <button
                              type="button"
                              onClick={() => insertHtmlSnippet(originalIndex, `<h2>Yeni Başlık</h2>\n<p>Paragraf metniniz buraya gelecek.</p>`)}
                              className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#C8D0DC] flex items-center gap-1 font-semibold"
                              title="H2 Başlık ve Paragraf"
                            >
                              <Heading2 className="h-3.5 w-3.5" /> H2 Başlık
                            </button>
                            <button
                              type="button"
                              onClick={() => insertHtmlSnippet(originalIndex, `<h3>Alt Başlık</h3>`)}
                              className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#C8D0DC] flex items-center gap-1 font-semibold"
                              title="H3 Başlık"
                            >
                              <Heading3 className="h-3.5 w-3.5" /> H3
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                insertHtmlSnippet(
                                  originalIndex,
                                  `<div class="answer">\n  <b>Önemli Bilgi</b>\n  <p>Vurgulamak istediğiniz özel not veya şefin tavsiyesi.</p>\n</div>`
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#C8D0DC] flex items-center gap-1 font-semibold"
                              title="Vurgulu Kutu"
                            >
                              <Quote className="h-3.5 w-3.5" /> Vurgu Kutusu
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                insertHtmlSnippet(
                                  originalIndex,
                                  `<ul>\n  <li>Birinci madde açıklaması</li>\n  <li>İkinci madde açıklaması</li>\n</ul>`
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#C8D0DC] flex items-center gap-1 font-semibold"
                              title="Madde İşaretli Liste"
                            >
                              <List className="h-3.5 w-3.5" /> Liste
                            </button>
                          </div>
                        </div>

                        <textarea
                          value={item.govdeHtml || ""}
                          onChange={(e) =>
                            handleUpdateItem(originalIndex, {
                              ...item,
                              govdeHtml: e.target.value,
                            })
                          }
                          rows={12}
                          className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] p-4 font-mono text-xs text-[#EEE9E0] leading-relaxed focus:border-blue-500 focus:outline-none"
                          placeholder="<h2>Başlık</h2><p>İçerik...</p>"
                        />
                      </div>

                      {/* Yayın Durumu Switch */}
                      <div className="md:col-span-2 pt-2 flex items-center justify-between border-t border-white/[0.06]">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.yayinda !== false}
                            onChange={(e) =>
                              handleUpdateItem(originalIndex, {
                                ...item,
                                yayinda: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded border-white/[0.15] bg-[#0D1117] text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-semibold text-white">
                            Yayında (Web sitesinde ve blog listesinde görünsün)
                          </span>
                        </label>

                        <Button
                          onClick={() => handleSave()}
                          disabled={saving}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl"
                        >
                          <Save className="h-3.5 w-3.5 mr-1" />
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 5. ALT BİLGİLENDİRME VE HIZLI KAYDET */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
        <SectionHint href="/blog" label="Canlı Blog Sayfasına Git" />
        <Button
          onClick={() => handleSave()}
          disabled={saving}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-6 py-3 rounded-xl shadow-lg"
        >
          <span>{saving ? "Kaydediliyor…" : "💾 Tüm Değişiklikleri Kaydet"}</span>
        </Button>
      </div>
    </div>
  );
}
