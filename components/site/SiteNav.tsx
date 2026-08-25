"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import type { NavLink, NavbarContent } from "@/lib/content/types";
import { resolveHref } from "@/lib/site/resolveHref";
import BrandLogo from "@/components/site/BrandLogo";

const DEFAULT_LINKS: NavLink[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Menü", href: "/menu" },
  { label: "Havuz & Plaj", href: "/havuz-plaj" },
  { label: "Spor Salonu", href: "/spor-salonu" },
  { label: "Galeri", href: "#galeri" },
  { label: "Blog", href: "/blog" },
  { label: "Yorumlar", href: "#yorumlar" },
  { label: "S.S.S.", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
];

let menuScrollY = 0;

function lockScroll() {
  menuScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const root = document.documentElement;
  const body = document.body;
  root.classList.add("menu-open");
  body.style.position = "fixed";
  body.style.top = `-${menuScrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
}

function unlockScroll() {
  const root = document.documentElement;
  const body = document.body;
  if (body.style.position !== "fixed" && !root.classList.contains("menu-open")) {
    return;
  }
  const y =
    Math.abs(Number.parseInt(body.style.top || "0", 10)) || menuScrollY || 0;
  root.classList.remove("menu-open");
  body.style.removeProperty("position");
  body.style.removeProperty("top");
  body.style.removeProperty("left");
  body.style.removeProperty("right");
  body.style.removeProperty("width");
  root.style.removeProperty("overflow");
  body.style.removeProperty("overflow");
  window.scrollTo(0, y);
}

function isPastHomeHero() {
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  const gate = document.querySelector(".site-home .gate") as HTMLElement | null;
  if (gate) {
    const r = gate.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    const ratio = Math.max(0, visible) / vh;
    if (y < 24 && ratio > 0.55) return false;
    return ratio < 0.18 || r.bottom <= 8;
  }
  return y >= Math.round(window.innerHeight * 0.88);
}

function syncHomeNavReveal(revealed: boolean) {
  document.querySelector(".site-home")?.classList.toggle("nav-revealed", revealed);
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
  const isHome = pathname === "/" || pathname === "";
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

  const rawLinks = (navbar.links?.length ? navbar.links : DEFAULT_LINKS).filter((l) => {
    if (/hesab|sepet|profil|giriş|uye|üye|favori|ara|search|kayit|kayıt/i.test(l.label || "")) {
      return false;
    }
    if (/^(rezervasyon|randevu)$/i.test((l.label || "").trim())) return false;
    const href = resolveHref(l.href);
    if (href === bookHref || href === "/#rezervasyon" || href === "#rezervasyon") return false;
    return true;
  });

  const hasGymLink = rawLinks.some(
    (l) => /spor/i.test(l.label || "") || /spor-salonu/i.test(l.href || "")
  );
  if (!hasGymLink) {
    const poolIndex = rawLinks.findIndex((l) => /havuz|plaj/i.test(l.label || ""));
    if (poolIndex !== -1) {
      rawLinks.splice(poolIndex + 1, 0, { label: "Spor Salonu", href: "/spor-salonu" });
    } else {
      rawLinks.push({ label: "Spor Salonu", href: "/spor-salonu" });
    }
  }
  const links = rawLinks;

  const logoSize = Math.max(32, Math.min(140, Number(navbar?.logoSize) || 64));
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
    if (
      /^spor\s*salonu$/i.test((label || "").trim()) ||
      href === "/#spor-salonu" ||
      href === "#spor-salonu" ||
      /\/#spor-salonu$/i.test(href)
    ) {
      return "/spor-salonu";
    }
    if (
      /^havuz\s*&\s*plaj$/i.test((label || "").trim()) ||
      href === "/#havuz-plaj" ||
      href === "#havuz-plaj" ||
      href === "#pasta" ||
      href === "/#pasta" ||
      /\/#havuz-plaj$/i.test(href)
    ) {
      return "/havuz-plaj";
    }
    if (isHome) {
      if (href.startsWith("/#")) return href.slice(1);
      return href;
    }
    if (href.startsWith("#")) {
      return `/${href}`;
    }
    return href;
  };

  const isPastHomeHero = () => {
    if (typeof window === "undefined") return false;
    const hero =
      document.getElementById("top") ||
      document.querySelector(".gate") ||
      document.getElementById("hero");
    if (hero) {
      const rect = hero.getBoundingClientRect();
      return rect.bottom <= 80;
    }
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    return y > 150;
  };

  const syncHomeNavReveal = (active: boolean) => {
    if (typeof document === "undefined") return;
    document.querySelector(".site-home")?.classList.toggle("nav-revealed", active);
    const navEl = document.querySelector("header.nav.site-nav");
    if (!navEl) return;
    if (active) {
      navEl.classList.add("is-solid", "nav--revealed");
      navEl.classList.remove("is-hero", "nav--hidden");
    } else {
      navEl.classList.remove("is-solid", "nav--revealed");
      navEl.classList.add("is-hero");
    }
  };

  const jumpTo = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    if (typeof window === "undefined") return;
    const hash = targetHref.includes("#") ? targetHref.split("#")[1] : "";
    const isExternalOrOtherPage =
      targetHref.startsWith("http") ||
      (targetHref.startsWith("/") && !targetHref.startsWith("/#") && !hash);
    if (isExternalOrOtherPage) {
      setOpen(false);
      return;
    }
    if (!isHome && targetHref.startsWith("/#")) {
      setOpen(false);
      return;
    }
    if (!hash) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${hash}`);
    }
  };

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => {
      const past = isPastHomeHero();
      setSolid(past);
      syncHomeNavReveal(past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, pathname]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => {
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    const onPageShow = () => {
      setOpen(false);
      document.documentElement.classList.remove("menu-open");
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <>
      <style>{`
        header.nav.site-nav {
          position: fixed !important;
          inset: 0 0 auto !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 99999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-left: clamp(16px, 3vw, 32px) !important;
          padding-right: clamp(16px, 3vw, 32px) !important;
          box-sizing: border-box !important;
          width: 100% !important;
          height: 72px !important;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        /* Ana sayfada hero alanında navbar gizli */
        .site-home header.nav.site-nav.is-hero:not(.is-menu),
        .site-home:not(.nav-revealed) header.nav.site-nav:not(.is-solid):not(.is-menu) {
          transform: translateY(-110%) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        /* Hero geçilince veya iç sayfalarda tepeye iner ve solid görünür */
        header.nav.site-nav.is-solid,
        .site-home.nav-revealed header.nav.site-nav,
        .site-home header.nav.site-nav.is-solid,
        .site-shop header.nav.site-nav,
        .page header.nav.site-nav {
          transform: translateY(0) !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          background: #FBF8F1 !important;
          background-color: #FBF8F1 !important;
          backdrop-filter: blur(14px) saturate(1.3) !important;
          -webkit-backdrop-filter: blur(14px) saturate(1.3) !important;
          box-shadow: 0 1px 0 rgba(13, 15, 10, 0.12) !important;
          color: #0D0F0A !important;
        }
        header.nav.site-nav .nav__logo {
          margin-right: 0 !important;
          flex-shrink: 0 !important;
          z-index: 10 !important;
          display: flex !important;
          align-items: center !important;
          max-height: 56px !important;
        }
        header.nav.site-nav .nav__logo-img {
          height: clamp(34px, var(--nav-logo-size, 48px), 52px) !important;
          max-height: 52px !important;
          width: auto !important;
          object-fit: contain !important;
          display: block !important;
        }
        header.nav.site-nav .nav__actions {
          margin-left: auto !important;
          flex-shrink: 0 !important;
          z-index: 10 !important;
          display: flex !important;
          align-items: center !important;
          gap: 14px !important;
        }
        @media (min-width: 1081px) {
          header.nav.site-nav .nav__links {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            z-index: 5 !important;
            pointer-events: auto !important;
            width: auto !important;
          }
          header.nav.site-nav .nav__links ul {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: clamp(6px, 1.1vw, 16px) !important;
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
            white-space: nowrap !important;
          }
          header.nav.site-nav .nav__links ul li {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }
          header.nav.site-nav .nav__links ul li a {
            padding: 6px clamp(6px, 0.8vw, 12px) !important;
            font-size: clamp(13px, 0.95vw, 14.5px) !important;
          }
        }
        header.nav.site-nav .nav__links a,
        .site-home header.nav.site-nav .nav__links a,
        .site-shop header.nav.site-nav .nav__links a,
        .page header.nav.site-nav .nav__links a {
          color: #0D0F0A !important;
        }
        header.nav.site-nav .nav__logo-text,
        .site-home header.nav.site-nav .nav__logo-text,
        .site-shop header.nav.site-nav .nav__logo-text,
        .page header.nav.site-nav .nav__logo-text {
          color: #0D0F0A !important;
        }
        header.nav.is-solid.is-menu,
        .site-nav.is-menu {
          background: #0D0F0A !important;
          background-color: #0D0F0A !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: 1px solid rgba(212, 175, 55, 0.35) !important;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.8) !important;
        }
        header.nav.is-menu .nav__logo-text {
          color: #FFFFFF !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8) !important;
        }
        header.nav.is-menu .nav__logo-img,
        header.nav .nav__logo-img {
          filter: none !important;
          box-shadow: none !important;
        }
        @media (max-width: 1080px) {
          header.nav.site-nav {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
            padding-left: max(18px, env(safe-area-inset-left)) !important;
            padding-right: max(18px, env(safe-area-inset-right)) !important;
          }
          header.nav.site-nav.is-menu {
            background: #0D0F0A !important;
            background-color: #0D0F0A !important;
          }
          header.nav.site-nav .nav__logo {
            order: 1 !important;
            margin-right: auto !important;
            margin-left: 0 !important;
            flex-shrink: 0 !important;
            z-index: 100001 !important;
          }
          header.nav.site-nav .nav__links,
          header.nav.site-nav .nav__actions {
            display: none !important;
          }
          header.nav.site-nav .nav__burger {
            order: 2 !important;
            margin-left: auto !important;
            margin-right: 0 !important;
            display: inline-flex !important;
            width: 44px !important;
            height: 44px !important;
            background: transparent !important;
            background-color: transparent !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            color: #D9A441 !important;
            flex-shrink: 0 !important;
            z-index: 100001 !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 !important;
          }
          header.nav.site-nav .nav__burger:hover {
            background: transparent !important;
            border: 0 !important;
            box-shadow: none !important;
          }
          header.nav.site-nav .nav__burger span {
            background: #D9A441 !important;
            box-shadow: none !important;
          }
        }

        /* Mobil Menü Perdesi (Kusursuz Tek Ekran Yerleşimi - Sıfır Kaydırma) */
        .mobile-menu {
          position: fixed !important;
          inset: 0 !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100dvh !important;
          max-height: 100dvh !important;
          z-index: 999999999 !important;
          background: var(--paper, #FBF8F1) !important;
          background-color: var(--paper, #FBF8F1) !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
        }
        .mobile-menu:not(.is-open),
        .mobile-menu[hidden] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        .mobile-menu__inner {
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          height: 100% !important;
          max-height: 100dvh !important;
          width: 100% !important;
          max-width: 540px !important;
          margin: 0 auto !important;
          box-sizing: border-box !important;
          background: var(--paper, #FBF8F1) !important;
          overflow: hidden !important;
        }
        @keyframes menuSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes itemFadeUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-menu.is-open {
          animation: menuSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
        }
        .mobile-menu.is-open .mobile-menu__links li {
          animation: itemFadeUp 0.38s cubic-bezier(0.16, 1, 0.3, 1) backwards !important;
        }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(1) { animation-delay: 0.03s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(2) { animation-delay: 0.06s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(3) { animation-delay: 0.09s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(4) { animation-delay: 0.12s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(5) { animation-delay: 0.15s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(6) { animation-delay: 0.18s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(7) { animation-delay: 0.21s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(8) { animation-delay: 0.24s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(9) { animation-delay: 0.27s !important; }
        .mobile-menu.is-open .mobile-menu__links li:nth-child(10) { animation-delay: 0.30s !important; }
        .mobile-menu.is-open .mobile-menu__foot {
          animation: itemFadeUp 0.42s 0.22s cubic-bezier(0.16, 1, 0.3, 1) backwards !important;
        }
        .mobile-menu__header {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
          padding-top: max(12px, env(safe-area-inset-top)) !important;
          padding-bottom: 12px !important;
          padding-left: max(18px, env(safe-area-inset-left)) !important;
          padding-right: max(18px, env(safe-area-inset-right)) !important;
          border-bottom: 1px solid rgba(184, 132, 44, 0.18) !important;
          background: var(--paper, #FBF8F1) !important;
          flex-shrink: 0 !important;
          z-index: 10 !important;
        }
        .mobile-menu__close-btn {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 40px !important;
          height: 40px !important;
          background: rgba(184, 132, 44, 0.1) !important;
          border: 1.5px solid rgba(184, 132, 44, 0.35) !important;
          border-radius: 50% !important;
          color: #B8842C !important;
          cursor: pointer !important;
          padding: 0 !important;
          transition: all 0.2s ease !important;
        }
        .mobile-menu__close-btn:hover,
        .mobile-menu__close-btn:active {
          background: rgba(184, 132, 44, 0.25) !important;
          border-color: #B8842C !important;
          transform: scale(1.06) !important;
        }
        .mobile-menu__body {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          padding-top: 4px !important;
          padding-bottom: 4px !important;
          padding-left: max(18px, env(safe-area-inset-left)) !important;
          padding-right: max(18px, env(safe-area-inset-right)) !important;
          scrollbar-width: none !important;
        }
        .mobile-menu__body::-webkit-scrollbar {
          display: none !important;
        }
        .mobile-menu__body nav {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        .mobile-menu__links {
          list-style: none !important;
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-evenly !important;
          flex: 1 1 auto !important;
          min-height: 0 !important;
          width: 100% !important;
        }
        .mobile-menu__links li {
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          flex: 1 1 auto !important;
          display: flex !important;
          align-items: center !important;
          min-height: 0 !important;
        }
        .mobile-menu__links a {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          width: 100% !important;
          height: 100% !important;
          min-height: 0 !important;
          padding: clamp(4px, 0.9vh, 8px) 4px !important;
          border-bottom: 1px solid rgba(184, 132, 44, 0.12) !important;
          text-decoration: none !important;
          color: #0D0F0A !important;
          background: transparent !important;
          transition: color 0.2s ease, padding 0.2s ease !important;
          border-radius: 0 !important;
        }
        .mobile-menu__links a::before {
          content: none !important;
          display: none !important;
        }
        .mobile-menu__links a:hover,
        .mobile-menu__links a:active {
          background: transparent !important;
          color: #B8842C !important;
        }
        .mobile-menu__num {
          font-family: "Inter", system-ui, sans-serif !important;
          font-size: clamp(0.65rem, 1.2vh, 0.72rem) !important;
          font-weight: 800 !important;
          letter-spacing: 0.14em !important;
          color: #B8842C !important;
          width: 28px !important;
          flex-shrink: 0 !important;
        }
        .mobile-menu__title {
          font-family: "Playfair Display", Georgia, serif !important;
          font-size: clamp(1.02rem, 2.1vh, 1.22rem) !important;
          font-weight: 600 !important;
          letter-spacing: 0.01em !important;
          color: #0D0F0A !important;
          flex: 1 1 auto !important;
          text-align: left !important;
          line-height: 1.2 !important;
        }
        .mobile-menu__arrow {
          color: rgba(184, 132, 44, 0.45) !important;
          flex-shrink: 0 !important;
          transition: transform 0.2s ease, color 0.2s ease !important;
        }
        .mobile-menu__links a:hover .mobile-menu__arrow,
        .mobile-menu__links a:active .mobile-menu__arrow {
          color: #B8842C !important;
          transform: translateX(3px) !important;
        }
        .mobile-menu__foot {
          flex-shrink: 0 !important;
          padding-top: 8px !important;
          padding-bottom: max(12px, env(safe-area-inset-bottom)) !important;
          padding-left: max(18px, env(safe-area-inset-left)) !important;
          padding-right: max(18px, env(safe-area-inset-right)) !important;
          border-top: 1px solid rgba(184, 132, 44, 0.18) !important;
          background: var(--paper, #FBF8F1) !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 6px !important;
        }
        .mobile-menu__cta,
        .mobile-menu a.mobile-menu__cta {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          min-height: clamp(40px, 5.2vh, 46px) !important;
          background: #D9A441 !important;
          color: #0D0F0A !important;
          font-weight: 700 !important;
          font-size: clamp(0.85rem, 1.8vh, 0.92rem) !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          border-radius: 999px !important;
          text-decoration: none !important;
          box-shadow: 0 4px 16px rgba(217, 164, 65, 0.3) !important;
          transition: background 0.2s ease, transform 0.2s ease !important;
        }
        .mobile-menu__cta:hover,
        .mobile-menu__cta:active {
          background: #B8842C !important;
          color: #FFFFFF !important;
          transform: translateY(-1px) !important;
        }
        .mobile-menu__phone,
        .mobile-menu a.mobile-menu__phone {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          text-decoration: none !important;
          font-family: "Playfair Display", Georgia, serif !important;
          font-size: clamp(0.95rem, 1.9vh, 1.05rem) !important;
          font-weight: 700 !important;
          color: #0D0F0A !important;
          padding: 2px 0 !important;
          letter-spacing: 0.03em !important;
          transition: color 0.2s ease !important;
        }
        .mobile-menu__phone svg {
          color: #B8842C !important;
        }
        .mobile-menu__phone:hover,
        .mobile-menu__phone:active {
          color: #B8842C !important;
        }
        .mobile-menu__hours {
          margin: 0 !important;
          text-align: center !important;
          font-size: clamp(0.62rem, 1.2vh, 0.68rem) !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          color: #6E6A5C !important;
          font-family: "Inter", system-ui, sans-serif !important;
          line-height: 1.3 !important;
        }

        /* Koyu Mod Desteği */
        html[data-theme="dark"] .mobile-menu,
        html[data-theme="dark"] .mobile-menu__inner,
        html[data-theme="dark"] .mobile-menu__header,
        html[data-theme="dark"] .mobile-menu__foot,
        .theme-dark .mobile-menu,
        .theme-dark .mobile-menu__inner,
        .theme-dark .mobile-menu__header,
        .theme-dark .mobile-menu__foot {
          background: #0D0F0A !important;
        }
        html[data-theme="dark"] .mobile-menu__links a,
        html[data-theme="dark"] .mobile-menu__title,
        html[data-theme="dark"] .mobile-menu__phone,
        .theme-dark .mobile-menu__links a,
        .theme-dark .mobile-menu__title,
        .theme-dark .mobile-menu__phone {
          color: #F4EEE1 !important;
        }
        html[data-theme="dark"] .mobile-menu__hours,
        .theme-dark .mobile-menu__hours {
          color: rgba(244, 238, 225, 0.45) !important;
        }
        @media (min-width: 861px) {
          .mobile-menu {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        }
      `}</style>

      <header
        className={`nav site-nav ${solid ? "is-solid" : "is-hero"}${open ? " is-menu" : ""}`}
        id="nav"
        hidden={open}
        style={open ? { display: "none" } : undefined}
      >
        <Link
          className="nav__logo has-logo"
          href={homeHref}
          aria-label="Ana sayfa"
          onClick={(e) => {
            setOpen(false);
            if (pathname === "/" || pathname === "") {
              e.preventDefault();
              window.history.replaceState(null, "", "/");
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              syncHomeNavReveal(false);
              setSolid(false);
            }
          }}
        >
          <BrandLogo
            className="nav__logo-img"
            src={logoUrl}
            alt={`${navbar.logoText || "PETRA"} logosu`}
            height={Math.min(52, Math.max(34, logoSize))}
            style={
              {
                ["--nav-logo-size"]: `${Math.min(52, Math.max(34, logoSize))}px`,
                maxHeight: "52px",
                width: "auto",
                objectFit: "contain",
              } as CSSProperties
            }
          />
          <span className="nav__logo-text" hidden={hideText}>
            {navbar.logoText || "PETRA"}
          </span>
        </Link>

        <nav className="nav__links" aria-label="Ana menü">
          <ul>
            {links.map((link) => {
              const href = navHref(link.href, link.label);
              const active =
                href === "/menu" || href.startsWith("/menu/") || href === "/#menu"
                  ? pathname.startsWith("/menu")
                  : href === "/blog" || href.startsWith("/blog/")
                    ? pathname.startsWith("/blog")
                    : false;
              return (
                <li key={`${link.label}-${link.href}`}>
                  <a
                    href={href}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => jumpTo(e, href)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

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
            onClick={(e) => jumpTo(e, bookHref)}
          >
            {bookLabel}
          </a>
        </div>

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
      </header>

      {/* MOBİLDE TAM EKRAN MENÜ PERDESİ */}
      <div
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobileMenu"
        hidden={!open}
        aria-hidden={!open}
      >
        <div className="mobile-menu__inner">
          {/* Üst Bar: Kapat Butonu */}
          <div className="mobile-menu__header">
            <button
              type="button"
              className="mobile-menu__close-btn"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Menü Linkleri (Kaydırılabilir alan) */}
          <div className="mobile-menu__body">
            <nav aria-label="Mobil menü">
              <ul className="mobile-menu__links">
                {links.map((link, i) => {
                  const href = navHref(link.href, link.label);
                  return (
                    <li key={`m-${link.label}-${link.href}`}>
                      <a
                        href={href}
                        onClick={(e) => jumpTo(e, href)}
                      >
                        <span className="mobile-menu__num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="mobile-menu__title">{link.label}</span>
                        <svg className="mobile-menu__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Alt Kısım: Buton, Telefon, Saatler */}
          <div className="mobile-menu__foot">
            <a
              href={bookHref}
              className="mobile-menu__cta"
              onClick={(e) => jumpTo(e, bookHref)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "46px",
                background: "var(--brass, #D9A441)",
                color: "#0D0F0A",
                fontWeight: 700,
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: 999,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(217, 164, 65, 0.35)",
              }}
            >
              {bookLabel}
            </a>
            {showPhone && phoneHref ? (
              <a
                className="mobile-menu__phone"
                href={`tel:${phoneHref.replace(/^tel:/i, "")}`}
                style={{
                  color: "#0D0F0A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  textDecoration: "none",
                  marginTop: "8px",
                  marginBottom: "4px",
                }}
              >
                <PhoneIcon />
                <span style={{ color: "#0D0F0A", fontWeight: 700 }}>{phone || phoneHref}</span>
              </a>
            ) : null}
            {hours ? <p className="mobile-menu__hours">{hours}</p> : null}
          </div>
        </div>
      </div>
    </>
  );
}
