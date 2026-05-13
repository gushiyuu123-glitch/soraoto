import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,                 // ms
  threshold = 0.12,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  style,
  children,
}) {
  const ref = useRef(null);
  const ioRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setOn(true);
          if (once) io.unobserve(e.target);
        }
      },
      { threshold, rootMargin }
    );

    ioRef.current = io;
    io.observe(el);

    return () => {
      io.disconnect();
      ioRef.current = null;
    };
  }, [threshold, rootMargin, once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${on ? "on" : ""} ${className}`}
      style={{
        "--d": `${Math.max(0, Number(delay) || 0)}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}