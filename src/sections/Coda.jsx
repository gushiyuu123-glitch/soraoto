import styles from "./Coda.module.css";
import Reveal from "../components/Reveal";

export default function Coda() {
  return (
    <section className={styles.section} aria-label="coda">
      <div className={styles.inner}>
        <div className={styles.rail} aria-hidden="true" />

        <div className={styles.main}>
          {/* 譜面の気配：1本線＋終止 */}
          <svg className={styles.line} viewBox="0 0 520 46" aria-hidden="true" focusable="false">
            <path d="M10 24 C140 18 260 30 510 24" />
            <line x1="486" y1="14" x2="486" y2="34" />
            <line x1="506" y1="14" x2="506" y2="34" />
          </svg>

          <Reveal as="p" className={styles.text} delay={80}>
            体験は1回で十分です。続けるかは、そのあとで決めてください。
          </Reveal>

          <Reveal as="p" className={styles.sub} delay={140}>
            無理に増やしません。変化が見える分だけ。
          </Reveal>
        </div>
      </div>
    </section>
  );
}