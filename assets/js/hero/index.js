import { CanvasEngine } from './canvas-engine.js';
import { ASSETS } from './config.js';
import { range } from './utils.js';

window.__FIRINCI_SCENE = 'loading';

const canvas = document.getElementById('scene');
const fallback = document.getElementById('fallback');
const gate = document.querySelector('.gate');
const scrollHint = document.getElementById('scrollHint');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(pointer: coarse)').matches;
const isNarrow = matchMedia('(max-width: 860px)').matches || window.innerWidth <= 860;
const isMobile = isTouch || isNarrow;

function markReady() {
  document.documentElement.classList.add('scene-ready');
}

function fail(reason) {
  window.__FIRINCI_SCENE = 'fail';
  console.warn('[Fırıncı] 3B sahne devre dışı:', reason);
  if (canvas) canvas.style.display = 'none';
  if (fallback) fallback.hidden = false;
  markReady();
}

function updateUi(progress) {
  const gateIntro = document.getElementById('gateIntro');
  const heroWelcome = document.getElementById('heroWelcome');
  if (scrollHint) {
    // Stay readable at start; fade only after doors begin opening
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
      // Kapı açılırken belir, bölüm bitmeden nazikçe kaybol
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

async function resolveAssets() {
  const cached = window.__FIRINCI_CONTENT?.images;
  if (cached) {
    return {
      cephe: cached.heroCephe || ASSETS.cephe,
      ic: cached.heroIc || ASSETS.ic,
    };
  }
  try {
    const res = await fetch('/api/content', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      const img = json?.data?.images;
      if (img) {
        return {
          cephe: img.heroCephe || ASSETS.cephe,
          ic: img.heroIc || ASSETS.ic,
        };
      }
    }
  } catch {
    /* statik fallback */
  }
  return { ...ASSETS };
}

async function boot() {
  if (!canvas || !gate) {
    fail('canvas veya gate bulunamadı');
    return;
  }

  // Telefon / dar ekran: statik poster hero (referans gibi net fotoğraf).
  // WebGL kapı sahnesi masaüstünde kalır; mobilde beyaz/boş canvas riski olmaz.
  if (isMobile) {
    window.__FIRINCI_SCENE = 'poster';
    if (canvas) {
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
    }
    document.documentElement.classList.remove('scene-ready');
    if (scrollHint) {
      scrollHint.style.opacity = '1';
      scrollHint.style.visibility = 'visible';
    }
    const onScroll = () => {
      const max = Math.max(1, gate.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      updateUi(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    console.info('[Fırıncı] Mobil hero: statik poster.');
    return;
  }

  const assets = await resolveAssets();
  const engine = new CanvasEngine(canvas, gate, {
    isMobile,
    isTouch,
    reducedMotion,
    assets,
  });

  try {
    await engine.init();
    window.__FIRINCI_SCENE = 'ok';
    window.__firinciHeroRefresh = () => engine.refreshScroll();
    markReady();
    console.info('[Fırıncı] 3B hero motoru aktif.');

    const tickUi = () => {
      updateUi(engine.smoothProgress);
      requestAnimationFrame(tickUi);
    };
    tickUi();
  } catch (err) {
    fail(err?.message || String(err));
  }
}

boot();
