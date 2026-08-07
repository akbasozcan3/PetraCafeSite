import { clamp01 } from './utils.js?v=20260807x4';

/** .gate sticky scroll ile ilerleme (0→1) */
export class ScrollController {
  constructor(gateEl) {
    this.gate = gateEl;
    this.progress = 0;
    this._onScroll = () => this.update();
  }

  mount() {
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this.update();
  }

  unmount() {
    window.removeEventListener('scroll', this._onScroll);
  }

  update() {
    if (!this.gate) {
      this.progress = 0;
      return 0;
    }
    const travel = this.gate.offsetHeight - window.innerHeight;
    this.progress = clamp01(-this.gate.getBoundingClientRect().top / Math.max(1, travel));
    return this.progress;
  }

  getProgress() {
    return this.progress;
  }
}
