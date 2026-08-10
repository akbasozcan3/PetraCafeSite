(function () {
  "use strict";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function setText(sel, val) {
    var el = $(sel);
    if (el && val != null && val !== "") el.textContent = val;
  }
  function mediaUrl(path) {
    if (!path) return "";
    if (path.indexOf("http") === 0 || path.indexOf("/") === 0) return path;
    return "/" + path.replace(/^\//, "");
  }

  function brandName() {
    var c = window.__FIRINCI_CONTENT || {};
    return (
      (c.brand && c.brand.displayName) ||
      (c.seo && c.seo.siteName) ||
      (c.footer && c.footer.markaAdi) ||
      (c.navbar && c.navbar.logoText) ||
      "Fırıncı"
    );
  }

  function brandShort() {
    var c = window.__FIRINCI_CONTENT || {};
    return (c.brand && c.brand.shortName) || (c.navbar && c.navbar.logoText) || brandName();
  }

  function sitePrefix() {
    var parts = window.location.pathname.replace(/^\//, "").split("/").filter(Boolean);
    if (parts.length <= 1) return "";
    return "../".repeat(parts.length - 1);
  }

  function resolveHref(href) {
    if (!href) return "#";
    if (/^(https?:|tel:|mailto:|whatsapp:)/i.test(href)) return href;
    if (href.charAt(0) === "#") return "/" + href;
    var clean = String(href).replace(/^\.\//, "").replace(/^(\.\.\/)+/, "");
    if (/^index\.htm/i.test(clean)) {
      var hashIdx = clean.indexOf("#");
      if (hashIdx >= 0) return "/" + clean.slice(hashIdx);
      return "/";
    }
    // Always absolute for site sections — relative + sitePrefix broke category clicks
    if (/^(urunler|blog|assets|uploads)\//i.test(clean)) {
      return "/" + clean.replace(/^\//, "");
    }
    if (href.charAt(0) === "/") {
      if (/^\/index\.htm/i.test(href)) {
        var h = href.indexOf("#");
        return h >= 0 ? "/" + href.slice(h) : "/";
      }
      return href;
    }
    return "/" + clean.replace(/^\//, "");
  }

  function toCategoryHref(href, groupName) {
    var resolved = resolveHref(href || "");
    if (!resolved || resolved === "#" || /wa\.me|whatsapp/i.test(resolved)) {
      resolved = getGroupCategoryHref(groupName || "");
    }
    if (/^urunler\//i.test(resolved)) resolved = "/" + resolved.replace(/^\//, "");
    return resolved;
  }

  function ensureMobileNav() {
    var header = $("header.nav") || $(".nav");
    if (!header) return;

    var burger = $("#burger") || $(".nav__burger", header);
    if (!burger) {
      burger = document.createElement("button");
      burger.className = "nav__burger";
      burger.id = "burger";
      burger.setAttribute("aria-label", "Menüyü aç");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-controls", "mobileMenu");
      header.appendChild(burger);
    }
    if (!burger.querySelector("span")) {
      burger.innerHTML = "<span></span><span></span><span></span>";
    }

    var menu = $("#mobileMenu") || $(".mobile-menu");
    if (!menu) {
      menu = document.createElement("div");
      menu.className = "mobile-menu";
      menu.id = "mobileMenu";
      menu.hidden = true;
      if (header.nextSibling) header.parentNode.insertBefore(menu, header.nextSibling);
      else header.parentNode.appendChild(menu);
    }
    if (!menu.querySelector(".mobile-menu__links")) {
      var panel = document.createElement("div");
      panel.className = "mobile-menu__panel";
      panel.innerHTML =
        '<p class="mobile-menu__label">Menü</p>' +
        '<nav class="mobile-menu__links" aria-label="Mobil menü"></nav>' +
        '<a href="tel:" class="btn btn--lg mobile-menu__cta">Sipariş</a>';
      while (menu.firstChild) {
        var child = menu.firstChild;
        if (child.tagName === "A" && !child.classList.contains("btn")) {
          panel.querySelector(".mobile-menu__links").appendChild(child);
        } else if (child.tagName === "A") {
          var oldCta = panel.querySelector(".mobile-menu__cta");
          if (oldCta) oldCta.replaceWith(child);
          else panel.appendChild(child);
          child.className = "btn btn--lg mobile-menu__cta";
        } else {
          menu.removeChild(child);
        }
      }
      menu.appendChild(panel);
    }
    // Header hamburger zaten X — panel içi close kaldır
    menu.querySelectorAll(".mobile-menu__close").forEach(function (btn) {
      btn.remove();
    });
    menu.querySelectorAll(".mobile-menu__top").forEach(function (top) {
      var label = top.querySelector(".mobile-menu__label");
      if (label && top.parentNode) top.parentNode.insertBefore(label, top);
      top.remove();
    });

    function closeMenu() {
      menu.hidden = true;
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Menüyü aç");
      document.documentElement.classList.remove("menu-open");
      try {
        if (window.__firinciLenis && window.__firinciLenis.start) window.__firinciLenis.start();
      } catch (e) {}
    }

    function openMenu() {
      menu.hidden = false;
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Menüyü kapat");
      document.documentElement.classList.add("menu-open");
      try {
        if (window.__firinciLenis && window.__firinciLenis.stop) window.__firinciLenis.stop();
      } catch (e) {}
    }

    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      }
      if (burger.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    }

    if (!burger.dataset.navBound) {
      burger.dataset.navBound = "1";
      burger.addEventListener("click", toggleMenu, true);
      menu.addEventListener("click", function (ev) {
        if (ev.target === menu) {
          closeMenu();
          return;
        }
        var a = ev.target.closest("a");
        if (a) closeMenu();
      });
      document.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape") closeMenu();
      });
      window.addEventListener(
        "resize",
        function () {
          if (window.innerWidth > 860) closeMenu();
        },
        { passive: true }
      );
    }

    window.__firinciCloseMenu = closeMenu;
    window.__firinciOpenMenu = openMenu;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureMobileNav);
  } else {
    ensureMobileNav();
  }



  function setMeta(sel, attr, val) {
    if (!val) return;
    var el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  }

  function isHomePage() {
    // Next.js SSR homepage does not load cms-ext; static index.htm is retired.
    // Treat only legacy extensionless "/" HTML shells as home (body without .page).
    if (document.documentElement.hasAttribute("data-next-home")) return false;
    if (document.body.classList.contains("page")) return false;
    var p = (window.location.pathname || "").replace(/\/+$/, "") || "/";
    return p === "/" || /\/index\.htm$/i.test(p);
  }

  function applySeo(seo) {
    if (!seo) return;
    // Alt sayfa title/canonical'ını ana sayfa SEO ile ezme
    if (!isHomePage()) {
      if (seo.siteName) setMeta('meta[property="og:site_name"]', "content", seo.siteName);
      if (seo.themeColor) setMeta('meta[name="theme-color"]', "content", seo.themeColor);
      return;
    }
    if (seo.title) document.title = seo.title;
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('meta[property="og:title"]', "content", seo.ogTitle || seo.title);
    setMeta('meta[property="og:description"]', "content", seo.ogDescription || seo.description);
    setMeta('meta[property="og:site_name"]', "content", seo.siteName);
    setMeta('meta[property="og:url"]', "content", seo.canonicalUrl);
    setMeta('meta[name="theme-color"]', "content", seo.themeColor);
    var can = document.querySelector('link[rel="canonical"]');
    if (can && seo.canonicalUrl) can.setAttribute("href", seo.canonicalUrl);
  }

  function ensureNavLogoImg() {
    var logoLink = $(".nav__logo");
    if (!logoLink) return null;
    var navImg = $(".nav__logo-img", logoLink);
    if (navImg) return navImg;
    navImg = document.createElement("img");
    navImg.className = "nav__logo-img";
    navImg.setAttribute("data-site", "logo");
    navImg.alt = "Logo";
    navImg.width = 64;
    navImg.height = 64;
    navImg.decoding = "async";
    navImg.hidden = true;
    var svg = logoLink.querySelector("svg");
    if (svg) {
      svg.classList.add("nav__logo-fallback");
      logoLink.insertBefore(navImg, svg);
    } else {
      logoLink.insertBefore(navImg, logoLink.firstChild);
    }
    var span = logoLink.querySelector("span:not(.nav__logo-text)");
    if (span && !span.classList.contains("nav__logo-text")) span.classList.add("nav__logo-text");
    return navImg;
  }

  function applyFooter(footer, images) {
    if (!footer) return;
    var foot = $(".foot");
    if (!foot) return;
    var mark = $(".foot__mark", foot);
    if (mark && images && images.logo) {
      var url = images.logo;
      mark.src = url.indexOf("http") === 0 || url.indexOf("/") === 0 ? url : "/" + url.replace(/^\//, "");
      if (footer.markaAdi) mark.alt = footer.markaAdi + " logosu";
    }
    var brandP = foot.querySelector(".foot__grid > div:first-child p");
    if (brandP && footer.slogan) {
      brandP.innerHTML = "";
      footer.slogan.split(/\n/).forEach(function (line, i) {
        if (i) brandP.appendChild(document.createElement("br"));
        brandP.appendChild(document.createTextNode(line));
      });
    }
    var cols = foot.querySelectorAll(".foot__grid > div");
    // cols[0] = logo, then footer columns
    if (footer.kolonlar && footer.kolonlar.length && cols.length > 1) {
      footer.kolonlar.forEach(function (col, i) {
        var box = cols[i + 1];
        if (!box) return;
        box.innerHTML = "";
        var h4 = document.createElement("h4");
        h4.textContent = col.baslik || "";
        box.appendChild(h4);
        (col.links || []).forEach(function (link) {
          var a = document.createElement("a");
          a.href = resolveHref(link.href || "#");
          a.textContent = link.label || "";
          if (/^https?:/i.test(link.href || "") && /wa\.me|instagram|maps/i.test(link.href || "")) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          box.appendChild(a);
        });
      });
    }
    var bar = $(".foot__bar", foot);
    if (bar) {
      var spans = bar.querySelectorAll("span");
      if (spans[0] && footer.markaAdi) {
        var yil = document.getElementById("yil");
        var year = yil ? yil.textContent : String(new Date().getFullYear());
        spans[0].innerHTML = "© <span id=\"yil\">" + year + "</span> " + footer.markaAdi;
      }
      if (spans[1] && footer.yasalMetin) spans[1].textContent = footer.yasalMetin;
    }
  }

  function applyWaFloat(wa, iletisim) {
    var a = $(".wa-float");
    if (!a) return;
    var base = (iletisim && iletisim.whatsapp) || a.getAttribute("href") || "";
    if (!base && iletisim) {
      var dig = String(iletisim.telefonHam || iletisim.telefon || "").replace(/\D/g, "");
      if (dig.charAt(0) === "0" && dig.length === 11) dig = "90" + dig.slice(1);
      if (dig) base = "https://wa.me/" + dig;
    }
    if (!base) return;
    base = base.split("?")[0];
    if (wa && wa.onYazi) {
      a.href = base + "?text=" + encodeURIComponent(wa.onYazi);
    } else if (iletisim && iletisim.whatsapp) {
      // Query varsa koru; yoksa sipariş metni (kısa "Merhaba"ye düşürme)
      a.href =
        iletisim.whatsapp.indexOf("?") > -1
          ? iletisim.whatsapp
          : iletisim.whatsapp +
            "?text=" +
            encodeURIComponent("Merhaba, sipariş vermek istiyorum.");
    } else if (base) {
      a.href =
        base +
        "?text=" +
        encodeURIComponent("Merhaba, sipariş vermek istiyorum.");
    }
    if (wa && wa.ariaLabel) a.setAttribute("aria-label", wa.ariaLabel);
    if (wa && wa.baslik) {
      var t = $(".wa-float__title", a);
      if (t) t.textContent = wa.baslik;
    }
    if (wa && wa.alt) {
      var s = $(".wa-float__sub", a);
      if (s) {
        var dot = s.querySelector(".wa-dot");
        s.textContent = "";
        if (dot) s.appendChild(dot);
        else {
          var i = document.createElement("i");
          i.className = "wa-dot";
          s.appendChild(i);
        }
        s.appendChild(document.createTextNode(" " + wa.alt));
      }
    }
  }

  function applyYorumlarMeta(meta) {
    if (!meta) return;
    var skor = $(".reviews-score");
    if (skor && meta.googleSkor) skor.textContent = meta.googleSkor;
    var sayac = $(".reviews-count");
    if (sayac && meta.googleSayacMetin) sayac.textContent = meta.googleSayacMetin;
    var cta = $(".reviews-badge-cta");
    if (cta && meta.badgeCta) cta.textContent = meta.badgeCta;
    var badge = $("#reviewsBadge") || $(".reviews-badge");
    if (badge && meta.googleUrl) {
      badge.setAttribute("href", meta.googleUrl);
      if (badge.tagName === "A") {
        badge.setAttribute("target", "_blank");
        badge.setAttribute("rel", "noopener noreferrer");
      }
    }
  }

  function applyLegal(legal) {
    if (!legal) return;
    var box = document.getElementById("legalNote");
    if (!box) {
      var foot = $(".foot");
      if (!foot) return;
      box = document.createElement("div");
      box.id = "legalNote";
      box.className = "wrap";
      box.style.cssText = "padding:8px 0 20px;font-size:12px;color:var(--muted);line-height:1.5";
      foot.appendChild(box);
    }
    var parts = [legal.kvkk, legal.gizlilik, legal.cerez].filter(Boolean);
    box.textContent = parts.join(" · ");
  }

  function applyIletisim(c) {
    if (!c) return;
    var sec = $("#iletisim");
    if (sec) {
      if (c.baslik) setText("#iletisim .h2", c.baslik);
      if (c.giris) setText("#iletisim .lead", c.giris);
      if (c.metin) setText("#iletisim .body", c.metin);
      var rows = sec.querySelectorAll(".corp__row");
      if (rows.length >= 5) {
        var labelMap = [
          c.etiketAdres || "Adres",
          c.etiketSaatler || "Çalışma saatleri",
          c.etiketTelefon || "Telefon",
          c.etiketWhatsapp || "WhatsApp",
          c.etiketOzelPasta || "Özel pasta",
        ];
        rows.forEach(function (row, i) {
          var b = $("b", row);
          if (b && labelMap[i]) b.textContent = labelMap[i];
        });
        var adresSpan = $("span", rows[0]);
        if (adresSpan && (c.adresSatir1 || c.adres)) {
          adresSpan.textContent = "";
          var lines = [c.adresSatir1, c.adresSatir2, c.adresSatir3].filter(Boolean);
          if (!lines.length && c.adres) lines = [c.adres];
          lines.forEach(function (line, i) {
            if (i) adresSpan.appendChild(document.createElement("br"));
            adresSpan.appendChild(document.createTextNode(line));
          });
        }
        if (c.saatler) {
          var saat = $("span", rows[1]);
          if (saat) saat.textContent = c.saatler;
        }
        if (c.telefon || c.telefonHam) {
          var telRow = $("a", rows[2]) || $("span", rows[2]);
          if (telRow) {
            if (telRow.tagName === "A") {
              telRow.href = "tel:" + String(c.telefonHam || c.telefon).replace(/\s/g, "");
              telRow.textContent = c.telefon || telRow.textContent;
            } else {
              var telA = $("a", rows[2]);
              if (telA) {
                telA.href = "tel:" + String(c.telefonHam || c.telefon).replace(/\s/g, "");
                if (c.telefon) telA.textContent = c.telefon;
              }
            }
          }
        }
        if (c.whatsapp || c.telefon) {
          var waA = $("a", rows[3]);
          if (waA) {
            waA.href = (c.whatsapp || "").indexOf("?") > -1
              ? c.whatsapp
              : (c.whatsapp || ("https://wa.me/" + waPhoneDigits())) + "?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum.";
            if (c.telefon) waA.textContent = c.telefon;
          }
        }
        if (c.ozelPastaNot) {
          var pastaNot = $("span", rows[4]);
          if (pastaNot) pastaNot.textContent = c.ozelPastaNot;
        }
      }
      var mapBtn = $(".map-btn", sec);
      if (mapBtn && (c.koordinat || c.haritaSorgu)) {
        mapBtn.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(c.koordinat || c.haritaSorgu);
      }
      var contacts = sec.querySelectorAll(".contact-lines a");
      if (c.eyebrow) {
        var eye = $("#iletisim .eyebrow");
        if (eye) eye.textContent = c.eyebrow;
      }
      if (contacts.length >= 4) {
        if (c.telefonHam || c.telefon) {
          contacts[0].href = "tel:" + String(c.telefonHam || c.telefon).replace(/\s/g, "");
          var b0 = $("b", contacts[0]);
          if (b0 && c.telefon) b0.textContent = c.telefon;
          var s0 = $("span", contacts[0]);
          if (s0 && c.telefonAlt) s0.textContent = c.telefonAlt;
        }
        if (c.whatsapp) {
          contacts[1].href = c.whatsapp.indexOf("?") > -1 ? c.whatsapp : c.whatsapp + "?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum.";
        }
        var b1 = $("b", contacts[1]);
        if (b1 && c.whatsappBaslik) b1.textContent = c.whatsappBaslik;
        var s1 = $("span", contacts[1]);
        if (s1 && c.whatsappAlt) s1.textContent = c.whatsappAlt;
        if (c.instagramUrl) {
          contacts[2].href = c.instagramUrl;
          var b2 = $("b", contacts[2]);
          if (b2 && c.instagram) b2.textContent = c.instagram;
          var s2 = $("span", contacts[2]);
          if (s2 && c.instagramAlt) s2.textContent = c.instagramAlt;
        }
        if (c.eposta) {
          contacts[3].href = "mailto:" + c.eposta;
          var b3 = $("b", contacts[3]);
          if (b3) b3.textContent = c.eposta;
          var s3 = $("span", contacts[3]);
          if (s3 && c.epostaAlt) s3.textContent = c.epostaAlt;
        }
      }
      var mapBtnLabel = $(".map-btn span", sec);
      if (mapBtnLabel && c.haritaButonMetin) mapBtnLabel.textContent = c.haritaButonMetin;
    }
    var tel = c.telefonHam || c.telefon;
    if (tel) {
      $all('a[href^="tel:"]').forEach(function (a) {
        a.href = "tel:" + String(tel).replace(/\s/g, "");
        if (
          (a.classList.contains("nav__cta") ||
            a.classList.contains("mobile-menu__cta") ||
            a.closest(".foot")) &&
          c.telefon
        ) {
          a.textContent = c.telefon;
        }
      });
    }
    var dig = waPhoneDigits();
    var waHref = dig
      ? "https://wa.me/" + dig + "?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum."
      : c.whatsapp || "#";
    $all(".wa-float").forEach(function (a) {
      a.href = waHref;
    });
    $all("a[href*='wa.me']").forEach(function (a) {
      if (a.classList.contains("wa-float")) return;
      if (a.closest(".menu__list, .urun-yan, .urun-kart, .menu__group")) return;
      a.href = waHref;
    });
    // Ürün / menü WA: mesajı koru, numarayı admin telefonuna çek
    $all("a[href*='wa.me']").forEach(function (a) {
      if (!a.closest(".menu__list, .urun-yan, .urun-kart, .menu__group, .cta-box")) return;
      if (!dig) return;
      var textMatch = String(a.getAttribute("href") || "").match(/[?&]text=([^&]*)/);
      var q = textMatch ? "?text=" + textMatch[1] : "";
      a.href = "https://wa.me/" + dig + q;
    });
    if (c.instagramUrl) {
      $all('a[href*="instagram.com"]').forEach(function (a) {
        a.href = c.instagramUrl;
        if (a.closest(".foot") && c.instagram && !a.querySelector("b")) {
          if (/instagram/i.test(a.textContent || "") || /^@/.test((a.textContent || "").trim())) {
            /* keep "Instagram" label in footer */
          }
        }
      });
    }
    if (c.eposta) {
      $all('a[href^="mailto:"]').forEach(function (a) {
        a.href = "mailto:" + c.eposta;
        if (a.closest(".foot") || a.querySelector("b")) {
          var b = $("b", a);
          if (b) b.textContent = c.eposta;
          else if (/@/.test(a.textContent || "")) a.textContent = c.eposta;
        }
      });
    }
    var foot = $(".foot");
    if (foot && c.telefon) {
      $all('a[href^="tel:"]', foot).forEach(function (a) {
        a.textContent = c.telefon;
      });
    }
  }

  function applyNavbar(nav) {
    if (!nav) return;
    ensureMobileNav();
    var label = $(".mobile-menu__label");
    if (label && nav.mobileLabel) label.textContent = nav.mobileLabel;
    ensureNavLogoImg();
    var logoTextEl = $(".nav__logo-text") || $(".nav__logo span");
    if (logoTextEl && nav.logoText) logoTextEl.textContent = nav.logoText;
    var cta = $(".nav__cta");
    if (cta) {
      if (nav.ctaHref) cta.href = resolveHref(nav.ctaHref);
      if (nav.ctaLabel) cta.textContent = nav.ctaLabel;
    }
    var mobileCta = $(".mobile-menu__cta");
    if (mobileCta) {
      if (nav.ctaHref) mobileCta.href = resolveHref(nav.ctaHref);
      if (nav.ctaLabel) mobileCta.textContent = nav.ctaLabel;
    }
    var images = (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.images) || {};
    var size = Math.max(32, Math.min(120, Number(nav.logoSize) || 64));
    var hideText = nav.logoTextGizle !== false;
    var logoLink = $(".nav__logo");
    var navImg = $(".nav__logo-img");
    var fallback = $(".nav__logo-fallback") || (logoLink && logoLink.querySelector("svg"));

    if (images.logo) {
      if (window.__firinciApplySiteImages) {
        window.__firinciApplySiteImages(images);
      } else if (navImg) {
        var logoSrc = mediaUrl(images.logo);
        var isSvg = /\.svg(\?|$)/i.test(logoSrc);
        navImg.src = logoSrc;
        navImg.alt = (nav.logoText || brandName()) + " logosu";
        navImg.classList.toggle("is-svg", isSvg);
        navImg.hidden = false;
        navImg.removeAttribute("hidden");
        if (fallback) fallback.setAttribute("hidden", "");
      }
      if (navImg) {
        navImg.removeAttribute("width");
        navImg.removeAttribute("height");
        navImg.style.setProperty("--nav-logo-size", size + "px");
        navImg.style.height = size + "px";
        navImg.style.width = "auto";
      }
      if (logoLink) logoLink.classList.add("has-logo");
      if (hideText && logoTextEl) {
        logoTextEl.setAttribute("hidden", "");
        logoTextEl.style.display = "none";
      }
      document.documentElement.style.setProperty("--nav-h", Math.max(72, size + 20) + "px");
    } else {
      if (logoLink) logoLink.classList.remove("has-logo");
      if (logoTextEl) {
        logoTextEl.removeAttribute("hidden");
        logoTextEl.style.display = "";
      }
    }
    if (!nav.links || !nav.links.length) return;
    function fillNav(container, includeCta) {
      if (!container) return;
      container.innerHTML = "";
      nav.links.forEach(function (link) {
        var label = link.label || "";
        if (/hesab|sepet|profil/i.test(label)) return;
        var a = document.createElement("a");
        a.href = resolveHref(link.href || "#");
        a.textContent = label;
        container.appendChild(a);
      });
      if (includeCta) {
        [
          { href: "/hesabim", label: "Hesabım" },
          { href: "/sepet", label: "Sepet" },
        ].forEach(function (extra) {
          var x = document.createElement("a");
          x.href = extra.href;
          x.textContent = extra.label;
          x.setAttribute("data-shop-link", "1");
          container.appendChild(x);
        });
        if (nav.ctaLabel) {
          var btn = document.createElement("a");
          btn.href = resolveHref(nav.ctaHref || "#");
          btn.className = "btn";
          btn.textContent = nav.ctaLabel;
          container.appendChild(btn);
        }
      }
    }
    fillNav($(".nav__links"), false);
    fillNav($(".mobile-menu__links") || $("#mobileMenu"), true);
    ensureNavActions(nav);
  }

  function ensureNavActions(nav) {
    var header = $("header.nav") || $(".nav");
    if (!header) return;
    var actions = header.querySelector(".nav__actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "nav__actions";
      var burger = header.querySelector(".nav__burger");
      var cta = header.querySelector(".nav__cta");
      if (cta && cta.parentElement === header) {
        actions.appendChild(cta);
      }
      if (burger) header.insertBefore(actions, burger);
      else header.appendChild(actions);
    }

    if (!actions.querySelector('[data-nav-search]')) {
      var searchWrap = document.createElement("div");
      searchWrap.className = "nav__search";
      searchWrap.setAttribute("data-nav-search-wrap", "1");
      searchWrap.innerHTML =
        '<button type="button" class="nav__icon-btn" data-nav-search="1" aria-label="Ürün ara" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="M16.2 16.2 21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        "</button>" +
        '<div class="nav__search-pop" data-nav-search-pop hidden>' +
        '<div class="oc-search">' +
        '<label class="oc-search__field"><span class="sr-only">Ürün ara</span>' +
        '<input type="search" data-nav-search-input placeholder="Ürün ara…" autocomplete="off" />' +
        "</label>" +
        '<div class="oc-search__panel" data-nav-search-panel hidden role="listbox"></div>' +
        "</div></div>";
      actions.insertBefore(searchWrap, actions.firstChild);
      bindNavSearch(searchWrap);
    }

    if (!actions.querySelector('[data-nav-profile]')) {
      var profileWrap = document.createElement("div");
      profileWrap.className = "nav__profile";
      profileWrap.setAttribute("data-nav-profile-wrap", "1");
      var iconHeart =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/></svg>';
      var iconHome =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
      var iconBag =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M7 7h13l-1.4 8.2a1.5 1.5 0 0 1-1.5 1.3H9.2a1.5 1.5 0 0 1-1.5-1.3L6 4H3M10 21h.01M17 21h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var iconPin =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="1.5" stroke="currentColor" stroke-width="1.7"/></svg>';
      var iconUserSm =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19.2c1.4-3.1 3.7-4.7 6.5-4.7s5.1 1.6 6.5 4.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
      profileWrap.innerHTML =
        '<button type="button" class="nav__account-btn" data-nav-profile="1" aria-label="Hesap menüsü" aria-expanded="false" aria-haspopup="menu">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 19.2c1.4-3.1 3.7-4.7 6.5-4.7s5.1 1.6 6.5 4.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        '<span class="nav__account-label" data-nav-profile-label>Giriş Yap</span>' +
        "</button>" +
        '<div class="nav__profile-menu" data-nav-profile-menu hidden role="menu">' +
        '<div class="nav__profile-head" data-nav-profile-head>' +
        '<p class="nav__profile-hello">Hesabınıza giriş yapın</p>' +
        '<p class="nav__profile-email">Sipariş, adres ve favorileriniz tek yerde.</p>' +
        "</div>" +
        '<div data-nav-profile-guest>' +
        '<a role="menuitem" class="nav__profile-primary" href="/hesabim/giris">Giriş Yap</a>' +
        '<a role="menuitem" class="nav__profile-secondary" href="/hesabim/kayit">Üye Ol</a>' +
        '<a role="menuitem" class="nav__profile-item" href="/favoriler">' +
        iconHeart +
        "Favorilerim</a>" +
        '<a role="menuitem" class="nav__profile-item" href="/hesabim/giris?next=/hesabim/adresler">' +
        iconPin +
        "Adreslerim</a>" +
        "</div>" +
        '<div data-nav-profile-authed hidden>' +
        '<a role="menuitem" class="nav__profile-item" href="/hesabim">' +
        iconHome +
        "Hesabım</a>" +
        '<a role="menuitem" class="nav__profile-item" href="/hesabim/siparisler">' +
        iconBag +
        "Siparişlerim</a>" +
        '<a role="menuitem" class="nav__profile-item" href="/hesabim/adresler">' +
        iconPin +
        "Adreslerim</a>" +
        '<a role="menuitem" class="nav__profile-item" href="/favoriler">' +
        iconHeart +
        "Favorilerim</a>" +
        '<a role="menuitem" class="nav__profile-item" href="/hesabim/profil">' +
        iconUserSm +
        "Profilim</a>" +
        '<button type="button" role="menuitem" class="nav__profile-logout" data-nav-profile-logout>Çıkış Yap</button>' +
        "</div>" +
        "</div>";
      var searchEl = actions.querySelector("[data-nav-search-wrap]");
      if (searchEl && searchEl.nextSibling) {
        actions.insertBefore(profileWrap, searchEl.nextSibling);
      } else if (searchEl) {
        actions.appendChild(profileWrap);
      } else {
        actions.insertBefore(profileWrap, actions.firstChild);
      }
      var pBtn = profileWrap.querySelector("[data-nav-profile]");
      var pMenu = profileWrap.querySelector("[data-nav-profile-menu]");
      var pLabel = profileWrap.querySelector("[data-nav-profile-label]");
      var pHead = profileWrap.querySelector("[data-nav-profile-head]");
      var pGuest = profileWrap.querySelector("[data-nav-profile-guest]");
      var pAuthed = profileWrap.querySelector("[data-nav-profile-authed]");
      var pLogout = profileWrap.querySelector("[data-nav-profile-logout]");
      function closeProfileMenu() {
        if (!pMenu || !pBtn) return;
        pMenu.setAttribute("hidden", "");
        pBtn.setAttribute("aria-expanded", "false");
      }
      function applyProfileSession(customer) {
        if (!pGuest || !pAuthed || !pLabel || !pHead) return;
        if (customer && customer.email) {
          var display =
            String(customer.name || "").trim() ||
            String(customer.email).split("@")[0] ||
            "Hesabım";
          pLabel.textContent = display;
          pBtn.classList.add("is-authed");
          pGuest.setAttribute("hidden", "");
          pAuthed.removeAttribute("hidden");
          pHead.innerHTML =
            '<p class="nav__profile-hello">Merhaba, ' +
            display.replace(/</g, "&lt;") +
            "</p>" +
            '<p class="nav__profile-email">' +
            String(customer.email).replace(/</g, "&lt;") +
            "</p>" +
            (customer.emailVerified
              ? '<span class="nav__profile-chip nav__profile-chip--ok">Doğrulandı</span>'
              : '<span class="nav__profile-chip">E-posta doğrulanmadı</span>');
        } else {
          pLabel.textContent = "Giriş Yap";
          pBtn.classList.remove("is-authed");
          pGuest.removeAttribute("hidden");
          pAuthed.setAttribute("hidden", "");
          pHead.innerHTML =
            '<p class="nav__profile-hello">Hesabınıza giriş yapın</p>' +
            '<p class="nav__profile-email">Sipariş, adres ve favorileriniz tek yerde.</p>';
        }
      }
      if (pBtn && pMenu) {
        pBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          var open = pMenu.hasAttribute("hidden");
          if (open) {
            pMenu.removeAttribute("hidden");
            pBtn.setAttribute("aria-expanded", "true");
          } else {
            closeProfileMenu();
          }
        });
        document.addEventListener("click", closeProfileMenu);
        pMenu.addEventListener("click", function (ev) {
          ev.stopPropagation();
        });
      }
      if (pLogout) {
        pLogout.addEventListener("click", function () {
          fetch("/api/v1/customer/session", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "logout" }),
          })
            .then(function () {
              applyProfileSession(null);
              closeProfileMenu();
              window.location.href = "/urunler";
            })
            .catch(function () {
              applyProfileSession(null);
            });
        });
      }
      fetch("/api/v1/customer/session", { credentials: "include" })
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (d) {
          applyProfileSession(d && d.customer ? d.customer : null);
        })
        .catch(function () {
          applyProfileSession(null);
        });
    }

    if (!actions.querySelector('[data-nav-fav]')) {
      var fav = document.createElement("a");
      fav.href = "/favoriler";
      fav.className = "nav__icon-btn";
      fav.setAttribute("data-nav-fav", "1");
      fav.setAttribute("aria-label", "Favoriler");
      fav.title = "Favoriler";
      fav.innerHTML =
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg><span class="nav__badge" data-nav-fav-count hidden>0</span>';
      var afterProfile = actions.querySelector("[data-nav-profile-wrap]");
      if (afterProfile && afterProfile.nextSibling) {
        actions.insertBefore(fav, afterProfile.nextSibling);
      } else if (afterProfile) {
        actions.appendChild(fav);
      } else {
        actions.insertBefore(fav, actions.firstChild);
      }
    }

    if (!actions.querySelector('[data-nav-cart]')) {
      var cart = document.createElement("a");
      cart.href = "/sepet";
      cart.className = "nav__icon-btn nav__cart-btn";
      cart.setAttribute("data-nav-cart", "1");
      cart.setAttribute("aria-label", "Sepet");
      cart.title = "Sepet";
      cart.innerHTML =
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><path d="M4 6h2.2l1.3 9.2a1.5 1.5 0 0 0 1.5 1.3h7.7a1.5 1.5 0 0 0 1.5-1.2L19.5 8H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.2" fill="currentColor"/><circle cx="17" cy="20" r="1.2" fill="currentColor"/></svg><span class="nav__badge" data-nav-cart-count hidden>0</span>';
      var afterFav = actions.querySelector("[data-nav-fav]");
      var profileWrapEl = actions.querySelector("[data-nav-profile-wrap]");
      var insertAfter = afterFav || profileWrapEl;
      if (insertAfter && insertAfter.nextSibling) {
        actions.insertBefore(cart, insertAfter.nextSibling);
      } else if (insertAfter) {
        actions.appendChild(cart);
      } else {
        actions.insertBefore(cart, actions.firstChild);
      }
    }

    // CTA telefon varsa actions içinde olsun
    var ctaEl = header.querySelector(".nav__cta");
    if (ctaEl && ctaEl.parentElement !== actions) {
      actions.appendChild(ctaEl);
    }
    if (ctaEl && nav) {
      if (nav.ctaHref) ctaEl.href = resolveHref(nav.ctaHref);
      if (nav.ctaLabel) ctaEl.textContent = nav.ctaLabel;
    }

    syncNavCartBadge();
    syncNavFavBadge();
  }

  function bindNavSearch(wrap) {
    if (!wrap || wrap.getAttribute("data-bound") === "1") return;
    wrap.setAttribute("data-bound", "1");
    var btn = wrap.querySelector("[data-nav-search]");
    var pop = wrap.querySelector("[data-nav-search-pop]");
    var input = wrap.querySelector("[data-nav-search-input]");
    var panel = wrap.querySelector("[data-nav-search-panel]");
    var timer = null;
    if (!btn || !pop || !input || !panel) return;

    function closeSearch() {
      pop.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("is-active");
    }
    function openSearch() {
      pop.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
      btn.classList.add("is-active");
      window.setTimeout(function () {
        input.focus();
      }, 30);
    }

    btn.addEventListener("click", function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (pop.hasAttribute("hidden")) openSearch();
      else closeSearch();
    });
    pop.addEventListener("click", function (ev) {
      ev.stopPropagation();
    });
    document.addEventListener("click", closeSearch);
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closeSearch();
    });

    function renderHits(hits, q) {
      if (q.length < 2) {
        panel.setAttribute("hidden", "");
        panel.innerHTML = "";
        return;
      }
      panel.removeAttribute("hidden");
      if (!hits.length) {
        panel.innerHTML =
          '<p class="oc-search__empty">Aradığınız ürünü bulamadık.</p>';
        return;
      }
      panel.innerHTML = hits
        .map(function (h) {
          var price = h.fiyat
            ? "<em>" + String(h.fiyat).replace(/</g, "&lt;") + "</em>"
            : "";
          return (
            '<a class="oc-search__link" role="option" href="' +
            String(h.href || "/urunler").replace(/"/g, "") +
            '">' +
            '<img class="oc-search__img" src="' +
            String(h.image || "/assets/img/product-placeholder.svg").replace(
              /"/g,
              ""
            ) +
            '" alt="" loading="lazy" />' +
            "<span><strong>" +
            String(h.ad || "").replace(/</g, "&lt;") +
            "</strong><small>" +
            String(h.categoryName || "").replace(/</g, "&lt;") +
            "</small>" +
            price +
            "</span></a>"
          );
        })
        .join("");
    }

    input.addEventListener("input", function () {
      var q = String(input.value || "").trim();
      if (timer) window.clearTimeout(timer);
      if (q.length < 2) {
        renderHits([], q);
        return;
      }
      timer = window.setTimeout(function () {
        fetch("/api/v1/catalog/search?q=" + encodeURIComponent(q), {
          cache: "no-store",
        })
          .then(function (r) {
            return r.ok ? r.json() : { results: [] };
          })
          .then(function (data) {
            renderHits(data.results || [], q);
          })
          .catch(function () {
            renderHits([], q);
          });
      }, 280);
    });
  }

  function readFavList() {
    try {
      var raw = localStorage.getItem("firinci_fav_v1");
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function syncNavFavBadge() {
    var badge = document.querySelector("[data-nav-fav-count]");
    if (!badge) return;
    var n = 0;
    try {
      n = readFavList().length;
    } catch (e) {
      n = 0;
    }
    if (n > 0) {
      badge.hidden = false;
      badge.removeAttribute("hidden");
      badge.textContent = n > 99 ? "99+" : String(n);
    } else {
      badge.hidden = true;
      badge.setAttribute("hidden", "");
    }
  }

  function syncNavCartBadge() {
    var badge = document.querySelector("[data-nav-cart-count]");
    if (!badge) return;
    var n = 0;
    try {
      var list = getCart();
      n = list.reduce(function (sum, x) {
        return sum + (x.qty || 0);
      }, 0);
    } catch (e) {
      n = 0;
    }
    if (n > 0) {
      badge.hidden = false;
      badge.removeAttribute("hidden");
      badge.textContent = n > 99 ? "99+" : String(n);
    } else {
      badge.hidden = true;
      badge.setAttribute("hidden", "");
    }
  }

  function applyHero(hero) {
    if (!hero) return;
    setText(".gate__mark", hero.fallbackMark);
    var fb = $(".gate__fallback p");
    if (fb && hero.fallbackTagline) fb.textContent = hero.fallbackTagline;
    var scroll = $(".gate__scroll-text") || $(".gate__scroll span");
    if (scroll && hero.scrollHint) scroll.textContent = hero.scrollHint;
    var hint = $("#scrollHint") || $(".gate__scroll");
    if (hint) {
      hint.style.visibility = "visible";
      if (!hint.style.opacity) hint.style.opacity = "1";
    }
    setText('[data-hero="welcomeEyebrow"]', hero.welcomeEyebrow);
    setText('[data-hero="welcomeTitle"]', hero.welcomeTitle);
    setText('[data-hero="welcomeLead"]', hero.welcomeLead);

    var welcome = $("#heroWelcome");
    if (welcome) {
      var on = hero.welcomeAktif === true;
      welcome.setAttribute("data-welcome-aktif", on ? "1" : "0");
      welcome.classList.toggle("is-off", !on);
      if (!on) {
        welcome.hidden = true;
        welcome.style.opacity = "0";
        welcome.style.visibility = "hidden";
        welcome.setAttribute("aria-hidden", "true");
      } else {
        welcome.hidden = false;
        welcome.removeAttribute("hidden");
      }
    }
  }

  function applyMarquee(items) {
    var band = $("#mqBand");
    var track = $("#mqTrack") || $("#marqueeTrack");
    if (!band || !track) return;

    var words = (items && items.length ? items : []).map(function (w) {
      return String(w || "").trim();
    }).filter(Boolean);
    if (!words.length) {
      words = [
        "TAZE EKMEK",
        "GÜNLÜK ÜRETİM",
        "ÖZEL TASARIM PASTA",
        "SİMİT & POĞAÇA",
        "ÇEKMEKÖY TAŞDELEN",
        "DOĞAL MALZEME",
        "BAKLAVA & BÖREK",
        "HER GÜN TAPTAZE",
        "EL YAPIMI LEZZETLER",
        "GELENEKSEL TARİF",
      ];
    }

    function makeSeg() {
      var seg = document.createElement("div");
      seg.className = "mq-seg";
      seg.setAttribute("aria-hidden", "true");
      words.forEach(function (word, i) {
        var span = document.createElement("span");
        span.className = "mq-word";
        span.textContent = word;
        seg.appendChild(span);
        var sep = document.createElement("span");
        sep.className = "mq-sep";
        sep.textContent = i % 2 === 0 ? "✦" : "◆";
        seg.appendChild(sep);
      });
      return seg;
    }

    track.classList.remove("is-on");
    track.style.animation = "none";
    track.innerHTML = "";

    // 1) Tek segment — viewport'tan kısa kalmasın diye kelimeleri çoğalt
    var seed = makeSeg();
    track.appendChild(seed);
    var guard = 0;
    while (seed.scrollWidth < band.clientWidth + 40 && guard < 8) {
      words.forEach(function (word, i) {
        var span = document.createElement("span");
        span.className = "mq-word";
        span.textContent = word;
        seed.appendChild(span);
        var sep = document.createElement("span");
        sep.className = "mq-sep";
        sep.textContent = i % 2 === 0 ? "✦" : "◆";
        seed.appendChild(sep);
      });
      guard++;
    }

    // 2) Aynı segmenti birebir kopyala → -50% ile dikişsiz sonsuz döngü
    var clone = seed.cloneNode(true);
    track.appendChild(clone);

    var segW = seed.scrollWidth || 1;
    var duration = Math.max(18, Math.min(55, segW / 42));
    track.style.setProperty("--mq-dur", duration + "s");
    // reflow sonra animasyonu aç
    void track.offsetWidth;
    track.classList.add("is-on");
    track.style.animation = "";
  }

  // Genişlik değişince şeridi yeniden kur (DevTools / rotate)
  var _mqResizeTimer = 0;
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(_mqResizeTimer);
      _mqResizeTimer = setTimeout(function () {
        var items =
          (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.marquee) || null;
        if ($("#mqTrack")) applyMarquee(items);
      }, 180);
    },
    { passive: true }
  );

  function applyHakkimizda(h) {
    if (!h) return;
    var sec = $("#hakkimizda");
    if (!sec) return;
    setText("#hakkimizda .eyebrow", h.eyebrow);
    setText("#hakkimizda .h2, #hakkimizda h1.h2, #hakkimizda h1", h.baslik);
    var ans = $("#hakkimizda .answer b");
    if (ans && h.answerBaslik) ans.textContent = h.answerBaslik;
    setText("#hakkimizda .answer p", h.answerMetin);
    setText("#hakkimizda .lead", h.lead);

    var ozet = $(".ozet", sec);
    var leftCol = ozet ? ozet.parentElement : sec.querySelector(".grid-2 > div") || sec;

    if (Array.isArray(h.body)) {
      $all("#hakkimizda .body", sec).forEach(function (el) {
        el.remove();
      });
      var insertBefore = ozet || null;
      h.body.forEach(function (text) {
        if (!text && text !== "") return;
        var p = document.createElement("p");
        p.className = "body";
        p.setAttribute("data-fade", "");
        p.textContent = text || "";
        if (insertBefore && insertBefore.parentNode) {
          insertBefore.parentNode.insertBefore(p, insertBefore);
        } else if (leftCol) {
          leftCol.appendChild(p);
        }
      });
    }

    if (ozet && h.ozet && h.ozet.length) {
      ozet.innerHTML = "";
      h.ozet.forEach(function (item) {
        var div = document.createElement("div");
        div.className = "ozet__i";
        div.appendChild(document.createElement("b")).textContent = item.b || "";
        div.appendChild(document.createElement("span")).textContent = item.span || "";
        ozet.appendChild(div);
      });
    }
    var badge = $(".tilt-card__badge", sec);
    if (badge && h.badgeBaslik) {
      var bb = $("b", badge);
      var bs = $("span", badge);
      if (bb) bb.textContent = h.badgeBaslik;
      if (bs && h.badgeAlt) bs.textContent = h.badgeAlt;
    }
  }

  function applyBolum(id, b) {
    if (!b) return;
    var sec = $("#" + id);
    var el = $("#" + id);
    if (!el) return;
    setText("#" + id + " .eyebrow", b.eyebrow);
    setText("#" + id + " .h2", b.baslik);
    if (b.lead) setText("#" + id + " .lead", b.lead);
    // render SSS items if present in global data
    if (id === "sss" && window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.sss && Array.isArray(window.__FIRINCI_CONTENT.sss.items)) {
     var list = $("#sss .faq");

if (list) {
    list.innerHTML = "";

    window.__FIRINCI_CONTENT.sss.items.forEach(function (it) {

        var details = document.createElement("details");
        details.className = "faq__item";

        var summary = document.createElement("summary");
        summary.textContent = it.soru || "";

        var p = document.createElement("p");
        p.textContent = it.cevap || "";

        details.appendChild(summary);
        details.appendChild(p);

        list.appendChild(details);
    });
}
    }

  }
  function applyPasta(p) {
    if (!p) return;
    var sec = $("#pasta");
    if (!sec) return;
    setText("#pasta .eyebrow", p.eyebrow);
    setText("#pasta .h2", p.baslik);
    setText("#pasta .lead", p.lead);
    setText("#pasta .body", p.body);
    var ticks = $(".ticks", sec);
    if (ticks && p.maddeler && p.maddeler.length) {
      ticks.innerHTML = "";
      p.maddeler.forEach(function (m) {
        ticks.appendChild(document.createElement("li")).textContent = m;
      });
    }
    var cta = $(".btn--lg", sec);
    if (cta) {
      if (p.ctaHref) cta.href = p.ctaHref;
      if (p.ctaLabel) cta.textContent = p.ctaLabel;
    }
    var grid = $(".pasta-grid", sec);
    if (grid && p.gorseller && p.gorseller.length) {
      grid.innerHTML = "";
      p.gorseller.forEach(function (g) {
        var fig = document.createElement("figure");
        fig.setAttribute("data-reveal-mask", "");
        var img = document.createElement("img");
        img.src = mediaUrl(g.src);
        img.alt = g.alt || "";
        img.loading = "lazy";
        fig.appendChild(img);
        grid.appendChild(fig);
      });
    }
  }

  function applyMenu(menu) {
    if (!menu || !menu.gruplar || !menu.gruplar.length) return;
    var sec = $("#menu");
    if (!sec) return;
    if (menu.baslik) {
      var h2 = sec.querySelector(".h2");
      if (h2) h2.textContent = menu.baslik;
    }
    setText("#menu .section__head .lead", menu.giris);
    setText("#menu .menu__note", menu.not);
    var legend = $(".menu__legend", sec);
    if (legend && menu.legend) legend.innerHTML = "<i aria-hidden=\"true\">★</i> " + menu.legend.replace(/^★\s*/, "");
    var hepsi = $(".menu__hepsi a", sec);
    if (hepsi) {
      if (menu.hepsiLink) hepsi.href = resolveHref(menu.hepsiLink);
      if (menu.hepsiMetin) hepsi.textContent = menu.hepsiMetin;
    }
    var container = $(".menu", sec);
    if (!container) return;
    container.innerHTML = "";
    menu.gruplar.forEach(function (grup) {
      var urunler = (grup.urunler || []).filter(function (u) { return u.ad && u.ad.trim(); });
      if (!grup.ad || !urunler.length) return;
      var group = document.createElement("div");
      group.className = "menu__group";
      group.setAttribute("data-fade", "");
      var catHref = toCategoryHref(grup.link || grup.tumLink, grup.ad);
      var h3 = document.createElement("h3");
      var ha = document.createElement("a");
      ha.href = catHref;
      ha.setAttribute("data-cat-link", "1");
      ha.textContent = grup.ad;
      h3.appendChild(ha);
      if (grup.adet) {
        var adet = document.createElement("span");
        adet.className = "menu__adet";
        adet.textContent = grup.adet;
        h3.appendChild(adet);
      }
      group.appendChild(h3);
      var ul = document.createElement("ul");
      ul.className = "menu__list";
      urunler.forEach(function (u) {
        var li = document.createElement("li");
        if (u.fav) li.className = "is-fav";
        var la = document.createElement("a");
        la.href = productHref(u, grup);
        la.setAttribute("data-product-link", "1");
        var span = document.createElement("span");
        span.className = "menu__name";
        var label = document.createElement("span");
        label.className = "menu__name__label";
        label.textContent = u.ad;
        span.appendChild(label);
        if (u.not) {
          var em = document.createElement("em");
          em.textContent = u.not;
          span.appendChild(em);
        }
        la.appendChild(span);
        li.appendChild(la);
        ul.appendChild(li);
      });

      group.appendChild(ul);
      var tum = document.createElement("a");
      tum.className = "menu__tum";
      tum.href = toCategoryHref(grup.tumLink || grup.link, grup.ad);
      tum.setAttribute("data-cat-link", "1");
      tum.textContent = (menu.tumMetinSablon || "{ad} hakkında bilgi →").replace("{ad}", grup.ad);
      group.appendChild(tum);
      container.appendChild(group);
    });
  }

  var KAT_FALLBACK_IMG = {
    "ekmek-cesitleri": "/assets/img/urun/ekmek-cesit.jpg",
    "eksi-mayali-ekmekler": "/assets/img/urun/ekmek-rustik.jpg",
    "simit-pogaca-acma": "/assets/img/urun/simit.jpg",
    "kurabiye-cesitleri": "/assets/img/urun/tatli-bufe.jpg",
    "buyuk-kurabiyeler": "/assets/img/urun/cupcake.jpg",
    "galeta-cubuk-kokteyl": "/assets/img/urun/pogaca-tepsi.jpg",
    "baklava-serbetli": "/assets/img/urun/tatli-bufe.jpg",
    "sutlu-tatlilar": "/assets/img/urun/vitrin-pasta.jpg",
    "zeytinyagli-urunler": "/assets/img/urun/vitrin-hamur.jpg",
    "pastalar": "/assets/img/urun/pasta-safari.jpg",
    "tek-pasta-dilim": "/assets/img/urun/pasta-drip.jpg",
    "tartolet-rulo-lezzet-toplari": "/assets/img/urun/pasta-gul.jpg",
    "donut": "/assets/img/urun/cupcake.jpg",
    "icecekler": "/assets/img/urun/simit.jpg"
  };

  function groupSlugFromHref(href) {
    var m = String(href || "").match(/\/urunler\/([^/]+)/i);
    return m ? m[1] : "";
  }

  function groupImage(group) {
    if (group.image) return mediaUrl(group.image);
    if (group.banner) return mediaUrl(group.banner);
    var withImg = (group.urunler || []).find(function (u) { return u && u.image; });
    if (withImg) return mediaUrl(withImg.image);
    var href = toCategoryHref(group.link || group.tumLink, group.ad);
    var slug = group.slug || groupSlugFromHref(href);
    return KAT_FALLBACK_IMG[slug] || "/assets/img/urun/vitrin-hamur.jpg";
  }

  function waPhoneDigits() {
    var c = (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.iletisim) || {};
    // Admin telefon alanı kaynak — wa.me URL'sindeki eski/yanlış numarayı kullanma
    var raw = String(c.telefonHam || c.telefon || "").replace(/\D/g, "");
    if (!raw && c.whatsapp) {
      var m = String(c.whatsapp).match(/wa\.me\/(\d{10,15})/i);
      raw = m ? m[1] : "";
    }
    if (!raw) return "";
    if (raw.charAt(0) === "0" && raw.length === 11) raw = "90" + raw.slice(1);
    if (raw.indexOf("90") !== 0 && raw.length === 10) raw = "90" + raw;
    return raw;
  }

  function waOrderHref(productName) {
    var dig = waPhoneDigits();
    if (!dig) return "#";
    return "https://wa.me/" + dig + "?text=" + encodeURIComponent("Merhaba, " + (productName || "ürün") + " sipariş vermek istiyorum.");
  }

  function slugifyTr(input) {
    return String(input || "")
      .trim()
      .toLocaleLowerCase("tr-TR")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  var RESERVED_CAT_SLUGS = {
    urunler: 1,
    "ekmek-cesitleri": 1,
    "eksi-mayali-ekmekler": 1,
    "simit-pogaca-acma": 1,
    "kurabiye-cesitleri": 1,
    "buyuk-kurabiyeler": 1,
    "galeta-cubuk-kokteyl": 1,
    "baklava-serbetli": 1,
    "sutlu-tatlilar": 1,
    "zeytinyagli-urunler": 1,
    pastalar: 1,
    "tek-pasta-dilim": 1,
    "tartolet-rulo-lezzet-toplari": 1,
    donut: 1,
    icecekler: 1
  };

  function productSlug(u) {
    if (!u) return "";
    if (u.slug && !RESERVED_CAT_SLUGS[u.slug]) return u.slug;
    var fromLink = String(u.link || "").match(/\/urunler\/([^/?#]+)/i);
    if (fromLink && fromLink[1] && !RESERVED_CAT_SLUGS[fromLink[1]]) return fromLink[1];
    return slugifyTr(u.ad);
  }

  function productHref(u, group) {
    var slug = productSlug(u);
    var cat = "";
    if (group) {
      if (group.slug) cat = group.slug;
      else {
        var fromG = String(group.link || group.tumLink || "").match(/\/urunler\/([^/?#]+)/i);
        if (fromG && fromG[1] && fromG[1] !== "urunler") cat = fromG[1];
      }
    }
    if (slug && cat) return "/urunler/" + encodeURIComponent(cat) + "/" + encodeURIComponent(slug);
    if (slug) return "/urunler/" + encodeURIComponent(slug);
    return toCategoryHref((group && (group.link || group.tumLink)) || "", group && group.ad);
  }

  function currentUrunlerSlug() {
    var path = window.location.pathname || "";
    var m = path.match(/\/urunler\/([^/]+)/i);
    if (!m || m[1] === "urunler") return "";
    return decodeURIComponent(m[1]);
  }

  function isProductDetailPage() {
    return document.body.classList.contains("page--urun") || !!$("[data-urun-detay]");
  }

  var CART_KEY = "firinci_cart_v1";

  function getCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(list) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(list || []));
    } catch (e) { /* ignore */ }
    renderCartUI();
    if (typeof syncNavCartBadge === "function") syncNavCartBadge();
    if (typeof syncNavFavBadge === "function") syncNavFavBadge();
  }

  function addToCart(item) {
    if (!item || !item.ad) return;
    var list = getCart();
    var key = item.slug || item.ad;
    var found = list.find(function (x) { return (x.slug || x.ad) === key; });
    if (found) found.qty = (found.qty || 1) + 1;
    else list.push({ ad: item.ad, slug: item.slug || "", fiyat: item.fiyat || "", qty: 1 });
    saveCart(list);
    openCartDrawer();
  }

  function setCartQty(key, qty) {
    var list = getCart().filter(function (x) {
      if ((x.slug || x.ad) !== key) return true;
      x.qty = qty;
      return qty > 0;
    });
    saveCart(list);
  }

  function cartWhatsAppHref() {
    var list = getCart();
    if (!list.length) return waOrderHref("ürün");
    var lines = list.map(function (x) {
      return "- " + x.ad + (x.qty > 1 ? " x" + x.qty : "") + (x.fiyat ? " (" + x.fiyat + ")" : "");
    });
    var dig = waPhoneDigits();
    if (!dig) return "#";
    return "https://wa.me/" + dig + "?text=" + encodeURIComponent(
      "Merhaba, aşağıdaki ürünleri sipariş vermek istiyorum:\n" + lines.join("\n")
    );
  }

  function ensureCartDom() {
    if ($("#firinci-cart-float")) return;
    var float = document.createElement("button");
    float.type = "button";
    float.id = "firinci-cart-float";
    float.className = "cart-float";
    float.setAttribute("aria-label", "Sepeti aç");
    float.innerHTML = '<span class="cart-float__label">Sepet</span><span class="cart-float__count">0</span>';
    float.addEventListener("click", function () { openCartDrawer(); });
    document.body.appendChild(float);

    var overlay = document.createElement("div");
    overlay.id = "firinci-cart-overlay";
    overlay.className = "cart-overlay";
    overlay.hidden = true;
    overlay.addEventListener("click", closeCartDrawer);

    var drawer = document.createElement("aside");
    drawer.id = "firinci-cart-drawer";
    drawer.className = "cart-drawer";
    drawer.hidden = true;
    drawer.setAttribute("aria-label", "Alışveriş sepeti");
    drawer.innerHTML =
      '<div class="cart-drawer__head">' +
      "<h2>Sepetiniz</h2>" +
      '<button type="button" class="cart-drawer__close" aria-label="Kapat">×</button>' +
      "</div>" +
      '<div class="cart-drawer__body" data-cart-body></div>' +
      '<div class="cart-drawer__foot">' +
      '<a class="btn btn--lg" href="/sepet" data-cart-checkout>Sepete Git / Checkout</a>' +
      '<button type="button" class="btn btn--ghost" data-cart-wa>WhatsApp ile Hızlı Sipariş</button>' +
      '<button type="button" class="btn btn--ghost" data-cart-clear>Sepeti Temizle</button>' +
      "</div>";

    drawer.querySelector(".cart-drawer__close").addEventListener("click", closeCartDrawer);
    drawer.querySelector("[data-cart-wa]").addEventListener("click", function () {
      var href = cartWhatsAppHref();
      if (!getCart().length) {
        alert("Sepetiniz boş.");
        return;
      }
      if (href === "#") {
        alert("WhatsApp numarası tanımlı değil. Admin → İletişim'den telefon ekleyin.");
        return;
      }
      window.open(href, "_blank", "noopener,noreferrer");
    });
    drawer.querySelector("[data-cart-clear]").addEventListener("click", function () {
      saveCart([]);
    });

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }

  function openCartDrawer() {
    ensureCartDom();
    renderCartUI();
    var overlay = $("#firinci-cart-overlay");
    var drawer = $("#firinci-cart-drawer");
    if (overlay) overlay.hidden = false;
    if (drawer) drawer.hidden = false;
    document.documentElement.classList.add("cart-open");
  }

  function closeCartDrawer() {
    var overlay = $("#firinci-cart-overlay");
    var drawer = $("#firinci-cart-drawer");
    if (overlay) overlay.hidden = true;
    if (drawer) drawer.hidden = true;
    document.documentElement.classList.remove("cart-open");
  }

  function renderCartUI() {
    ensureCartDom();
    var list = getCart();
    var count = list.reduce(function (n, x) { return n + (x.qty || 1); }, 0);
    var el = $("#firinci-cart-float");
    if (el) {
      var c = el.querySelector(".cart-float__count");
      if (c) c.textContent = String(count);
      el.hidden = count === 0;
      el.setAttribute("data-count", String(count));
    }
    var body = $("[data-cart-body]");
    if (!body) return;
    if (!list.length) {
      body.innerHTML = '<p class="cart-drawer__empty">Sepetiniz boş. Ürün detayından “Sepete Ekle” ile ekleyin.</p>';
      return;
    }
    body.innerHTML = "";
    list.forEach(function (item) {
      var key = item.slug || item.ad;
      var row = document.createElement("div");
      row.className = "cart-drawer__row";
      var info = document.createElement("div");
      info.className = "cart-drawer__info";
      var title = document.createElement("a");
      title.href = item.slug ? "/urunler/" + encodeURIComponent(item.slug) : "#";
      title.textContent = item.ad;
      info.appendChild(title);
      if (item.fiyat) {
        var price = document.createElement("span");
        price.textContent = item.fiyat;
        info.appendChild(price);
      }
      var qty = document.createElement("div");
      qty.className = "cart-drawer__qty";
      var minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.addEventListener("click", function () { setCartQty(key, (item.qty || 1) - 1); });
      var num = document.createElement("span");
      num.textContent = String(item.qty || 1);
      var plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.addEventListener("click", function () { setCartQty(key, (item.qty || 1) + 1); });
      qty.appendChild(minus);
      qty.appendChild(num);
      qty.appendChild(plus);
      row.appendChild(info);
      row.appendChild(qty);
      body.appendChild(row);
    });
  }

  function renderCartBadge() {
    renderCartUI();
  }

  function applyKatlar(menu) {
    if (!menu || !menu.gruplar || !menu.gruplar.length) return;
    var container = $(".katlar");
    if (!container) return;

    var sayfa = (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.sayfalar) || {};
    var u = sayfa.urunler || {};
    var head = $(".section__head");
    if (head && document.body.classList.contains("page")) {
      var eye = head.querySelector(".eyebrow");
      if (eye && u.eyebrow) eye.textContent = u.eyebrow;
      var lead = head.querySelector(".lead");
      if (lead && (u.lead || menu.giris)) lead.textContent = u.lead || menu.giris;
    }

    container.innerHTML = "";
    var urunTotal = 0;
    menu.gruplar.forEach(function (g) {
      if (!g || !g.ad) return;
      var urunler = (g.urunler || []).filter(function (u0) { return u0 && u0.ad && String(u0.ad).trim(); });
      if (!urunler.length) return;
      urunTotal += urunler.length;
      var href = toCategoryHref(g.link || g.tumLink, g.ad);
      var imgSrc = groupImage(g);
      var adet = g.adet || (urunler.length + " çeşit");
      var a = document.createElement("a");
      a.className = "kat";
      a.href = href;
      a.innerHTML =
        '<div class="kat__img"><img src="' + imgSrc + '" alt="' + (g.ad || "").replace(/"/g, "&quot;") + '" loading="lazy" decoding="async" width="1280" height="720"></div>' +
        '<div class="kat__ic"><h2></h2><p></p></div>';
      a.querySelector("h2").textContent = g.ad;
      a.querySelector("p").textContent = adet;
      container.appendChild(a);
    });

    if (document.body.classList.contains("page") && head) {
      var visible = container.querySelectorAll(".kat").length;
      var h1 = head.querySelector(".h2, h1");
      if (h1 && visible) {
        var tpl = u.baslikSablon || "{n} kategoride {m} çeşit";
        h1.textContent = tpl.replace("{n}", String(visible)).replace("{m}", String(urunTotal));
      }
    }
  }

  function matchCurrentCategoryGroup(menu) {
    if (!menu || !menu.gruplar) return null;
    if (isProductDetailPage()) return null;
    var slug = currentUrunlerSlug();
    if (!slug) return null;
    // Ürün detay slug'ı kategori gibi işlenmesin
    if (!RESERVED_CAT_SLUGS[slug] && findProductBySlug(menu, slug)) return null;
    return menu.gruplar.find(function (g) {
      var href = toCategoryHref(g.link || g.tumLink, g.ad);
      return groupSlugFromHref(href) === slug || g.slug === slug;
    }) || null;
  }

  function findProductBySlug(menu, slug) {
    if (!menu || !menu.gruplar || !slug) return null;
    for (var i = 0; i < menu.gruplar.length; i++) {
      var g = menu.gruplar[i];
      var urunler = g.urunler || [];
      for (var j = 0; j < urunler.length; j++) {
        var u = urunler[j];
        if (!u || !u.ad) continue;
        if (productSlug(u) === slug) return { product: u, group: g };
      }
    }
    return null;
  }

  function applyUrunDetay(menu) {
    var slug = document.body.getAttribute("data-product-slug") || currentUrunlerSlug();
    if (!slug || !menu || RESERVED_CAT_SLUGS[slug]) return;
    var hit = findProductBySlug(menu, slug);
    if (!hit) return;
    var u = hit.product;
    var g = hit.group;
    document.body.classList.add("page", "page--urun");
    document.body.setAttribute("data-product-slug", productSlug(u));

    var catHref = toCategoryHref(g.link || g.tumLink, g.ad);
    var crumbCat = $("[data-crumb-cat]");
    if (crumbCat) {
      crumbCat.textContent = g.ad;
      crumbCat.setAttribute("href", catHref);
    }
    var crumbProd = $("[data-crumb-product]");
    if (crumbProd) crumbProd.textContent = u.ad;

    var h1 = $("[data-urun-ad]");
    if (h1) h1.textContent = u.ad;

    var kat = $("[data-urun-kat]");
    if (kat) {
      kat.textContent = g.ad;
      if (kat.tagName === "A") kat.setAttribute("href", catHref);
    }
    var katLink = $("[data-urun-kat-link]");
    if (katLink) {
      katLink.textContent = g.ad;
      katLink.setAttribute("href", catHref);
    }

    var fiyat = $("[data-urun-fiyat]");
    if (fiyat) {
      if (u.fiyat) {
        fiyat.hidden = false;
        fiyat.textContent = u.fiyat;
      } else {
        fiyat.hidden = true;
        fiyat.textContent = "";
      }
    }

    var notEl = $("[data-urun-not]");
    if (notEl) {
      if (u.not) {
        notEl.hidden = false;
        notEl.textContent = u.not;
      } else {
        notEl.hidden = true;
      }
    }

    var acik = $("[data-urun-aciklama]");
    if (acik) {
      var body = u.aciklama || u.not || (brandName() + " — " + g.ad + " kategorisinden taze " + u.ad + ".");
      acik.innerHTML = "<b>Açıklama</b><p></p>";
      var p = acik.querySelector("p");
      if (p) p.textContent = body;
    }

    var durum = $("[data-urun-durum]");
    if (durum) {
      if (u.aktif === false) {
        durum.hidden = false;
        durum.textContent = "Şu an listede pasif.";
      } else {
        durum.hidden = true;
        durum.textContent = "";
      }
    }

    var img = $("[data-urun-img]");
    if (img) {
      img.src = mediaUrl(u.image || groupImage(g));
      img.alt = u.ad + " — " + brandName();
    }

    var wa = $("[data-wa-order]");
    if (wa) {
      wa.href = waOrderHref(u.ad);
    }

    var addBtn = $("[data-add-cart]");
    if (addBtn) {
      addBtn.onclick = function () {
        addToCart({ ad: u.ad, slug: productSlug(u), fiyat: u.fiyat || "" });
        addBtn.textContent = "Sepete eklendi ✓";
        setTimeout(function () { addBtn.textContent = "Sepete Ekle"; }, 1600);
      };
    }

    var related = $("[data-urun-related]");
    if (related) {
      var ul = related.querySelector("ul");
      var siblings = (g.urunler || []).filter(function (x) {
        return x && x.ad && productSlug(x) && productSlug(x) !== productSlug(u) && x.aktif !== false;
      }).slice(0, 6);
      if (ul && siblings.length) {
        related.hidden = false;
        ul.innerHTML = "";
        siblings.forEach(function (s) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = productHref(s, g);
          a.setAttribute("data-product-link", "1");
          a.textContent = s.ad;
          li.appendChild(a);
          ul.appendChild(li);
        });
      } else if (related) {
        related.hidden = true;
      }
    }

    if (document.title.indexOf(u.ad) === -1) {
      document.title = u.ad + " — " + brandName() + " | Çekmeköy";
    }
  }

  function stripCategoryFaq(html) {
    return String(html || "")
      .replace(
        /<h2[^>]*>\s*Sık\s*sorulanlar\s*<\/h2>\s*<div class="faq">[\s\S]*?<\/div>/gi,
        ""
      )
      .trim();
  }

  function stripCategoryFaqDom(article) {
    if (!article) return;
    var nodes = article.querySelectorAll("h2, .faq");
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.classList && el.classList.contains("faq")) {
        el.remove();
        return;
      }
      if (
        el.tagName === "H2" &&
        /sık\s*sorulanlar/i.test((el.textContent || "").trim())
      ) {
        el.remove();
      }
    });
  }

  function buildFaqHtml(items) {
    var html =
      '<h2>Sık sorulanlar</h2>\n        <div class="faq">\n';
    items.forEach(function (it) {
      if (!it || !it.soru) return;
      html +=
        '<details class="faq__item"><summary>' +
        escapeHtml(it.soru) +
        "</summary><p>" +
        escapeHtml(it.cevap || "") +
        "</p></details>\n";
    });
    html += "        </div>";
    return html;
  }

  function appendCategoryFaq(article, items) {
    if (!article || !items || !items.length) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = buildFaqHtml(items);
    while (wrap.firstChild) article.appendChild(wrap.firstChild);
  }

  function replaceCategoryFaq(faqEl, items) {
    if (!faqEl || !items || !items.length) return;
    faqEl.innerHTML = "";
    items.forEach(function (it) {
      if (!it || !it.soru) return;
      var d = document.createElement("details");
      d.className = "faq__item";
      var s = document.createElement("summary");
      s.textContent = it.soru;
      var p = document.createElement("p");
      p.textContent = it.cevap || "";
      d.appendChild(s);
      d.appendChild(p);
      faqEl.appendChild(d);
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function ensureYsMenuHost() {
    var existing = $("[data-ys-menu]");
    if (existing) return existing;
    var wrap = $("main.section > .wrap") || $("main .wrap") || $("main");
    if (!wrap) return null;
    var section = document.createElement("section");
    section.className = "ys-menu";
    section.setAttribute("data-ys-menu", "1");
    section.id = "menu-urunler";
    var ust = $(".urun-ust");
    if (ust && ust.parentNode === wrap) {
      if (ust.nextSibling) wrap.insertBefore(section, ust.nextSibling);
      else wrap.appendChild(section);
    } else {
      var govde = $(".urun-govde");
      if (govde) wrap.insertBefore(section, govde);
      else wrap.appendChild(section);
    }
    return section;
  }

  function renderYsCategoryMenu(menu, group, sayfa) {
    var host = ensureYsMenuHost();
    if (!host || !group) return;

    var urunler = (group.urunler || []).filter(function (u) {
      return u && u.ad && String(u.ad).trim() && u.aktif !== false;
    });

    host.innerHTML = "";

    var head = document.createElement("div");
    head.className = "ys-menu__head";
    var h2 = document.createElement("h2");
    h2.textContent = (sayfa.listeBaslikSablon || "{ad}").replace("{ad}", group.ad);
    var count = document.createElement("p");
    count.textContent = urunler.length + " ürün";
    head.appendChild(h2);
    head.appendChild(count);
    host.appendChild(head);

    // Kategori çipleri
    var chips = document.createElement("nav");
    chips.className = "ys-chips";
    chips.setAttribute("aria-label", "Kategoriler");
    (menu.gruplar || []).forEach(function (g) {
      if (!g || !g.ad) return;
      var has = (g.urunler || []).some(function (u) {
        return u && u.ad && String(u.ad).trim();
      });
      if (!has) return;
      var a = document.createElement("a");
      a.className = "ys-chip" + (g.ad === group.ad ? " is-active" : "");
      a.href = toCategoryHref(g.link || g.tumLink, g.ad);
      a.textContent = g.ad;
      chips.appendChild(a);
    });
    host.appendChild(chips);

    var ul = document.createElement("ul");
    ul.className = "ys-products";

    urunler.forEach(function (u) {
      var li = document.createElement("li");
      li.className = "ys-product" + (u.fav ? " is-fav" : "");

      var body = document.createElement("div");
      body.className = "ys-product__body";

      var titleLink = document.createElement("a");
      titleLink.href = productHref(u, group);
      titleLink.setAttribute("data-product-link", "1");
      titleLink.className = "ys-product__title";
      var h3 = document.createElement("h3");
      h3.textContent = u.ad;
      titleLink.appendChild(h3);
      body.appendChild(titleLink);

      var descText = (u.aciklama || u.not || "").trim();
      if (descText) {
        var desc = document.createElement("p");
        desc.className = "ys-product__desc";
        desc.textContent = descText;
        body.appendChild(desc);
      }

      var meta = document.createElement("div");
      meta.className = "ys-product__meta";
      var price = document.createElement("span");
      price.className = "ys-product__price";
      price.textContent = u.fiyat ? u.fiyat : "Fiyat için detay / sipariş";
      if (!u.fiyat) price.classList.add("is-muted");
      meta.appendChild(price);

      var add = document.createElement("button");
      add.type = "button";
      add.className = "ys-product__add";
      add.setAttribute("aria-label", u.ad + " sepete ekle");
      add.textContent = "+";
      add.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
          ad: u.ad,
          slug: productSlug(u),
          fiyat: u.fiyat || "",
        });
        add.classList.add("is-added");
        add.textContent = "✓";
        setTimeout(function () {
          add.classList.remove("is-added");
          add.textContent = "+";
        }, 1200);
      });
      meta.appendChild(add);
      body.appendChild(meta);

      var imgWrap = document.createElement("a");
      imgWrap.className = "ys-product__img";
      imgWrap.href = productHref(u, group);
      imgWrap.setAttribute("data-product-link", "1");
      var img = document.createElement("img");
      img.src = mediaUrl(u.image || groupImage(group));
      img.alt = u.ad;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 160;
      img.height = 160;
      imgWrap.appendChild(img);

      li.appendChild(body);
      li.appendChild(imgWrap);
      ul.appendChild(li);
    });

    host.appendChild(ul);

    var hint = document.createElement("p");
    hint.className = "ys-menu__hint";
    hint.textContent =
      sayfa.kartNot ||
      "Ürüne tıklayınca detay açılır. + ile sepete ekleyip checkout’tan sipariş verebilirsiniz.";
    host.appendChild(hint);
  }

  function applyUrunKategori(menu) {
    var group = matchCurrentCategoryGroup(menu);
    if (!group) return;

    var sayfa = ((window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.sayfalar) || {}).urunKategori || {};
    var eye = $(".urun-ust .eyebrow");
    if (eye && sayfa.eyebrow) eye.textContent = sayfa.eyebrow;

    var h1 = $(".urun-ust .h2, .urun-ust h1");
    if (h1) h1.textContent = group.ad;

    var answerB = $(".urun-ust .answer b, .urun-ust .answer strong");
    if (answerB && sayfa.answerBaslik) answerB.textContent = sayfa.answerBaslik;

    if (group.aciklama) {
      var answerP = $(".urun-ust .answer p");
      if (answerP) answerP.textContent = group.aciklama;
    }

    if (group.govdeHtml) {
      var article = $(".urun-govde .article, .article");
      if (article) {
        var bodyHtml = group.govdeHtml;
        if (Array.isArray(group.sss)) {
          bodyHtml = stripCategoryFaq(bodyHtml);
        }
        article.innerHTML = bodyHtml;
        if (Array.isArray(group.sss) && group.sss.length) {
          appendCategoryFaq(article, group.sss);
        }
      }
    } else if (Array.isArray(group.sss) && group.sss.length) {
      var artOnly = $(".urun-govde .article, .article");
      if (artOnly) {
        stripCategoryFaqDom(artOnly);
        appendCategoryFaq(artOnly, group.sss);
      } else {
        replaceCategoryFaq($(".faq"), group.sss);
      }
    }

    var heroImg = $(".urun-gorsel img");
    if (heroImg) {
      heroImg.src = groupImage(group);
      heroImg.alt = group.ad + " — " + brandName();
      heroImg.removeAttribute("srcset");
    }

    // Yemeksepeti tarzı menü: hero'dan sonra tam genişlik ürün kartları
    renderYsCategoryMenu(menu, group, sayfa);

    // Eski yan listeyi gizle (ürünler ys-menu'de)
    var oldKart = $(".urun-kart");
    if (oldKart) oldKart.hidden = true;
    document.body.classList.add("page--ys-menu");

    var relatedHead = $(".related h2, .related .h3");
    if (relatedHead && sayfa.relatedBaslik) relatedHead.textContent = sayfa.relatedBaslik;

    var related = $(".related ul");
    if (related && menu.gruplar) {
      related.innerHTML = "";
      var shown = 0;
      menu.gruplar.forEach(function (g) {
        if (!g || !g.ad || g.ad === group.ad || shown >= 2) return;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = toCategoryHref(g.link || g.tumLink, g.ad);
        a.textContent = g.ad;
        li.appendChild(a);
        related.appendChild(li);
        shown += 1;
      });
      var all = document.createElement("li");
      var allA = document.createElement("a");
      allA.href = "/urunler";
      allA.textContent = sayfa.relatedHepsi || "Tüm ürün kategorileri";
      all.appendChild(allA);
      related.appendChild(all);
    }

    var ctaTitle = $(".cta-box h2, .cta-box .h3");
    if (ctaTitle && sayfa.ctaBaslik) ctaTitle.textContent = sayfa.ctaBaslik;

    var ctaTel = $(".cta-box a[href^='tel']");
    var iletisim = (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.iletisim) || {};
    if (ctaTel && iletisim.telefonHam) {
      ctaTel.href = "tel:" + iletisim.telefonHam;
      ctaTel.textContent = iletisim.telefon || ctaTel.textContent;
    }
    var ctaWa = $(".cta-box a[href*='wa.me'], .cta-box__wa");
    if (ctaWa) {
      ctaWa.href = "https://wa.me/" + waPhoneDigits() + "?text=" + encodeURIComponent("Merhaba, sipariş bilgisi almak istiyorum.");
      if (sayfa.ctaWaLabel) ctaWa.textContent = sayfa.ctaWaLabel;
    }
  }

  function applySayfalar(sayfalar) {
    if (!sayfalar) return;
    var path = window.location.pathname || "";
    var isBlog = /\/blog(\/|$)/i.test(path) && !/\/blog\/[^/]+\/[^/]+/i.test(path);
    if (isBlog || $(".posts")) {
      var b = sayfalar.blog || {};
      var head = $(".section__head") || $("main .section__head");
      if (head) {
        var eye = head.querySelector(".eyebrow");
        if (eye && b.eyebrow) eye.textContent = b.eyebrow;
        var h = head.querySelector(".h2, h1");
        if (h && b.baslik) h.textContent = b.baslik;
        var lead = head.querySelector(".lead");
        if (lead && b.lead) lead.textContent = b.lead;
      }
      var cta = $(".cta-box, .blog-cta, .section--cta");
      if (cta) {
        var ctaH = cta.querySelector("h2, .h2, .h3");
        if (ctaH && b.ctaBaslik) ctaH.textContent = b.ctaBaslik;
        var ctaP = cta.querySelector("p");
        if (ctaP && b.ctaMetin) ctaP.textContent = b.ctaMetin;
      }
    }
  }

  function applyGaleri(list) {
    var gallery = $(".gallery");
    if (!gallery || !list || !list.length) return;
    gallery.innerHTML = "";
    list.forEach(function (item) {
      if (!item || !item.src) return;
      var fig = document.createElement("figure");
      var boy = item.boy || "third";
      fig.className = "shot shot--" + boy;
      fig.setAttribute("data-reveal-mask", "");
      var img = document.createElement("img");
      img.src = mediaUrl(item.src);
      img.alt = item.baslik || "";
      img.loading = "lazy";
      img.decoding = "async";
      fig.appendChild(img);
      if (item.baslik) {
        var cap = document.createElement("figcaption");
        cap.textContent = item.baslik;
        fig.appendChild(cap);
      }
      gallery.appendChild(fig);
    });
  }

  function applyDuyuru(d) {
    var old = $("#duyuru");
    if (old) old.remove();
    document.documentElement.classList.remove("duyuru-acik");
    if (!d || !d.aktif || !d.metin) return;
    var el = document.createElement("div");
    el.className = "duyuru";
    el.id = "duyuru";
    el.textContent = d.metin;
    document.body.insertBefore(el, document.body.firstChild);
    document.documentElement.classList.add("duyuru-acik");
  }

  function applyMakaleler(list) {
    var posts = $(".posts");
    if (!posts || !list || !list.length) return;
    var existing = {};
    $all("a.post", posts).forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var parts = href.split("/").filter(Boolean);
      var slug = parts[parts.length - 1] || "";
      if (slug) existing[slug] = a;
    });
    list.forEach(function (m) {
      if (!m || !m.slug) return;
      var a = existing[m.slug];
      if (m.yayinda === false) {
        if (a) a.style.display = "none";
        return;
      }
      if (a) {
        a.style.display = "";
        var h2 = a.querySelector("h2");
        if (h2 && m.baslik) h2.textContent = m.baslik;
        var p = a.querySelector("p");
        if (p && m.ozet != null) p.textContent = m.ozet;
        var b = a.querySelector(".post__meta b");
        if (b && m.kategori) b.textContent = m.kategori;
        var time = a.querySelector("time");
        if (time && m.tarih) time.textContent = m.tarih;
        var okuma = a.querySelector(".post__okuma, .post__meta span");
        if (okuma && m.okumaSuresi) okuma.textContent = m.okumaSuresi;
        return;
      }
      if (m.statik) return;
      var card = document.createElement("a");
      card.className = "post";
      card.href = "/blog/" + encodeURIComponent(m.slug) + "/" + encodeURIComponent(m.slug);
      var meta = document.createElement("div");
      meta.className = "post__meta";
      if (m.kategori) {
        var kb = document.createElement("b");
        kb.textContent = m.kategori;
        meta.appendChild(kb);
      }
      if (m.tarih) {
        var t = document.createElement("time");
        t.textContent = m.tarih;
        meta.appendChild(t);
      }
      var body = document.createElement("div");
      var title = document.createElement("h2");
      title.textContent = m.baslik || "";
      body.appendChild(title);
      if (m.ozet) {
        var ozet = document.createElement("p");
        ozet.textContent = m.ozet;
        body.appendChild(ozet);
      }
      card.appendChild(meta);
      card.appendChild(body);
      posts.insertBefore(card, posts.firstChild);
    });
  }

  function applyMakaleDetay(list) {
    var path = (location.pathname || "").replace(/\/+$/, "");
    var m = path.match(/\/blog\/([^/]+)/);
    if (!m || m[1] === "blog") return;
    var slug = decodeURIComponent(m[1]);
    var article = null;
    (list || []).forEach(function (x) {
      if (x && x.slug === slug) article = x;
    });
    if (!article) return;
    var root = $(".article");
    if (!root) return;

    var h1 = root.querySelector(".article__head h1") || root.querySelector("h1");
    if (h1 && article.baslik) h1.textContent = article.baslik;

    var lead = root.querySelector(".article__lead");
    if (lead && article.ozet != null && article.ozet !== "") lead.textContent = article.ozet;

    var crumbCurrent = root.querySelector('.crumbs [aria-current="page"]');
    if (crumbCurrent && article.baslik) crumbCurrent.textContent = article.baslik;

    var meta = root.querySelector(".article__meta");
    if (meta) {
      var time = meta.querySelector("time");
      if (time && article.tarih) time.textContent = article.tarih;
      var spans = Array.prototype.slice.call(meta.querySelectorAll("span"));
      spans.forEach(function (sp) {
        var t = (sp.textContent || "").trim();
        if (article.okumaSuresi && /okuma/i.test(t)) sp.textContent = article.okumaSuresi;
        else if (article.kategori && t && t !== "·" && !/okuma/i.test(t) && !/^\d/.test(t)) {
          // kategori span (son anlamlı metin)
        }
      });
      if (article.okumaSuresi) {
        var okumaEl = spans.filter(function (sp) {
          return /okuma/i.test(sp.textContent || "");
        })[0];
        if (okumaEl) okumaEl.textContent = article.okumaSuresi;
        else if (spans.length >= 2) {
          var candidate = spans[1];
          if (candidate && (candidate.textContent || "").trim() !== "·") {
            candidate.textContent = article.okumaSuresi;
          }
        }
      }
      if (article.kategori) {
        var katEl = spans.filter(function (sp) {
          var t = (sp.textContent || "").trim();
          return t && t !== "·" && !/okuma/i.test(t);
        }).pop();
        if (katEl) katEl.textContent = article.kategori;
      }
    }

    if (!article.govdeHtml) return;
    var head = root.querySelector(".article__head");
    var related = root.querySelector("aside.related");
    if (!head) return;
    var node = head.nextSibling;
    while (node && node !== related) {
      var next = node.nextSibling;
      root.removeChild(node);
      node = next;
    }
    var wrap = document.createElement("div");
    // Guard: older seeds may include a full article__head — strip it
    var raw = String(article.govdeHtml);
    raw = raw.replace(/<nav class="crumbs"[\s\S]*?<\/nav>/i, "");
    raw = raw.replace(/<header class="article__head"[\s\S]*?<\/header>/i, "");
    wrap.innerHTML = raw.trim();
    var before = related || null;
    while (wrap.firstChild) {
      root.insertBefore(wrap.firstChild, before);
    }
  }

  function initReviewsSlider() {
    var track = $("#yorumlarTrack");
    if (!track) return;
    if (typeof track._reviewsCleanup === "function") {
      track._reviewsCleanup();
      track._reviewsCleanup = null;
    }

    var cards = Array.prototype.slice.call(track.querySelectorAll(":scope > .yorum, :scope > figure"));
    if (!cards.length) cards = Array.prototype.slice.call(track.children);
    if (!cards.length) return;

    var currentIndex = 0;
    var prevBtn = $("#reviewPrev");
    var nextBtn = $("#reviewNext");
    var currentEl = $("#reviewCurrent");
    var totalEl = $("#reviewTotal");
    var dotsContainer = $("#reviewsDots");
    var stage = track.closest(".reviews-stage") || track;
    var autoTimer = null;
    var startX = 0;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }

    var progressEl = $("#reviewsProgress");
    var AUTO_MS = 5500;

    track.style.transform = "";
    if (totalEl) totalEl.textContent = pad(cards.length);

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      cards.forEach(function (_, idx) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "reviews-dot" + (idx === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", "Yorum " + (idx + 1));
        dot.onclick = function () { goToSlide(idx); resetTimer(); };
        dotsContainer.appendChild(dot);
      });
    }

    function restartProgress() {
      if (!progressEl) return;
      progressEl.style.transition = "none";
      progressEl.style.width = "0%";
      void progressEl.offsetWidth;
      if (reducedMotion || cards.length < 2) return;
      progressEl.style.transition = "width " + AUTO_MS + "ms linear";
      progressEl.style.width = "100%";
    }

    function updateSlider() {
      if (currentEl) currentEl.textContent = pad(currentIndex + 1);
      cards.forEach(function (card, idx) {
        var active = idx === currentIndex;
        card.classList.toggle("is-active", active);
        card.setAttribute("aria-hidden", active ? "false" : "true");
      });
      if (dotsContainer) {
        Array.prototype.forEach.call(dotsContainer.children, function (d, i) {
          d.classList.toggle("is-active", i === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      if (index < 0) index = cards.length - 1;
      if (index >= cards.length) index = 0;
      currentIndex = index;
      updateSlider();
    }

    function onPrev() { goToSlide(currentIndex - 1); resetTimer(); }
    function onNext() { goToSlide(currentIndex + 1); resetTimer(); }
    function onTouchStart(e) { startX = e.touches[0].clientX; }
    function onTouchEnd(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
        resetTimer();
      }
    }
    function onEnter() {
      if (autoTimer) clearInterval(autoTimer);
      if (progressEl) {
        progressEl.style.transition = "none";
        progressEl.style.width = "0%";
      }
    }
    function onLeave() { resetTimer(); }

    if (prevBtn) prevBtn.onclick = onPrev;
    if (nextBtn) nextBtn.onclick = onNext;
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);

    function resetTimer() {
      if (autoTimer) clearInterval(autoTimer);
      restartProgress();
      if (reducedMotion || cards.length < 2) return;
      autoTimer = setInterval(function () {
        goToSlide(currentIndex + 1);
        restartProgress();
      }, AUTO_MS);
    }

    track._reviewsCleanup = function () {
      if (autoTimer) clearInterval(autoTimer);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      if (prevBtn) prevBtn.onclick = null;
      if (nextBtn) nextBtn.onclick = null;
    };

    goToSlide(0);
    resetTimer();
  }

  function getGroupCategoryHref(groupName) {
    if (!groupName) return "/urunler";
    var g = groupName.toLowerCase()
      .replace(/ı/g, "i").replace(/İ/g, "i")
      .replace(/ş/g, "s").replace(/ğ/g, "g")
      .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c");
    if (g.indexOf("eksi maya") > -1) return "/urunler/eksi-mayali-ekmekler/eksi-mayali-ekmekler";
    if (g.indexOf("ekmek") > -1) return "/urunler/ekmek-cesitleri/ekmek-cesitleri";
    if (g.indexOf("galeta") > -1 || g.indexOf("cubuk") > -1 || g.indexOf("kokteyl") > -1) return "/urunler/galeta-cubuk-kokteyl/galeta-cubuk-kokteyl";
    if (g.indexOf("simit") > -1 || g.indexOf("pogaca") > -1 || g.indexOf("acma") > -1) return "/urunler/simit-pogaca-acma/simit-pogaca-acma";
    if (g.indexOf("buyuk kurabiye") > -1) return "/urunler/buyuk-kurabiyeler/buyuk-kurabiyeler";
    if (g.indexOf("kurabiye") > -1) return "/urunler/kurabiye-cesitleri/kurabiye-cesitleri";
    if (g.indexOf("tek pasta") > -1 || g.indexOf("dilim") > -1) return "/urunler/tek-pasta-dilim/tek-pasta-dilim";
    if (g.indexOf("tartolet") > -1 || g.indexOf("rulo") > -1 || g.indexOf("lezzet") > -1) return "/urunler/tartolet-rulo-lezzet-toplari/tartolet-rulo-lezzet-toplari";
    if (g.indexOf("baklava") > -1 || g.indexOf("serbetli") > -1) return "/urunler/baklava-serbetli/baklava-serbetli";
    if (g.indexOf("sutlu") > -1) return "/urunler/sutlu-tatlilar/sutlu-tatlilar";
    if (g.indexOf("zeytinyag") > -1) return "/urunler/zeytinyagli-urunler/zeytinyagli-urunler";
    if (g.indexOf("icecek") > -1) return "/urunler/icecekler/icecekler";
    if (g.indexOf("donut") > -1) return "/urunler/donut/donut";
    if (g.indexOf("pasta") > -1) return "/urunler/pastalar/pastalar";
    return "/urunler";
  }

  // Homepage menu: category headers stay on category; product rows go to product detail
  document.addEventListener("click", function (e) {
    if (document.body.classList.contains("page")) return;
    if (e.target.closest(".related, .urun-kart, aside.urun-yan, .cta-box, .foot, .wa-float, .cart-float, .cart-drawer, .cart-overlay, .nav, .mobile-menu")) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var productA = e.target.closest("#menu a[data-product-link]");
    if (productA) {
      var ph = productA.getAttribute("href") || "";
      if (ph && ph !== "#") {
        e.preventDefault();
        e.stopPropagation();
        window.location.assign(resolveHref(ph));
        return;
      }
    }

    var a = e.target.closest("#menu a[data-cat-link], #menu .menu__group h3 a, #menu .menu__tum");
    if (a) {
      var href = a.getAttribute("href") || "";
      if (href && href !== "#" && !/wa\.me|whatsapp/i.test(href)) {
        e.preventDefault();
        e.stopPropagation();
        window.location.assign(resolveHref(href));
        return;
      }
    }

    var item = e.target.closest("#menu .menu__group .menu__list li");
    if (!item) return;
    var rowA = item.querySelector("a[data-product-link], a");
    if (rowA && rowA.getAttribute("data-product-link")) {
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(resolveHref(rowA.getAttribute("href") || "#"));
      return;
    }
  }, true);

  function applyYorumlarData(list) {
    if (!list || !list.length) {
      initReviewsSlider();
      return;
    }
    var track = $("#yorumlarTrack");
    if (!track) return;
    var dogrulama = (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.yorumlarMeta && window.__FIRINCI_CONTENT.yorumlarMeta.dogrulamaEtiketi) || "Doğrulanmış Google Yorumu";
    track.innerHTML = "";
    list.forEach(function (y, idx) {
      var fig = document.createElement("figure");
      fig.className = "yorum" + (idx === 0 ? " is-active" : "");

      var stars = Math.max(1, Math.min(5, Number(y.yildiz) || 5));
      var yildiz = document.createElement("div");
      yildiz.className = "yorum__yildiz";
      yildiz.setAttribute("aria-label", "5 üzerinden " + stars + " yıldız");
      yildiz.textContent = "★".repeat(stars);
      fig.appendChild(yildiz);

      var bq = document.createElement("blockquote");
      var text = String(y.metin || "").trim().replace(/^[“"']+|[”"']+$/g, "");
      bq.textContent = text;
      fig.appendChild(bq);

      var fc = document.createElement("figcaption");
      var name = y.ad || y.isim || "Müşteri";
      var initials = name.split(/\s+/).filter(Boolean).map(function (w) { return w.charAt(0); }).join("").toUpperCase().slice(0, 2) || "M";
      var avatar = document.createElement("div");
      avatar.className = "yorum__avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = initials;
      fc.appendChild(avatar);

      var meta = document.createElement("div");
      meta.className = "yorum__meta";
      var b = document.createElement("b");
      b.textContent = name;
      var span = document.createElement("span");
      span.textContent = (y.unvan || ((window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.yorumlarMeta && window.__FIRINCI_CONTENT.yorumlarMeta.unvanVarsayilan) || "Müşteri")) + " · " + dogrulama;
      meta.appendChild(b);
      meta.appendChild(span);
      fc.appendChild(meta);

      fig.appendChild(fc);
      track.appendChild(fig);
    });
    initReviewsSlider();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReviewsSlider);
  } else {
    initReviewsSlider();
  }

  function applyAll(data) {
    if (!data) return;
    window.__FIRINCI_CONTENT = data;
    // Homepage sections are SSR in Next (`/`). Only apply home DOM on legacy home HTML.
    var home = isHomePage();
    if (home) {
      applyDuyuru(data.duyuru);
      applyNavbar(data.navbar);
      applyHero(data.hero);
      applyMarquee(data.marquee);
      applyHakkimizda(data.hakkimizda);
      if (data.bolumlar) {
        applyBolum("menu", data.bolumlar.menu);
        applyBolum("galeri", data.bolumlar.galeri);
        applyBolum("yorumlar", data.bolumlar.yorumlar);
        applyBolum("sss", data.bolumlar.sss);
      }
      applyMenu(data.menu);
      applyGaleri(data.galeri);
      if (data.yorumlar) applyYorumlarData(data.yorumlar);
      else initReviewsSlider();
      applyPasta(data.pasta);
      applyIletisim(data.iletisim);
      applySeo(data.seo);
      applyFooter(data.footer, data.images);
      applyWaFloat(data.waFloat, data.iletisim);
      applyYorumlarMeta(data.yorumlarMeta);
      applyLegal(data.legal);
    } else {
      applyNavbar(data.navbar);
      if (data.menu) {
        applyKatlar(data.menu);
        applyUrunKategori(data.menu);
        applyUrunDetay(data.menu);
      }
      renderCartBadge();
      applySayfalar(data.sayfalar);
      applyMakaleler(data.makaleler);
      applyMakaleDetay(data.makaleler);
      applyIletisim(data.iletisim);
      applySeo(data.seo);
      applyFooter(data.footer, data.images);
      applyWaFloat(data.waFloat, data.iletisim);
      applyLegal(data.legal);
    }

    if (window.__firinciApplySiteImages && data.images) {
      window.__firinciApplySiteImages(data.images);
    } else if (data.images && data.images.logo) {
      ensureNavLogoImg();
      var navImg = $(".nav__logo-img");
      if (navImg) {
        navImg.src = mediaUrl(data.images.logo);
        navImg.hidden = false;
        navImg.removeAttribute("hidden");
        var logoLink = $(".nav__logo");
        if (logoLink) logoLink.classList.add("has-logo");
      }
    }
    if (typeof window.__firinciEfekt === "function") {
      window.__firinciEfekt(document);
    } else if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }


  (window.__firinciContentPromise ||
    fetch("/api/content", { headers: { Accept: "application/json" } }).then(function (r) {
      return r.ok ? r.json() : null;
    })
  )
    .then(function (payload) {
      if (!payload || payload.kaynak !== "db" || !payload.data) {
        initReviewsSlider();
        return;
      }
      applyAll(payload.data);
    })
    .catch(function () {
      initReviewsSlider();
      try { ensureNavActions({}); } catch (e) {}
    });

  window.addEventListener("storage", function () {
    if (typeof syncNavCartBadge === "function") syncNavCartBadge();
    if (typeof syncNavFavBadge === "function") syncNavFavBadge();
  });
  window.addEventListener("firinci-cart", function () {
    if (typeof syncNavCartBadge === "function") syncNavCartBadge();
  });
  window.addEventListener("firinci-fav", function () {
    if (typeof syncNavFavBadge === "function") syncNavFavBadge();
  });

window.__firinciApplyCms = applyAll;
})();