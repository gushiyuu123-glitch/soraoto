import { useEffect, useRef, useState } from "react";
import styles from "./FloatingNotesPngSp.module.css";

const NOTES = [
  "/images/notes/note-1.png",
  "/images/notes/note-2.png",
  "/images/notes/note-3.png",
];

// SP：中央(読ませる帯)を避けた“左右の気配”アンカー
const ANCHORS = [
  // 上〜中（薄く：ヘッダー濁らせない）
  { x: 14, y: 26, w: 1 },
  { x: 86, y: 28, w: 1 },

  // 中（主戦場：左右）
  { x: 12, y: 44, w: 3 },
  { x: 88, y: 46, w: 3 },

  // 中下（左右＋少し内側）
  { x: 18, y: 60, w: 3 },
  { x: 82, y: 62, w: 3 },

  // 下（右下CTA帯は避ける：右は少し上へ）
  { x: 20, y: 78, w: 2 },
  { x: 70, y: 76, w: 2 },
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

export default function FloatingNotesPngSp({ show = true, debug = false }) {
  const [items, setItems] = useState([]);
  const timersRef = useRef(new Set());
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onVis = () => setActive(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const clearAllTimers = () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current.clear();
    };

    const setT = (fn, ms) => {
      const id = window.setTimeout(() => {
        timersRef.current.delete(id);
        fn();
      }, ms);
      timersRef.current.add(id);
      return id;
    };

    // off / paused
    if (!show || !active) {
      setItems([]);
      clearAllTimers();
      return;
    }

    // reduced-motion は出さない
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const stopForReduced = () => {
      if (mq?.matches) {
        setItems([]);
        clearAllTimers();
      }
    };
    stopForReduced();

    const onMq = () => stopForReduced();
    mq?.addEventListener?.("change", onMq);

    let mounted = true;

    const spawnOne = () => {
      if (!mounted) return;

      setItems((prev) => {
        const maxLive = debug ? 8 : 4;
        if (prev.length >= maxLive) return prev;

        const a = pickAnchorWeighted();
        const id = uid();
        const src = NOTES[Math.floor(Math.random() * NOTES.length)];

        // 端を避けて、中央も避ける
        const startX = clamp(a.x + rand(-5.0, 5.0), 10, 90);
        const startY = clamp(a.y + rand(-5.0, 5.0), 18, 88);

        // “急かし”を消す：長め
        const duration = rand(9800, 15800);
        const delay = rand(0, 520);

        // 動き：レンジ小さめ（呼吸）
        const rise = rand(24, 52);
        const driftX = rand(-14, 14);

        const dxm = driftX * 0.42;
        const dy = -rise;
        const dym = dy * 0.42;

        // 回転：静か
        const rot0 = rand(-8, 6);
        const rot1 = rot0 + rand(-5, 8);

        // スケール：微細
        const s0 = rand(0.97, 1.03);
        const s1 = s0 + rand(0.03, 0.08);

        // 濃さ：さらに落とす
        const peak = rand(0.08, 0.16);

        const isCoarse =
          typeof window !== "undefined" &&
          window.matchMedia?.("(pointer: coarse)")?.matches;

        const size = isCoarse ? rand(32, 46) : rand(36, 52);

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

        // kill も必ず追跡
        setT(() => {
          setItems((curr) => curr.filter((x) => x.id !== id));
        }, duration + delay + 260);

        return [...prev, it];
      });
    };

    // 初動：1発だけ（SPの圧を消す）
    setT(() => spawnOne(), debug ? 120 : 820);

    // ループ：頻度を落として落ち着かせる
    const loop = () => {
      if (!mounted) return;
      spawnOne();
      setT(loop, debug ? rand(900, 1300) : rand(3200, 5400));
    };
    setT(loop, debug ? 240 : 1600);

    return () => {
      mounted = false;
      mq?.removeEventListener?.("change", onMq);
      clearAllTimers();
    };
  }, [show, debug, active]);

  if (!show || !active) return null;

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
          <img className={styles.img} src={it.src} alt="" draggable="false" decoding="async" />
        </div>
      ))}
    </div>
  );
}