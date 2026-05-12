import styles from "./Voices.module.css";
import Reveal from "../components/Reveal";

const VOICES = [
  {
    no: "01",
    meta: "大人 / 再開",
    quote:
      "弾けない原因が「指」じゃなくて、姿勢とテンポだと分かっただけで、音が変わりました。",
    after: "“家で直せる量だけ”が、いちばん効く。",
  },
  {
    no: "02",
    meta: "小学生 / はじめて",
    quote:
      "できない所を叱られないのに、次の週にはちゃんとできるようになってて、本人が嬉しそうでした。",
    after: "親として、安心して任せられる感じ。",
  },
  {
    no: "03",
    meta: "伴奏 / 期限あり",
    quote:
      "毎回ひとつだけ直すから、練習が迷子にならない。帰り道に「もう一回弾く」が本当に起きます。",
    after: "短い期間でも、積み上がる。",
  },
];

export default function Voices() {
  return (
    <section className={styles.section} id="voices" aria-labelledby="voices-title">
      <div className={styles.inner}>
        {/* 音符（1個だけ / 描き出し） */}
        <Reveal as="div" className={styles.noteWrap} delay={60}>
          <svg className={styles.noteMark} viewBox="0 0 180 64" aria-hidden="true" focusable="false">
            <path d="M18 44 C46 20, 76 20, 102 40" />
            <path d="M100 40 C118 54, 138 54, 160 40" />
            <circle cx="42" cy="46" r="6" />
            <circle cx="122" cy="44" r="6" />
            <path d="M48 46 V22" />
            <path d="M128 44 V18" />
          </svg>
        </Reveal>

        <Reveal as="p" className={styles.kicker} delay={80}>
          VOICES
        </Reveal>

        <Reveal as="h2" className={styles.title} delay={140}>
          <span id="voices-title" className={styles.t1}>
            声の例を、3つ置きます。
          </span>
          <span className={styles.t2}>実文は集まり次第、差し替えます。</span>
        </Reveal>

        <Reveal as="p" className={styles.lead} delay={220}>
          ※いまは仮文です。運用しながら更新します。
        </Reveal>

        {/* “音符にのって”の土台：譜線トラック（センターに漂う） */}
        <Reveal as="div" className={styles.trackWrap} delay={220}>
          <svg className={styles.track} viewBox="0 0 920 220" aria-hidden="true" focusable="false">
            <path d="M12 60  C260 12  520 118 908 60" />
            <path d="M12 120 C260 72  520 178 908 120" />
            <path d="M12 180 C260 132 520 238 908 180" />
          </svg>
        </Reveal>

        {/* 譜線署名（1セットだけ / 右上に漂わせる） */}
        <svg className={styles.score} viewBox="0 0 520 120" aria-hidden="true" focusable="false">
          <path d="M10 34 C140 26 260 42 510 34" />
          <path d="M10 46 C150 38 270 54 510 46" />
          <path d="M10 58 C160 50 280 66 510 58" />
          <path d="M10 70 C150 62 270 78 510 70" />
          <path d="M10 82 C140 74 260 90 510 82" />
        </svg>

        <ul className={styles.list}>
          {VOICES.map((v, i) => (
            <Reveal
              as="li"
              key={v.no}
              className={`${styles.item} ${styles[`item${i + 1}`]}`}
              delay={260 + i * 90}
              style={{ ["--noteDelay"]: `${260 + i * 90}ms` }}
            >
              <div className={styles.head}>
                <span className={styles.no} aria-hidden="true">
                  {v.no}
                </span>
                <p className={styles.meta}>{v.meta}</p>
              </div>

              <p className={styles.quote}>「{v.quote}」</p>
              <p className={styles.after}>{v.after}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}