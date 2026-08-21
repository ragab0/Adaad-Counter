import { Square, Columns2, Columns3, LayoutGrid } from "lucide-react";
import type { LayoutType } from "@/types/counter";
import { useCounterContext } from "@/context/CounterContext";

const LAYOUTS: { value: LayoutType; label: string; icon: typeof Square }[] = [
  { value: "single", label: "Single", icon: Square },
  { value: "two-column", label: "Two columns", icon: Columns2 },
  { value: "three-column", label: "Three columns", icon: Columns3 },
  { value: "auto", label: "Auto", icon: LayoutGrid },
];

export function LayoutSelector() {
  const { settings, setLayout } = useCounterContext();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-background/90 dark:bg-background">
      {LAYOUTS.map((l) => {
        const Icon = l.icon;
        const active = settings.layout === l.value;
        return (
          <button
            key={l.value}
            onClick={() => setLayout(l.value)}
            className={`rounded-lg p-2 transition ${
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
            }`}
            aria-pressed={active}
            title={l.label}
            aria-label={l.label}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
