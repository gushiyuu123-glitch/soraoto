import { useEffect, useState } from "react";
import { useSkyTime } from "../hooks/useSkyTime";

import SkyLayer from "../components/SkyLayer";
import SkyNote from "../components/SkyNote";
import Header from "../components/Header";
import FloatingReserve from "../components/FloatingReserve";
import FloatingNotesPng from "../components/FloatingNotesPng";

import Hero from "../sections/Hero";
import Invitation from "../sections/Invitation";
import Lesson from "../sections/Lesson";
import Teacher from "../sections/Teacher";
import Peak from "../sections/Peak";
import Price from "../sections/Price";
import Voices from "../sections/Voices";
import Reserve from "../sections/Reserve";
import Footer from "../sections/Footer";
import Coda from "../sections/Coda";

const FALLBACK_PALETTE = { r: 18, g: 20, b: 52, op: 0.52 };

export default function HomePc() {
  const { clock, palette } = useSkyTime();
  const safePalette = palette ?? FALLBACK_PALETTE;

  const [heroOn, setHeroOn] = useState(true);

  useEffect(() => {
    const el = document.getElementById("top");
    if (!el || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => setHeroOn(entry.isIntersecting),
      {
        threshold: 0.18,
        rootMargin: "0px 0px -35% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SkyLayer palette={safePalette} />
      <SkyNote key={String(clock ?? "").slice(0, 5)} />

      <Header show={!heroOn} />
      <FloatingReserve show={!heroOn} href="#reserve" />

      {/* 常設のうすい音符 */}
      <FloatingNotesPng show />

      <div className="stage">
        <Hero clock={clock} heroOn={heroOn} />
        <Invitation />
        <Lesson />
        <Teacher />
        <Peak />
        <Price />
        <Voices />
        <Coda />
        <Reserve />
        <Footer />
      </div>
    </>
  );
}