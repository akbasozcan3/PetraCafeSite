"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import Avatar from "@/components/admin/ui/Avatar";
import { api } from "@/lib/api/client";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { ROLE_LABELS } from "@/lib/admin/roles";

export default function UserMenu() {
  const { user } = useAdminSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const displayName = user?.name ?? "Admin";
  const email = user?.email ?? "";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 text-sm transition hover:bg-white/[0.08]",
          open && "border-[#C8703A]/30 bg-[#C8703A]/10"
        )}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Avatar name={displayName} size="sm" />
        <span className="hidden max-w-[140px] truncate font-medium text-[#EEE9E0] md:inline">
          {displayName}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-[#8A9BB0] transition", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[240px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141E2E] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="border-b border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar name={displayName} size="md" />
              <div className="min-w-0">
                <p className="truncate font-medium text-[#EEE9E0]">{displayName}</p>
                <p className="truncate text-xs text-[#8A9BB0]">{email}</p>
                {user?.role && (
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#C8703A]">
                    {ROLE_LABELS[user.role]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-2">
            <Link
              href="/admin/settings"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#EEE9E0] transition hover:bg-white/[0.06]"
            >
              <Settings className="h-4 w-4 text-[#8A9BB0]" />
              Hesap Ayarları
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => window.open("/", "_blank")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#EEE9E0] transition hover:bg-white/[0.06]"
            >
              <ExternalLink className="h-4 w-4 text-[#8A9BB0]" />
              Siteyi Aç
            </button>
          </div>

          <div className="border-t border-white/[0.06] p-2">
            <button
              type="button"
              role="menuitem"
              onClick={async () => {
                await api.logout();
                window.location.href = "/admin/login";
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
