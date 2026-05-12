// src/sections/Footer.jsx — SORAOTO
// 空気と音の終止。静かに残る。

import styles from "./Footer.module.css";
import Reveal from "../components/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();
  const logoSrc = "/images/soraoto-logo.png";

  const NAV = [
    { label: "Top", href: "#top" },
    { label: "Teacher", href: "#teacher" },
    { label: "Price", href: "#price" },
    { label: "Reserve", href: "#reserve" },
  ];

  return (
    <footer className={styles.section} aria-label="site footer">
      <div className={styles.inner}>
        {/* 左レール */}
        <div className={styles.rail} aria-hidden="true" />

        {/* ─── MAIN ─── */}
        <div className={styles.main}>
          {/* 終止線つき譜面 */}
          <svg className={styles.staff} viewBox="0 0 620 110" aria-hidden="true" focusable="false">
            {[22, 38, 54, 70, 86].map((y, i) => (
              <path
                key={i}
                className={styles.staffLine}
                d={`M12 ${y} C120 ${y - 6} 260 ${y + 6} 400 ${y - 4} S 560 ${y + 4} 600 ${y}`}
              />
            ))}

            <line x1="480" y1="20" x2="480" y2="88" className={styles.barThin} />
            <line x1="588" y1="20" x2="588" y2="88" className={styles.barThin} />
            <line x1="600" y1="20" x2="600" y2="88" className={styles.barBold} />

            <ellipse
              cx="508"
              cy="62"
              rx="7"
              ry="5"
              transform="rotate(-14 508 62)"
              className={styles.noteHead}
            />
            <line x1="514" y1="59" x2="514" y2="32" className={styles.noteStem} />
            <circle cx="524" cy="62" r="2" className={styles.noteHead} />
          </svg>

          {/* ロゴ（文字→画像） */}
          <Reveal as="div" className={styles.brandWrap} delay={60}>
            <a className={styles.brandLink} href="#top" aria-label="SORAOTO">
              <img
                className={styles.brandImg}
                src={logoSrc}
                alt=""
                aria-hidden="true"
                draggable="false"
                decoding="async"
              />
              <span className={styles.srOnly}>SORAOTO</span>
            </a>
          </Reveal>

          <Reveal as="p" className={styles.meta} delay={110}>
            Naha&nbsp;&nbsp;/&nbsp;&nbsp;1:1 Piano Lesson
          </Reveal>

          {/* SEO — 紙の端に低音量で1行 */}
          <Reveal as="p" className={styles.seo} delay={210} aria-hidden="true">
            那覇のピアノ個人レッスン&nbsp;｜&nbsp;体験レッスン&nbsp;｜&nbsp;予約制&nbsp;｜&nbsp;マンツーマン
          </Reveal>
        </div>

        {/* ─── NAV ─── */}
        <nav className={styles.nav} aria-label="footer navigation">
          {NAV.map(({ label, href }, i) => (
            // ✅ Revealをaにしない：href落ち/クリック不発を根絶
            <Reveal as="div" className={styles.navItemWrap} delay={100 + i * 50} key={label}>
              <a className={styles.navItem} href={href}>
                {label}
                <span className={styles.navArrow} aria-hidden="true">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </nav>

        {/* ─── 区切り線 ─── */}
        <div className={styles.divider} aria-hidden="true" />

        {/* ─── BOTTOM ─── */}
        <div className={styles.bottom}>
          <Reveal as="p" className={styles.copy} delay={300}>
            © {year} SORAOTO. All rights reserved.
          </Reveal>

          {/* ✅ ここもRevealをaにしない */}
          <Reveal as="div" className={styles.creditWrap} delay={340}>
            <a
              className={styles.credit}
              href="https://gushikendesign.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.creditLine} aria-hidden="true" />
              Design / Build — GUSHIKEN DESIGN
            </a>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}