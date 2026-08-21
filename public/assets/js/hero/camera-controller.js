import * as THREE from '../../vendor/three.module.js?v=20260821m190';
import {
  FOV,
  SCENE_W,
  SCENE_H,
  DEPTH,
  PARALLAX,
  sceneUnitsFromUV,
  resolveDoorUv,
} from './config.js?v=20260821m190';
import { clamp, easeInOut, lerp, range } from './utils.js?v=20260821m190';

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
    const aspect =
      this.camera?.aspect > 0
        ? this.camera.aspect
        : window.innerWidth / Math.max(1, window.innerHeight);
    const fitPlaneH = SCENE_H / (2 * Math.tan(fovRad / 2));
    const fitPlaneW = SCENE_W / (2 * Math.tan(fovRad / 2) * aspect);
    // Cover: fotoğrafı gerdirme. Kapı UV kamerayı kaydırmaz.
    this.baseDistance = Math.min(fitPlaneH, fitPlaneW);
    this.baseY = 0;
  }


  fitInterior(aspectInterior) {
    const fovRad = THREE.MathUtils.degToRad(FOV);
    const aspect =
      this.camera?.aspect > 0
        ? this.camera.aspect
        : window.innerWidth / Math.max(1, window.innerHeight);
    const doorW = this.units.x1 - this.units.x0;
    const doorH = this.units.y1 - this.units.y0;
    const needW = doorW + 2 * DEPTH * Math.tan(fovRad / 2) * aspect;
    const needH = doorH + 2 * DEPTH * Math.tan(fovRad / 2);
    const plane = Math.max(needW, needH * (4 / 3)) * 1.22;
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
    if (!reducedMotion && progress >= 0.12) {
      this.camera.position.x += Math.sin(time * 0.2) * PARALLAX.x * sway;
      this.camera.position.y += Math.sin(time * 0.16 + 1.3) * PARALLAX.y * sway;
      this.camera.position.z += Math.sin(time * 0.12 + 2.1) * PARALLAX.z * sway;
    } else if (!reducedMotion) {
      this.camera.position.z += Math.sin(time * 0.12 + 2.1) * PARALLAX.z * sway;
    }

    this.pointer.x += (this.pointer.tx - this.pointer.x) * 0.05;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * 0.05;

    if (!isTouch && progress >= 0.12) {
      this.camera.position.x += this.pointer.x * 0.12 * sway;
      this.camera.position.y -= this.pointer.y * 0.06 * sway;
    }

    const z = Math.max(0.25, this.camera.position.z);
    const halfH = Math.tan(THREE.MathUtils.degToRad(FOV) / 2) * z;
    const halfW = halfH * Math.max(0.05, this.camera.aspect);
    const maxX = Math.max(0, SCENE_W / 2 - halfW - 0.06);
    this.camera.position.x = clamp(this.camera.position.x, -maxX, maxX);
  }

  onPointerMove(clientX, clientY) {
    this.pointer.tx = (clientX / window.innerWidth) * 2 - 1;
    this.pointer.ty = (clientY / window.innerHeight) * 2 - 1;
  }
}

export function createUnits() {
  return sceneUnitsFromUV(resolveDoorUv());
}
