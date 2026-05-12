import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SkyNote.module.css";

export default function SkyNote({ children = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.wrap} aria-hidden="true">
      <svg className={styles.note} viewBox="0 0 120 120" fill="none">
        <path d="M70 18 C70 58 70 58 70 84" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M70 18 C92 22 102 34 100 50" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <ellipse cx="58" cy="88" rx="11" ry="7" fill="currentColor" opacity="0.46" />
        <path d="M18 70 C42 64 64 64 92 70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.32" />
      </svg>
      {children}
    </div>,
    document.body
  );
}