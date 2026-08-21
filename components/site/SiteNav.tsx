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
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(Boolean(pathname && pathname !== "/"));

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
    if (
      /^blog$/i.test((label || "").trim()) ||
      href === "/#blog" ||
      href === "#blog" ||
      /\/#blog$/i.test(href)
    ) {
      return "/blog";
    }
    if (/iletişim|iletisim/i.test((label || "").trim()) || /#iletisim$/i.test(href)) {
      return pathname === "/" ? "#iletisim-form" : "/#iletisim-form";
    }
    if (/s\.?\s?s\.?\s?s/i.test((label || "").trim()) || /#sss$/i.test(href)) {
      return pathname === "/" ? "#sss-liste" : "/#sss-liste";
    }
    if (/yorum/i.test((label || "").trim()) || /#yorumlar/i.test(href)) {
      return pathname === "/" ? "#yorumlar" : "/#yorumlar";
    }
    if (/hizmet/i.test((label || "").trim()) || /#hizmetler/i.test(href)) {
      return pathname === "/" ? "#hizmetler" : "/#hizmetler";
    }
    return href;
  };

  const jumpTo = (e: { preventDefault: () => void }, href: string) => {
    const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
    if (hash && pathname !== "/") {
      e.preventDefault();
      setOpen(false);
      window.location.assign(`/#${hash}`);
      return;
    }
    if (!hash) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    window.setTimeout(
      () => {
        const el = document.getElementById(hash);
        if (!el) return;
        const navH =
          Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
          ) || 72;
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 18;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        history.replaceState(null, "", `#${hash}`);
        window.dispatchEvent(new Event("hashchange"));
        setSolid(true);
        syncHomeNavReveal(true);
      },
      open ? 160 : 0
    );
  };

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      syncHomeNavReveal(true);
      return;
    }
    syncHomeNavReveal(false);
    let ticking = false;
    const apply = () => {
      if (document.documentElement.classList.contains("menu-open")) return;
      const next = isPastHomeHero();
      setSolid(next);
      syncHomeNavReveal(next);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        apply();
      });
    };
    apply();
    const gate = document.querySelector(".site-home .gate");
    let io: IntersectionObserver | null = null;
    if (gate) {
      io = new IntersectionObserver(() => apply(), {
        threshold: [0, 0.12, 0.2, 0.4, 0.6, 0.8, 1],
      });
      io.observe(gate);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      syncHomeNavReveal(false);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => {
      unlockScroll();
      window.requestAnimationFrame(() => {
        setSolid(isPastHomeHero());
      });
    };
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
      <style>{`
        header.nav.site-nav {
          position: fixed !important;
          inset: 0 0 auto !important;
          z-index: 60 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-left: clamp(16px, 3vw, 32px) !important;
          padding-right: clamp(16px, 3vw, 32px) !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }
        header.nav.site-nav .nav__logo {
          margin-right: 0 !important;
          flex-shrink: 0 !important;
          z-index: 5 !important;
        }
        header.nav.site-nav .nav__actions {
          margin-left: auto !important;
          flex-shrink: 0 !important;
          z-index: 5 !important;
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
        }
        @media (min-width: 900px) {
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
            z-index: 2 !important;
            pointer-events: auto !important;
            width: auto !important;
          }
          header.nav.site-nav .nav__links ul {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 4px !important;
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
            white-space: nowrap !important;
          }
          header.nav.site-nav .nav__links ul li {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
        /* ==========================================================================
           LÜKS MOBİL NAVBAR & MENÜ (GRADYAN, GOLD GLOW, SOFT DROP-SHADOW)
           ========================================================================== */
        header.nav.is-menu,
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
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.3)) !important;
        }
        @media (max-width: 860px) {
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
      `}</style>

      <header
        className={`nav site-nav${solid ? " is-solid" : " is-hero"}${open ? " is-menu" : ""}`}
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
            onClick={() => setOpen(false)}
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


      {/* SABİT SAĞ ÜST CLOSE BUTONU (Menü ikonuyla TAM AYNI YERDE VE HİZADA) */}
      {open ? (
        <button
          type="button"
          aria-label="Menüyü kapat"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: "14px",
            right: "max(18px, env(safe-area-inset-right))",
            zIndex: 1000000005,
            width: "44px",
            height: "44px",
            background: "transparent",
            border: 0,
            color: "#D9A441",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D9A441" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}

      {/* MOBİLDE TAM EKRAN MENÜ PERDESİ */}
      <div
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobileMenu"
        hidden={!open}
        aria-hidden={!open}
        style={{
          position: "fixed",
          inset: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100dvh",
          zIndex: 999999999,
          background: "#0D0F0A",
          backgroundColor: "#0D0F0A",
          padding: "72px 20px 24px",
          overflowY: "auto",
          display: open ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          className="mobile-menu__panel"
          style={{
            maxWidth: "540px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <nav aria-label="Mobil menü" style={{ marginBottom: "14px" }}>
            <ul className="mobile-menu__links" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {links.map((link, i) => (
                <li key={`m-${link.label}-${link.href}`}>
                  <a
                    href={navHref(link.href, link.label)}
                    data-i={String(i + 1).padStart(2, "0")}
                    style={{ padding: "6px 0", fontSize: "1.05rem" }}
                    onClick={(e) => jumpTo(e, navHref(link.href, link.label))}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot" style={{ marginTop: "0", paddingTop: "0" }}>
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
