import styles from "./Header.module.css";

const ITEMS = [
  { href: "#about", label: "ABOUT" },
  { href: "#lesson", label: "LESSON" },
  { href: "#reserve", label: "RESERVE" },
];

export default function Header({ show = false, items = ITEMS }) {
  return (
    <header className={`${styles.header} ${show ? styles.on : ""}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="SORAOTO">
          {/* 画像は飾り扱い、テキストを実体にする（壊れても残る） */}
          <img
            className={styles.brandImg}
            src="/images/soraoto-logo.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            decoding="async"
          />
          <span className={styles.srOnly}>SORAOTO</span>
        </a>

        <nav className={styles.nav} aria-label="Global">
          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.href} className={styles.item}>
                <a className={styles.link} href={it.href}>
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}