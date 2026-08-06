"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Button from "@/components/admin/ui/Button";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";

export default function DuyuruPanel() {
  const { content, loading, setContent } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await api.updateContent({ duyuru: content.duyuru });
      setContent(res.data);
      setMessage("Duyuru kaydedildi.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  return (
    <>
      <AdminPageHeader
        title="Duyuru Bandı"
        description="Ana sayfanın üst kısmında görünen duyuru metnini yönetin."
      />
      <AdminAlert message={message} />
      <section className="max-w-2xl rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-sm text-[#EEE9E0]">
            <input
              type="checkbox"
              checked={content.duyuru?.aktif ?? false}
              onChange={(e) =>
                setContent({ ...content, duyuru: { ...content.duyuru, aktif: e.target.checked } })
              }
              className="h-4 w-4 rounded border-white/20 accent-[#C8703A]"
            />
            Duyuru bandını göster
          </label>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Duyuru metni</label>
            <textarea
              value={content.duyuru?.metin ?? ""}
              onChange={(e) =>
                setContent({ ...content, duyuru: { ...content.duyuru, metin: e.target.value } })
              }
              rows={4}
              className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none"
              placeholder="Örn: Ramazan ayına özel indirimler başladı!"
            />
          </div>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </Button>
        </div>
      </section>
    </>
  );
}
