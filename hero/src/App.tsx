import { Hero } from './components/Hero/Hero';
import styles from './styles/hero.module.scss';

export default function App() {
  return (
    <>
      <Hero />
      <section className={styles.nextSection}>
        <div className={styles.nextInner}>
          <p className={styles.nextEyebrow}>Welcome inside</p>
          <h1 className={styles.nextTitle}>Fresh bread, every morning.</h1>
          <p className={styles.nextBody}>
            Scroll-driven canvas hero with layered depth, hinged doors, warm light and
            particles — built for premium storytelling on the web.
          </p>
        </div>
      </section>
    </>
  );
}
