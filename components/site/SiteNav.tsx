"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import type { NavLink, NavbarContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";
import BrandLogo from "@/components/site/BrandLogo";

const DEFAULT_LINKS: NavLink[] = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Menü", href: "/menu" },
  { label: "Havuz & Plaj", href: "#pasta" },
  { label: "Galeri", href: "#galeri" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "S.S.S.", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
];

function unlockScroll() {
  const root = document.documentElement;
  const body = document.body;
  root.classList.remove("menu-open");
  root.style.removeProperty("overflow");
  body.style.removeProperty("overflow");
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.2 3.6h3.1l1.2 3.1-1.9 1.2a12.4 12.4 0 0 0 5.5 5.5l1.2-1.9 3.1 1.2v3.1c0 .7-.5 1.3-1.2 1.4C10.8 18.7 5.3 13.2 3.8 4.8c-.1-.7.5-1.2 1.4-1.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteNav({
  navbar,
  logoUrl,
  homeHref = "/",
  hours,
  phone,
  phoneHref,
}: {
  navbar: NavbarContent;
  logoUrl?: string;
  homeHref?: string;
  hours?: string;
  phone?: string;
  phoneHref?: string;
}) {
  const pathname = usePathname() || "";
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!isHome);

  const bookHref = resolveHref(
    navbar.ctaHref && !/^tel:/i.test(navbar.ctaHref) && !/wa\.me/i.test(navbar.ctaHref)
      ? navbar.ctaHref
      : "#rezervasyon"
  );
  const bookLabel =
    navbar.ctaLabel && !/^\+?\d[\d\s]{8,}$/.test(navbar.ctaLabel.trim())
      ? navbar.ctaLabel
      : "Rezervasyon";

  const links = (navbar.links?.length ? navbar.links : DEFAULT_LINKS).filter((l) => {
    if (/hesab|sepet|profil|giriş|uye|üye|favori|ara|search|kayit|kayıt/i.test(l.label || "")) {
      return false;
    }
    if (/^(rezervasyon|randevu)$/i.test((l.label || "").trim())) return false;
    const href = resolveHref(l.href);
    if (href === bookHref || href === "/#rezervasyon" || href === "#rezervasyon") return false;
    return true;
  });

  const logoSize = Math.max(32, Math.min(120, Number(navbar.logoSize) || 64));
  const hideText = navbar.logoTextGizle !== false;
  const showPhone = navbar.showPhone !== false && Boolean(phone || phoneHref);

  const navHref = (raw: string, label?: string) => {
    let href = resolveHref(raw);
    if (
      /^menü$/i.test((label || "").trim()) ||
      href === "/#menu" ||
      href === "#menu" ||
      /\/#menu$/i.test(href)
    ) {
      return "/menu";
    }
    return href;
  };

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    let ticking = false;
    const pastHero = () => {
      if (window.scrollY < 80) return false;
      const gate = document.querySelector(".gate");
      if (!gate) return false;
      const rect = gate.getBoundingClientRect();
      if (rect.height < 80) return false;
      return rect.bottom <= 72;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        setSolid(pastHero());
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (open) {
      root.classList.add("menu-open");
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      unlockScroll();
    }
    return unlockScroll;
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const closeOnDesktop = () => {
      if (!mq.matches) setOpen(false);
    };
    closeOnDesktop();
    mq.addEventListener("change", closeOnDesktop);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      mq.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-h",
      `${Math.max(72, logoSize + 20)}px`
    );
  }, [logoSize]);

  useEffect(() => {
    const onPageShow = () => unlockScroll();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <>
      <header
        className={`nav site-nav${solid ? " is-solid" : " is-hero"}${open ? " is-menu" : ""}`}
        id="nav"
      >
        <Link
          className="nav__logo has-logo"
          href={homeHref}
          aria-label="Ana sayfa"
          onClick={() => setOpen(false)}
        >
          <BrandLogo
            className="nav__logo-img"
            src={logoUrl}
            alt={`${navbar.logoText || "PETRA"} logosu`}
            height={logoSize}
            style={
              {
                ["--nav-logo-size"]: `${logoSize}px`,
              } as CSSProperties
            }
          />
          <span className="nav__logo-text" hidden={hideText}>
            {navbar.logoText || "PETRA"}
          </span>
        </Link>

        <nav className="nav__links" aria-label="Ana menü">
          {links.map((link) => {
            const href = navHref(link.href, link.label);
            const active =
              href === "/menu" || href.startsWith("/menu/") || href === "/#menu"
                ? pathname.startsWith("/menu")
                : href === "/blog" || href.startsWith("/blog/")
                  ? pathname.startsWith("/blog")
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

        <button
          className={`nav__burger${open ? " is-open" : ""}`}
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

        <div className="nav__actions">
          {showPhone && phoneHref ? (
            <a className="nav__phone" href={`tel:${phoneHref.replace(/^tel:/i, "")}`}>
              <PhoneIcon />
              <span>{phone || phoneHref}</span>
            </a>
          ) : null}
          <a
            href={bookHref}
            className="btn btn--sm btn--light nav__cta"
            hidden={open}
            onClick={() => setOpen(false)}
          >
            {bookLabel}
          </a>
        </div>
      </header>

      <div
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobileMenu"
        hidden={!open}
        aria-hidden={!open}
      >
        <div className="mobile-menu__panel">
          <p className="mobile-menu__label">{navbar.mobileLabel || "Menü"}</p>
          <nav className="mobile-menu__links" aria-label="Mobil menü">
            {links.map((link, i) => (
              <a
                key={`m-${link.label}-${link.href}`}
                href={navHref(link.href, link.label)}
                data-i={String(i + 1).padStart(2, "0")}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu__foot">
            <a
              href={bookHref}
              className="btn btn--lg mobile-menu__cta"
              onClick={() => setOpen(false)}
            >
              {bookLabel}
            </a>
            {showPhone && phoneHref ? (
              <a className="mobile-menu__phone" href={`tel:${phoneHref.replace(/^tel:/i, "")}`}>
                {phone}
              </a>
            ) : null}
            {hours ? <p className="mobile-menu__hours">{hours}</p> : null}
          </div>
        </div>
      </div>
    </>
  );
}
