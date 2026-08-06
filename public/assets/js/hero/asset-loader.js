import { maxTextureSize } from './config.js?v=20260806mq1';

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Görsel yüklenemedi: ${src}`));
    img.src = src;
  });
}

export function downscaleImage(img, isMobile) {
  const max = maxTextureSize(isMobile);
  const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  if (scale === 1) return img;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export async function loadHeroAssets(sources) {
  const entries = await Promise.all(
    Object.entries(sources).map(async ([key, src]) => [key, await loadImage(src)]),
  );
  return Object.fromEntries(entries);
}
