import styles from "./PeakSp.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

export default function PeakSp() {
  const visual = "/images/soraoto-peak.png";

  return (
    <section className={styles.section} id="moment-sp" aria-labelledby="moment-title-sp">
      <div className={styles.inner}>
        <RevealImage as="figure" className={styles.visual} delay={80}>
          <img
            className={styles.visualImg}
            src={visual}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <div className={styles.visualVeil} aria-hidden="true" />
        </RevealImage>

        {/* コピーは“画像の外”へ出す（SPの呼吸） */}
        <div className={styles.copy}>
          <svg className={styles.score} viewBox="0 0 520 120" aria-hidden="true" focusable="false">
            <path d="M10 34 C140 26 260 42 510 34" />
            <path d="M10 46 C150 38 270 54 510 46" />
            <path d="M10 58 C160 50 280 66 510 58" />
            <path d="M10 70 C150 62 270 78 510 70" />
            <path d="M10 82 C140 74 260 90 510 82" />
            <ellipse cx="186" cy="58" rx="8" ry="5.6" className={styles.noteFill} />
            <ellipse cx="252" cy="46" rx="8" ry="5.6" className={styles.noteFill} />
            <ellipse cx="320" cy="70" rx="8" ry="5.6" className={styles.noteFill} />
            <path d="M194 58 L194 28" />
            <path d="M260 46 L260 18" />
            <path d="M328 70 L328 38" />
            <path d="M178 62 C210 82 232 82 264 62" className={styles.tie} />
          </svg>

          <Reveal as="p" className={styles.kicker} delay={120}>
            MOMENT
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={170}>
            <span id="moment-title-sp" className={styles.t1}>
              音が変わる瞬間を、毎回つくる。
            </span>
            <span className={styles.t2}>帰り道に、もう一回だけ弾きたくなるように。</span>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={240}>
            直すのはひとつだけ。変化が見える量だけ。だから、家で続く。
          </Reveal>
        </div>
      </div>
    </section>
  );
}