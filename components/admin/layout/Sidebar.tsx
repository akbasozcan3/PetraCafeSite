"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { filterNavByPermission } from "@/lib/admin/navigation";
import { ROLE_LABELS } from "@/lib/admin/roles";
import { api } from "@/lib/api/client";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Avatar from "@/components/admin/ui/Avatar";

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
    "Yönetim";
  const brandInitials = brandName
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "YP";

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 z-30 h-screen border-r border-white/[0.06] bg-[#0A0F18] transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className={cn("border-b border-white/[0.06] p-5", collapsed && "px-3")}>
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8703A] font-bold text-[#0A0F18]">
            {brandInitials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#EEE9E0]">{brandName}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#6B7A94]">Yönetim Paneli</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-3">
        {(["Genel", "İçerik", "Sistem"] as const).map((group) => {
          const items = navItems.filter((i) => (i.group || "İçerik") === group);
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
