"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, {
  AdminAlert,
  AdminGate,
} from "@/components/admin/AdminPageHeader";
import type { ManifestoContent } from "@/lib/content/types";

type HikayeContent = {
  baslik?: string;
  giris?: string;
  metin?: string;
  sayaclar?: { sayi: string; etiket: string }[];
};

function asHikaye(raw: unknown): HikayeContent {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as HikayeContent;
  }
  return { baslik: "", giris: "", metin: "", sayaclar: [] };
}

export default function MiscPanel() {
  const { setContent } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  return (
    <AdminGate>
      {(content) => {
        const manifesto: ManifestoContent = content.manifesto || {
          ustBaslik: "",
          satirlar: [],
        };
        const hikaye = asHikaye(content.hikaye);

        const show = (msg: string, type: "success" | "error") => {
          setMessage(msg);
          setMessageType(type);
        };

        const updateManifesto = (patch: Partial<ManifestoContent>) =>
          setContent({
            ...content,
            manifesto: { ...manifesto, ...patch },
          });

        const updateHikaye = (patch: HikayeContent) =>
          setContent({ ...content, hikaye: { ...hikaye, ...patch } });

        const saveManifesto = async () => {
          setSaving(true);
          setMessage("");
          try {
            const res = await api.updateContent({ manifesto });
            setContent(res.data);
            show("Manifesto kaydedildi.", "success");
          } catch (err) {
            show(err instanceof Error ? err.message : "Kayıt başarısız", "error");
          } finally {
            setSaving(false);
          }
        };

        const saveHikaye = async () => {
          setSaving(true);
          setMessage("");
          try {
            const res = await api.updateContent({ hikaye });
            setContent(res.data);
            show("Hikaye kaydedildi.", "success");
          } catch (err) {
            show(err instanceof Error ? err.message : "Kayıt başarısız", "error");
          } finally {
            setSaving(false);
          }
        };

        const satirlar = manifesto.satirlar || [];

        return (
          <>
            <AdminPageHeader
              title="Ek Metinler"
              description="Manifesto ve hikaye alanları kayıt edilir. Ana sayfada bölüm yoksa sitede görünmez; ileride eklenebilir."
            />
            <AdminAlert message={message} type={messageType} />

            <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">Manifesto</h3>
              <Input
                label="Üst başlık"
                value={manifesto.ustBaslik || ""}
                onChange={(e) => updateManifesto({ ustBaslik: e.target.value })}
                placeholder="Lezzet geleneği"
              />
              <div className="space-y-3">
                <p className="text-sm text-[#8A9BB0]">
                  Satırlar — kalın + italik metin çiftleri
                </p>
                {satirlar.length === 0 && (
                  <p className="rounded-xl border border-dashed border-white/[0.1] px-4 py-6 text-center text-sm text-[#6B7A94]">
                    Henüz satır yok. Aşağıdan ekleyin.
                  </p>
                )}
                {satirlar.map((row, i) => (
                  <div
                    key={i}
                    className="grid gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <Input
                      label="Kalın"
                      value={row.kalin || ""}
                      onChange={(e) => {
                        const next = [...satirlar];
                        next[i] = { ...next[i], kalin: e.target.value };
                        updateManifesto({ satirlar: next });
                      }}
                    />
                    <Input
                      label="İtalik"
                      value={row.italik || ""}
                      onChange={(e) => {
                        const next = [...satirlar];
                        next[i] = { ...next[i], italik: e.target.value };
                        updateManifesto({ satirlar: next });
                      }}
                    />
                    <div className="flex items-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={i === 0}
                        onClick={() => {
                          if (i === 0) return;
                          const next = [...satirlar];
                          [next[i - 1], next[i]] = [next[i], next[i - 1]];
                          updateManifesto({ satirlar: next });
                        }}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={i === satirlar.length - 1}
                        onClick={() => {
                          if (i >= satirlar.length - 1) return;
                          const next = [...satirlar];
                          [next[i], next[i + 1]] = [next[i + 1], next[i]];
                          updateManifesto({ satirlar: next });
                        }}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400"
                        onClick={() =>
                          updateManifesto({
                            satirlar: satirlar.filter((_, j) => j !== i),
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    updateManifesto({
                      satirlar: [...satirlar, { kalin: "", italik: "" }],
                    })
                  }
                >
                  <Plus className="h-4 w-4" /> Satır Ekle
                </Button>
              </div>
              <SaveBar onSave={saveManifesto} saving={saving} label="Manifestoyu Kaydet" />
            </section>

            <section className="mt-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">Hikaye</h3>
              <Input
                label="Başlık"
                value={hikaye.baslik || ""}
                onChange={(e) => updateHikaye({ ...hikaye, baslik: e.target.value })}
              />
              <div>
                <label className="mb-2 block text-sm text-[#8A9BB0]">Giriş</label>
                <textarea
                  value={hikaye.giris || ""}
                  onChange={(e) => updateHikaye({ ...hikaye, giris: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#8A9BB0]">Metin</label>
                <textarea
                  value={hikaye.metin || ""}
                  onChange={(e) => updateHikaye({ ...hikaye, metin: e.target.value })}
                  rows={4}
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-[#8A9BB0]">Sayaçlar</p>
                {(hikaye.sayaclar || []).map((s, i) => (
                  <div
                    key={i}
                    className="grid gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <Input
                      label="Sayı"
                      value={s.sayi || ""}
                      onChange={(e) => {
                        const next = [...(hikaye.sayaclar || [])];
                        next[i] = { ...next[i], sayi: e.target.value };
                        updateHikaye({ ...hikaye, sayaclar: next });
                      }}
                    />
                    <Input
                      label="Etiket"
                      value={s.etiket || ""}
                      onChange={(e) => {
                        const next = [...(hikaye.sayaclar || [])];
                        next[i] = { ...next[i], etiket: e.target.value };
                        updateHikaye({ ...hikaye, sayaclar: next });
                      }}
                    />
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400"
                        onClick={() =>
                          updateHikaye({
                            ...hikaye,
                            sayaclar: (hikaye.sayaclar || []).filter((_, j) => j !== i),
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    updateHikaye({
                      ...hikaye,
                      sayaclar: [...(hikaye.sayaclar || []), { sayi: "", etiket: "" }],
                    })
                  }
                >
                  <Plus className="h-4 w-4" /> Sayaç Ekle
                </Button>
              </div>
              <SaveBar onSave={saveHikaye} saving={saving} label="Hikayeyi Kaydet" />
            </section>
          </>
        );
      }}
    </AdminGate>
  );
}
