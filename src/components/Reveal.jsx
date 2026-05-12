import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,                 // ms
  threshold = 0.12,
  rootMargin = "0px 0px -10% 0px",
  children,
}) {
  const ref = useRef(null);
  const ioRef = useRef(null);
  const [on, setOn] = useState(false);
// Reserve.jsx の上の方に追加
const [fly, setFly] = useState(false);

const pulseFly = () => {
  setFly(true);
  window.setTimeout(() => setFly(false), 900);
};

const onSendLine = () => {
  pulseFly();
  if (LINE_URL && LINE_URL !== "#") {
    window.open(LINE_URL, "_blank", "noopener,noreferrer");
  }
};

const onSendMail = () => {
  pulseFly();
  window.location.href = mailto;
};
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }

    ioRef.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setOn(true);
          ioRef.current?.unobserve(e.target); // 1回だけで十分
        }
      },
      { threshold, rootMargin }
    );

    ioRef.current.observe(el);

    return () => {
      ioRef.current?.disconnect();
      ioRef.current = null;
    };
  }, [threshold, rootMargin]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${on ? "on" : ""} ${className}`}
      style={{ "--d": `${Math.max(0, Number(delay) || 0)}ms` }}
    >
      {children}
    </Tag>
  );
}