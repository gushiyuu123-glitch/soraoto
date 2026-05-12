import styles from "./FloatingReserve.module.css";

export default function FloatingReserve({ show = true, href = "#reserve" }) {
  return (
    <div className={`${styles.wrap} ${show ? styles.on : ""}`} aria-hidden={!show}>
      <a className={styles.cta} href={href} aria-label="体験レッスンを予約する">
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