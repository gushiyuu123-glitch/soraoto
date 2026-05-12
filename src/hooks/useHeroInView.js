import { useEffect, useState } from "react";

export function useHeroInView(heroId = "top") {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const el = document.getElementById(heroId);
    if (!el || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => setOn(entry.isIntersecting),
      {
        threshold: 0.18,
        // Heroが“抜け始めたら”消える（気持ちよく切り替える）
        rootMargin: "0px 0px -35% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [heroId]);

  return on;
}