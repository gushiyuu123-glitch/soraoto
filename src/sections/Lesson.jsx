// src/sections/Lesson.jsx
import styles from "./Lesson.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

export default function Lesson() {
  const visual = "/images/soraoto-lesson.png"; // 差し替えOK

  return (
    <section className={styles.section} id="lesson" aria-labelledby="lesson-title">
      <div className={styles.inner}>
        {/* 編集の導入線 */}
        <div className={styles.rail} aria-hidden="true" />

        {/* 写真（PCでは左 / SPでは下） */}
        <aside className={styles.visualWrap} aria-label="lesson visual">
          <RevealImage as="figure" delay={120} className={styles.visual}>
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

        {/* 本文（PCでは右） */}
        <div className={styles.main}>
          {/* 雲：本文の“下敷き”（セクション内で固定） */}
          <img
            className={styles.cloudUnder}
            src="/images/onpu1.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable="false"
          />

          <Reveal as="p" className={styles.kicker} delay={80}>
            LESSON
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={140}>
            <span id="lesson-title" className={styles.t1}>
              弾き方を見て、<wbr />
              今日やることを決めます。
            </span><br />
            <span className={styles.t2}>
              気分で終わらせず、<wbr />
              次に繋げます。
            </span>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={220}>
            最初にいまの弾き方を見て、直す場所をひとつ決めます。<br />
            そのうえで練習を小さく分けて、今日のゴールをはっきりさせます。<br />
            最後に、次回までにやることを無理のない量で渡します。
          </Reveal>

          <Reveal as="p" className={styles.flowLine} delay={300}>
            <span className={styles.flowWord}>CHECK</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>FOCUS</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>NEXT</span>
          </Reveal>

          <Reveal as="p" className={styles.target} delay={360}>
            小学校高学年〜大人まで。初心者も受け付けています。
          </Reveal>
        </div>
      </div>
    </section>
  );
}