import { memo, useEffect, useRef, type RefObject } from 'react';
import type { HeroTextures } from '../../hooks/useImages';
import { useCanvas } from '../../hooks/useCanvas';
import {
  computeCamera,
  computeDoorState,
  computeLighting,
  drawDoor,
} from './Door';
import { particleSystem } from './Particles';
import styles from '../../styles/hero.module.scss';

interface HeroCanvasProps {
  textures: HeroTextures;
  progressRef: RefObject<number>;
  visible: boolean;
}

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  vw: number,
  vh: number,
  parallaxY = 0,
) {
  const iw = 'width' in img ? (img as HTMLCanvasElement).width : 0;
  const ih = 'height' in img ? (img as HTMLCanvasElement).height : 0;
  if (!iw || !ih) return;

  const scale = Math.max(vw / iw, vh / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (vw - dw) / 2;
  const dy = (vh - dh) / 2 + parallaxY;
  ctx.drawImage(img, dx, dy, dw, dh);
}

function HeroCanvasComponent({ textures, progressRef, visible }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const mobileRef = useRef(false);
  const { sizeRef } = useCanvas(canvasRef);

  useEffect(() => {
    mobileRef.current = window.matchMedia('(max-width: 860px)').matches;
    const canvas = canvasRef.current;
    if (!canvas || !visible) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = (time: number) => {
      const dt = lastTimeRef.current ? time - lastTimeRef.current : 16;
      lastTimeRef.current = time;

      const { width: vw, height: vh } = sizeRef.current;
      if (!vw || !vh) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const progress = progressRef.current ?? 0;
      const camera = computeCamera(progress, vw, vh);
      const door = computeDoorState(progress);
      const light = computeLighting(progress);
      const mobile = mobileRef.current;

      ctx.fillStyle = '#0a0b08';
      ctx.fillRect(0, 0, vw, vh);

      ctx.save();
      ctx.globalAlpha = light.opacity;
      ctx.translate(camera.x + camera.offsetX, camera.y + camera.offsetY);
      ctx.scale(camera.scale, camera.scale);
      ctx.rotate(camera.rotY);
      ctx.transform(1, 0, 0, 1 - camera.rotX, -camera.x, -camera.y);

      coverDraw(ctx, textures.building, vw, vh, progress * -12);

      const doorW = vw * 0.18;
      const doorH = vh * 0.52;
      const centerX = vw * 0.5;
      const doorTop = vh * 0.26;
      const leftHinge = centerX - doorW * 0.02;
      const rightHinge = centerX + doorW * 0.02;

      if (door.open > 0.02) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, door.open * 1.15);
        coverDraw(ctx, textures.interior, vw, vh, progress * 8);
        ctx.restore();
      }

      drawDoor({
        ctx,
        image: textures.doorLeft,
        hingeX: leftHinge,
        hingeY: doorTop,
        panelW: doorW,
        panelH: doorH,
        open: door.open,
        side: 'left',
        shadowOffset: door.shadowOffset,
      });

      drawDoor({
        ctx,
        image: textures.doorRight,
        hingeX: rightHinge,
        hingeY: doorTop,
        panelW: doorW,
        panelH: doorH,
        open: door.open,
        side: 'right',
        shadowOffset: door.shadowOffset,
      });

      ctx.save();
      ctx.globalAlpha = 0.55 + light.warm * 0.35;
      coverDraw(ctx, textures.glass, vw, vh);
      ctx.restore();

      ctx.restore();

      if (light.rays > 0.02 && !mobile) {
        ctx.save();
        ctx.globalAlpha = light.rays * 0.55 * light.opacity;
        ctx.globalCompositeOperation = 'screen';
        coverDraw(ctx, textures.lightRays, vw, vh);
        ctx.restore();
      }

      if (light.warm > 0.05) {
        const glow = ctx.createRadialGradient(vw * 0.5, vh * 0.48, 0, vw * 0.5, vh * 0.48, vw * 0.55);
        glow.addColorStop(0, `rgba(255, 190, 100, ${light.warm * light.bloom * 0.35})`);
        glow.addColorStop(0.55, `rgba(255, 140, 60, ${light.warm * 0.12})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.globalAlpha = light.opacity;
        ctx.globalCompositeOperation = 'screen';
        ctx.fillRect(0, 0, vw, vh);
        ctx.globalCompositeOperation = 'source-over';
      }

      const particleIntensity = Math.max(door.open, light.warm * 0.6);
      particleSystem.update(vw, vh, particleIntensity, dt);
      if (particleIntensity > 0.04) {
        particleSystem.draw(ctx, particleIntensity, mobile);
      }

      if (progress > 0.88) {
        const fade = (progress - 0.88) / 0.12;
        ctx.fillStyle = `rgba(251, 248, 241, ${fade})`;
        ctx.fillRect(0, 0, vw, vh);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    particleSystem.init(sizeRef.current.width, sizeRef.current.height);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [textures, progressRef, visible, sizeRef]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${visible ? styles.canvasVisible : ''}`}
      aria-hidden="true"
    />
  );
}

export const HeroCanvas = memo(HeroCanvasComponent);
