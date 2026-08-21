import * as THREE from '../../vendor/three.module.js?v=20260821m165';
import { range } from './utils.js?v=20260821m165';

/** Toz partikülleri */
export class Particles {
  constructor(scene, units, isMobile) {
    this.scene = scene;
    this.units = units;
    this.points = null;
    this.build(isMobile);
  }

  build(isMobile) {
    const count = isMobile ? 120 : 220;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = this.units.cx + (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = this.units.cy + (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = -Math.random() * 7;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: '#FFDCA8',
        size: 0.05,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.scene.add(this.points);
  }

  update(progress, time) {
    if (!this.points) return;
    this.points.material.opacity = 0.12 + 0.32 * range(progress, 0.25, 0.8);
    // Yavaş drift — idle render açıkken sürekli oynar
    this.points.position.y = Math.sin(time * 0.45) * 0.28;
    this.points.position.x = Math.cos(time * 0.32) * 0.22;
    this.points.rotation.z = Math.sin(time * 0.08) * 0.04;
  }
}
