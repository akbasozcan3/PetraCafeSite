import * as THREE from '../../vendor/three.module.js?v=20260807x2';
import { downscaleImage, loadHeroAssets } from './asset-loader.js?v=20260807x2';
import { ASSETS, doorTiming } from './config.js?v=20260807x2';
import { ScrollController } from './scroll-controller.js?v=20260807x2';
import { DoorController } from './door-controller.js?v=20260807x2';
import { Particles } from './particles.js?v=20260807x2';
import { CameraController, createUnits } from './camera-controller.js?v=20260807x2';

/** WebGL canvas motoru — render döngüsü ve sahne yaşam döngüsü */
export class CanvasEngine {
  constructor(canvas, gateEl, options) {
    this.canvas = canvas;
    this.gate = gateEl;
    this.isMobile = options.isMobile;
    this.isTouch = options.isTouch;
    this.reducedMotion = options.reducedMotion;
    this.assets = options.assets || ASSETS;
    this.timing = doorTiming(this.isTouch);

    this.units = createUnits();
    this.scroll = new ScrollController(gateEl);
    this.targetProgress = 0;
    this.smoothProgress = 0;
    this.time = 0;
    this.visible = true;
    this.lastInput = performance.now();
    this.idleMs = 500;
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
  }

  async init() {
    const images = await loadHeroAssets(this.assets);
    this.interiorImage = downscaleImage(images.ic, this.isMobile);
    const facadeImage = downscaleImage(images.cephe, this.isMobile);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(this.dpr);
    const { w, h } = this.viewportSize();
    this.renderer.setSize(w, h, false);
    this.applyCanvasCss();
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.setClearColor('#070903');

    const aniso = this.renderer.capabilities.getMaxAnisotropy();
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

    this.door.buildDoorFrames();
    this.door.buildGlow();
    this.particles = new Particles(this.scene, this.units, this.isMobile);

    this.scroll.mount();
    this.targetProgress = this.smoothProgress = this.scroll.update();
    this.renderFrame(this.smoothProgress);

    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      throw new Error('WebGL context lost');
    });

    if (!this.reducedMotion) {
      this.loop();
    }

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    window.addEventListener('resize', () => this.onResize(), { passive: true });

    if (!this.isTouch) {
      window.addEventListener(
        'pointermove',
        (e) => {
          this.cameraCtrl.onPointerMove(e.clientX, e.clientY);
          this.wake();
        },
        { passive: true },
      );
    }

    if ('IntersectionObserver' in window && this.gate) {
      new IntersectionObserver(
        (entries) => {
          this.visible = entries[0].isIntersecting;
          if (this.visible) this.wake();
        },
        { threshold: 0 },
      ).observe(this.gate);
    }
  }

  makeTexture(source, aniso) {
    const tex = new THREE.Texture(source);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = aniso;
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
    if (!this.visible) return;

    const now = performance.now();
    const dt = Math.min(50, now - this._lastFrame);
    this._lastFrame = now;

    if (
      Math.abs(this.targetProgress - this.smoothProgress) < 0.0005 &&
      now - this.lastInput > this.idleMs
    ) {
      return;
    }

    this.time += dt / 1000;
    const lerpSpeed = this.isTouch ? 0.2 : 0.085;
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
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.scroll.unmount();
    this.renderer?.dispose();
  }
}
