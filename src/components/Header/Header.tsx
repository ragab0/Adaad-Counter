import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCounterContext } from "@/context/CounterContext";
import { MASCOTS, getMascotById } from "@/constants";
import { MascotAvatar } from "@/components/MascotAvatar/MascotAvatar";
import { Settings, Minimize2, Maximize2, Sun, Moon, Check } from "lucide-react";

export function Header({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { settings, toggleFloatingMode, toggleTheme, setMascot } =
    useCounterContext();
  const mascot = getMascotById(settings.selectedMascot);
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-background/40 dark:bg-background/90">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        {/* Logo with mascot selector */}
        <div className="relative">
          <div className=" flex items-center justify-center gap-2">
            <button
              onClick={() => setSelectorOpen((v) => !v)}
              className="flex flex-col items-start gap-0.5"
              aria-label="Choose character"
              aria-expanded={selectorOpen}
            >
              <MascotAvatar
                avatar={mascot.avatar}
                color={mascot.color}
                size={60}
                mood="idle"
                className="transition hover:scale-105"
              />
            </button>
            <Link to="/" className="flex flex-col gap-2.5">
              <span className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                عـــــداد
              </span>
              <span className="self-start -mt-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                معامل
              </span>
            </Link>
          </div>

          {selectorOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setSelectorOpen(false)}
              />
              <div className="animate-scale-in absolute left-0 top-full z-50 mt-2 w-[360px] rounded-2xl border border-slate-100 bg-white p-3 shadow-xl dark:border-background dark:bg-background">
                <p className="mb-2 flex items-center justify-center px-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                  اختر مود العد
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {MASCOTS.filter((m) => m.id !== "random").map((m) => {
                    const isSelected = settings.selectedMascot === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMascot(m.id);
                          setSelectorOpen(false);
                        }}
                        className={`group relative flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all hover:-translate-y-0.5 ${
                          isSelected
                            ? "border-main/50 bg-main/5 ring-1 ring-main/30"
                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50 dark:border-background dark:hover:border-slate-600 dark:hover:bg-background/30"
                        }`}
                      >
                        <div className="relative">
                          <MascotAvatar
                            avatar={m.avatar}
                            color={m.color}
                            size={48}
                            mood={isSelected ? "increase" : "idle"}
                            className="transition group-hover:scale-105"
                          />
                          {isSelected && (
                            <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-main text-white shadow-md">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            {m.name}
                          </span>
                          <span
                            className="max-w-[130px] truncate text-[10px] italic"
                            style={{ color: m.color }}
                          >
                            {m.personalityLabel}
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {/* Random option */}
                  {/* <button
                    onClick={() => {
                      setMascot("random");
                      setSelectorOpen(false);
                    }}
                    className={`col-span-2 flex items-center justify-between rounded-xl border p-2.5 transition-all ${
                      settings.selectedMascot === "random"
                        ? "border-main/50 bg-main/5 ring-1 ring-main/30"
                        : "border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-dashed dark:border-slate-600 dark:hover:bg-background/30"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-12 w-12 shrink-0">
                        <div className="absolute left-0 top-0 scale-[0.7]">
                          <MascotAvatar
                            avatar="sleepy"
                            color="#f59e0b"
                            size={40}
                            mood="idle"
                          />
                        </div>
                        <div className="absolute left-2 top-1 scale-[0.7]">
                          <MascotAvatar
                            avatar="addadgy"
                            color="#ec4899"
                            size={40}
                            mood="idle"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          Random
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          شخصية جديدة كل مرة... مفاجأة!
                        </span>
                      </div>
                    </div>
                    {settings.selectedMascot === "random" && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-main text-white shadow-md">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button> */}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-1" />

        {/* Nav */}
        <nav className="flex items-center gap-1 text-sm font-bold">
          <Link
            to="/"
            className={`rounded-lg px-3 py-1.5 transition ${
              !isAbout
                ? "bg-background text-main"
                : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-background/40"
            }`}
          >
            Counters
          </Link>
          <Link
            to="/about"
            className={`rounded-lg px-3 py-1.5 transition ${
              isAbout
                ? "bg-background text-main"
                : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-background/40"
            }`}
          >
            About
          </Link>
        </nav>

        <div className="hidden h-6 w-px bg-slate-200 sm:block dark:bg-[#424250]" />

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 dark:border-background dark:bg-background dark:text-slate-300 dark:hover:bg-background/50"
            aria-label="Toggle theme"
            title={
              settings.theme === "dark" ? "Switch to light" : "Switch to dark"
            }
          >
            {settings.theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onOpenSettings}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 dark:border-background dark:bg-background dark:text-slate-300 dark:hover:bg-background/50"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
          {/* <button
            onClick={toggleFloatingMode}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 dark:border-background dark:bg-background dark:text-slate-300 dark:hover:bg-background/50"
            aria-label="Floating mode"
            title="Floating mode"
          >
            {settings.floatingMode ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button> */}
        </div>
      </div>
    </header>
  );
}
