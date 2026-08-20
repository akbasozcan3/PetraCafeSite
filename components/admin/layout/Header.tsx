"use client";

import { Menu, CalendarDays, Inbox } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { adminNavItems } from "@/lib/admin/navigation";
import Button from "@/components/admin/ui/Button";
import UserMenu from "@/components/admin/layout/UserMenu";
import NavDropdown from "@/components/admin/layout/NavDropdown";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import BrandLogo from "@/components/site/BrandLogo";

interface HeaderProps {
  onMobileMenuOpen: () => void;
}

function HeaderBadges() {
  const [pending, setPending] = useState(0);
  const [newMsgs, setNewMsgs] = useState(0);

  const fetchCounts = useCallback(async () => {
    try {
      const [resRes, msgRes] = await Promise.all([
        fetch("/api/v1/admin/reservations", { credentials: "include", cache: "no-store" }),
        fetch("/api/v1/admin/messages", { credentials: "include", cache: "no-store" }),
      ]);
      if (resRes.ok) {
        const d = (await resRes.json()) as { items?: { status: string }[] };
        setPending((d.items || []).filter((x) => x.status === "pending").length);
      }
      if (msgRes.ok) {
        const d = (await msgRes.json()) as { items?: { status: string }[] };
        setNewMsgs((d.items || []).filter((x) => x.status === "new").length);
      }
    } catch { /* sessizce atla */ }
  }, []);

  useEffect(() => {
    void fetchCounts();
    const t = setInterval(() => void fetchCounts(), 30_000);
    return () => clearInterval(t);
  }, [fetchCounts]);

  return (
    <div className="flex items-center gap-1">
      <Link
        href="/admin/rezervasyonlar"
        title="Bekleyen rezervasyonlar"
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#8A9BB0] transition hover:bg-white/[0.06] hover:text-[#EEE9E0]"
      >
        <CalendarDays className="h-[18px] w-[18px]" />
        {pending > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8703A] text-[9px] font-bold text-white">
            {pending > 9 ? "9+" : pending}
          </span>
        )}
      </Link>
      <Link
        href="/admin/mesajlar"
        title="Yeni mesajlar"
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#8A9BB0] transition hover:bg-white/[0.06] hover:text-[#EEE9E0]"
      >
        <Inbox className="h-[18px] w-[18px]" />
        {newMsgs > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            {newMsgs > 9 ? "9+" : newMsgs}
          </span>
        )}
      </Link>
    </div>
  );
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
  const pathname = usePathname();
  const { content } = useAdminContent();
  const current = adminNavItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin" && pathname.startsWith(item.href))
  );

  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#080D15]/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuOpen}
            className="lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <BrandLogo
            src={content?.images?.logo}
            alt={content?.brand?.displayName || "Petra Cafe Restaurant"}
            height={26}
            className="lg:hidden max-w-[132px]"
          />
          {/* Tablet: hızlı sayfa seçici — mobilde sidebar hamburger yeterli */}
          <div className="hidden md:block lg:hidden">
            <NavDropdown />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#EEE9E0]">
              {current?.label ?? "Yönetim"}
            </p>
            <p className="truncate text-xs text-[#6B7A94]">
              {current?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[#8A9BB0] transition hover:border-[#C8703A]/30 hover:text-[#EEE9E0] sm:inline-flex"
          >
            Siteyi Aç
          </a>
          <HeaderBadges />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
