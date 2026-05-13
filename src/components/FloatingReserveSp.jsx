import styles from "./FloatingReserveSp.module.css";

function scrollWithOffset(hash) {
  const el = document.querySelector(hash);
  if (!el) return;

  // Header分 + safe-area を軽く見込む（数値は好みで微調整OK）
  const safeTop = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--safe-top") || "0"
  );
  const offset = 68 + safeTop;

  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function FloatingReserveSp({ show = true, href = "#reserve-sp" }) {
  const onClick = (e) => {
    if (!href?.startsWith("#")) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    scrollWithOffset(href);
  };

  return (
    <div className={`${styles.wrap} ${show ? styles.on : ""}`} aria-hidden={!show}>
      <a
        className={styles.cta}
        href={href}
        onClick={onClick}
        aria-label="体験レッスンを予約する"
        tabIndex={show ? 0 : -1}
      >
        <img
          className={styles.cloud}
          src="/images/piano.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <span className={styles.kicker}>Trial lesson</span>
        <span className={styles.label}>RESERVE</span>
        <span className={styles.sub}>体験レッスン予約</span>
      </a>
    </div>
  );
}