import { useEffect, useState } from "react";

export function useIsSp(breakpointPx = 900) {
  const query = `(max-width: ${breakpointPx}px)`;
  const [isSp, setIsSp] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.(query)?.matches ?? false;
  });

  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return;

    const onChange = () => setIsSp(mq.matches);
    onChange();

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [query]);

  return isSp;
}