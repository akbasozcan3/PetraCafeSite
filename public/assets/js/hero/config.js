/** Hero sahne sabitleri — orijinal scene.js ile aynı değerler */
/** sync-public.mjs bu değeri CACHE ile senkronlar */
export const CACHE_V = '20260817x5';

export const ASSETS = {
  cephe: `/assets/img/hero-cephe.webp?v=${CACHE_V}`,
  ic: `/assets/img/hero-ic.webp?v=${CACHE_V}`,
  /** Telefon fallback / preload — dikey kompozit */
  mobile: `/assets/img/hero-mobile.webp?v=${CACHE_V}`,
};

export const FOV = 52;
export const SCENE_W = 16;
export const SCENE_H = 12;
export const DEPTH = 7;
export const FRAME_PAD = 6;

/** Kapı UV — aynı boy, yatay ortalı, alta yapışık (üst dokunulmadı) */
export const DOOR_UV = { u0: 0.368, u1: 0.633, v0: 0.552, v1: 1 };

/** Admin CMS `hero.doorUv` varsa onu kullan */
export function resolveDoorUv() {
  try {
    const u = window.__FIRINCI_CONTENT?.hero?.doorUv;
    if (
      u &&
      typeof u.u0 === "number" &&
      typeof u.u1 === "number" &&
      typeof u.v0 === "number" &&
      typeof u.v1 === "number"
    ) {
      return u;
    }
  } catch {
    /* ignore */
  }
  return DOOR_UV;
}

export const CAMERA_PRESETS = {
  yatay: { zoom: 0.96, y: -0.95 },
  /** Mobil: hafif cover + kapı altı ekrana yapışık */
  dikey: { zoom: 0.94, y: 0 },
};

export const PARALLAX = { x: 0.3, y: 0.13, z: 0.22 };

export function doorTiming(isTouch) {
  return isTouch
    ? { ac0: 0.22, ac1: 0.58, son0: 0.58, son1: 0.72 }
    : { ac0: 0.15, ac1: 0.42, son0: 0.42, son1: 0.58 };
}

export function maxTextureSize(isMobile) {
  return isMobile ? 1800 : 2048;
}

export function sceneUnitsFromUV(uv) {
  const x0 = (uv.u0 - 0.5) * SCENE_W;
  const x1 = (uv.u1 - 0.5) * SCENE_W;
  const y0 = (0.5 - uv.v1) * SCENE_H;
  const y1 = (0.5 - uv.v0) * SCENE_H;
  return {
    x0,
    x1,
    y0,
    y1,
    cx: (x0 + x1) / 2,
    cy: (y0 + y1) / 2,
  };
}
