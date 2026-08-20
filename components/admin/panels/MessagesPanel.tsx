"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { Archive, Check, Mail, Phone, RefreshCw, Reply, Search } from "lucide-react";
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
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [filter, setFilter] = useState<"all" | MessageStatus>("new");
  const [search, setSearch] = useState("");

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
      if (!res.ok) throw new Error(data.error || "Yuklenemedi");
      setItems(data.items || []);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Yuklenemedi");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

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
      if (!res.ok) throw new Error(data.error || "Guncellene medi");
      setItems((prev) => prev.map((x) => (x.id === id ? data.item! : x)));
      setMessage("Mesaj guncellendi.");
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Guncellenemedi");
      setMessageType("error");
    }
  };

  const visible = useMemo(() => {
    let result = items;
    if (filter !== "all") result = result.filter((x) => x.status === filter);
    if (search.trim()) {
      const q = search.trim().toLocaleLowerCase("tr-TR");
      result = result.filter(
        (x) =>
          x.name.toLocaleLowerCase("tr-TR").includes(q) ||
          (x.phone || "").includes(q) ||
          (x.email || "").toLocaleLowerCase("tr-TR").includes(q) ||
          x.message.toLocaleLowerCase("tr-TR").includes(q)
      );
    }
    return result;
  }, [items, filter, search]);

  if (loading) return <AdminLoading />;

  const newCount = items.filter((x) => x.status === "new").length;

  return (
    <>
      <AdminPageHeader
        title="Iletisim mesajlari"
        description="Sitedeki formdan gelen yazilar."
      />
      <AdminAlert message={message} type={messageType} />

      {newCount > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 border border-red-500/20 w-fit">
            📬 {newCount} yeni mesaj okunmayi bekliyor
          </div>
        </div>
      )}

      {/* Filtreler + Arama + Yenile */}
      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {(["new", "read", "archived", "all"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                filter === key
                  ? "bg-[#C8703A] text-white"
                  : "bg-white/[0.04] text-[#8A9BB0] hover:bg-white/[0.08]"
              }`}
            >
              {key === "all" ? "Tumü" : LABELS[key]}
              <span className="ml-1 opacity-70">
                {key === "all" ? items.length : items.filter((x) => x.status === key).length}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6B7A94]" />
            <input
              type="text"
              placeholder="Ad, telefon, e-posta veya mesaj ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] pl-9 pr-4 py-2 text-sm text-[#EEE9E0] placeholder-[#4A5568] focus:border-[#C8703A]/40 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => void handleRefresh()}
            disabled={refreshing}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] px-3 py-2 text-xs font-medium text-[#8A9BB0] transition hover:border-white/[0.16] hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Yenile
          </button>
        </div>
      </div>

      {!visible.length ? (
        <p className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-8 text-center text-sm text-[#8A9BB0]">
          {search ? `"${search}" icin sonuc yok.` : "Bu listede mesaj yok."}
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((m) => (
            <article
              key={m.id}
              className={`rounded-2xl border bg-[#141E2E]/80 p-5 transition ${
                m.status === "new" ? "border-red-500/20" : "border-white/[0.08]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#EEE9E0]">{m.name}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-[#8A9BB0]">
                    {m.phone ? (
                      <a
                        href={`tel:${m.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1 text-[#C8703A] hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {m.phone}
                      </a>
                    ) : null}
                    {m.email ? (
                      <a
                        href={`mailto:${m.email}`}
                        className="inline-flex items-center gap-1 text-[#C8703A] hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {m.email}
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#C8D0DC] bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
                    {m.message}
                  </p>
                  <p className="mt-2 text-[11px] text-[#6B7A94]">
                    {new Date(m.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    m.status === "new"
                      ? "bg-red-500/15 text-red-300"
                      : m.status === "archived"
                        ? "bg-white/10 text-[#8A9BB0]"
                        : "bg-emerald-500/15 text-emerald-300"
                  }`}
                >
                  {LABELS[m.status]}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.email ? (
                  <a
                    href={`mailto:${m.email}?subject=Re: Mesajiniz&body=Merhaba ${m.name},%0A%0A`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#C8703A]/30 bg-[#C8703A]/10 px-3 py-1.5 text-xs font-medium text-[#E8915A] transition hover:bg-[#C8703A]/15"
                  >
                    <Reply className="h-3.5 w-3.5" />
                    E-posta Ile Yanıtla
                  </a>
                ) : null}
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
                    Arsivle
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
