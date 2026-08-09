"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Phone,
  Plug,
} from "lucide-react";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { adminNavItems, adminNavGroups } from "@/lib/admin/navigation";
import AdminPageHeader, {
  AdminGate,
} from "@/components/admin/AdminPageHeader";

const SITE_SECTIONS = [
  "/admin/hakkimizda",
  "/admin/menu",
  "/admin/pasta",
  "/admin/galeri",
  "/admin/yorumlar",
  "/admin/sss",
  "/admin/makaleler",
  "/admin/iletisim",
];

type IntegrationSummary = {
  id: string;
  name: string;
  settings: {
    enabled: boolean;
    connected: boolean;
    lastTestOk?: boolean;
    lastSyncAt?: string;
    lastTestMessage?: string;
  };
};

export default function DashboardPage() {
  const { user } = useAdminSession();
  const [integrations, setIntegrations] = useState<IntegrationSummary[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/v1/admin/integrations", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { providers?: IntegrationSummary[] };
        if (!cancelled) setIntegrations(data.providers || []);
      } catch {
        /* yetkisiz veya hata — sessizce atla */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminGate>
      {(content) => {
        const menuGroups = content.menu?.gruplar?.length ?? 0;
        const menuProducts =
          content.menu?.gruplar?.reduce(
            (n, g) => n + (g.urunler?.length ?? 0),
            0
          ) ?? 0;
        const yorumCount = content.yorumlar?.length ?? 0;
        const galeriCount = content.galeri?.length ?? 0;
        const sssCount = content.sss?.items?.length ?? 0;
        const blogCount = content.makaleler?.length ?? 0;

        const siteSectionItems = adminNavItems.filter((i) =>
          SITE_SECTIONS.includes(i.href)
        );

        return (
          <>
            <AdminPageHeader
              title={`Hoş geldiniz, ${user?.name ?? "Admin"}`}
              description="Ana sayfa bölümlerini soldan seçin — her yazı buradan değişir."
            />

            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Ürün kategorisi"
                value={String(menuGroups)}
                hint={`${menuProducts} ürün`}
              />
              <StatCard
                label="Galeri"
                value={String(galeriCount)}
                hint="Fotoğraf"
              />
              <StatCard
                label="Yorum / SSS"
                value={`${yorumCount} / ${sssCount}`}
                hint={`${blogCount} blog yazısı`}
              />
              <StatCard
                label="Telefon"
                value={content.iletisim?.telefon || "—"}
                hint={content.brand?.displayName || content.seo?.siteName || "Marka"}
              />
            </div>

            {integrations.length > 0 && (
              <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-[#F8F8F8]">
                      <Plug className="h-5 w-5 text-[#C8703A]" />
                      Entegrasyonlar
                    </h2>
                    <p className="mt-1 text-sm text-[#8A9BB0]">
                      Bağlantı ve son senkron özeti
                    </p>
                  </div>
                  <Link
                    href="/admin/integrations"
                    className="text-sm font-medium text-[#C8703A] hover:underline"
                  >
                    Yönet →
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {integrations.map((p) => {
                    const linked =
                      p.settings.enabled && p.settings.lastTestOk === true;
                    return (
                      <div
                        key={p.id}
                        className="rounded-xl border border-white/[0.06] bg-[#0D1117]/70 p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-[#EEE9E0]">{p.name}</p>
                          <span
                            className={
                              linked
                                ? "text-xs text-emerald-300"
                                : "text-xs text-[#8A9BB0]"
                            }
                          >
                            {linked ? "● Connected" : "○ Not connected"}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-[#8A9BB0]">
                          Son senkronizasyon:{" "}
                          {p.settings.lastSyncAt
                            ? new Date(p.settings.lastSyncAt).toLocaleString(
                                "tr-TR"
                              )
                            : "—"}
                        </p>
                        <p className="mt-1 text-xs text-[#8A9BB0]">
                          Son API:{" "}
                          {p.settings.lastTestMessage ||
                            (p.settings.lastTestOk === false
                              ? "Hata"
                              : "Yok")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#F8F8F8]">
                    Ana sayfa bölümleri
                  </h2>
                  <p className="mt-1 text-sm text-[#8A9BB0]">
                    Sitedeki sırayla — tıklayınca ilgili yazıları düzenlersiniz.
                  </p>
                </div>
                <a
                  href="/index.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C8703A] px-4 py-2.5 text-sm font-medium text-[#0A0F18] transition hover:bg-[#E8915A]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Siteyi aç
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {siteSectionItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-[#0D1117]/70 p-4 transition hover:border-[#C8703A]/35 hover:bg-[#C8703A]/8"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B7A94]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <Icon className="h-4 w-4 text-[#C8703A]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#EEE9E0]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs text-[#6B7A94]">
                          {item.description}
                        </p>
                      </div>
                      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[#C8703A]">
                        Düzenle
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <div className="grid gap-4 lg:grid-cols-2">
              {adminNavGroups
                .filter((g) => g === "Site" || g === "Sistem")
                .map((group) => {
                  const items = adminNavItems.filter((i) => i.group === group);
                  return (
                    <section
                      key={group}
                      className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6"
                    >
                      <h2 className="text-lg font-semibold text-[#F8F8F8]">
                        {group}
                      </h2>
                      <div className="mt-4 space-y-2">
                        {items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition hover:border-[#C8703A]/20 hover:bg-[#C8703A]/5"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C8703A]/10 text-[#C8703A]">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-[#EEE9E0]">
                                    {item.label}
                                  </p>
                                  <p className="text-xs text-[#6B7A94]">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-[#6B7A94] transition group-hover:translate-x-0.5 group-hover:text-[#C8703A]" />
                            </Link>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
            </div>

            <div className="mt-6">
              <Link
                href="/admin/iletisim"
                className="inline-flex items-center gap-2 text-sm text-[#8A9BB0] hover:text-[#C8703A]"
              >
                <Phone className="h-4 w-4" />
                İletişim ve sipariş numarası
              </Link>
            </div>
          </>
        );
      }}
    </AdminGate>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7A94]">
        {label}
      </p>
      <p className="mt-2 truncate text-xl font-semibold text-[#F8F8F8]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#8A9BB0]">{hint}</p>
    </div>
  );
}
