import * as THREE from '../../vendor/three.module.js?v=20260806wa1';
import {
  FOV,
  SCENE_W,
  SCENE_H,
  DEPTH,
  CAMERA_PRESETS,
  PARALLAX,
  sceneUnitsFromUV,
  DOOR_UV,
} from './config.js?v=20260806wa1';
import { clamp, easeInOut, lerp, range } from './utils.js?v=20260806wa1';

/** Kamera konumu ve projeksiyon */
export class CameraController {
  constructor(camera, units) {
    this.camera = camera;
    this.units = units;
    this.baseDistance = 10;
    this.baseY = 0;
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  }

  fitView() {
    const fovRad = THREE.MathUtils.degToRad(FOV);
    const aspect = window.innerWidth / window.innerHeight;
    const isPortrait = window.innerHeight > window.innerWidth;
    const preset = isPortrait
      ? CAMERA_PRESETS.dikey
      : CAMERA_PRESETS.yatay;

    // Cover (masaüstüyle aynı): ekranı doldur.
    // Eski mobil max() = contain → FRAME_PAD şeritleri esneyip üstte çizgili bozulma + altta siyah boşluk.
    const fitH = SCENE_H / (2 * Math.tan(fovRad / 2));
    const fitW = SCENE_W / (2 * Math.tan(fovRad / 2) * aspect);
    this.baseDistance = Math.min(fitH, fitW) * preset.zoom;

    const halfH = Math.tan(fovRad / 2) * this.baseDistance;
    const maxY = Math.max(0, SCENE_H / 2 + 6 - halfH - PARALLAX.y - 0.3);
    this.baseY = clamp(preset.y, -maxY, maxY);
  }


  fitInterior(aspectInterior) {
    const fovRad = THREE.MathUtils.degToRad(FOV);
    const aspect = window.innerWidth / window.innerHeight;
    const doorW = this.units.x1 - this.units.x0;
    const doorH = this.units.y1 - this.units.y0;
    const needW = doorW + 2 * DEPTH * Math.tan(fovRad / 2) * aspect;
    const needH = doorH + 2 * DEPTH * Math.tan(fovRad / 2);
    const plane = Math.max(needW, needH * (4 / 3)) * 1.06;
    return { plane, aspect: plane / (plane * 0.75) };
  }

  update(progress, options) {
    const { reducedMotion, time, isTouch } = options;
    const e0 = easeInOut(range(progress, 0, 0.5));
    const e1 = easeInOut(range(progress, 0.48, 1));

    this.camera.position.set(
      lerp(lerp(0, this.units.cx, e0), this.units.cx, e1),
      lerp(lerp(this.baseY, this.units.cy, e0), this.units.cy, e1),
      lerp(lerp(this.baseDistance, 2.4, e0), -0.6, e1),
    );

    const sway = 1 - range(progress, 0.5, 0.9) * 0.85;
    if (!reducedMotion) {
      this.camera.position.x += Math.sin(time * 0.2) * PARALLAX.x * sway;
      this.camera.position.y += Math.sin(time * 0.16 + 1.3) * PARALLAX.y * sway;
      this.camera.position.z += Math.sin(time * 0.12 + 2.1) * PARALLAX.z * sway;
    }

    this.pointer.x += (this.pointer.tx - this.pointer.x) * 0.05;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * 0.05;

    if (!isTouch) {
      this.camera.position.x += this.pointer.x * 0.32 * sway;
      this.camera.position.y -= this.pointer.y * 0.2 * sway;
    }
  }

  onPointerMove(clientX, clientY) {
    this.pointer.tx = (clientX / window.innerWidth) * 2 - 1;
    this.pointer.ty = (clientY / window.innerHeight) * 2 - 1;
  }
}

export function createUnits() {
  return sceneUnitsFromUV(DOOR_UV);
}
