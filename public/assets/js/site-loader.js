(function () {
  'use strict';

  function applySeoTags(seo, images) {
    if (seo) {
      if (seo.title) document.title = seo.title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc && seo.description) desc.setAttribute("content", seo.description);
      var ogt = document.querySelector('meta[property="og:title"]');
      if (ogt) ogt.setAttribute("content", seo.ogTitle || seo.title || "");
      var ogd = document.querySelector('meta[property="og:description"]');
      if (ogd) ogd.setAttribute("content", seo.ogDescription || seo.description || "");
      var ogs = document.querySelector('meta[property="og:site_name"]');
      if (ogs && seo.siteName) ogs.setAttribute("content", seo.siteName);
      var ogu = document.querySelector('meta[property="og:url"]');
      if (ogu && seo.canonicalUrl) ogu.setAttribute("content", seo.canonicalUrl);
      var can = document.querySelector('link[rel="canonical"]');
      if (can && seo.canonicalUrl) can.setAttribute("href", seo.canonicalUrl);
      var theme = document.querySelector('meta[name="theme-color"]');
      if (theme && seo.themeColor) theme.setAttribute("content", seo.themeColor);
    }
    applyMeta(images);
  }

  function applyMeta(images) {
    if (!images || !images.ogImage) return;
    var url = images.ogImage;
    if (!url.startsWith('http') && !url.startsWith('/')) url = '/' + url.replace(/^\//, '');
    var og = document.querySelector('meta[property="og:image"]');
    if (og) og.setAttribute('content', url.startsWith('http') ? url : window.location.origin + url);
    var tw = document.querySelector('meta[name="twitter:image"]');
    if (tw) tw.setAttribute('content', url.startsWith('http') ? url : window.location.origin + url);
  }

  function applyImages(images) {
    if (!images) return;

    // Vercel'de gitignore'lu /uploads yolları 404 olur — hero poster'ı kırık bırakma
    var safe = Object.assign({}, images);
    if (safe.heroPoster && /\/uploads\//i.test(safe.heroPoster)) {
      safe.heroPoster = safe.heroCephe || "/assets/img/hero-cephe.webp";
    }
    if (safe.heroCephe && /\/uploads\//i.test(safe.heroCephe)) {
      safe.heroCephe = "/assets/img/hero-cephe.webp";
    }
    if (safe.heroIc && /\/uploads\//i.test(safe.heroIc)) {
      safe.heroIc = "/assets/img/hero-ic.webp";
    }
    images = safe;

    var sceneLive =
      window.__FIRINCI_SCENE === 'ok' ||
      document.documentElement.classList.contains('scene-ready');
    var isMobileHero =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(max-width: 860px)').matches;
    var mobileHeroUrl = images.heroMobile || '/assets/img/hero-mobile.webp?v=20260806r1';
    if (mobileHeroUrl.indexOf('http') !== 0 && mobileHeroUrl.indexOf('/') !== 0) {
      mobileHeroUrl = '/' + mobileHeroUrl.replace(/^\//, '');
    }
    if (mobileHeroUrl.indexOf('hero-mobile') !== -1 && mobileHeroUrl.indexOf('?v=') === -1) {
      mobileHeroUrl += (mobileHeroUrl.indexOf('?') > -1 ? '&' : '?') + 'v=20260806r1';
    }

    document.querySelectorAll('[data-site]').forEach(function (el) {
      var key = el.getAttribute('data-site');
      var url = images[key];
      if (!url) return;
      url = url.indexOf("http") === 0 || url.indexOf("/") === 0 ? url : "/" + url.replace(/^\//, "");

      // 3B sahne açıkken poster'ı yatay cepheyle ezme (kesik tabela bug'ı)
      if (
        sceneLive &&
        (key === 'heroPoster' || (el.classList && el.classList.contains('gate__poster')))
      ) {
        return;
      }

      if (isMobileHero && (key === 'heroPoster' || (el.classList && el.classList.contains('gate__poster')))) {
        url = mobileHeroUrl;
      }

      if (el.tagName === 'IMG') {
        el.src = url;
        el.removeAttribute('hidden');
        el.hidden = false;
        if (url.indexOf('/uploads/') === 0 || /\.svg(\?|$)/i.test(url)) el.removeAttribute('srcset');
      } else if (el.tagName === 'SOURCE' && el.parentElement && el.parentElement.tagName === 'PICTURE') {
        if (isMobileHero) el.srcset = mobileHeroUrl;
        else el.srcset = url;
      } else if (el.tagName === 'LINK' && el.rel === 'preload') {
        if (isMobileHero && key === 'heroPoster') return;
        el.href = url;
      } else if (el.tagName === 'LINK' && (el.rel === 'icon' || el.rel === 'shortcut icon' || el.rel === 'apple-touch-icon')) {
        el.href = url;
        if (/\.svg(\?|$)/i.test(url)) el.setAttribute('type', 'image/svg+xml');
        else if (/\.png(\?|$)/i.test(url)) el.setAttribute('type', 'image/png');
        else el.removeAttribute('type');
      }
    });

    applyBrandLogo(images.logo);

    try {
      var nav = (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.navbar) || {};
      localStorage.setItem(
        "firinci_brand",
        JSON.stringify({
          logo: images.logo || "",
          logoSize: nav.logoSize || 64,
          logoTextGizle: nav.logoTextGizle !== false,
          logoText: nav.logoText || (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.brand && window.__FIRINCI_CONTENT.brand.shortName) || "FIRINCI",
        })
      );
    } catch (e) {}

    window.__FIRINCI_CONTENT = window.__FIRINCI_CONTENT || {};
    window.__FIRINCI_CONTENT.images = images;

    if (window.__firinciHeroSetAssets) {
      window.__firinciHeroSetAssets({
        cephe: images.heroCephe || 'assets/img/cephe.jpg',
        ic: images.heroIc || 'assets/img/ic-mekan.jpg',
      });
    }
  }

  function applyBrandLogo(logoUrl) {
    if (!logoUrl) return;
    var url = logoUrl.indexOf("http") === 0 || logoUrl.indexOf("/") === 0 ? logoUrl : "/" + logoUrl.replace(/^\//, "");
    var bust = url + (url.indexOf("?") > -1 ? "&" : "?") + "v=" + Date.now().toString().slice(-8);
    var isSvg = /\.svg(\?|$)/i.test(url);

    var nav = (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.navbar) || {};
    var size = Math.max(32, Math.min(120, Number(nav.logoSize) || 64));
    var hideText = nav.logoTextGizle !== false;

    var logoLink = document.querySelector(".nav__logo");
    var navImg = document.querySelector(".nav__logo-img");
    if (!navImg && logoLink) {
      navImg = document.createElement("img");
      navImg.className = "nav__logo-img";
      navImg.setAttribute("data-site", "logo");
      navImg.decoding = "async";
      var svg = logoLink.querySelector("svg");
      if (svg) {
        svg.classList.add("nav__logo-fallback");
        logoLink.insertBefore(navImg, svg);
      } else {
        logoLink.insertBefore(navImg, logoLink.firstChild);
      }
      var span = logoLink.querySelector("span");
      if (span) span.classList.add("nav__logo-text");
    }
    var navFallback = document.querySelector(".nav__logo-fallback") || (logoLink && logoLink.querySelector("svg"));
    var navText = document.querySelector(".nav__logo-text") || (logoLink && logoLink.querySelector("span"));
    if (navImg) {
      navImg.src = bust;
      navImg.alt = (nav.logoText || (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.brand && window.__FIRINCI_CONTENT.brand.displayName) || (window.__FIRINCI_CONTENT && window.__FIRINCI_CONTENT.seo && window.__FIRINCI_CONTENT.seo.siteName) || "Fırıncı") + " logosu";
      navImg.classList.toggle("is-svg", isSvg);
      navImg.removeAttribute("width");
      navImg.removeAttribute("height");
      navImg.style.setProperty("--nav-logo-size", size + "px");
      navImg.style.height = size + "px";
      navImg.style.width = "auto";
      navImg.hidden = false;
      navImg.removeAttribute("hidden");
      if (navFallback) navFallback.setAttribute("hidden", "");
      if (logoLink) logoLink.classList.add("has-logo");
      if (hideText && navText) {
        navText.setAttribute("hidden", "");
        navText.style.display = "none";
      }
      document.documentElement.style.setProperty("--nav-h", Math.max(72, size + 20) + "px");
    }

    var footMark = document.querySelector(".foot__mark");
    if (footMark) {
      footMark.src = bust;
      footMark.removeAttribute("srcset");
      footMark.classList.toggle("is-svg", isSvg);
    }
  }

  (window.__firinciContentPromise ||
    fetch('/api/content', { headers: { Accept: 'application/json' } }).then(function (r) {
      return r.ok ? r.json() : null;
    })
  )
    .then(function (payload) {
      if (!payload || payload.kaynak !== 'db' || !payload.data) return;
      window.__FIRINCI_CONTENT = Object.assign({}, window.__FIRINCI_CONTENT || {}, payload.data);
      applyImages(payload.data.images);
      var isHome = !document.body.classList.contains("page");
      if (isHome) {
        applySeoTags(payload.data.seo, payload.data.images);
      } else if (payload.data.seo) {
        var seo = payload.data.seo;
        var ogs = document.querySelector('meta[property="og:site_name"]');
        if (ogs && seo.siteName) ogs.setAttribute("content", seo.siteName);
        var theme = document.querySelector('meta[name="theme-color"]');
        if (theme && seo.themeColor) theme.setAttribute("content", seo.themeColor);
        applyMeta(payload.data.images);
      }
    })
    .catch(function () {});

  window.__firinciApplySiteImages = applyImages;
})();
