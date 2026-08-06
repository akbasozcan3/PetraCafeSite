export interface DoorState {
  open: number;
  shadowOffset: number;
  depth: number;
}

export function easePower3InOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function computeDoorState(scrollProgress: number): DoorState {
  const doorPhase = Math.min(1, Math.max(0, (scrollProgress - 0.28) / 0.32));
  const open = easePower3InOut(doorPhase);
  return {
    open,
    shadowOffset: open * 28,
    depth: open * 0.42,
  };
}

export interface DoorDrawParams {
  ctx: CanvasRenderingContext2D;
  image: CanvasImageSource;
  hingeX: number;
  hingeY: number;
  panelW: number;
  panelH: number;
  open: number;
  side: 'left' | 'right';
  shadowOffset: number;
}

export function drawDoor({
  ctx,
  image,
  hingeX,
  hingeY,
  panelW,
  panelH,
  open,
  side,
  shadowOffset,
}: DoorDrawParams) {
  const maxAngle = (85 * Math.PI) / 180;
  const angle = open * maxAngle * (side === 'left' ? -1 : 1);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const perspective = 1 - open * 0.18;

  ctx.save();
  ctx.translate(hingeX, hingeY);

  ctx.fillStyle = `rgba(0, 0, 0, ${0.22 + open * 0.25})`;
  ctx.filter = 'blur(6px)';
  ctx.fillRect(
    side === 'left' ? shadowOffset * 0.4 : -shadowOffset * 0.8,
    panelH * 0.92,
    panelW * (1 - open * 0.35),
    panelH * 0.06,
  );
  ctx.filter = 'none';

  ctx.transform(cos * perspective, sin * 0.22, -sin * 0.12, 1, 0, 0);

  const drawX = side === 'left' ? 0 : -panelW;
  ctx.drawImage(image, drawX, 0, panelW, panelH);

  const edge = ctx.createLinearGradient(drawX, 0, drawX + (side === 'left' ? panelW : 0), 0);
  edge.addColorStop(0, 'rgba(0,0,0,0.35)');
  edge.addColorStop(1, 'rgba(255,255,255,0.06)');
  ctx.fillStyle = edge;
  ctx.fillRect(drawX, 0, panelW, panelH);

  ctx.restore();
}

export function computeCamera(scrollProgress: number, vw: number, vh: number) {
  const approach = easePower3InOut(Math.min(1, scrollProgress / 0.55));
  const enter = easePower3InOut(Math.min(1, Math.max(0, (scrollProgress - 0.45) / 0.45)));

  return {
    x: vw * 0.5,
    y: vh * 0.5,
    scale: 1 + approach * 0.38 + enter * 0.22,
    rotX: approach * 0.018 + enter * 0.012,
    rotY: (scrollProgress - 0.5) * 0.008,
    offsetY: -approach * vh * 0.04 - enter * vh * 0.08,
    offsetX: Math.sin(scrollProgress * Math.PI) * vw * 0.008,
  };
}

export function computeLighting(scrollProgress: number) {
  const doorPhase = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.4));
  const warm = easePower3InOut(doorPhase);
  const bloom = warm * 0.65;
  const rays = Math.min(1, Math.max(0, (scrollProgress - 0.38) / 0.35));
  const exitFade = scrollProgress > 0.88 ? (scrollProgress - 0.88) / 0.12 : 0;

  return {
    warm,
    bloom,
    rays: easePower3InOut(rays),
    opacity: 1 - exitFade,
  };
}
