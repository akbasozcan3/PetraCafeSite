"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { adminNavGroups, filterNavByPermission } from "@/lib/admin/navigation";
import { ROLE_LABELS } from "@/lib/admin/roles";
import { api } from "@/lib/api/client";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Avatar from "@/components/admin/ui/Avatar";
import BrandLogo from "@/components/site/BrandLogo";
import { siteFaviconHref } from "@/lib/content/favicon";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, can } = useAdminSession();
  const { content } = useAdminContent();
  const displayName = user?.name ?? "Admin";
  const roleLabel = user?.role ? ROLE_LABELS[user.role] : "Yönetici";
  const navItems = filterNavByPermission(can);
  const brandName =
    content?.brand?.displayName ||
    content?.seo?.siteName ||
    content?.footer?.markaAdi ||
    "Petra Cafe Restaurant";

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 z-30 h-screen border-r border-white/[0.06] bg-[#0A0F18] transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className={cn("border-b border-white/[0.06] p-5", collapsed && "px-3 py-4")}>
        <Link href="/admin" className="flex items-center gap-3" title={brandName}>
          {collapsed ? (
            <img
              src={siteFaviconHref(content)}
              alt=""
              width={32}
              height={32}
              className="mx-auto h-8 w-8 rounded-md object-contain"
            />
          ) : (
            <BrandLogo src={content?.images?.logo} alt={brandName} height={34} className="max-w-[168px]" />
          )}
        </Link>
        {!collapsed ? (
          <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#6B7A94]">
            Yönetim Paneli
          </p>
        ) : null}
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-3">
        {adminNavGroups.map((group) => {
          const items = navItems.filter((i) => (i.group || "Ana Sayfa") === group);
          if (!items.length) return null;
          return (
            <div key={group} className="space-y-1">
              {!collapsed && (
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4A5568]">
                  {group}
                </p>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "border border-[#C8703A]/20 bg-[#C8703A]/10 text-[#C8703A]"
                        : "text-[#6B7A94] hover:bg-white/[0.04] hover:text-[#EEE9E0]",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className={cn("space-y-1 border-t border-white/[0.06] p-3", collapsed && "px-2")}>
        <div className={cn("flex items-center gap-3 rounded-xl px-3 py-2", collapsed && "justify-center px-0")}>
          <Avatar name={displayName} size="sm" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#EEE9E0]">{displayName}</p>
              <p className="text-xs text-[#6B7A94]">{roleLabel}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={async () => {
            await api.logout();
            window.location.href = "/admin/login";
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6B7A94] transition hover:bg-red-500/5 hover:text-red-400",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-[18px] w-[18px]" />
          {!collapsed && <span>Çıkış</span>}
        </button>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.06] bg-[#1A1A1A] text-[#6B7A94] transition hover:text-[#EEE9E0]"
        aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
      >
        <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform", collapsed && "rotate-180")} />
      </button>
    </aside>
  );
}
