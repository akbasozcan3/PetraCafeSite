import * as THREE from '../../vendor/three.module.js?v=20260821m115';
import {
  resolveDoorUv,
  SCENE_W,
  SCENE_H,
  DEPTH,
  FRAME_PAD,
} from './config.js?v=20260821m115';
import { easeInOut, range } from './utils.js?v=20260821m115';

function remapUV(geo, u0, u1, v0, v1) {
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    uv.setXY(i, u0 + u * (u1 - u0), 1 - v1 + v * (v1 - v0));
  }
  uv.needsUpdate = true;
}

function texturedQuad(material, u0, u1, vTop, vBot) {
  const x0 = (u0 - 0.5) * SCENE_W;
  const x1 = (u1 - 0.5) * SCENE_W;
  const y0 = (0.5 - vBot) * SCENE_H;
  const y1 = (0.5 - vTop) * SCENE_H;
  const geo = new THREE.PlaneGeometry(x1 - x0, y1 - y0);
  remapUV(geo, u0, u1, vTop, vBot);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0);
  return mesh;
}

/** Kenar dolgu — doku değil düz renk. Tek piksel UV gerilince kapı altı çizgileniyordu. */
function padPlane(w, h, x, y, color = '#070903') {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ color }),
  );
  mesh.position.set(x, y, 0);
  return mesh;
}

function addShadowQuad(group, mat, a, b, c, d) {
  const positions = new Float32Array([
    a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z,
    a.x, a.y, a.z, c.x, c.y, c.z, d.x, d.y, d.z,
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  group.add(new THREE.Mesh(geo, mat));
}

/** Cephe, kapı kanatları, iç mekân ve altın ışıltı huzmesi */
export class DoorController {
  constructor(scene, units) {
    this.scene = scene;
    this.units = units;
    this.leftLeaf = null;
    this.rightLeaf = null;
    this.interiorGroup = null;
    this.glow = null;
  }

  buildFacade(facadeTexture, options = {}) {
    const mat = new THREE.MeshBasicMaterial({ map: facadeTexture });
    const u = resolveDoorUv();
    const parts = [];
    if (u.v0 > 0.004) parts.push(texturedQuad(mat, 0, 1, 0, u.v0));
    if (u.v1 < 0.996) parts.push(texturedQuad(mat, 0, 1, u.v1, 1));
    if (u.u0 > 0.004) parts.push(texturedQuad(mat, 0, u.u0, u.v0, u.v1));
    if (u.u1 < 0.996) parts.push(texturedQuad(mat, u.u1, 1, u.v0, u.v1));
    if (options.pads === false) {
      this.scene.add(...parts);
      return;
    }
    this.scene.add(
      ...parts,
      padPlane(SCENE_W + FRAME_PAD * 2, FRAME_PAD, 0, -SCENE_H / 2 - FRAME_PAD / 2),
      padPlane(SCENE_W + FRAME_PAD * 2, FRAME_PAD, 0, SCENE_H / 2 + FRAME_PAD / 2),
      padPlane(FRAME_PAD, SCENE_H, -SCENE_W / 2 - FRAME_PAD / 2, 0),
      padPlane(FRAME_PAD, SCENE_H, SCENE_W / 2 + FRAME_PAD / 2, 0),
    );
  }

  buildInterior(interiorTexture, aspect) {
    if (this.interiorGroup) {
      this.interiorGroup.traverse((o) => o.geometry?.dispose());
      this.scene.remove(this.interiorGroup);
    }

    const group = new THREE.Group();
    this.interiorGroup = group;
    const z = -DEPTH;
    const { cx, cy, x0, x1, y0, y1 } = this.units;
    const leftX = cx - aspect / 2;
    const rightX = cx + aspect / 2;
    const topY = cy + (aspect * 0.75) / 2;
    const botY = cy - (aspect * 0.75) / 2;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(aspect, aspect * 0.75),
      new THREE.MeshBasicMaterial({ map: interiorTexture }),
    );
    plane.position.set(cx, cy, z);
    group.add(plane);

    const shadowMat = new THREE.MeshBasicMaterial({ color: '#1a1410', side: THREE.DoubleSide });
    const p = (x, y, z2) => ({ x, y, z: z2 });
    const inset = -0.05;

    addShadowQuad(group, shadowMat,
      p(x0, y1, inset), p(x1, y1, inset), p(rightX, topY, z), p(leftX, topY, z));
    addShadowQuad(group, shadowMat,
      p(x0, y0, inset), p(leftX, botY, z), p(rightX, botY, z), p(x1, y0, inset));
    addShadowQuad(group, shadowMat,
      p(x0, y1, inset), p(leftX, topY, z), p(leftX, botY, z), p(x0, y0, inset));
    addShadowQuad(group, shadowMat,
      p(x1, y1, inset), p(x1, y0, inset), p(rightX, botY, z), p(rightX, topY, z));

    this.scene.add(group);
  }

  buildDoorFrames() {
    // 3B Lüks Cam Kapı Kanatları & Pirinç (Gold) Kollar — Görsel 2 Tasarımı
    const glassMat = new THREE.MeshBasicMaterial({
      color: '#B0CDE0',
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const frameMat = new THREE.MeshBasicMaterial({ color: '#0C0F08' });
    const brassMat = new THREE.MeshBasicMaterial({ color: '#E8B84B' });
    const goldHighlightMat = new THREE.MeshBasicMaterial({ color: '#FFF8E7' });
    const bracketMat = new THREE.MeshBasicMaterial({ color: '#B8842C' });

    const makeLeaf = (isLeft) => {
      const halfW = (this.units.x1 - this.units.x0) / 2;
      const h = this.units.y1 - this.units.y0;
      // Telefon kırpığında halfW ≈ 8 — tüm ölçüler o tasarıma göre ölçeklenir
      const s = halfW / 8;
      const t = Math.max(0.014, 0.045 * s);
      const tInner = Math.max(0.007, 0.018 * s);
      const edge = Math.max(0.008, 0.022 * s);
      const innerOff = Math.max(0.028, 0.075 * s);
      const handleXOff = Math.max(0.018, 0.055 * s);
      const handleW = Math.max(0.01, 0.034 * s);
      const handleHi = Math.max(0.005, 0.014 * s);
      const bracketW = Math.max(0.014, 0.05 * s);
      const bracketH = Math.max(0.008, 0.025 * s);
      const group = new THREE.Group();

      group.add(new THREE.Mesh(new THREE.PlaneGeometry(halfW, h), glassMat));

      const bar = (w, ht, x, y, mat = frameMat, zOffset = 0.01) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, ht), mat);
        m.position.set(x, y, zOffset);
        group.add(m);
      };

      bar(t, h, -halfW / 2 + edge, 0);
      bar(t, h, halfW / 2 - edge, 0);
      bar(halfW, t, 0, h / 2 - edge);
      bar(halfW, t, 0, -h / 2 + edge);

      bar(halfW * 0.96, tInner, 0, h / 2 - innerOff, frameMat, 0.015);
      bar(halfW * 0.96, tInner, 0, -h / 2 + innerOff, frameMat, 0.015);

      const handleX = isLeft ? halfW / 2 - handleXOff : -halfW / 2 + handleXOff;
      const handleH = h * 0.38;
      const handleY = -h * 0.02;

      bar(bracketW, bracketH, handleX, handleY + handleH / 2 - bracketH * 0.6, bracketMat, 0.018);
      bar(bracketW, bracketH, handleX, handleY - handleH / 2 + bracketH * 0.6, bracketMat, 0.018);
      bar(handleW, handleH, handleX, handleY, brassMat, 0.022);
      bar(handleHi, handleH * 0.92, handleX, handleY, goldHighlightMat, 0.026);

      group.position.z = -0.06;
      this.scene.add(group);
      return group;
    };

    this.leftLeaf = makeLeaf(true);
    this.rightLeaf = makeLeaf(false);
  }

  buildGlow() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 128);
    g.addColorStop(0, 'rgba(255, 215, 140, 0.85)');
    g.addColorStop(0.45, 'rgba(235, 170, 80, 0.35)');
    g.addColorStop(1, 'rgba(215, 140, 40, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;

    const w = (this.units.x1 - this.units.x0) * 1.35;
    const h = (this.units.y1 - this.units.y0) * 1.2;
    this.glow = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    this.glow.position.set(this.units.cx, this.units.cy, -1.2);
    this.scene.add(this.glow);
  }

  update(progress, timing) {
    if (!this.leftLeaf || !this.rightLeaf) return;

    const halfW = (this.units.x1 - this.units.x0) / 2;
    const seam = Math.max(0.008, 0.03 * (halfW / 8));
    const open = easeInOut(range(progress, timing.ac0, timing.ac1)) * halfW;

    this.leftLeaf.position.set(this.units.cx - halfW / 2 - open + seam, this.units.cy, -0.06);
    this.rightLeaf.position.set(this.units.cx + halfW / 2 + open - seam, this.units.cy, -0.06);

    const visible = 1 - range(progress, timing.son0, timing.son1);
    this.leftLeaf.visible = this.rightLeaf.visible = visible > 0.02;

    if (this.glow) {
      this.glow.material.opacity =
        0.35 * range(progress, 0.1, 0.6) * (1 - range(progress, 0.8, 1));
    }
  }
}
