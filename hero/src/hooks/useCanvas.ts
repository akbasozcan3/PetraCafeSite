import { useCallback, useEffect, useRef, type RefObject } from 'react';

export interface CanvasSize {
  width: number;
  height: number;
  dpr: number;
}

function throttle(fn: () => void, wait: number) {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn();
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn();
      }, remaining);
    }
  };
}

export function useCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  onResize?: (size: CanvasSize) => void,
) {
  const sizeRef = useRef<CanvasSize>({ width: 0, height: 0, dpr: 1 });
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;

  const applySize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return sizeRef.current;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    sizeRef.current = { width, height, dpr };
    onResizeRef.current?.(sizeRef.current);
    return sizeRef.current;
  }, [canvasRef]);

  useEffect(() => {
    applySize();
    const handleResize = throttle(applySize, 120);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [applySize]);

  return { sizeRef, applySize };
}
