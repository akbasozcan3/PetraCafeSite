import { useEffect, useRef, useState } from 'react';

export interface HeroTextures {
  building: HTMLCanvasElement;
  glass: HTMLCanvasElement;
  doorLeft: HTMLCanvasElement;
  doorRight: HTMLCanvasElement;
  interior: HTMLCanvasElement;
  lightRays: HTMLCanvasElement;
}

const TEX_W = 1920;
const TEX_H = 1080;

function drawBuilding(ctx: CanvasRenderingContext2D) {
  const w = TEX_W;
  const h = TEX_H;

  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
  sky.addColorStop(0, '#1a1c14');
  sky.addColorStop(1, '#2d3224');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const facadeTop = h * 0.12;
  const facadeH = h * 0.78;
  ctx.fillStyle = '#3d4a32';
  ctx.fillRect(w * 0.08, facadeTop, w * 0.84, facadeH);

  for (let i = 0; i < 28; i++) {
    const x = w * 0.1 + i * (w * 0.028);
    ctx.fillStyle = i % 2 === 0 ? '#4a5738' : '#425033';
    ctx.fillRect(x, facadeTop, w * 0.012, facadeH);
  }

  ctx.fillStyle = '#141610';
  ctx.fillRect(w * 0.18, facadeTop - h * 0.04, w * 0.64, h * 0.07);

  ctx.font = '700 96px Georgia, serif';
  ctx.fillStyle = '#f4eed9';
  ctx.textAlign = 'center';
  ctx.fillText('BAKERY', w * 0.5, facadeTop + h * 0.02);

  ctx.fillStyle = '#0f110c';
  ctx.fillRect(w * 0.14, facadeTop + h * 0.06, w * 0.72, h * 0.055);

  ctx.fillStyle = '#252820';
  ctx.fillRect(w * 0.32, facadeTop + h * 0.14, w * 0.36, h * 0.52);
}

function drawGlass(ctx: CanvasRenderingContext2D) {
  const w = TEX_W;
  const h = TEX_H;
  ctx.clearRect(0, 0, w, h);

  const gx = w * 0.32;
  const gy = h * 0.26;
  const gw = w * 0.36;
  const gh = h * 0.52;

  const g = ctx.createLinearGradient(gx, gy, gx + gw, gy + gh);
  g.addColorStop(0, 'rgba(180, 210, 230, 0.18)');
  g.addColorStop(0.45, 'rgba(255, 255, 255, 0.06)');
  g.addColorStop(1, 'rgba(120, 140, 160, 0.12)');
  ctx.fillStyle = g;
  ctx.fillRect(gx, gy, gw, gh);

  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gx + gw / 2, gy);
  ctx.lineTo(gx + gw / 2, gy + gh);
  ctx.stroke();
}

function drawDoorPanel(ctx: CanvasRenderingContext2D, side: 'left' | 'right') {
  const w = TEX_W * 0.18;
  const h = TEX_H * 0.52;
  ctx.clearRect(0, 0, w, h);

  const base = ctx.createLinearGradient(0, 0, w, 0);
  base.addColorStop(0, '#2a2e24');
  base.addColorStop(0.5, '#3a4030');
  base.addColorStop(1, '#252920');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#1a1c14';
  ctx.fillRect(w * 0.08, h * 0.06, w * 0.84, h * 0.88);

  ctx.fillStyle = 'rgba(255, 220, 160, 0.08)';
  ctx.fillRect(w * 0.12, h * 0.1, w * 0.76, h * 0.35);

  const handleX = side === 'left' ? w * 0.82 : w * 0.18;
  ctx.fillStyle = '#c9a44d';
  ctx.beginPath();
  ctx.arc(handleX, h * 0.52, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#0d0f0a';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, w, h);
}

function drawInterior(ctx: CanvasRenderingContext2D) {
  const w = TEX_W;
  const h = TEX_H;

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#1f1810');
  bg.addColorStop(0.4, '#3d2e1c');
  bg.addColorStop(1, '#2a2016');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const x = w * 0.12 + col * w * 0.13;
      const y = h * 0.22 + row * h * 0.14;
      ctx.fillStyle = '#5c4528';
      ctx.fillRect(x, y, w * 0.1, h * 0.025);
      ctx.fillStyle = row % 2 === 0 ? '#d4a056' : '#c48840';
      ctx.beginPath();
      ctx.ellipse(x + w * 0.05, y - h * 0.02, w * 0.04, h * 0.035, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const warm = ctx.createRadialGradient(w * 0.5, h * 0.55, 20, w * 0.5, h * 0.55, w * 0.45);
  warm.addColorStop(0, 'rgba(255, 190, 100, 0.55)');
  warm.addColorStop(0.5, 'rgba(255, 150, 60, 0.18)');
  warm.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, w, h);
}

function drawLightRays(ctx: CanvasRenderingContext2D) {
  const w = TEX_W;
  const h = TEX_H;
  ctx.clearRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.35;
  for (let i = -4; i <= 4; i++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((i * Math.PI) / 28);
    const ray = ctx.createLinearGradient(0, 0, 0, h * 0.9);
    ray.addColorStop(0, 'rgba(255, 210, 120, 0.35)');
    ray.addColorStop(0.5, 'rgba(255, 180, 80, 0.08)');
    ray.addColorStop(1, 'rgba(255, 160, 60, 0)');
    ctx.fillStyle = ray;
    ctx.beginPath();
    ctx.moveTo(-w * 0.04, 0);
    ctx.lineTo(w * 0.04, 0);
    ctx.lineTo(w * 0.12, h);
    ctx.lineTo(-w * 0.12, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function createTexture(draw: (ctx: CanvasRenderingContext2D) => void, width = TEX_W, height = TEX_H) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D unavailable');
  draw(ctx);
  return canvas;
}

function generateTextures(): HeroTextures {
  return {
    building: createTexture(drawBuilding),
    glass: createTexture(drawGlass),
    doorLeft: createTexture((ctx) => drawDoorPanel(ctx, 'left'), TEX_W * 0.18, TEX_H * 0.52),
    doorRight: createTexture((ctx) => drawDoorPanel(ctx, 'right'), TEX_W * 0.18, TEX_H * 0.52),
    interior: createTexture(drawInterior),
    lightRays: createTexture(drawLightRays),
  };
}

export function useImages() {
  const [textures, setTextures] = useState<HeroTextures | null>(null);
  const [ready, setReady] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let frame = 0;

    const load = async () => {
      await new Promise<void>((resolve) => {
        frame = requestAnimationFrame(() => resolve());
      });
      await new Promise<void>((resolve) => setTimeout(resolve, 480));
      const generated = generateTextures();
      if (!mountedRef.current) return;
      setTextures(generated);
      await new Promise<void>((resolve) => setTimeout(resolve, 320));
      if (!mountedRef.current) return;
      setReady(true);
    };

    load();

    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  return { textures, ready };
}
