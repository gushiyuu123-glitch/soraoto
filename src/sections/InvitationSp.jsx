import styles from "./InvitationSp.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

export default function InvitationSp() {
  const visual = "/images/soraoto-invitation2.jpeg";

  return (
    <section className={styles.section} id="about-sp" aria-labelledby="inv-title-sp">
      <div className={styles.inner}>
        {/* 写真：先に置いて“空気”を作る */}
        <RevealImage as="figure" delay={80} className={styles.visual}>
          <img
            className={styles.visualImg}
            src={visual}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <div className={styles.visualVeil} aria-hidden="true" />
          <figcaption className={styles.caption} aria-hidden="true">
            Appointment-only · Teacher fixed · 1:1
          </figcaption>
        </RevealImage>

        {/* 本文 */}
        <div className={styles.main}>
          <Reveal as="p" className={styles.kicker} delay={120}>
            INVITATION
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={170}>
            <span id="inv-title-sp" className={styles.t1}>
              マンツーマンのピアノレッスン。
            </span>
            <span className={styles.t2}>指名制・予約制で受け付けています。</span>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={240}>
            毎回、担当は同じです。<br />
            少人数の枠で、1回ずつ積み上げます。
          </Reveal>

          <Reveal as="ul" className={styles.points} delay={310}>
            <li className={styles.point}>
              <span className={styles.no} aria-hidden="true">01</span>
              <p className={styles.text}>担当固定：毎回ゼロからになりません。</p>
            </li>
            <li className={styles.point}>
              <span className={styles.no} aria-hidden="true">02</span>
              <p className={styles.text}>枠は少数：時間の質を落とさないためです。</p>
            </li>
            <li className={styles.point}>
              <span className={styles.no} aria-hidden="true">03</span>
              <p className={styles.text}>基礎から：初心者でも大丈夫です。</p>
            </li>
          </Reveal>

          <Reveal as="div" className={styles.footerNote} delay={380}>
            <p className={styles.target}>子どもから大人まで（目安：小学校高学年〜）</p>
            <p className={styles.note}>
              体験の申込みは <span className={styles.noteEm}>RESERVE</span> から。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}