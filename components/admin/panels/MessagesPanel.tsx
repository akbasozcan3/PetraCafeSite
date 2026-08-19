"use client";

import { useCallback, useEffect, useState } from "react";
import { Archive, Check, Mail, Phone } from "lucide-react";
import Button from "@/components/admin/ui/Button";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import type { ContactMessage, MessageStatus } from "@/lib/db/inbox";

const LABELS: Record<MessageStatus, string> = {
  new: "Yeni",
  read: "Okundu",
  archived: "Arşiv",
};

export default function MessagesPanel() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [filter, setFilter] = useState<"all" | MessageStatus>("new");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/messages", {
        credentials: "include",
        cache: "no-store",
      });
      const data = (await res.json()) as {
        items?: ContactMessage[];
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Yüklenemedi");
      setItems(data.items || []);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Yüklenemedi");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: MessageStatus) => {
    try {
      const res = await fetch("/api/v1/admin/messages", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = (await res.json()) as { item?: ContactMessage; error?: string };
      if (!res.ok) throw new Error(data.error || "Güncellenemedi");
      setItems((prev) => prev.map((x) => (x.id === id ? data.item! : x)));
      setMessage("Mesaj güncellendi.");
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Güncellenemedi");
      setMessageType("error");
    }
  };

  const visible =
    filter === "all" ? items : items.filter((x) => x.status === filter);

  if (loading) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title="İletişim mesajları"
        description="Sitedeki formdan gelen yazılar."
      />
      <AdminAlert message={message} type={messageType} />

      <div className="mb-4 flex flex-wrap gap-2">
        {(["new", "read", "archived", "all"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === key
                ? "bg-[#C8703A] text-[#0A0F18]"
                : "bg-white/[0.04] text-[#8A9BB0]"
            }`}
          >
            {key === "all" ? "Tümü" : LABELS[key]}
            <span className="ml-1 opacity-70">
              {key === "all"
                ? items.length
                : items.filter((x) => x.status === key).length}
            </span>
          </button>
        ))}
      </div>

      {!visible.length ? (
        <p className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-8 text-sm text-[#8A9BB0]">
          Bu listede mesaj yok.
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#EEE9E0]">{m.name}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-[#8A9BB0]">
                    {m.phone ? (
                      <a
                        href={`tel:${m.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1 text-[#C8703A]"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {m.phone}
                      </a>
                    ) : null}
                    {m.email ? (
                      <a
                        href={`mailto:${m.email}`}
                        className="inline-flex items-center gap-1 text-[#C8703A]"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {m.email}
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#C8D0DC]">
                    {m.message}
                  </p>
                  <p className="mt-2 text-[11px] text-[#6B7A94]">
                    {new Date(m.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    m.status === "new"
                      ? "bg-[#C8703A]/15 text-[#E8915A]"
                      : m.status === "archived"
                        ? "bg-white/10 text-[#8A9BB0]"
                        : "bg-emerald-500/15 text-emerald-300"
                  }`}
                >
                  {LABELS[m.status]}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.status === "new" ? (
                  <Button size="sm" onClick={() => void setStatus(m.id, "read")}>
                    <Check className="h-4 w-4" />
                    Okundu
                  </Button>
                ) : null}
                {m.status !== "archived" ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => void setStatus(m.id, "archived")}
                  >
                    <Archive className="h-4 w-4" />
                    Arşivle
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
