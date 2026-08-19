export type DoorUv = { u0: number; u1: number; v0: number; v1: number };
export type DoorDevice = "desktop" | "phone";

export const DEFAULT_DOOR_UV: DoorUv = {
  u0: 0.438,
  u1: 0.562,
  v0: 0.428,
  v1: 0.968,
};

/** Telefon: daha geniş UV — kadraj kırpınca kapı ekranı doldurur */
export const DEFAULT_DOOR_UV_MOBILE: DoorUv = {
  u0: 0.334,
  u1: 0.666,
  v0: 0.428,
  v1: 0.968,
};

const MIN = 0.04;

function num(v: unknown, fallback: number) {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function isDoorUv(v: unknown): v is DoorUv {
  if (!v || typeof v !== "object") return false;
  const u = v as DoorUv;
  return (
    typeof u.u0 === "number" &&
    typeof u.u1 === "number" &&
    typeof u.v0 === "number" &&
    typeof u.v1 === "number"
  );
}

export function clampDoorUv(
  uv: Partial<DoorUv> | null | undefined,
  fallback: DoorUv = DEFAULT_DOOR_UV
): DoorUv {
  let u0 = clamp01(num(uv?.u0, fallback.u0));
  let u1 = clamp01(num(uv?.u1, fallback.u1));
  let v0 = clamp01(num(uv?.v0, fallback.v0));
  let v1 = clamp01(num(uv?.v1, fallback.v1));
  if (u1 - u0 < MIN) {
    const c = clamp01((u0 + u1) / 2);
    u0 = clamp01(c - MIN / 2);
    u1 = clamp01(u0 + MIN);
  }
  if (v1 - v0 < MIN) {
    const c = clamp01((v0 + v1) / 2);
    v0 = clamp01(c - MIN / 2);
    v1 = clamp01(v0 + MIN);
  }
  return { u0, u1, v0, v1 };
}

export function scaleDoorUv(uv: DoorUv, factor: number): DoorUv {
  const cx = (uv.u0 + uv.u1) / 2;
  const cy = (uv.v0 + uv.v1) / 2;
  const w = Math.min(1, Math.max(MIN, (uv.u1 - uv.u0) * factor));
  const h = Math.min(1, Math.max(MIN, (uv.v1 - uv.v0) * factor));
  return clampDoorUv({
    u0: cx - w / 2,
    u1: cx + w / 2,
    v0: cy - h / 2,
    v1: cy + h / 2,
  });
}

export function moveDoorUv(uv: DoorUv, du: number, dv: number): DoorUv {
  const w = uv.u1 - uv.u0;
  const h = uv.v1 - uv.v0;
  const u0 = Math.min(Math.max(0, uv.u0 + du), 1 - w);
  const v0 = Math.min(Math.max(0, uv.v0 + dv), 1 - h);
  return { u0, u1: u0 + w, v0, v1: v0 + h };
}

/** Telefon cover kadrajı — hero JS `coverCropRect` ile aynı mantık, UV uzayı. */
export function phoneCoverCropUv(
  imgAspect: number,
  viewAspect: number,
  focusU: number
): DoorUv {
  const imgA = Math.max(0.2, imgAspect);
  const target = Math.max(0.4, Math.min(2.6, viewAspect));
  if (imgA <= target + 0.02) {
    return { u0: 0, u1: 1, v0: 0, v1: 1 };
  }
  const cropW = target / imgA;
  const u0 = Math.max(0, Math.min(1 - cropW, focusU - cropW / 2));
  return { u0, u1: u0 + cropW, v0: 0, v1: 1 };
}
