// src/sections/Teacher.jsx
import styles from "./Teacher.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

export default function Teacher() {
  const visual = "/images/soraoto-teacher1.jpeg";

  // 仮プロフィール（後で差し替え）
  const teacher = {
    name: "比嘉 かのん",
    base: "沖縄県那覇市",
    years: "指導歴 12年",
    background: "沖縄県立芸術大学 音楽学部（ピアノ）",
    style: "毎回ひとつだけ直す / 家で続く量にする",
  };

  return (
    <section className={styles.section} id="teacher" aria-labelledby="teacher-title">
      <div className={styles.inner}>
        <div className={styles.rail} aria-hidden="true" />

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
            TEACHER
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={140}>
            <span id="teacher-title" className={styles.t1}>
              那覇で、ひとりの先生が見ます。
            </span>
            <span className={styles.t2}>
              毎回ゼロからにならない、指名制のレッスンです。
            </span>
          </Reveal>

          {/* 台帳プロフィール */}
          <Reveal as="div" className={styles.profile} delay={220} aria-label="teacher profile">
            <div className={styles.profileRow}>
              <span className={styles.profileKey}>NAME</span>
              <span className={styles.profileVal}>{teacher.name}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileKey}>BASE</span>
              <span className={styles.profileVal}>{teacher.base}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileKey}>CAREER</span>
              <span className={styles.profileVal}>{teacher.years}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileKey}>BACKGROUND</span>
              <span className={styles.profileVal}>{teacher.background}</span>
            </div>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={280}>
            音だけでなく、手の形・腕の使い方・姿勢・テンポ・譜読みも見ます。<br />
            直す場所は毎回ひとつに絞ります。家で続く量にしないと、積み上がらないからです。
          </Reveal>

          <Reveal as="p" className={styles.lead2} delay={320}>
            趣味でも大丈夫です。基礎からやり直したい大人、久しぶりに再開したい人、発表会や伴奏に向けて進めたい人に合います。
          </Reveal>

          {/* 署名ライン（編集感） */}
          <Reveal as="p" className={styles.flowLine} delay={360}>
            <span className={styles.flowWord}>POSTURE</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>TOUCH</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>RHYTHM</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>SCORE</span>
          </Reveal>

          {/* ✅ 予約文は削除（常設があるため） */}
        </div>

        <aside className={styles.visualWrap} aria-label="teacher visual">
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
            <p className={styles.metaKicker}>NAHA / Appointment-only</p>
            <p className={styles.metaLine}>Teacher fixed</p>
            <p className={styles.metaLine}>Beginner to adult</p>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}