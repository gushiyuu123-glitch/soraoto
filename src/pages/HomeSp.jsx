import { useEffect, useState } from "react";
import { useSkyTime } from "../hooks/useSkyTime";

import SkyLayer from "../components/SkyLayer";
import SkyNote from "../components/SkyNote";

// SP用に増やす（中身は後で差し替え）
import HeaderSp from "../components/HeaderSp";
import FloatingReserveSp from "../components/FloatingReserveSp";
import FloatingNotesPngSp from "../components/FloatingNotesPngSp";

import HeroSp from "../sections/HeroSp";
import InvitationSp from "../sections/InvitationSp";
import LessonSp from "../sections/LessonSp";
import TeacherSp from "../sections/TeacherSp";
import PeakSp from "../sections/PeakSp";
import PriceSp from "../sections/PriceSp";
import VoicesSp from "../sections/VoicesSp";
import ReserveSp from "../sections/ReserveSp";
import FooterSp from "../sections/FooterSp";
import CodaSp from "../sections/CodaSp";

const FALLBACK_PALETTE = { r: 18, g: 20, b: 52, op: 0.52 };

const ID = {
  top: "top-sp",
  reserve: "reserve-sp",
};

export default function HomeSp() {
  const { clock, palette } = useSkyTime();
  const safePalette = palette ?? FALLBACK_PALETTE;

  const [heroOn, setHeroOn] = useState(true);

  useEffect(() => {
    const el = document.getElementById(ID.top);
    if (!el || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => setHeroOn(entry.isIntersecting),
      { threshold: 0.18, rootMargin: "0px 0px -35% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SkyLayer palette={safePalette} />
      <SkyNote key={`sp-${String(clock ?? "").slice(0, 5)}`} />

      <HeaderSp show={!heroOn} />
      <FloatingReserveSp show={!heroOn} href={`#${ID.reserve}`} />

      <FloatingNotesPngSp show />

      <div className="stage stage-sp">
        <HeroSp clock={clock} heroOn={heroOn} topId={ID.top} />
        <InvitationSp />
        <LessonSp />
        <TeacherSp />
        <PeakSp />
        <PriceSp />
        <VoicesSp />
        <CodaSp />
        <ReserveSp reserveId={ID.reserve} />
        <FooterSp />
      </div>
    </>
  );
}