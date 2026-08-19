"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { adminNavGroups, adminNavItems, filterNavByPermission } from "@/lib/admin/navigation";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import BrandLogo from "@/components/site/BrandLogo";

export default function NavDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active =
    adminNavItems.find(
      (item) => pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
    ) ?? adminNavItems[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative lg:hidden" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm font-medium text-[#EEE9E0] transition hover:bg-white/[0.08]",
          open && "border-[#C8703A]/30"
        )}
        aria-expanded={open}
      >
        <Menu className="h-4 w-4 text-[#C8703A]" />
        <span>{active.label}</span>
        <ChevronDown className={cn("h-4 w-4 text-[#8A9BB0] transition", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[260px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141E2E] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 transition hover:bg-white/[0.04]",
                  isActive && "bg-[#C8703A]/10"
                )}
              >
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", isActive ? "text-[#C8703A]" : "text-[#8A9BB0]")} />
                <div>
                  <p className={cn("text-sm font-medium", isActive ? "text-[#C8703A]" : "text-[#EEE9E0]")}>
                    {item.label}
                  </p>
                  <p className="text-xs text-[#6B7A94]">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { can } = useAdminSession();
  const { content } = useAdminContent();
  const navItems = filterNavByPermission(can);
  const brandName =
    content?.brand?.displayName ||
    content?.seo?.siteName ||
    content?.footer?.markaAdi ||
    "Yönetim";

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} aria-hidden />
      <aside className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-white/[0.06] bg-[#0D1117] lg:hidden">
        <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
          <Link href="/admin" onClick={onClose} className="min-w-0">
            <BrandLogo src={content?.images?.logo} alt={brandName} height={32} className="max-w-[160px]" />
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#6B7A94]">Yönetim Paneli</p>
          </Link>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-[#8A9BB0] hover:bg-white/[0.06]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-4 overflow-y-auto p-3">
          {adminNavGroups.map((group) => {
            const items = navItems.filter((i) => (i.group || "Ana Sayfa") === group);
            if (!items.length) return null;
            return (
              <div key={group} className="space-y-1">
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4A5568]">
                  {group}
                </p>
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        isActive
                          ? "border border-[#C8703A]/20 bg-[#C8703A]/10 text-[#C8703A]"
                          : "text-[#8A9BB0] hover:bg-white/[0.04] hover:text-[#EEE9E0]"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
