import * as THREE from '../../vendor/three.module.js?v=20260821m135';
import { downscaleImage, loadHeroAssets } from './asset-loader.js?v=20260821m135';
import { ASSETS, doorTiming, setSceneFromImage, setDoorUvOverride } from './config.js?v=20260821m135';
import { ScrollController } from './scroll-controller.js?v=20260821m135';
import { DoorController } from './door-controller.js?v=20260821m135';
import { Particles } from './particles.js?v=20260821m135';
import { CameraController, createUnits } from './camera-controller.js?v=20260821m135';

function yieldFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

/** WebGL canvas motoru — render döngüsü ve sahne yaşam döngüsü */
export class CanvasEngine {
  constructor(canvas, gateEl, options) {
    this.canvas = canvas;
    this.gate = gateEl;
    this.isMobile = options.isMobile;
    this.isTouch = options.isTouch;
    this.reducedMotion = options.reducedMotion;
    this.assets = options.assets || ASSETS;
    this.onContextLost = options.onContextLost || null;
    this.onProgress = typeof options.onProgress === 'function' ? options.onProgress : null;
    this.onFirstPaint = typeof options.onFirstPaint === 'function' ? options.onFirstPaint : null;
    this.timing = doorTiming(this.isTouch);

    this.units = createUnits();
    this.scroll = new ScrollController(gateEl);
    this.targetProgress = 0;
    this.smoothProgress = 0;
    this.time = 0;
    this.visible = true;
    this.pageVisible = document.visibilityState !== 'hidden';
    this.lastInput = performance.now();
    this.idleMs = 480;
    this.ambientMs = this.isMobile ? 40 : 33; // ~25–30 fps idle
    this._lastAmbient = 0;
    this.dpr = this.isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5);
    this.maxDpr = Math.min(window.devicePixelRatio, this.isMobile ? 1.25 : 1.5);
    this.qualityReady = !this.isMobile;
    this.interiorImage = null;
    this.lastWidth = window.innerWidth;
    this.lastHeight = window.innerHeight;

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.cameraCtrl = null;
    this.door = null;
    this.particles = null;
    this.rafId = 0;
    this._lastFrame = performance.now();
    this._mustPaint = 12;
    this.hasPainted = false;
    this._ro = null;
    this._onWinScroll = () => this.onScroll();
    this._onWinResize = () => this.onResize();
    this._onPageShow = () => {
      this.visible = true;
      this._mustPaint = Math.max(this._mustPaint, 4);
      this.onResize();
    };
    this._onPointerMove = (e) => {
      this.cameraCtrl.onPointerMove(e.clientX, e.clientY);
      this.wake();
    };
    this._onPointerLeave = () => {
      if (this.cameraCtrl) {
        this.cameraCtrl.pointer.tx = 0;
        this.cameraCtrl.pointer.ty = 0;
      }
    };
    this._onContextLost = (e) => {
      e.preventDefault();
      this.destroy();
      if (this.onContextLost) this.onContextLost();
    };
    this._boundVisibility = () => {
      this.pageVisible = document.visibilityState !== 'hidden';
      if (this.pageVisible) {
        this.visible = true;
        this._mustPaint = Math.max(this._mustPaint, 4);
        this.wake(true);
      }
    };
  }

  async init() {
    const images = await loadHeroAssets(this.assets);
    await yieldFrame();

    this.interiorImage = downscaleImage(images.ic, this.isMobile);
    await yieldFrame();
    let facadeImage = downscaleImage(images.cephe, this.isMobile);
    const fw = facadeImage.naturalWidth || facadeImage.width || 16;
    const fh = facadeImage.naturalHeight || facadeImage.height || 12;
    // Kapı UV sadece 3D kapıyı taşır — fotoğraf oranı asla değişmez
    setDoorUvOverride(null);
    setSceneFromImage(fw, fh);
    this.units = createUnits();
    await yieldFrame();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.isMobile,
      powerPreference: this.isMobile ? 'default' : 'high-performance',
    });
    this.renderer.setPixelRatio(this.dpr);
    const { w, h } = this.viewportSize();
    this.renderer.setSize(w, h, false);
    this.applyCanvasCss();
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.setClearColor('#070903');
    await yieldFrame();

    const aniso = this.isMobile
      ? Math.min(4, this.renderer.capabilities.getMaxAnisotropy())
      : this.renderer.capabilities.getMaxAnisotropy();
    const facade = this.makeTexture(facadeImage, aniso);
    const interior = this.makeTexture(this.interiorImage, aniso);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      52,
      w / Math.max(1, h),
      0.05,
      300,
    );
    this.cameraCtrl = new CameraController(this.camera, this.units);
    this.cameraCtrl.fitView();

    this.door = new DoorController(this.scene, this.units);
    this.door.buildFacade(facade);
    this.rebuildInterior(interior);
    await yieldFrame();

    this.door.buildDoorFrames();
    this.door.buildGlow();
    this.particles = new Particles(this.scene, this.units, this.isMobile);

    this.scroll.mount();
    this.targetProgress = this.smoothProgress = this.scroll.update();
    this.renderFrame(this.smoothProgress);

    this.canvas.addEventListener('webglcontextlost', this._onContextLost);

    if (!this.reducedMotion) {
      this.loop();
    }

    window.addEventListener('scroll', this._onWinScroll, { passive: true });
    window.addEventListener('resize', this._onWinResize, { passive: true });
    document.addEventListener('visibilitychange', this._boundVisibility);
    window.addEventListener('pageshow', this._onPageShow);

    if (!this.isTouch) {
      window.addEventListener('pointermove', this._onPointerMove, { passive: true });
      window.addEventListener('pointerleave', this._onPointerLeave, { passive: true });
    }

    const stage = this.canvas?.parentElement;
    if (typeof ResizeObserver !== 'undefined' && stage) {
      this._ro = new ResizeObserver(() => this.onResize());
      this._ro.observe(stage);
    }

    if ('IntersectionObserver' in window && this.gate) {
      new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          const r = e?.boundingClientRect;
          // Layout henüz hazır değilse çizmeyi kesme — siyah hero’nun ana sebebi
          if (r && (r.width < 2 || r.height < 2) && !e.isIntersecting) return;
          this.visible = e.isIntersecting || (r && r.height > 8);
          if (this.visible) this.wake(true);
        },
        { threshold: 0 },
      ).observe(this.gate);
    }
  }

  makeTexture(source, aniso) {
    const tex = new THREE.Texture(source);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = aniso;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  rebuildInterior(interiorTexture) {
    const fit = this.cameraCtrl.fitInterior(
      this.interiorImage.width / this.interiorImage.height,
    );
    this.door.buildInterior(interiorTexture, fit.plane);
  }

  onScroll() {
    this.targetProgress = this.scroll.update();
    this.wake(true);
    if (this.reducedMotion) {
      this.smoothProgress = this.targetProgress;
      this.renderFrame(this.smoothProgress);
    }
  }

  refreshScroll() {
    this.onScroll();
  }

  wake(fromScroll = false) {
    this.lastInput = performance.now();
    if (!fromScroll && !this.qualityReady && this.renderer) {
      this.qualityReady = true;
      this.setDpr(this.maxDpr);
    }
  }

  viewportSize() {
    const stage = this.canvas?.parentElement;
    // Sticky stage hazır değilse window'a düş — 0x0 aspect kamerayı bozar
    let w = stage?.clientWidth || 0;
    let h = stage?.clientHeight || 0;
    if (w < 2 || h < 2) {
      w = window.innerWidth || 1;
      h = window.innerHeight || 1;
    }
    return { w: Math.max(1, Math.floor(w)), h: Math.max(1, Math.floor(h)) };
  }

  applyCanvasCss() {
    if (!this.canvas) return;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.maxWidth = '100%';
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.display = 'block';
  }

  setDpr(value) {
    if (Math.abs(value - this.dpr) < 0.05) return;
    this.dpr = value;
    this.renderer.setPixelRatio(this.dpr);
    const { w, h } = this.viewportSize();
    this.renderer.setSize(w, h, false);
    this.applyCanvasCss();
  }

  onResize() {
    this.wake();
    const { w, h } = this.viewportSize();
    const dw = Math.abs(w - this.lastWidth);
    const dh = Math.abs(h - this.lastHeight);
    this.lastWidth = w;
    this.lastHeight = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.applyCanvasCss();
    this.cameraCtrl.fitView();
    this.refreshScroll();

    if (!this.isMobile || dw > 0 || dh >= 140) {
      const aniso = this.renderer.capabilities.getMaxAnisotropy();
      const interior = this.makeTexture(this.interiorImage, aniso);
      this.rebuildInterior(interior);
    }

    if (this.reducedMotion) {
      this.renderFrame(this.smoothProgress);
    }
  }

  loop = () => {
    this.rafId = requestAnimationFrame(this.loop);
    if (this._mustPaint > 0) {
      this._mustPaint -= 1;
      this.visible = true;
    } else if (!this.visible || !this.pageVisible) {
      return;
    }

    const now = performance.now();
    const dt = Math.min(50, now - this._lastFrame);
    this._lastFrame = now;

    this.time += dt / 1000;
    const settling = Math.abs(this.targetProgress - this.smoothProgress) >= 0.0005;
    const active = settling || now - this.lastInput <= this.idleMs;

    if (!active) {
      // Idle: yıldız/sway devam, ama ~25–30 fps — ısı/batarya
      if (now - this._lastAmbient < this.ambientMs) return;
      this._lastAmbient = now;
      this.renderFrame(this.smoothProgress);
      return;
    }

    const lerpSpeed = 0.2;
    this.smoothProgress += (this.targetProgress - this.smoothProgress) * lerpSpeed;
    this.renderFrame(this.smoothProgress);
  };

  renderFrame(progress) {
    this.cameraCtrl.update(progress, {
      reducedMotion: this.reducedMotion,
      time: this.time,
      isTouch: this.isTouch,
    });
    this.door.update(progress, this.timing);
    this.particles.update(progress, this.time);
    this.renderer.render(this.scene, this.camera);
    if (this.onProgress) this.onProgress(progress);
    if (!this.hasPainted) {
      const { w, h } = this.viewportSize();
      if (w > 8 && h > 8) {
        this.hasPainted = true;
        this.onFirstPaint?.();
      }
    }
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this._ro?.disconnect();
    this._ro = null;
    document.removeEventListener('visibilitychange', this._boundVisibility);
    window.removeEventListener('scroll', this._onWinScroll);
    window.removeEventListener('resize', this._onWinResize);
    window.removeEventListener('pageshow', this._onPageShow);
    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerleave', this._onPointerLeave);
    this.canvas?.removeEventListener('webglcontextlost', this._onContextLost);
    this.scroll.unmount();
    this.renderer?.dispose();
  }
}
