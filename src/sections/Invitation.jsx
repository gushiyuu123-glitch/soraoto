import styles from "./Invitation.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

export default function Invitation() {
  const visual = "/images/soraoto-invitation2.jpeg";

  return (
    <section className={styles.section} id="about" aria-labelledby="inv-title">
      <div className={styles.inner}>
        {/* 編集の導入線 */}
        <div className={styles.rail} aria-hidden="true" />

        {/* 左：本文 */}
        <div className={styles.main}>
          {/* 雲：本文の“下敷き”（セクション内で固定） */}
          <img
            className={styles.cloudUnder}
            src="/images/cloud.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable="false"
          />

          <Reveal as="p" className={styles.kicker} delay={80}>
            INVITATION
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={140}>
            <span id="inv-title" className={styles.t1}>
              マンツーマンのピアノレッスン。
            </span>
            <span className={styles.t2}>指名制・予約制で受け付けています。</span>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={220}>
            毎回、担当は同じです。<br />
            少人数の枠で、1回ずつ積み上げます。
          </Reveal>

          <Reveal as="ul" className={styles.points} delay={300}>
            <li className={styles.point}>
              <span className={styles.no} aria-hidden="true">
                01
              </span>
              <p className={styles.text}>担当固定：毎回ゼロからになりません。</p>
            </li>
            <li className={styles.point}>
              <span className={styles.no} aria-hidden="true">
                02
              </span>
              <p className={styles.text}>枠は少数：時間の質を落とさないためです。</p>
            </li>
            <li className={styles.point}>
              <span className={styles.no} aria-hidden="true">
                03
              </span>
              <p className={styles.text}>基礎から：初心者でも大丈夫です。</p>
            </li>
          </Reveal>

          <Reveal as="p" className={styles.target} delay={360}>
            子どもから大人まで（目安：小学校高学年〜）
          </Reveal>

          <Reveal as="p" className={styles.note} delay={420}>
            体験の申込みは <span className={styles.noteEm}>RESERVE</span> から。
          </Reveal>
        </div>

        {/* 右：写真＋ラベル */}
        <aside className={styles.side} aria-label="details">
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

          <Reveal as="div" className={styles.sideMeta} delay={260}>
            <p className={styles.sideKicker}>Appointment-only</p>
            <p className={styles.sideLine}>Teacher fixed</p>
            <p className={styles.sideLine}>1:1 lesson</p>
            <p className={styles.sideLine}>Limited slots</p>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}