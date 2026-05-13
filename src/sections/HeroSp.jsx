import { useMemo } from "react";
import styles from "./HeroSp.module.css";

function getSkyPalette(timeStr) {
  const h = parseInt((timeStr ?? "12:00").split(":")[0], 10);
  if (h >= 0 && h < 5) return { r: 18, g: 20, b: 52, op: 0.58 };
  if (h < 7) return { r: 228, g: 118, b: 68, op: 0.22 };
  if (h < 10) return { r: 148, g: 196, b: 234, op: 0.13 };
  if (h < 16) return { r: 188, g: 218, b: 246, op: 0.08 };
  if (h < 18) return { r: 248, g: 148, b: 68, op: 0.22 };
  if (h < 21) return { r: 94, g: 48, b: 122, op: 0.36 };
  return { r: 18, g: 20, b: 52, op: 0.52 };
}

const ID = {
  top: "top-sp",
  reserve: "reserve-sp",
};

export default function HeroSp({ clock }) {
  const heroImage = "/images/soraoto-herosp1.png";
  const { r, g, b, op } = useMemo(() => getSkyPalette(clock), [clock]);

  return (
    <section className={styles.hero} id={ID.top}>
      {/* 背景 */}
      <div className={styles.bg} aria-hidden="true">
        <img
          className={styles.bgImg}
          src={heroImage}
          alt=""
          loading="eager"
          fetchPriority="high"
        />
        <div
          className={styles.skyOverlay}
          style={{ backgroundColor: `rgba(${r},${g},${b},${op})` }}
        />
        <div className={styles.airMembrane} />
      </div>

      {/* コンテンツ */}
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.kicker}>OKINAWA · Private Piano Lesson</span>

          <div className={styles.clockBlock}>
            <span className={styles.clockLabel}>SKY</span>
            <span className={styles.clockDigit}>{clock}</span>
          </div>
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine1}>音が、</span>
          <span className={styles.titleLine2}>
            空を呼吸する<span className={styles.punct}>。</span>
          </span>
        </h1>

        <div className={styles.signatureRow}>
          <span className={styles.brand} aria-label="SORAOTO">
            {"SORAOTO".split("").map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className={styles.brandChar}
                style={{ "--i": i }}
                aria-hidden="true"
              >
                {ch}
              </span>
            ))}
          </span>

          <span className={styles.brandSub}>
            完全指名制・予約制｜ピアノ個人レッスン
          </span>
        </div>

        {/* SPは“ボタン”にしない。文字で刺す */}
        <a className={styles.cta} href={`#${ID.reserve}`}>
          体験レッスンを予約する
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}