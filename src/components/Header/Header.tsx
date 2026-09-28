import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCounterContext } from "@/context/CounterContext";
import { MASCOTS, getMascotById } from "@/constants";
import { MascotAvatar } from "@/components/MascotAvatar/MascotAvatar";
import { Settings, Sun, Moon, Check } from "lucide-react";

export function Header({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { settings, toggleTheme, setMascot } = useCounterContext();
  const mascot = getMascotById(settings.selectedMascot);
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border-light/60 bg-surface-light/80 backdrop-blur-md dark:border-border-dark/50 dark:bg-surface-dark/85">
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
              <div className="animate-scale-in absolute left-0 top-full z-50 mt-2 w-[360px] rounded-2xl border border-border-light bg-surface-light p-3 shadow-xl dark:border-border-dark dark:bg-surface-dark">
                <p className="mb-2 flex items-center justify-center px-1 text-xs font-bold text-text-muted-light dark:text-text-muted-dark">
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
                            : "border-border-light hover:border-main/30 hover:bg-surface-hover-light dark:border-border-dark dark:hover:border-main/40 dark:hover:bg-surface-hover-dark"
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
                ? "bg-btn-secondary-light text-main dark:bg-btn-secondary-dark"
                : "text-text-muted-light hover:bg-surface-hover-light dark:text-text-muted-dark dark:hover:bg-surface-hover-dark"
            }`}
          >
            Counters
          </Link>
          <Link
            to="/about"
            className={`rounded-lg px-3 py-1.5 transition ${
              isAbout
                ? "bg-btn-secondary-light text-main dark:bg-btn-secondary-dark"
                : "text-text-muted-light hover:bg-surface-hover-light dark:text-text-muted-dark dark:hover:bg-surface-hover-dark"
            }`}
          >
            About
          </Link>
        </nav>

        <div className="hidden h-6 w-px bg-border-light sm:block dark:bg-border-dark" />

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-border-light bg-surface-light p-2 text-stone-600 transition hover:bg-surface-hover-light dark:border-border-dark dark:bg-surface-dark dark:text-slate-300 dark:hover:bg-surface-hover-dark"
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
            className="rounded-xl border border-border-light bg-surface-light p-2 text-stone-600 transition hover:bg-surface-hover-light dark:border-border-dark dark:bg-surface-dark dark:text-slate-300 dark:hover:bg-surface-hover-dark"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
