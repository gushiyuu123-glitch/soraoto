import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./HeaderSp.module.css";

const DEFAULT_ITEMS = [
  { href: "#about-sp", label: "ABOUT" },
  { href: "#lesson-sp", label: "LESSON" },
  { href: "#price-sp", label: "PRICE" },
  { href: "#voices-sp", label: "VOICES" },
];

const TOP = "#top-sp";

export default function HeaderSp({ show = false, items = DEFAULT_ITEMS }) {
  const [open, setOpen] = useState(false);
  const lockYRef = useRef(0);
  const closeBtnRef = useRef(null);

  // ESCで閉じる
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // ✅ iOSでも飛ばないスクロールロック（overflow:hidden単体は禁止）
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;

    const y = window.scrollY || window.pageYOffset || 0;
    lockYRef.current = y;

    const prevBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    const prevHtmlOverflow = html.style.overflow;

    html.style.overflow = "hidden";   // バウンス抑え
    body.style.position = "fixed";    // 位置固定
    body.style.top = `-${y}px`;       // 現在位置を保持
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    // 開いたら close にフォーカス（キーボード事故防止）
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      html.style.overflow = prevHtmlOverflow;

      body.style.position = prevBody.position;
      body.style.top = prevBody.top;
      body.style.left = prevBody.left;
      body.style.right = prevBody.right;
      body.style.width = prevBody.width;

      window.scrollTo({ top: lockYRef.current, left: 0, behavior: "auto" });
    };
  }, [open]);

  const scrollToId = useCallback((hash) => {
    const el = document.querySelector(hash);
    if (!el) return;

    const safeTop = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--safe-top") || "0"
    );
    const headerOffset = 64 + safeTop; // 好みで微調整

    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const onLink = useCallback(
    (e, href) => {
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      e.stopPropagation();

      const wasOpen = open;
      setOpen(false);

      // 閉じの開始を1〜2フレーム待ってからスクロール（気持ちよさ）
      const go = () => scrollToId(href);
      if (wasOpen) requestAnimationFrame(() => requestAnimationFrame(go));
      else requestAnimationFrame(go);
    },
    [open, scrollToId]
  );

  const toggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className={`${styles.header} ${show ? styles.on : ""}`}>
        <div className={styles.inner}>
          <a className={styles.brand} href={TOP} aria-label="SORAOTO" onClick={(e) => onLink(e, TOP)}>
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
            onClick={toggle}
          >
            <span className={styles.menuWord}>MENU</span>
            <span className={styles.menuMark} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* overlay（クリックで閉じる） */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayOn : ""}`}
        aria-hidden={!open}
        onClick={close}
      />

      {/* sheet */}
      <aside
        id="sp-menu"
        className={`${styles.sheet} ${open ? styles.sheetOn : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sheetTop}>
          <div className={styles.sheetTitle}></div>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={close}
          >
            CLOSE
          </button>
        </div>

        <nav className={styles.nav} aria-label="Menu">
          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.href} className={styles.item}>
                <a className={styles.link} href={it.href} onClick={(e) => onLink(e, it.href)}>
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