import { memo } from 'react';
import styles from '../../styles/hero.module.scss';

interface LoaderProps {
  visible: boolean;
  progress: number;
}

function LoaderComponent({ visible, progress }: LoaderProps) {
  if (!visible) return null;

  return (
    <div className={styles.loader} aria-hidden="true">
      <div className={styles.loaderRing} style={{ opacity: Math.min(1, progress * 1.4) }} />
      <div className={styles.loaderBar}>
        <span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
      </div>
    </div>
  );
}

export const Loader = memo(LoaderComponent);
