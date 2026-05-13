import { useEffect, useRef, useState } from "react";
import styles from "./FloatingNotesPng.module.css";

const NOTES = [
  "/images/notes/note-1.png",
  "/images/notes/note-2.png",
  "/images/notes/note-3.png",
];

/**
 * 画面内に散るアンカー（端すぎない）
 * - 右下CTA付近は重み強め
 * - 上段は控えめ（ヘッダー周りを濁しにくい）
 */
const ANCHORS = [
  // 上（控えめ）
  { x: 18, y: 18, w: 1 },
  { x: 50, y: 16, w: 1 },
  { x: 82, y: 18, w: 1 },

  // 中（普通）
  { x: 16, y: 40, w: 2 },
  { x: 50, y: 42, w: 2 },
  { x: 84, y: 40, w: 2 },

  // 中下（普通）
  { x: 26, y: 58, w: 2 },
  { x: 62, y: 58, w: 2 },

  // 下（やや多め）
  { x: 14, y: 76, w: 2 },
  { x: 48, y: 80, w: 2 },
  { x: 72, y: 76, w: 2 },

  // 右下CTA（主役）
  { x: 86, y: 83, w: 6 },
];

const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function pickAnchorWeighted() {
  const total = ANCHORS.reduce((sum, a) => sum + a.w, 0);
  let r = Math.random() * total;
  for (const a of ANCHORS) {
    r -= a.w;
    if (r <= 0) return a;
  }
  return ANCHORS[ANCHORS.length - 1];
}

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random()}`;
}

export default function FloatingNotesPng({ show = true, debug = false }) {
  const [items, setItems] = useState([]);
  const timersRef = useRef(new Set());

  useEffect(() => {
    const clearAllTimers = () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current.clear();
    };

    if (!show) {
      setItems([]);
      clearAllTimers();
      return;
    }

    // reduced-motion は出さない（静けさ優先）
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setItems([]);
      clearAllTimers();
      return () => clearAllTimers();
    }

    let mounted = true;

    const spawnOne = () => {
      if (!mounted) return;

      setItems((prev) => {
        // ✅ 同時表示：落ち着かせる
        const maxLive = debug ? 12 : 6;
        if (prev.length >= maxLive) return prev;

        const a = pickAnchorWeighted();
        const id = uid();
        const src = NOTES[Math.floor(Math.random() * NOTES.length)];

        // ✅ 画面内に収める（端で切れない）
        const startX = clamp(a.x + rand(-6.0, 6.0), 8, 92);
        const startY = clamp(a.y + rand(-6.0, 6.0), 10, 90);

        // ✅ duration：少し長くして“急かし”を消す（同時数はmaxLiveで制御）
        const duration = rand(8800, 13200);
        const delay = rand(0, 620);

        // ✅ 動き：レンジを狭める（小刻みなノイズを減らす）
        const rise = rand(26, 58);
        const driftX = rand(-18, 18);

        // 中間点用（calcで掛け算しない）
        const dxm = driftX * 0.42;
        const dy = -rise;
        const dym = dy * 0.42;

        // ✅ 回転：揺れ幅を減らす
        const rot0 = rand(-10, 8);
        const rot1 = rot0 + rand(-6, 10);

        // ✅ スケール：変化量を小さく
        const s0 = rand(0.96, 1.04);
        const s1 = s0 + rand(0.03, 0.1);

        // ✅ 濃さ：ピークを落とす（落ち着く）
        const peak = rand(0.12, 0.22);

        // 端末でレンジを分ける（品が残る）
        const isCoarse =
          typeof window !== "undefined" &&
          window.matchMedia?.("(pointer: coarse)")?.matches;

        const size = isCoarse ? rand(34, 52) : rand(38, 60);

        const it = {
          id,
          src,
          startX,
          startY,
          duration,
          delay,
          driftX,
          dxm,
          dy,
          dym,
          rot0,
          rot1,
          s0,
          s1,
          peak,
          size,
        };

        const kill = window.setTimeout(() => {
          setItems((curr) => curr.filter((x) => x.id !== id));
          timersRef.current.delete(kill);
        }, duration + delay + 260);

        timersRef.current.add(kill);
        return [...prev, it];
      });
    };

    // ✅ 初動：2発だけ置くが、2発目を少し遅らせて圧を減らす
    const boot = window.setTimeout(() => {
      spawnOne();
      window.setTimeout(spawnOne, 900);
    }, debug ? 120 : 760);
    timersRef.current.add(boot);

    // ✅ ループ：出現頻度を下げて落ち着かせる
    const loop = () => {
      if (!mounted) return;

      spawnOne();

      const next = debug ? rand(850, 1200) : rand(2400, 4200);
      const t = window.setTimeout(loop, next);
      timersRef.current.add(t);
    };

    const starter = window.setTimeout(loop, debug ? 240 : 1400);
    timersRef.current.add(starter);

    return () => {
      mounted = false;
      clearAllTimers();
    };
  }, [show, debug]);

  if (!show) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      {items.map((it) => (
        <div
          key={it.id}
          className={styles.item}
          style={{
            left: `${it.startX}vw`,
            top: `${it.startY}vh`,
            width: `${it.size}px`,
            height: `${it.size}px`,
            "--dur": `${it.duration}ms`,
            "--delay": `${it.delay}ms`,
            "--dx": `${it.driftX}px`,
            "--dxm": `${it.dxm}px`,
            "--dy": `${it.dy}px`,
            "--dym": `${it.dym}px`,
            "--r0": `${it.rot0}deg`,
            "--r1": `${it.rot1}deg`,
            "--s0": it.s0,
            "--s1": it.s1,
            "--peak": it.peak,
          }}
        >
          <img
            className={styles.img}
            src={it.src}
            alt=""
            draggable="false"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}