"use client";

import Button from "@/components/admin/ui/Button";
import { Loader2, Save } from "lucide-react";
import { useAdminSession } from "@/lib/context/AdminSessionContext";

export default function SaveBar({
  onSave,
  saving,
  label = "Kaydet",
}: {
  onSave: () => void | Promise<void>;
  saving: boolean;
  label?: string;
}) {
  const { can } = useAdminSession();
  if (!can("content:write")) {
    return (
      <div className="sticky bottom-4 z-10 rounded-xl border border-white/[0.06] bg-[#141E2E]/90 px-4 py-3 text-center text-xs text-[#6B7A94]">
        İzleyici hesabı — kayıt yetkisi yok
      </div>
    );
  }

  return (
    <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3">
      <Button
        onClick={() => {
          void onSave();
        }}
        disabled={saving}
        className="shadow-[0_8px_24px_rgba(200,112,58,0.25)]"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {saving ? "Kaydediliyor…" : label}
      </Button>
    </div>
  );
}
