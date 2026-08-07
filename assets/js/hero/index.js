import { CanvasEngine } from './canvas-engine.js?v=20260807door1';
import { ASSETS } from './config.js?v=20260807door1';
import { range } from './utils.js?v=20260807door1';

window.__FIRINCI_SCENE = 'loading';

const canvas = document.getElementById('scene');
const fallback = document.getElementById('fallback');
const gate = document.querySelector('.gate');
const scrollHint = document.getElementById('scrollHint');

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

function safeHeroUrl(preferred, fallback) {
  const p = absUrl(preferred);
  const f = absUrl(fallback);
  if (p && !/\/uploads\//i.test(p)) return p;
  if (f && !/\/uploads\//i.test(f)) return f;
  return absUrl(ASSETS.cephe) || '/assets/img/hero-cephe.webp';
}

function markReady() {
  document.documentElement.classList.add('scene-ready');
  document.documentElement.classList.remove('scene-failed', 'scene-poster');
}

function showPoster(reason) {
  window.__FIRINCI_SCENE = reason === 'fail' ? 'fail' : 'poster';
  console.info('[Fırıncı] Hero poster:', reason || 'poster');

  if (canvas) {
    canvas.style.display = 'none';
    canvas.style.opacity = '0';
    canvas.style.pointerEvents = 'none';
    canvas.setAttribute('aria-hidden', 'true');
  }

  document.documentElement.classList.remove('scene-ready');
  document.documentElement.classList.toggle('scene-failed', reason === 'fail');
  document.documentElement.classList.add('scene-poster');

  const poster = document.querySelector('.gate__poster');
  const images = window.__FIRINCI_CONTENT?.images || {};
  if (poster) {
    // WebGL yoksa: mobilde dikey kompozit, masaüstünde cephe
    const mobileUrl = absUrl(ASSETS.mobile) || '/assets/img/hero-mobile.webp';
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
  const gateIntro = document.getElementById('gateIntro');
  const heroWelcome = document.getElementById('heroWelcome');
  if (scrollHint) {
    const fade = 1 - range(progress, 0.12, 0.42);
    scrollHint.style.opacity = String(fade);
    scrollHint.style.visibility = fade < 0.05 ? 'hidden' : 'visible';
  }
  if (gateIntro) {
    const fadeOut = 1 - range(progress, 0.1, 0.45);
    gateIntro.style.opacity = String(fadeOut);
    gateIntro.style.transform = `translateY(${range(progress, 0.1, 0.45) * -35}px)`;
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
      const fadeIn = range(progress, 0.2, 0.46);
      const fadeOut = 1 - range(progress, 0.7, 0.92);
      const opacity = Math.max(0, Math.min(1, fadeIn * fadeOut));
      const rise = (1 - fadeIn) * 28;
      heroWelcome.style.opacity = String(opacity);
      heroWelcome.style.transform = `translate(-50%, calc(-50% + ${rise}px))`;
      heroWelcome.style.visibility = opacity < 0.04 ? 'hidden' : 'visible';
      heroWelcome.setAttribute('aria-hidden', opacity < 0.1 ? 'true' : 'false');
    }
  }
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
  if (!gate || posterScrollBound) return;
  posterScrollBound = true;
  const onScroll = () => {
    const max = Math.max(1, gate.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    updateUi(progress);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

async function start3D() {
  if (!canvas || !gate) {
    fail('canvas veya gate bulunamadı');
    return;
  }

  // Önceki poster stillerini temizle — canvas görünsün
  canvas.style.display = '';
  canvas.style.opacity = '';
  canvas.style.pointerEvents = '';
  canvas.removeAttribute('aria-hidden');
  document.documentElement.classList.remove('scene-poster', 'scene-failed');

  const assets = await resolveAssets();
  const engine = new CanvasEngine(canvas, gate, {
    isMobile: isNarrow(),
    isTouch,
    reducedMotion,
    assets,
  });

  try {
    await engine.init();
    window.__FIRINCI_SCENE = 'ok';
    window.__firinciHeroRefresh = () => {
      engine.onResize();
      engine.refreshScroll();
    };
    markReady();
    console.info('[Fırıncı] 3B kapı sahnesi aktif.', isNarrow() ? '(mobil)' : '(masaüstü)');

    const tickUi = () => {
      updateUi(engine.smoothProgress);
      requestAnimationFrame(tickUi);
    };
    tickUi();
  } catch (err) {
    fail(err?.message || String(err));
    bindPosterScroll();
  }
}

async function boot() {
  if (!canvas || !gate) {
    fail('canvas veya gate bulunamadı');
    return;
  }

  // Erişilebilirlik: hareket azaltılmışsa statik poster
  if (reducedMotion) {
    showPoster('reduced-motion');
    bindPosterScroll();
    return;
  }

  // Mobil + masaüstü: aynı 3B kapı animasyonu
  await start3D();
}

// Genişlik değişince kamera fitView (engine.onResize) yeter — tam reload yarış/bozulma yapıyordu
try {
  const mq = matchMedia('(max-width: 860px)');
  let lastNarrow = mq.matches;
  mq.addEventListener('change', (e) => {
    if (e.matches === lastNarrow) return;
    lastNarrow = e.matches;
    // Yalnızca dar↔geniş geçişinde bir kez yenile (DevTools device toggle)
    if (window.__firinciHeroRefresh) {
      window.__firinciHeroRefresh();
    }
  });
} catch {
  /* eski tarayıcı */
}

boot();
