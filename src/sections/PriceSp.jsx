import styles from "./PriceSp.module.css";
import Reveal from "../components/Reveal";

const PLANS = [
  {
    no: "01",
    eyebrow: "体験レッスン",
    meta: "45MIN / 1回",
    amount: "¥3,500",
    beat: 2,
    lead: "まずは1回、今の状態を見ます。",
    desc: "手の形、姿勢、音の出方を見て、どこから整えるかを一緒に決めます。",
    image: "/images/price-trial.png",
  },
  {
    no: "02",
    eyebrow: "通常レッスン",
    meta: "45MIN / 1回",
    amount: "¥5,500",
    beat: 3,
    lead: "毎回、同じ先生で積み上げます。",
    desc: "前回の続きから進めるので、やり直しが少なく、基礎も少しずつ定着します。",
    image: "/images/price-regular.png",
  },
  {
    no: "03",
    eyebrow: "月4回コース",
    meta: "45MIN × 4",
    amount: "¥20,000",
    beat: 4,
    lead: "習慣として続けたい人向けです。",
    desc: "週1回の間隔で進めたい人に。発表会、伴奏、再開組にも合います。",
    image: "/images/price-monthly.png",
  },
];

const NOTES = ["入会金はありません。", "振替は月内でご相談ください。", "教材は必要な分だけご案内します。"];

export default function PriceSp() {
  return (
<section className={styles.section} id="price-sp" aria-labelledby="price-title-sp">
      <div className={styles.inner}>
        <div className={styles.rail} aria-hidden="true" />

        <div className={styles.main}>
          <Reveal as="p" className={styles.kicker} delay={80}>
            PRICE
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={140}>
       <span id="price-title-sp" className={styles.t1}>
              料金は、迷わない形にしています。
            </span>
            <span className={styles.t2}>続くことが一番大事だから。</span>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={220}>
            まずは体験で、今の状態と進め方を確認します。<br />
            そのあと、通い方に合わせて選べます。
          </Reveal>
            <img
    className={styles.grassAccent}
    src="/images/grass-left-up.png"
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    draggable="false"
  />
        </div>

        <aside className={styles.sheet} aria-label="price plans">
          {/* 薄い譜線署名 */}
          <svg className={styles.score} viewBox="0 0 520 120" aria-hidden="true" focusable="false">
            <path d="M10 34 C140 26 260 42 510 34" />
            <path d="M10 46 C150 38 270 54 510 46" />
            <path d="M10 58 C160 50 280 66 510 58" />
            <path d="M10 70 C150 62 270 78 510 70" />
            <path d="M10 82 C140 74 260 90 510 82" />
          </svg>

          <ul className={styles.list}>
            {PLANS.map((p, i) => (
              <Reveal
                as="li"
                key={p.no}
                className={`${styles.plan} ${styles[`plan${i + 1}`]}`}
                delay={160 + i * 90}
                style={{ ["--beat"]: p.beat }}
              >
                <figure className={styles.media} aria-hidden="true">
                  {/* “思い出の全方位膜” */}
                  <span className={styles.memory} aria-hidden="true" />
                  <img className={styles.mediaImg} src={p.image} alt="" loading="lazy" decoding="async" draggable="false" />
                </figure>

                <div className={styles.info}>
                  <div className={styles.top}>
                    <div className={styles.head}>
                      <span className={styles.no} aria-hidden="true">
                        {p.no}
                      </span>
                      <div className={styles.headText}>
                        <p className={styles.eyebrow}>{p.eyebrow}</p>
                        <p className={styles.meta}>{p.meta}</p>
                      </div>
                    </div>

                    <div className={styles.price}>
                      <div className={styles.beat} aria-hidden="true" />
                      <p className={styles.amount}>{p.amount}</p>
                    </div>
                  </div>

                  <p className={styles.planLead}>{p.lead}</p>
                  <p className={styles.desc}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className={styles.notes}>
            {NOTES.map((t, i) => (
              <Reveal as="p" className={styles.note} delay={470 + i * 60} key={t}>
                {t}
              </Reveal>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}