import { useRef, useState, useEffect } from "react";
import { Zap, Eye, BarChart3, Brain, Rocket, Gamepad2 } from "lucide-react";
import { MASCOTS, getMascotById } from "@/constants";
import { useCounterContext } from "@/context/CounterContext";
import {
  AnimatedCharacter,
  type AnimatedCharacterHandle,
} from "@/components/AnimatedCharacter/AnimatedCharacter";
import type { Mascot } from "@/types/counter";

const POWER_ICON_MAP = {
  zap: Zap,
  eye: Eye,
  "bar-chart": BarChart3,
  brain: Brain,
  rocket: Rocket,
  weight: Gamepad2,
};

const REAL_MASCOTS = MASCOTS.filter((m) => m.id !== "random");

export function About() {
  const { settings } = useCounterContext();
  const selectedMascot = getMascotById(settings.selectedMascot);
  const heroCharRef = useRef<AnimatedCharacterHandle>(null);
  const [heroTouched, setHeroTouched] = useState(false);

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Back to counter */}
      {/* <div className="sticky top-4 right-4 z-40 mb-6 flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-3.5 py-2 text-sm font-bold text-slate-600 shadow-sm backdrop-blur transition hover:bg-white dark:border-slate-700 dark:bg-background/90 dark:text-slate-300 dark:hover:bg-background"
        >
          <ArrowLeft size={15} />
          للعداد
        </Link>
      </div> */}

      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-8 pb-14 px-4">
        <div
          className="mb-6 cursor-pointer select-none transition hover:scale-105"
          onClick={() => {
            setHeroTouched(true);
            heroCharRef.current?.react(
              "milestone",
              selectedMascot.quotes.interaction
            );
            setTimeout(() => setHeroTouched(false), 900);
          }}
        >
          <AnimatedCharacter
            ref={heroCharRef}
            mascot={selectedMascot}
            size={140}
            showQuote={true}
            showSleepState={true}
            idleAnimation={true}
            noClip={true}
            className={heroTouched ? "milestone-active" : ""}
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          عداد معامل
        </h1>
        <p className="mt-3 text-lg text-text-muted-light dark:text-text-muted-dark">
          العداد اللي محدش طلبه... بس كلنا محتاجينه.
        </p>
        <p className="mt-1 text-sm italic text-text-muted-light/80 dark:text-text-muted-dark/80">
          «إحنا بنعد عشان نقدر.»
        </p>
      </section>

      {/* Meet the team */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            حالة العد
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {REAL_MASCOTS.map((m) => (
            <AboutCharacterCard key={m.id} mascot={m} />
          ))}
        </div>
      </section>

      {/* Support / donation */}
      <section className="px-4 pb-12 text-center">
        <div className="rounded-2xl p-5 border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
          <h3 className="font-extrabold text-lg mb-1 text-slate-800 dark:text-slate-100">
            ادعمنا نكمل المشروع
          </h3>
          <p className="text-md text-text-muted-light dark:text-text-muted-dark">
            « اتبرع بجنية واحد »
          </p>
          <p className="text-md mt-2 italic text-text-muted-light/80 dark:text-text-muted-dark/80">
            أو اطلب أوردر من عمرو طلبات 🥸
          </p>
        </div>
      </section>
    </div>
  );
}

function AboutCharacterCard({ mascot }: { mascot: Mascot }) {
  const charRef = useRef<AnimatedCharacterHandle>(null);
  const [hovered, setHovered] = useState(false);
  const [showPower, setShowPower] = useState(false);
  const [localBump, setLocalBump] = useState(0);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (showTimer.current) clearTimeout(showTimer.current);
    };
  }, []);

  const tryIt = () => {
    const moods: Array<"milestone" | "increase" | "rapid" | "reset"> = [
      "milestone",
      "increase",
      "rapid",
      "milestone",
      "reset",
    ];
    const mood = moods[localBump % moods.length];
    setLocalBump((n) => n + 1);
    charRef.current?.react(mood, mascot.quotes.interaction);
    setShowPower(true);
    if (showTimer.current) clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => setShowPower(false), 3200);
  };

  const PowerIcon = POWER_ICON_MAP[mascot.power.iconName] ?? Zap;

  return (
    <div
      className={`group relative rounded-2xl border border-border-light bg-surface-light p-4 sm:p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover dark:border-border-dark dark:bg-surface-dark dark:shadow-card-dark dark:hover:shadow-[0_14px_40px_-12px_rgba(0,0,0,0.45)] ${
        hovered ? "ring-1" : ""
      }`}
      style={{
        borderColor: hovered ? `${mascot.color}55` : undefined,
        ["--tw-ring-color" as never]: `${mascot.color}33`,
      }}
      onMouseEnter={() => {
        setHovered(true);
        charRef.current?.react("increase");
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Character */}
      <div className="flex flex-col items-center text-center gap-2.5">
        <button
          onClick={tryIt}
          className="relative rounded-full p-1 transition-transform duration-200 hover:scale-105 active:scale-95"
          title="اضغط عليا جربها"
        >
          <AnimatedCharacter
            ref={charRef}
            mascot={mascot}
            size={100}
            showQuote={true}
            showSleepState={false}
            idleAnimation={true}
            noClip={true}
          />
        </button>

        {/* Name & lore */}
        <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100">
          {mascot.name}
        </h3>
        <p className="text-xs italic text-text-muted-light dark:text-text-muted-dark">
          «{mascot.lore}»
        </p>

        {/* Power chip */}
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
          style={{
            background: `${mascot.color}18`,
            color: mascot.color,
          }}
        >
          <PowerIcon size={12} strokeWidth={2.5} />
          {mascot.power.nameAr}
        </div>

        {/* Personality */}
        <p className="text-[12px] leading-relaxed text-text-muted-light dark:text-text-muted-dark">
          {mascot.personalityAr}
        </p>

        {/* Power description on hover / trigger */}
        <div className="anim-fade-in text-[11px] leading-snug italic text-text-muted-light/80 dark:text-text-muted-dark/80">
          {hovered || showPower ? mascot.power.descriptionAr : " "}
        </div>

        {/* Try it button */}
        <button
          onClick={tryIt}
          className="mt-1 inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all active:scale-95"
          style={{
            borderColor: `${mascot.color}44`,
            background: `${mascot.color}0d`,
            color: mascot.color,
          }}
        >
          جرّب
          <PowerIcon size={11} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
