/** Hero sahne sabitleri — orijinal scene.js ile aynı değerler */
/** sync-public.mjs bu değeri CACHE ile senkronlar */
export const CACHE_V = '20260819m66';

export const ASSETS = {
  cephe: `/assets/cms/hero-cephe.webp?v=${CACHE_V}`,
  ic: `/assets/cms/hero-ic.webp?v=${CACHE_V}`,
  /** Telefon fallback / preload — dikey kompozit */
  mobile: `/assets/cms/hero-cephe.webp?v=${CACHE_V}`,
};

export const FOV = 52;
export const SCENE_W = 16;
/** Cephe foto oranına göre setSceneFromImage ile güncellenir (varsayılan 4:3). */
export let SCENE_H = 12;
export const DEPTH = 7;
export const FRAME_PAD = 14;

/** Kapı UV — Petra cephe: sol cam + çift kapı + sağ cam */
export const DOOR_UV = { u0: 0.438, u1: 0.562, v0: 0.428, v1: 0.968 };

/** Cephe düzlemini fotoğraf en-boyuna çek — 4:3'e gerilince kapı şerit olur */
export function setSceneFromImage(imgW, imgH) {
  const a = imgW / Math.max(1, imgH);
  SCENE_H = SCENE_W / Math.max(0.25, Math.min(4, a));
}

/** Telefon: geniş cepheyi ekran oranında kapıya hizalı kırp */
export function coverCropRect(imgW, imgH, viewAspect, focusU) {
  const imgA = imgW / Math.max(1, imgH);
  const target = Math.max(0.4, Math.min(2.6, viewAspect));
  if (imgA <= target + 0.02) {
    return { x: 0, y: 0, w: imgW, h: imgH };
  }
  const cropH = imgH;
  const cropW = imgH * target;
  const x = Math.max(0, Math.min(imgW - cropW, focusU * imgW - cropW / 2));
  return { x, y: 0, w: cropW, h: cropH };
}

export function uvInCrop(uv, imgW, imgH, crop) {
  const mapU = (u) => {
    const x = (u * imgW - crop.x) / Math.max(1, crop.w);
    return Math.max(0, Math.min(1, x));
  };
  const mapV = (v) => {
    const y = (v * imgH - crop.y) / Math.max(1, crop.h);
    return Math.max(0, Math.min(1, y));
  };
  return {
    u0: mapU(uv.u0),
    u1: mapU(uv.u1),
    v0: mapV(uv.v0),
    v1: mapV(uv.v1),
  };
}

function isUv(u) {
  return (
    u &&
    typeof u.u0 === 'number' &&
    typeof u.u1 === 'number' &&
    typeof u.v0 === 'number' &&
    typeof u.v1 === 'number'
  );
}

let doorUvOverride = null;
export function setDoorUvOverride(uv) {
  doorUvOverride = uv;
}

/** Admin CMS: masaüstü `hero.doorUv`, telefon `hero.doorUvMobile` */
export function resolveDoorUv() {
  if (isUv(doorUvOverride)) return doorUvOverride;
  try {
    const hero = window.__FIRINCI_CONTENT?.hero;
    const mobile = matchMedia('(max-width: 860px)').matches;
    if (mobile && isUv(hero?.doorUvMobile)) return hero.doorUvMobile;
    if (isUv(hero?.doorUv)) return hero.doorUv;
  } catch {
    /* ignore */
  }
  return DOOR_UV;
}

export const CAMERA_PRESETS = {
  /** Cover: poster ile aynı kadraj, yan siyah yok, kapı tam görünsün */
  yatay: { zoom: 1, y: 0 },
  dikey: { zoom: 1, y: 0 },
};

export const PARALLAX = { x: 0.1, y: 0.05, z: 0.12 };

export function doorTiming(_isTouch) {
  return { ac0: 0.08, ac1: 0.36, son0: 0.36, son1: 0.52 };
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
