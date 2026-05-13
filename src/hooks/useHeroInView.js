import { useEffect, useState } from "react";

export function useHeroInView(heroId = "top") {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const el = document.getElementById(heroId);
    if (!el) return;

    // 初回：IOのコールバックを待たずに“体感近い”判定で即反映（途中リンク対策）
    const calc = () => {
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight || document.documentElement.clientHeight || 0;
      const cutoff = h * 0.65; // rootMargin bottom -35% をざっくり反映
      return rect.bottom > 0 && rect.top < cutoff;
    };

    // rAFで1フレーム後に確定（レイアウト確定後）
    const raf = window.requestAnimationFrame(() => setOn(calc()));

    if (!("IntersectionObserver" in window)) {
      return () => window.cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      ([entry]) => setOn(entry.isIntersecting),
      {
        threshold: 0.18,
        rootMargin: "0px 0px -35% 0px",
      }
    );

    io.observe(el);

    return () => {
      window.cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [heroId]);

  return on;
}