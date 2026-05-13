import styles from "./LessonSp.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

export default function LessonSp() {
  const visual = "/images/soraoto-lesson.png";

  return (
    <section className={styles.section} id="lesson-sp" aria-labelledby="lesson-title-sp">
      <div className={styles.inner}>
        <div className={styles.main}>
          <Reveal as="p" className={styles.kicker} delay={80}>
            LESSON
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={140}>
            <span id="lesson-title-sp" className={styles.t1}>
              弾き方を見て、今日やることを決めます。
            </span>
            <span className={styles.t2}>気分で終わらせず、次に繋げます。</span>
          </Reveal>

          {/* 長文を“刻む” */}
          <Reveal as="p" className={styles.lead} delay={220}>
            最初にいまの弾き方を見て、直す場所をひとつ決めます。
          </Reveal>
          <Reveal as="p" className={styles.lead} delay={260}>
            練習を小さく分けて、今日のゴールをはっきりさせます。
          </Reveal>
          <Reveal as="p" className={styles.lead} delay={300}>
            次回までにやることを、無理のない量で渡します。
          </Reveal>

          <Reveal as="p" className={styles.flowLine} delay={340}>
            <span className={styles.flowWord}>CHECK</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>FOCUS</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>NEXT</span>
          </Reveal>
        </div>

        {/* 写真：短く、空気として置く */}
        <aside className={styles.visualWrap} aria-label="lesson visual">
          <RevealImage as="figure" delay={160} className={styles.visual}>
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

          <Reveal as="div" className={styles.visualMeta} delay={260}>
            <p className={styles.metaKicker}>1 lesson</p>
            <p className={styles.metaLine}>Appointment-only</p>
            <p className={styles.metaLine}>Teacher fixed</p>
          </Reveal>
        </aside>

        <Reveal as="p" className={styles.target} delay={360}>
          小学校高学年〜大人まで。初心者も受け付けています。
        </Reveal>
      </div>
    </section>
  );
}