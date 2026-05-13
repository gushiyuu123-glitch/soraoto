import { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./HeaderSp.module.css";

const DEFAULT_ITEMS = [
  { href: "#about-sp",  label: "ABOUT"  },
  { href: "#lesson-sp", label: "LESSON" },
  { href: "#price-sp",  label: "PRICE"  },
  { href: "#voices-sp", label: "VOICES" },
];

const TOP = "#top-sp";

export default function HeaderSp({ show = false, items = DEFAULT_ITEMS }) {
  const [open, setOpen] = useState(false);

  // Headerが消えるならメニューも閉じる（事故防止）
  useEffect(() => {
    if (!show) setOpen(false);
  }, [show]);

  // ESCで閉じる
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // 開いてる間だけスクロールを止める（縦だけ）
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const scrollToId = useCallback((hash) => {
    const el = document.querySelector(hash);
    if (!el) return;

    // fixed header + safe-area ぶんだけ上に余白を取る
    const safeTop = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue("--safe-top") || "0");
    const headerOffset = 64 + safeTop; // ここは好みで微調整
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const onLink = useCallback((e, href) => {
    if (!href?.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    // 閉じるアニメが気持ちいいように、1フレームだけ待つ
    requestAnimationFrame(() => scrollToId(href));
  }, [scrollToId]);

  return (
    <>
      <header className={`${styles.header} ${show ? styles.on : ""}`}>
        <div className={styles.inner}>
          <a className={styles.brand} href={TOP} aria-label="SORAOTO" onClick={(e)=>onLink(e, TOP)}>
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

          <button
            type="button"
            className={styles.menuBtn}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="sp-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.menuWord}>MENU</span>
            <span className={styles.menuMark} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* overlay */}
      <div className={`${styles.overlay} ${open ? styles.overlayOn : ""}`} onClick={() => setOpen(false)} />

      {/* sheet */}
      <aside id="sp-menu" className={`${styles.sheet} ${open ? styles.sheetOn : ""}`} aria-hidden={!open}>
        <div className={styles.sheetTop}>
          <div className={styles.sheetTitle}>SORAOTO</div>
          <button type="button" className={styles.closeBtn} onClick={() => setOpen(false)}>
            CLOSE
          </button>
        </div>

        <nav className={styles.nav} aria-label="Menu">
          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.href} className={styles.item}>
                <a className={styles.link} href={it.href} onClick={(e)=>onLink(e, it.href)}>
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}