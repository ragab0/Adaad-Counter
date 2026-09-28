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
    <div className="flex items-center gap-1 rounded-xl border border-border-light bg-surface-light p-1 dark:border-border-dark dark:bg-surface-dark">
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
                : "text-text-muted-light hover:bg-surface-hover-light hover:text-stone-700 dark:text-text-muted-dark dark:hover:bg-surface-hover-dark dark:hover:text-slate-100"
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
