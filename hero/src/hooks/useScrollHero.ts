import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollHero(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const progressRef = useRef(0);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const trigger = containerRef.current;

    if (reduced) {
      progressRef.current = 0;
      return;
    }

    const st = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: '+=2500',
      pin: true,
      scrub: 0.85,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, [enabled, containerRef]);

  return progressRef;
}
