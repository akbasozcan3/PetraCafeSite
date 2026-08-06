export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  twinkle: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private readonly count: number;

  constructor(count: number) {
    this.count = count;
  }

  init(width: number, height: number) {
    this.particles = Array.from({ length: this.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.08 - Math.random() * 0.22,
      size: 0.6 + Math.random() * 2.2,
      alpha: 0.08 + Math.random() * 0.35,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }

  resize(width: number, height: number) {
    if (this.particles.length === 0) {
      this.init(width, height);
      return;
    }
    for (const p of this.particles) {
      p.x = Math.min(width, p.x);
      p.y = Math.min(height, p.y);
    }
  }

  update(width: number, height: number, intensity: number, dt: number) {
    if (this.particles.length === 0) this.init(width, height);

    for (const p of this.particles) {
      p.x += p.vx * dt * (0.6 + intensity);
      p.y += p.vy * dt * (0.6 + intensity);
      p.twinkle += dt * 0.002;

      if (p.y < -8) {
        p.y = height + 8;
        p.x = Math.random() * width;
      }
      if (p.x < -8) p.x = width + 8;
      if (p.x > width + 8) p.x = -8;
    }
  }

  draw(ctx: CanvasRenderingContext2D, intensity: number, mobile: boolean) {
    const cap = mobile ? 0.55 : 1;
    ctx.save();
    for (const p of this.particles) {
      const a = p.alpha * intensity * cap * (0.65 + Math.sin(p.twinkle) * 0.35);
      ctx.fillStyle = `rgba(255, 220, 160, ${a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

export const particleSystem = new ParticleSystem(120);
