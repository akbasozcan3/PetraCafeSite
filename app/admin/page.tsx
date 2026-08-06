"use client";

import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Image,
  LayoutList,
  Megaphone,
  Phone,
  Search,
  MessageSquare,
  Images,
} from "lucide-react";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import { adminNavItems } from "@/lib/admin/navigation";
import AdminPageHeader, {
  AdminGate,
} from "@/components/admin/AdminPageHeader";

export default function DashboardPage() {
  const { user } = useAdminSession();

  return (
    <AdminGate>
      {(content) => {
        const imageCount = Object.keys(content.images || {}).length;
        const duyuruActive = content.duyuru?.aktif ?? false;
        const menuGroups = content.menu?.gruplar?.length ?? 0;
        const menuProducts =
          content.menu?.gruplar?.reduce(
            (n, g) => n + (g.urunler?.length ?? 0),
            0
          ) ?? 0;
        const yorumCount = content.yorumlar?.length ?? 0;
        const galeriCount = content.galeri?.length ?? 0;
        const sssCount = content.sss?.items?.length ?? 0;

        const quickLinks = adminNavItems.filter(
          (item) =>
            item.href !== "/admin" &&
            item.href !== "/admin/settings" &&
            item.href !== "/admin/sistem"
        );

        return (
          <>
            <AdminPageHeader
              title={`Hoş geldiniz, ${user?.name ?? "Admin"}`}
              description="Taşdelen Fırıncı yönetim paneli — içerik, SEO ve sistem."
            />

            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Kategori"
                value={String(menuGroups)}
                hint={`${menuProducts} ürün`}
              />
              <StatCard
                label="Galeri"
                value={String(galeriCount)}
                hint="Fotoğraf"
              />
              <StatCard
                label="Yorum"
                value={String(yorumCount)}
                hint={`${sssCount} SSS`}
              />
              <StatCard
                label="Görsel anahtarı"
                value={String(imageCount)}
                hint={duyuruActive ? "Duyuru açık" : "Duyuru kapalı"}
              />
              <StatCard
                label="Telefon"
                value={content.iletisim?.telefon || "—"}
                hint="İletişim"
              />
              <StatCard
                label="Çalışma"
                value={content.iletisim?.saatler || "—"}
                hint="Saatler"
              />
              <StatCard
                label="SEO başlık"
                value={content.seo?.title ? "Tanımlı" : "Eksik"}
                hint={content.seo?.siteName || "—"}
              />
              <StatCard
                label="Footer marka"
                value={content.footer?.markaAdi || "—"}
                hint="Alt bilgi"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
                <h2 className="text-lg font-semibold text-[#F8F8F8]">
                  Hızlı Erişim
                </h2>
                <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1">
                  {quickLinks.map((item) => {
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

              <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
                <h2 className="text-lg font-semibold text-[#F8F8F8]">
                  Site Önizleme
                </h2>
                <p className="mt-2 text-sm text-[#8A9BB0]">
                  Kayıtlar anında siteye yansır. Canlı önizleme ve kritik
                  bölümlere buradan geçin.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/index.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#C8703A] px-4 py-2.5 text-sm font-medium text-[#0A0F18] transition hover:bg-[#E8915A]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Siteyi Aç
                  </a>
                  <Link
                    href="/admin/menu"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.04]"
                  >
                    <LayoutList className="h-4 w-4" />
                    Ürünler
                  </Link>
                  <Link
                    href="/admin/site"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.04]"
                  >
                    <Search className="h-4 w-4" />
                    SEO & Footer
                  </Link>
                  <Link
                    href="/admin/images"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.04]"
                  >
                    <Image className="h-4 w-4" />
                    Görseller
                  </Link>
                  <Link
                    href="/admin/galeri"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.04]"
                  >
                    <Images className="h-4 w-4" />
                    Galeri
                  </Link>
                  <Link
                    href="/admin/yorumlar"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.04]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Yorumlar
                  </Link>
                  <Link
                    href="/admin/iletisim"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.04]"
                  >
                    <Phone className="h-4 w-4" />
                    İletişim
                  </Link>
                  <Link
                    href="/admin/duyuru"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.04]"
                  >
                    <Megaphone className="h-4 w-4" />
                    Duyuru
                  </Link>
                </div>
              </section>
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
      <p className="text-xs font-medium uppercase tracking-wider text-[#6B7A94]">
        {label}
      </p>
      <p className="mt-2 truncate text-xl font-semibold text-[#F8F8F8]">
        {value}
      </p>
      <p className="mt-1 truncate text-xs text-[#8A9BB0]">{hint}</p>
    </div>
  );
}
