import { useEffect, useMemo, useState } from "react";

/* 時刻 → 空気色（SORAOTOのOS） */
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

/* 分単位で更新（“時計感”を出さない） */
export function useSkyTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeoutId = 0;
    let intervalId = 0;

    const tick = () => setNow(new Date());

    // 次の「分の境界」に合わせて更新 → 以降は1分ごと
    const schedule = () => {
      const d = new Date();
      const msToNextMinute =
        (60 - d.getSeconds()) * 1000 - d.getMilliseconds();

      timeoutId = window.setTimeout(() => {
        tick();
        intervalId = window.setInterval(tick, 60_000);
      }, Math.max(250, msToNextMinute));
    };

    schedule();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  const clock = useMemo(() => {
    const h = pad2(now.getHours());
    const m = pad2(now.getMinutes());
    return `${h}:${m}`;
  }, [now]);

  const palette = useMemo(
    () => getSkyPaletteByHour(now.getHours()),
    [now]
  );

  return { clock, palette };
}