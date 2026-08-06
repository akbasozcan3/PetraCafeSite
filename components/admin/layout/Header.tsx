"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/lib/admin/navigation";
import Button from "@/components/admin/ui/Button";
import UserMenu from "@/components/admin/layout/UserMenu";
import NavDropdown from "@/components/admin/layout/NavDropdown";

interface HeaderProps {
  onMobileMenuOpen: () => void;
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
  const pathname = usePathname();
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
            href="/index.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[#8A9BB0] transition hover:border-[#C8703A]/30 hover:text-[#EEE9E0] sm:inline-flex"
          >
            Siteyi Aç
          </a>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
