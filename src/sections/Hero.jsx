import { useMemo, useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

function getSkyPalette(timeStr) {
  const h = parseInt((timeStr ?? "12:00").split(":")[0], 10);
  if (h >= 0 && h < 5) return { r: 18, g: 20, b: 52, op: 0.58 };
  if (h < 7) return { r: 228, g: 118, b: 68, op: 0.22 };
  if (h < 10) return { r: 148, g: 196, b: 234, op: 0.13 };
  if (h < 16) return { r: 188, g: 218, b: 246, op: 0.08 };
  if (h < 18) return { r: 248, g: 148, b: 68, op: 0.22 };
  if (h < 21) return { r: 94, g: 48, b: 122, op: 0.36 };
  return { r: 18, g: 20, b: 52, op: 0.52 };
}

const NAV_ITEMS = [
  { href: "#top", label: "TOP" },
  { href: "#about", label: "ABOUT" },
  { href: "#lesson", label: "LESSON" },
  { href: "#reserve", label: "RESERVE" },
];

export default function Hero({ clock }) {
  const heroRef = useRef(null);
  const [navOn, setNavOn] = useState(true);

  const heroImage = "/images/soraoto-hero.png";
  const { r, g, b, op } = useMemo(() => getSkyPalette(clock), [clock]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([entry]) => {
        setNavOn(entry.isIntersecting);
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -35% 0px",
      }
    );

    io.observe(el);

    if (mq?.matches) setNavOn(true);

    return () => io.disconnect();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="top">
      <nav
        className={`${styles.heroNav} ${navOn ? "" : styles.heroNavHidden}`}
        aria-label="Primary"
      >
        <div className={styles.heroNavRail} aria-hidden="true" />
        <ul className={styles.heroNavList}>
          {NAV_ITEMS.map((it, idx) => (
            <li
              key={it.href}
              className={styles.heroNavItem}
              style={{ "--d": `${0.70 + idx * 0.08}s` }}
            >
              <a className={styles.heroNavLink} href={it.href}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 背景 */}
      <div className={styles.bg} aria-hidden="true">
        <img
          className={styles.bgImg}
          src={heroImage}
          alt=""
          loading="eager"
          fetchPriority="high"
        />

        <div
          className={styles.skyOverlay}
          style={{ backgroundColor: `rgba(${r},${g},${b},${op})` }}
        />

        <div className={styles.airMembrane} />
      </div>



      {/* コンテンツ */}
      <div className={styles.frame}>
        <div className={styles.rail} aria-hidden="true" />

        <div className={styles.block}>
          <div className={styles.metaRow}>
            <span className={styles.kicker}>
              OKINAWA&ensp;·&ensp;Appointment-only&ensp;·&ensp;Private Lesson
            </span>

            <div className={styles.clockBlock}>
              <span className={styles.clockLabel}>SKY TIME</span>
              <span className={styles.clockDigit}>{clock}</span>
            </div>
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleLine1}>音が、</span>
            <span className={styles.titleLine2}>
              空を呼吸する<span className={styles.punct}>。</span>
            </span>
          </h1>

          <div className={styles.signatureRow}>
            <span className={styles.brand} aria-label="SORAOTO">
              {"SORAOTO".split("").map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  className={styles.brandChar}
                  style={{ "--i": i }}
                  aria-hidden="true"
                >
                  {ch}
                </span>
              ))}
            </span>

            <span className={styles.brandSub}>
              完全指名制・予約制｜ピアノ個人レッスン
            </span>
          </div>

          <a className={styles.cta} href="#reserve">
            体験レッスンを予約する
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}