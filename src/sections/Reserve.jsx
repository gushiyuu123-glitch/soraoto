// src/sections/Reserve.jsx
import { useEffect, useMemo, useState } from "react";
import styles from "./Reserve.module.css";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(mq.matches);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function Reserve() {
  const LINE_URL = "#";
  const roomVisual = "/images/soraoto-private-room.jpeg"; // ← 差し込む画像

  const reduced = useReducedMotion();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [exp, setExp] = useState("再開");
  const [slot, setSlot] = useState("土曜 15:00〜（第2希望あり）");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  const [copied, setCopied] = useState(false);
  const [fly, setFly] = useState(false);

  const message = useMemo(() => {
    return (
      `【体験レッスン希望】\n` +
      `お名前：${name || "（未入力）"}\n` +
      `年齢：${age || "（未入力）"}\n` +
      `経験：${exp}\n` +
      `希望日時：${slot}\n` +
      `連絡先：${contact || "（未入力）"}\n` +
      `一言：${note || "（任意）"}`
    );
  }, [name, age, exp, slot, contact, note]);

  const SUBJECT = encodeURIComponent("体験レッスン予約");
  const BODY = encodeURIComponent(message);
  const mailto = `mailto:?subject=${SUBJECT}&body=${BODY}`;

  const pulseFly = () => {
    if (reduced) return;
    setFly(true);
    window.setTimeout(() => setFly(false), 920);
  };

  const tryCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
      return true;
    } catch {
      const el = document.getElementById("reserve-message");
      if (el) {
        el.focus();
        el.select?.();
      }
      return false;
    }
  };

  const onCopy = async () => {
    await tryCopy();
  };

  const onSendLine = async () => {
    pulseFly();
    await tryCopy();
    if (LINE_URL && LINE_URL !== "#") {
      window.open(LINE_URL, "_blank", "noopener,noreferrer");
    }
  };

  const onSendMail = async () => {
    pulseFly();
    await tryCopy();
    window.location.href = mailto;
  };

  return (
    <section className={styles.section} id="reserve" aria-labelledby="reserve-title">
      <div className={styles.inner}>
        <div className={styles.rail} aria-hidden="true" />

        <div className={styles.main}>
          <Reveal as="p" className={styles.kicker} delay={80}>
            RESERVE
          </Reveal>

          <Reveal as="h2" className={styles.title} delay={140}>
            <span id="reserve-title" className={styles.t1}>
              体験レッスンの予約
            </span>
            <span className={styles.t2}>
              那覇 / 指名制 / 予約制
            </span>
          </Reveal>

          <Reveal as="p" className={styles.lead} delay={220}>
            送る内容は最小にしています。<br />
            返信で日時を確定します（目安：24時間以内）。
          </Reveal>

          {/* 左カラム下の空気画像 */}
          <RevealImage as="figure" className={styles.roomVisual} delay={280}>
            <img
              className={styles.roomImg}
              src={roomVisual}
              alt="アップライトピアノが置かれた静かなレッスン空間"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
            <div className={styles.roomVeil} aria-hidden="true" />
            <div className={styles.roomShade} aria-hidden="true" />
          </RevealImage>

          <Reveal as="p" className={styles.roomCaption} delay={320}>
            静かな空間で、1回ずつ積み上げます。
          </Reveal>

          <svg className={styles.score} viewBox="0 0 520 120" aria-hidden="true" focusable="false">
            <path d="M10 34 C140 26 260 42 510 34" />
            <path d="M10 46 C150 38 270 54 510 46" />
            <path d="M10 58 C160 50 280 66 510 58" />
            <path d="M10 70 C150 62 270 78 510 70" />
            <path d="M10 82 C140 74 260 90 510 82" />
          </svg>
        </div>

        <aside className={styles.slip} aria-label="reserve slip">
          <Reveal as="div" className={styles.slipInner} delay={200}>
            <div className={styles.slipHead}>
              <p className={styles.slipTitle}>予約票</p>
              <p className={styles.slipMeta}>Trial lesson / 45 min</p>
            </div>

            <div className={styles.grid}>
              <label className={styles.field}>
                <span className={styles.label}>お名前</span>
                <input
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：比嘉 花子"
                  autoComplete="name"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>年齢</span>
                <input
                  className={styles.input}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="例：32"
                  inputMode="numeric"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>経験</span>
                <select
                  className={styles.select}
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                >
                  <option>初心者</option>
                  <option>再開</option>
                  <option>伴奏</option>
                  <option>発表会</option>
                  <option>趣味</option>
                </select>
              </label>

              <div className={styles.field}>
                <span className={styles.label}>希望日時</span>
                <div className={styles.slots} role="list">
                  {[
                    "平日 10:00〜（第2希望あり）",
                    "土曜 15:00〜（第2希望あり）",
                    "日曜 午前（第2希望あり）",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.slot} ${slot === s ? styles.slotOn : ""}`}
                      onClick={() => setSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <input
                  className={`${styles.input} ${styles.slotFree}`}
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  placeholder="自由入力もOK（例：火曜 19:00〜）"
                />
              </div>

              <label className={styles.field}>
                <span className={styles.label}>連絡先</span>
                <input
                  className={styles.input}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="メール / LINE ID など"
                  autoComplete="email"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>一言（任意）</span>
                <input
                  className={styles.input}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="例：久しぶりに再開したいです"
                />
              </label>
            </div>

            <div className={styles.tear} aria-hidden="true" />

            <div className={styles.messageArea}>
              <p className={styles.msgTitle}>送信用メッセージ</p>

              <textarea
                id="reserve-message"
                className={styles.textarea}
                value={message}
                readOnly
              />

              <div className={styles.actions} data-fly={fly ? "1" : "0"}>
                <svg className={styles.sendStaff} viewBox="0 0 520 90" aria-hidden="true" focusable="false">
                  <path d="M8 18 C120 6, 220 34, 332 18 S 460 6, 512 18" />
                  <path d="M8 45 C120 33, 220 61, 332 45 S 460 33, 512 45" />
                  <path d="M8 72 C120 60, 220 88, 332 72 S 460 60, 512 72" />
                </svg>

                <span className={styles.sendNote} aria-hidden="true">
                  <span className={styles.noteHead} />
                  <span className={styles.noteStem} />
                </span>

                <button type="button" className={styles.send} onClick={onSendLine}>
                  音符を送る{" "}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </button>

                <button type="button" className={styles.sendGhost} onClick={onSendMail}>
                  メールで送る{" "}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </button>
              </div>


            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}