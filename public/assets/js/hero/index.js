import { CanvasEngine } from './canvas-engine.js?v=20260821m105';
import { ASSETS } from './config.js?v=20260821m105';
import { range } from './utils.js?v=20260821m105';

window.__FIRINCI_SCENE = window.__FIRINCI_SCENE || 'loading';

function el() {
  return {
    canvas: document.getElementById('scene'),
    fallback: document.getElementById('fallback'),
    gate: document.querySelector('.gate'),
    scrollHint: document.getElementById('scrollHint'),
    gateBoot: document.getElementById('gateBoot'),
  };
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(pointer: coarse)').matches;

/** Dar ekran — DevTools device mode dahil (yalnız matchMedia) */
function isNarrow() {
  return matchMedia('(max-width: 860px)').matches;
}

function absUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return url;
  return '/' + url.replace(/^\.\//, '');
}

function safeHeroUrl(preferred, fallbackUrl) {
  const p = absUrl(preferred);
  const f = absUrl(fallbackUrl);
  if (p) return p;
  if (f) return f;
  return absUrl(ASSETS.cephe) || '/assets/img/hero-cephe.webp';
}

function hideBoot() {
  const { gateBoot } = el();
  if (!gateBoot) return;
  gateBoot.hidden = true;
  gateBoot.setAttribute('aria-hidden', 'true');
}

function markReady() {
  document.documentElement.classList.add('scene-ready');
  document.documentElement.classList.remove('scene-failed', 'scene-poster');
  hideBoot();
}

function markPainted() {
  document.documentElement.classList.add('scene-painted');
}

function showPoster(reason) {
  const { canvas, fallback, scrollHint } = el();
  window.__FIRINCI_SCENE = reason === 'fail' ? 'fail' : 'poster';
  console.info('[Fırıncı] Hero poster:', reason || 'poster');
  hideBoot();

  if (canvas) {
    canvas.style.display = 'none';
    canvas.style.opacity = '0';
    canvas.style.pointerEvents = 'none';
    canvas.setAttribute('aria-hidden', 'true');
  }

  document.documentElement.classList.remove('scene-ready', 'scene-painted');
  document.documentElement.classList.toggle('scene-failed', reason === 'fail');
  document.documentElement.classList.add('scene-poster');

  const poster = document.querySelector('.gate__poster');
  const images = window.__FIRINCI_CONTENT?.images || {};
  if (poster) {
    const mobileUrl =
      absUrl(images.heroMobile || images.heroPoster || images.heroCephe) ||
      absUrl(ASSETS.mobile) ||
      '/assets/img/hero-mobile.webp';
    const desktopSafe = safeHeroUrl(images.heroPoster, images.heroCephe || ASSETS.cephe);
    poster.src = isNarrow() ? mobileUrl : desktopSafe;
    poster.style.opacity = '1';
    poster.style.visibility = 'visible';
    poster.removeAttribute('hidden');
  }
  if (fallback) fallback.hidden = true;

  if (scrollHint) {
    scrollHint.style.opacity = '1';
    scrollHint.style.visibility = 'visible';
  }
}

function fail(reason) {
  console.warn('[Fırıncı] 3B sahne devre dışı:', reason);
  showPoster('fail');
}

function updateUi(progress) {
  const { scrollHint } = el();
  const gateIntro = document.getElementById('gateIntro');
  const heroWelcome = document.getElementById('heroWelcome');
  if (scrollHint) {
    const fade = 1 - range(progress, 0.18, 0.48);
    scrollHint.style.opacity = String(fade);
    scrollHint.style.visibility = fade < 0.05 ? 'hidden' : 'visible';
    scrollHint.style.left = '';
    scrollHint.style.top = '';
    scrollHint.style.right = '';
    scrollHint.style.bottom = '';
    scrollHint.style.transform = '';
  }
  if (gateIntro) {
    const fadeOut = 1 - range(progress, 0.08, 0.36);
    gateIntro.style.opacity = String(fadeOut);
    gateIntro.style.pointerEvents = fadeOut < 0.05 ? 'none' : 'auto';
  }
  if (heroWelcome) {
    const enabled =
      heroWelcome.getAttribute('data-welcome-aktif') === '1' ||
      window.__FIRINCI_CONTENT?.hero?.welcomeAktif === true;
    if (!enabled) {
      heroWelcome.hidden = true;
      heroWelcome.classList.add('is-off');
      heroWelcome.style.opacity = '0';
      heroWelcome.style.visibility = 'hidden';
      heroWelcome.setAttribute('aria-hidden', 'true');
    } else {
      heroWelcome.hidden = false;
      heroWelcome.classList.remove('is-off');
      const fadeIn = range(progress, 0.22, 0.48);
      const fadeOut = 1 - range(progress, 0.7, 0.92);
      const opacity = Math.max(0, Math.min(1, fadeIn * fadeOut));
      const rise = (1 - fadeIn) * 20;
      heroWelcome.style.opacity = String(opacity);
      heroWelcome.style.visibility = opacity < 0.04 ? 'hidden' : 'visible';
      heroWelcome.setAttribute('aria-hidden', opacity < 0.1 ? 'true' : 'false');
      heroWelcome.style.left = '';
      heroWelcome.style.right = '';
      heroWelcome.style.top = '';
      heroWelcome.style.bottom = '';
      heroWelcome.style.width = '';
      heroWelcome.style.transform = `translateY(${rise}px)`;
    }
  }
}

/** Ana thread'i kısa bırak — scroll/tap donmasın */
function yieldFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

/** CMS hazır olana kısa bekle — yarışta yanlış yolu seçmeyi azaltır */
function waitForContent(ms = 400) {
  if (window.__FIRINCI_CONTENT?.images) return Promise.resolve();
  return new Promise((resolve) => {
    const t0 = performance.now();
    const tick = () => {
      if (window.__FIRINCI_CONTENT?.images || performance.now() - t0 > ms) {
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

async function resolveAssets() {
  await waitForContent();
  const cached = window.__FIRINCI_CONTENT?.images;
  return {
    cephe: safeHeroUrl(cached?.heroCephe, ASSETS.cephe),
    ic: safeHeroUrl(cached?.heroIc, ASSETS.ic),
  };
}

let posterScrollBound = false;
function bindPosterScroll() {
  const { gate } = el();
  if (!gate || posterScrollBound) return;
  posterScrollBound = true;
  const onScroll = () => {
    const g = el().gate;
    if (!g) return;
    const max = Math.max(1, g.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    updateUi(progress);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function waitForStage(node, ms = 1800) {
  const stage = node?.parentElement || node;
  if (stage && stage.clientWidth > 8 && stage.clientHeight > 8) {
    return Promise.resolve(true);
  }
  return new Promise((resolve) => {
    const t0 = performance.now();
    const tick = () => {
      const r = stage?.getBoundingClientRect?.();
      if (r && r.width > 8 && r.height > 8) {
        resolve(true);
        return;
      }
      if (performance.now() - t0 > ms) {
        resolve(false);
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

let engineRef = null;
let booting = false;

async function start3D() {
  const { canvas, gate } = el();
  if (!canvas || !gate) {
    fail('canvas veya gate bulunamadı');
    return;
  }

  canvas.style.display = '';
  canvas.style.opacity = '';
  canvas.style.pointerEvents = '';
  canvas.removeAttribute('aria-hidden');
  document.documentElement.classList.remove('scene-poster', 'scene-failed', 'scene-painted');

  await waitForStage(canvas);
  await yieldFrame();
  const assets = await resolveAssets();
  await yieldFrame();

  try {
    const engine = new CanvasEngine(canvas, gate, {
      isMobile: isNarrow(),
      isTouch,
      reducedMotion,
      assets,
      onContextLost: () => fail('WebGL context lost'),
      onProgress: (p) => updateUi(p),
      onFirstPaint: () => {
        markPainted();
        hideBoot();
      },
    });

    await engine.init();
    engineRef = engine;
    window.__FIRINCI_SCENE = 'ok';
    window.__firinciHeroRefresh = () => engine.refreshScroll();
    window.__firinciHeroResize = () => engine.onResize();
    window.__firinciHeroSetAssets = function () {};
    markReady();
    // Poster, ilk kare boyanana kadar kalsın (scene-painted)
    if (engine.hasPainted) markPainted();
    window.setTimeout(() => {
      if (!engine.hasPainted) {
        engine.onResize();
        engine.refreshScroll();
        engine._mustPaint = 8;
      }
    }, 400);
    window.setTimeout(() => {
      if (!engine.hasPainted && window.__FIRINCI_SCENE === 'ok') {
        showPoster('no-first-paint');
        bindPosterScroll();
      }
    }, 2500);
  } catch (err) {
    fail(err?.message || String(err));
    bindPosterScroll();
  }

}

async function boot() {
  if (booting) return;
  const { canvas, gate } = el();
  if (!canvas || !gate) {
    return;
  }

  if (reducedMotion) {
    if (engineRef) {
      try {
        engineRef.destroy();
      } catch {
        /* ignore */
      }
      engineRef = null;
    }
    showPoster('reduced-motion');
    bindPosterScroll();
    return;
  }

  if (engineRef && (!el().canvas || engineRef.canvas !== el().canvas || !document.contains(engineRef.canvas))) {
    hardResetHero();
  }

  if (engineRef && window.__FIRINCI_SCENE === 'ok') {
    engineRef.visible = true;
    engineRef._mustPaint = 8;
    engineRef.onResize();
    engineRef.refreshScroll();
    markReady();
    if (engineRef.hasPainted) markPainted();
    return;
  }

  booting = true;
  window.__FIRINCI_SCENE = 'loading';

  const bootWatch = window.setTimeout(() => {
    if (window.__FIRINCI_SCENE === 'loading') {
      fail('hero yükleme zaman aşımı');
      bindPosterScroll();
    }
  }, isNarrow() ? 8000 : 12000);

  try {
    await start3D();
  } finally {
    window.clearTimeout(bootWatch);
    booting = false;
  }
}

window.__firinciHeroBoot = boot;
window.__firinciHeroReset = hardResetHero;

function hardResetHero() {
  if (engineRef) {
    try {
      engineRef.destroy();
    } catch {
      /* ignore */
    }
    engineRef = null;
  }
  window.__FIRINCI_SCENE = undefined;
  window.__firinciHeroResize = undefined;
  window.__firinciHeroRefresh = undefined;
  const canvas = el().canvas;
  if (canvas) {
    canvas.style.display = '';
    canvas.style.opacity = '';
    canvas.style.pointerEvents = '';
    canvas.removeAttribute('aria-hidden');
  }
  document.documentElement.classList.remove(
    'scene-poster',
    'scene-failed',
    'scene-painted',
    'scene-ready',
  );
}

try {
  window.addEventListener('pageshow', (e) => {
    document.documentElement.classList.remove('menu-open');
    document.documentElement.style.removeProperty('overflow');
    document.body.style.removeProperty('overflow');
    const canvas = el().canvas;
    if (!canvas) return;
    if (e.persisted || (engineRef && engineRef.canvas !== canvas)) {
      hardResetHero();
      booting = false;
      boot();
    } else if (engineRef) {
      engineRef.visible = true;
      engineRef._mustPaint = 8;
      engineRef.onResize();
      engineRef.refreshScroll();
    }
  });
} catch {
  /* ignore */
}

try {
  const mq = matchMedia('(max-width: 860px)');
  let lastNarrow = mq.matches;
  mq.addEventListener('change', (e) => {
    if (e.matches === lastNarrow) return;
    lastNarrow = e.matches;
    hardResetHero();
    booting = false;
    boot();
  });
} catch {
  /* eski tarayıcı */
}

boot();
