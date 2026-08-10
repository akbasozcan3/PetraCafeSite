"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import type { NavLink, NavbarContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";

const DEFAULT_LINKS: NavLink[] = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Özel Pastalar", href: "#pasta" },
  { label: "Galeri", href: "#galeri" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "S.S.S.", href: "#sss" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "#iletisim" },
];

export default function SiteNav({
  navbar,
  logoUrl,
  homeHref = "/",
}: {
  navbar: NavbarContent;
  logoUrl?: string;
  homeHref?: string;
}) {
  const pathname = usePathname() || "";
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!isHome);

  const links = (navbar.links?.length ? navbar.links : DEFAULT_LINKS).filter(
    (l) =>
      !/hesab|sepet|profil|giriş|uye|üye|favori|ara|search|kayit|kayıt/i.test(
        l.label || ""
      )
  );

  const logoSize = Math.max(32, Math.min(120, Number(navbar.logoSize) || 64));
  const hideText = navbar.logoTextGizle !== false && Boolean(logoUrl);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => {
      setSolid(window.scrollY > Math.min(120, window.innerHeight * 0.12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-h",
      `${Math.max(72, logoSize + 20)}px`
    );
  }, [logoSize]);

  return (
    <>
      <header
        className={`nav site-nav${solid ? " is-solid" : " is-hero"}`}
        id="nav"
      >
        <Link
          className={`nav__logo${logoUrl ? " has-logo" : ""}`}
          href={homeHref}
          aria-label="Taşdelen Fırıncı ana sayfa"
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="nav__logo-img"
              src={logoUrl}
              alt="Taşdelen Fırıncı logosu"
              style={
                {
                  ["--nav-logo-size"]: `${logoSize}px`,
                  height: logoSize,
                  width: "auto",
                } as CSSProperties
              }
              decoding="async"
            />
          ) : null}
          <span className="nav__logo-text" hidden={hideText}>
            {navbar.logoText || "FIRINCI"}
          </span>
        </Link>

        <nav className="nav__links" aria-label="Ana menü">
          {links.map((link) => {
            const href = resolveHref(link.href);
            const active =
              href === "/urunler" || href.startsWith("/urunler/")
                ? pathname.startsWith("/urunler")
                : false;
            return (
              <a
                key={`${link.label}-${link.href}`}
                href={href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="nav__actions">
          <a
            href={resolveHref(navbar.ctaHref || "tel:+905523400202")}
            className="btn btn--sm nav__cta"
          >
            {navbar.ctaLabel || "0552 340 02 02"}
          </a>
        </div>

        <button
          className="nav__burger"
          type="button"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className="mobile-menu" id="mobileMenu" hidden={!open}>
        <div className="mobile-menu__panel">
          <p className="mobile-menu__label">{navbar.mobileLabel || "Menü"}</p>
          <nav className="mobile-menu__links" aria-label="Mobil menü">
            {links.map((link) => (
              <a
                key={`m-${link.label}-${link.href}`}
                href={resolveHref(link.href)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/urunler" onClick={() => setOpen(false)}>
              Ürünler
            </Link>
          </nav>
          <a
            href={resolveHref(navbar.ctaHref || "tel:+905523400202")}
            className="btn btn--lg mobile-menu__cta"
          >
            {navbar.ctaLabel || "0552 340 02 02"}
          </a>
        </div>
      </div>
    </>
  );
}
