import { memo, useEffect, useRef, useState } from 'react';
import { useImages } from '../../hooks/useImages';
import { useScrollHero } from '../../hooks/useScrollHero';
import { HeroCanvas } from './HeroCanvas';
import styles from '../../styles/hero.module.scss';

function HeroComponent() {
  const sectionRef = useRef<HTMLElement>(null);
  const { textures, ready } = useImages();
  const progressRef = useScrollHero(sectionRef, ready);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [ready]);

  return (
    <section ref={sectionRef} className={styles.heroSection} aria-label="Hero">
      <div className={styles.heroStage}>
        {textures && (
          <HeroCanvas textures={textures} progressRef={progressRef} visible={revealed} />
        )}
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
