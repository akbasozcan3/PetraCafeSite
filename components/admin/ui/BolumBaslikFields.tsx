"use client";

import Input from "@/components/admin/ui/Input";
import type { BolumBaslik } from "@/lib/content/types";

/** Ortak bölüm başlığı (eyebrow / başlık / lead) alanları */
export default function BolumBaslikFields({
  value,
  onChange,
  lead = true,
}: {
  value: BolumBaslik;
  onChange: (next: BolumBaslik) => void;
  lead?: boolean;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
      <h3 className="text-sm font-semibold text-[#F8F8F8]">Bölüm başlığı</h3>
      <p className="text-xs text-[#6B7A94]">
        Ana sayfada bu bölümün üst etiketi, büyük başlığı ve kısa açıklaması.
      </p>
      <div className={`grid gap-3 ${lead ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <Input
          label="Üst etiket"
          value={value.eyebrow || ""}
          onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
          placeholder="Örn: Galeri"
        />
        <Input
          label="Başlık"
          value={value.baslik || ""}
          onChange={(e) => onChange({ ...value, baslik: e.target.value })}
          placeholder="Büyük başlık"
        />
        {lead && (
          <Input
            label="Kısa açıklama"
            value={value.lead || ""}
            onChange={(e) => onChange({ ...value, lead: e.target.value })}
            placeholder="Alt metin"
          />
        )}
      </div>
    </div>
  );
}
