import styles from "./TeacherSp.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

export default function TeacherSp() {
  const visual = "/images/soraoto-teacher1.jpeg";

  const teacher = {
    name: "比嘉 かのん",
    base: "沖縄県那覇市",
    years: "指導歴 12年",
    background: "沖縄県立芸術大学 音楽学部（ピアノ）",
  };

  return (
    <section className={styles.section} id="teacher-sp" aria-labelledby="teacher-title-sp">
      <div className={styles.inner}>
        {/* 先に“実在感” */}
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
            NAHA · Appointment-only · Teacher fixed
          </figcaption>
        </RevealImage>

        <div className={styles.main}>
          <Reveal as="p" className={styles.kicker} delay={120}>
            TEACHER
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={170}>
            <span id="teacher-title-sp" className={styles.t1}>
              那覇で、ひとりの先生が見ます。
            </span>
            <span className={styles.t2}>毎回ゼロからにならない、指名制のレッスンです。</span>
          </Reveal>

          {/* 台帳：薄く */}
          <Reveal as="div" className={styles.profile} delay={240} aria-label="teacher profile">
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

          {/* 本文：短く刻む */}
          <Reveal as="p" className={styles.lead} delay={300}>
            音だけでなく、手の形・腕の使い方・姿勢・テンポ・譜読みも見ます。
          </Reveal>
          <Reveal as="p" className={styles.lead2} delay={340}>
            直す場所は毎回ひとつ。家で続く量にしないと、積み上がらないからです。
          </Reveal>

          <Reveal as="p" className={styles.target} delay={380}>
            基礎からやり直したい大人、再開したい人、伴奏や発表会に向けたい人に合います。
          </Reveal>

          <Reveal as="p" className={styles.flowLine} delay={420}>
            <span className={styles.flowWord}>POSTURE</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>TOUCH</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>RHYTHM</span>
            <span className={styles.flowSep} aria-hidden="true">—</span>
            <span className={styles.flowWord}>SCORE</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}