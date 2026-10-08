import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  AArrowUp,
  AArrowDown,
  Home,
} from "lucide-react";
import { getSurah, getAllSurahs } from "@/data/quran";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { QuranReadingPrefs } from "@/types/quran";
import { QURAN_READER_EXIT_ROUTE } from "@/hooks/useQuranShortcut";

const DEFAULT_PREFS: QuranReadingPrefs = {
  fontSize: 32,
  lineHeight: 2.2,
  theme: "light",
  readingWidth: "medium",
  showVerseNumbers: true,
};

const THEME_STYLES = {
  light: {
    bg: "bg-amber-50",
    text: "text-stone-800",
    muted: "text-stone-500",
    container: "bg-white/60",
    header: "bg-white/80 border-stone-200",
    border: "border-stone-200",
    verseBorder: "border-stone-100",
    toolbarBtn: "hover:bg-stone-200/70 text-stone-600",
    toolbarBtnActive: "bg-stone-200 text-stone-800",
    selectBg: "bg-white",
    selectBorder: "border-stone-200",
    selectText: "text-stone-700",
    verseNumberBg: "bg-stone-100",
    verseNumberText: "text-stone-500",
    bismillahColor: "text-emerald-700",
    surahNameColor: "text-stone-800",
    hrColor: "#e7e5e4",
    mobileDividerBg: "#e7e5e4",
  },
  dark: {
    bg: "bg-stone-900",
    text: "text-stone-200",
    muted: "text-stone-400",
    container: "bg-stone-800/50",
    header: "bg-stone-900/90 border-stone-700",
    border: "border-stone-700",
    verseBorder: "border-stone-800",
    toolbarBtn: "hover:bg-stone-700/70 text-stone-300",
    toolbarBtnActive: "bg-stone-700 text-stone-100",
    selectBg: "bg-stone-800",
    selectBorder: "border-stone-700",
    selectText: "text-stone-200",
    verseNumberBg: "bg-stone-700",
    verseNumberText: "text-stone-400",
    bismillahColor: "text-emerald-400",
    surahNameColor: "text-stone-100",
    hrColor: "#44403c",
    mobileDividerBg: "#44403c",
  },
  sepia: {
    bg: "bg-orange-50",
    text: "text-stone-800",
    muted: "text-stone-500",
    container: "bg-orange-100/40",
    header: "bg-orange-100/80 border-orange-200",
    border: "border-orange-200",
    verseBorder: "border-orange-100",
    toolbarBtn: "hover:bg-orange-200/60 text-stone-600",
    toolbarBtnActive: "bg-orange-200 text-stone-800",
    selectBg: "bg-orange-50",
    selectBorder: "border-orange-200",
    selectText: "text-stone-700",
    verseNumberBg: "bg-orange-100",
    verseNumberText: "text-stone-500",
    bismillahColor: "text-emerald-700",
    surahNameColor: "text-stone-800",
    hrColor: "#fed7aa",
    mobileDividerBg: "#fed7aa",
  },
};

const WIDTH_CLASSES = {
  narrow: "max-w-2xl",
  medium: "max-w-3xl",
  wide: "max-w-5xl",
};

function WidthLabel({ width }: { width: QuranReadingPrefs["readingWidth"] }) {
  const label = width === "narrow" ? "S" : width === "wide" ? "L" : "M";
  return (
    <span className="text-[11px] font-bold tracking-wider tabular-nums">
      {label}
    </span>
  );
}

function IconButton({
  onClick,
  title,
  active,
  themeClasses,
  children,
}: {
  onClick?: () => void;
  title: string;
  active?: boolean;
  themeClasses: { toolbarBtn: string; toolbarBtnActive: string };
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 ${
        active ? themeClasses.toolbarBtnActive : themeClasses.toolbarBtn
      }`}
    >
      {children}
    </button>
  );
}

function ThemeIcon({ theme }: { theme: QuranReadingPrefs["theme"] }) {
  if (theme === "dark") return <Moon className="h-4 w-4" />;
  if (theme === "sepia") return <Coffee className="h-4 w-4" />;
  return <Sun className="h-4 w-4" />;
}

function getThemeLabel(theme: QuranReadingPrefs["theme"]) {
  if (theme === "light") return "فاتح";
  if (theme === "sepia") return "بني";
  return "داكن";
}

function getWidthLabel(width: QuranReadingPrefs["readingWidth"]) {
  if (width === "narrow") return "ضيق";
  if (width === "wide") return "واسع";
  return "متوسط";
}

export function QuranReader() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useLocalStorage<QuranReadingPrefs>(
    "quran-reader-prefs",
    DEFAULT_PREFS
  );
  const [currentSurahNum, setCurrentSurahNum] = useLocalStorage<number>(
    "quran-reader-last-surah",
    18
  );

  const allSurahs = useMemo(() => getAllSurahs(), []);
  const currentSurah = useMemo(
    () => getSurah(currentSurahNum),
    [currentSurahNum]
  );
  const theme = THEME_STYLES[prefs.theme];

  const currentIndex = allSurahs.findIndex((s) => s.number === currentSurahNum);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allSurahs.length - 1;

  function updatePref<K extends keyof QuranReadingPrefs>(
    key: K,
    value: QuranReadingPrefs[K]
  ) {
    setPrefs({ ...prefs, [key]: value });
  }

  function cycleTheme() {
    const themes: QuranReadingPrefs["theme"][] = ["light", "sepia", "dark"];
    const idx = themes.indexOf(prefs.theme);
    updatePref("theme", themes[(idx + 1) % themes.length]);
  }

  function adjustFontSize(delta: number) {
    const newSize = Math.min(56, Math.max(20, prefs.fontSize + delta));
    updatePref("fontSize", newSize);
  }

  function cycleWidth() {
    const widths: QuranReadingPrefs["readingWidth"][] = [
      "narrow",
      "medium",
      "wide",
    ];
    const idx = widths.indexOf(prefs.readingWidth);
    updatePref("readingWidth", widths[(idx + 1) % widths.length]);
  }

  function goPrev() {
    if (hasPrev) setCurrentSurahNum(allSurahs[currentIndex - 1].number);
  }

  function goNext() {
    if (hasNext) setCurrentSurahNum(allSurahs[currentIndex + 1].number);
  }

  function goToStart() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (!currentSurah) {
    return (
      <div
        className={`min-h-screen ${theme.bg} ${theme.text} flex items-center justify-center`}
      >
        <p className={theme.muted}>سورة غير متوفرة</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`}
      dir="rtl"
      style={{
        fontFamily:
          "'Amiri', 'Scheherazade New', 'Traditional Arabic', 'Amiri Quran', serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700&display=swap');
        .quran-ayah {
          font-feature-settings: "calt" 1;
          text-rendering: optimizeLegibility;
        }
        .ayah-marker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.2em;
          height: 2.2em;
          border-radius: 9999px;
          font-family: 'Scheherazade New', 'Amiri', serif;
          font-weight: 400;
          margin-inline-start: 0.4em;
          position: relative;
          top: -0.05em;
        }
        .surah-frame {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1.25rem 0;
          border-top: 1px solid;
          border-bottom: 1px solid;
          margin-bottom: 2rem;
        }
      `}</style>

      <header
        className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors duration-300 ${theme.header}`}
        dir="ltr"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-1">
            <IconButton
              title="العودة إلى عداد"
              onClick={() => navigate(QURAN_READER_EXIT_ROUTE)}
              themeClasses={theme}
            >
              <Home className="h-4 w-4" />
            </IconButton>
          </div>

          <div className="flex flex-1 items-center justify-center gap-2">
            <select
              value={currentSurahNum}
              onChange={(e) => setCurrentSurahNum(Number(e.target.value))}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium outline-none transition-colors ${theme.selectBg} ${theme.selectBorder} ${theme.selectText}`}
              dir="rtl"
            >
              {allSurahs.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.name} — {s.englishName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 sm:flex">
              <IconButton
                title="تصغير الخط"
                onClick={() => adjustFontSize(-2)}
                themeClasses={theme}
              >
                <AArrowDown className="h-4 w-4" />
              </IconButton>
              <span
                className={`w-10 text-center text-xs tabular-nums ${theme.muted}`}
              >
                {prefs.fontSize}
              </span>
              <IconButton
                title="تكبير الخط"
                onClick={() => adjustFontSize(2)}
                themeClasses={theme}
              >
                <AArrowUp className="h-4 w-4" />
              </IconButton>
            </div>

            <div
              className="mx-1 hidden h-6 w-px sm:block"
              style={{ background: theme.mobileDividerBg }}
            />

            <IconButton
              title={`عرض القراءة: ${getWidthLabel(prefs.readingWidth)}`}
              onClick={cycleWidth}
              themeClasses={theme}
            >
              <WidthLabel width={prefs.readingWidth} />
            </IconButton>

            <IconButton
              title={`الوضع: ${getThemeLabel(prefs.theme)}`}
              onClick={cycleTheme}
              themeClasses={theme}
            >
              <ThemeIcon theme={prefs.theme} />
            </IconButton>

            <div
              className="mx-1 hidden h-6 w-px sm:block"
              style={{ background: theme.mobileDividerBg }}
            />

            <IconButton
              title="السورة السابقة"
              onClick={goPrev}
              themeClasses={theme}
            >
              <ChevronRight
                className="h-4 w-4"
                style={{ opacity: hasPrev ? 1 : 0.3 }}
              />
            </IconButton>
            <IconButton
              title="بداية السورة"
              onClick={goToStart}
              themeClasses={theme}
            >
              <ArrowLeft className="h-4 w-4" />
            </IconButton>
            <IconButton
              title="السورة التالية"
              onClick={goNext}
              themeClasses={theme}
            >
              <ChevronLeft
                className="h-4 w-4"
                style={{ opacity: hasNext ? 1 : 0.3 }}
              />
            </IconButton>
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-4 border-t py-2 sm:hidden"
          style={{ borderColor: theme.hrColor }}
        >
          <button
            onClick={() => adjustFontSize(-2)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs ${theme.toolbarBtn}`}
          >
            <AArrowDown className="h-4 w-4" /> أصغر
          </button>
          <span className={`text-xs tabular-nums ${theme.muted}`}>
            {prefs.fontSize}px
          </span>
          <button
            onClick={() => adjustFontSize(2)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs ${theme.toolbarBtn}`}
          >
            أكبر <AArrowUp className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main
        className={`mx-auto w-full ${
          WIDTH_CLASSES[prefs.readingWidth]
        } px-5 py-10 sm:px-8 sm:py-16`}
      >
        <div className="text-center mb-6">
          <p
            className={`text-xs sm:text-sm tracking-widest mb-2 ${theme.muted}`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            سورة رقم {currentSurah.number} — {currentSurah.numberOfAyahs} آية
            {" · "}
            {currentSurah.revelationType === "Makki" ? "مكية" : "مدنية"}
          </p>
          <h1
            className={`text-3xl sm:text-5xl font-bold ${theme.surahNameColor}`}
            style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}
          >
            سورة {currentSurah.name}
          </h1>
          <p
            className={`mt-2 text-sm ${theme.muted}`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {currentSurah.englishName} — {currentSurah.englishNameTranslation}
          </p>
        </div>

        <div className="surah-frame" style={{ borderColor: theme.hrColor }}>
          <span
            className={`text-xl sm:text-2xl ${theme.bismillahColor}`}
            style={{
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              fontWeight: 400,
            }}
          >
            ﷽
          </span>
        </div>

        <div
          className={`rounded-2xl p-6 sm:p-10 md:p-14 transition-colors duration-300 ${theme.container}`}
        >
          <div
            className="quran-ayah text-right"
            style={{
              fontSize: `${prefs.fontSize}px`,
              lineHeight: prefs.lineHeight,
              wordSpacing: "0.05em",
            }}
          >
            {currentSurah.verses.map((verse) => (
              <span
                key={verse.number}
                className="inline align-baseline"
                style={{ paddingBlock: "0.4rem" }}
              >
                <span>{verse.text}</span>
                {prefs.showVerseNumbers && (
                  <span
                    className={`ayah-marker ${theme.verseNumberBg} ${theme.verseNumberText}`}
                    style={{
                      fontSize: `${Math.max(prefs.fontSize * 0.42, 14)}px`,
                    }}
                  >
                    {verse.number}
                  </span>
                )}{" "}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`mt-12 text-center ${theme.muted}`}
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <div
            className="w-24 h-px mx-auto mb-6"
            style={{ background: theme.hrColor, opacity: 0.6 }}
          />
          <p className="text-xs sm:text-sm">
            ﴿ صديق الله ﴾&nbsp;&nbsp; نهاية سورة {currentSurah.name} —{" "}
            {currentSurah.numberOfAyahs} آية
          </p>
          <p className="mt-4 text-[11px] sm:text-xs opacity-60">
            اضغط{" "}
            <kbd
              className="px-1.5 py-0.5 rounded-md text-[10px]"
              style={{ border: `1px solid ${theme.hrColor}` }}
            >
              Esc
            </kbd>{" "}
            أو استخدم زر <Home className="h-3 w-3 inline align-middle mx-1" />{" "}
            للعودة إلى عداد
          </p>
          <p className="mt-1 text-[11px] sm:text-xs opacity-60">
            اختصار فتح القارئ:{" "}
            <kbd
              className="px-1.5 py-0.5 rounded-md text-[10px]"
              style={{ border: `1px solid ${theme.hrColor}` }}
            >
              Ctrl
            </kbd>{" "}
            +{" "}
            <kbd
              className="px-1.5 py-0.5 rounded-md text-[10px]"
              style={{ border: `1px solid ${theme.hrColor}` }}
            >
              Shift
            </kbd>{" "}
            +{" "}
            <kbd
              className="px-1.5 py-0.5 rounded-md text-[10px]"
              style={{ border: `1px solid ${theme.hrColor}` }}
            >
              K
            </kbd>
          </p>
        </div>
      </main>
    </div>
  );
}
