import { useEffect, useMemo, useState } from "react";

function getSkyPaletteByHour(h) {
  if (h >= 0 && h < 5)  return { r: 18,  g: 20,  b: 52,  op: 0.58 };
  if (h < 7)           return { r: 228, g: 118, b: 68,  op: 0.22 };
  if (h < 10)          return { r: 148, g: 196, b: 234, op: 0.13 };
  if (h < 16)          return { r: 188, g: 218, b: 246, op: 0.08 };
  if (h < 18)          return { r: 248, g: 148, b: 68,  op: 0.22 };
  if (h < 21)          return { r: 94,  g: 48,  b: 122, op: 0.36 };
  return                     { r: 18,  g: 20,  b: 52,  op: 0.52 };
}

const pad2 = (n) => String(n).padStart(2, "0");

export function useSkyTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeoutId = 0;
    let intervalId = 0;

    const clear = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
      timeoutId = 0;
      intervalId = 0;
    };

    const tick = () => setNow(new Date());

    const schedule = () => {
      clear();

      const d = new Date();
      const msToNextMinute = (60 - d.getSeconds()) * 1000 - d.getMilliseconds();

      timeoutId = window.setTimeout(() => {
        tick();
        intervalId = window.setInterval(tick, 60_000);
      }, Math.max(250, msToNextMinute));
    };

    schedule();

    // ✅ タブ復帰/スリープ復帰で分境界に再同期
    const onVis = () => {
      if (document.visibilityState === "visible") schedule();
      else clear();
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", schedule); // bfcache対策

    return () => {
      clear();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", schedule);
    };
  }, []);

  const clock = useMemo(() => {
    const h = pad2(now.getHours());
    const m = pad2(now.getMinutes());
    return `${h}:${m}`;
  }, [now]);

  const palette = useMemo(() => getSkyPaletteByHour(now.getHours()), [now]);

  return { clock, palette };
}