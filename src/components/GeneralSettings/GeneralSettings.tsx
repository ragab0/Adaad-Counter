import { X } from "lucide-react";
import { useCounterContext } from "@/context/CounterContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function GeneralSettings({ open, onClose }: Props) {
  const { settings, updateSettings, applyGlobalIncrement } =
    useCounterContext();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-scale-in relative w-full max-w-md rounded-2xl border border-border-light bg-surface-light shadow-2xl dark:border-border-dark dark:bg-surface-dark">
        <div className="flex items-center justify-between border-b border-border-light px-5 py-4 dark:border-border-dark">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted-light transition hover:bg-surface-hover-light dark:text-text-muted-dark dark:hover:bg-surface-hover-dark"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <section>
            <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">
              Default increment & decrement
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-text-muted-light dark:text-text-muted-dark">
                  Increment
                </span>
                <input
                  type="number"
                  value={settings.globalIncrement}
                  onChange={(e) =>
                    updateSettings({
                      globalIncrement: Number(e.target.value) || 1,
                    })
                  }
                  className="w-full rounded-xl border border-border-light bg-surface-light px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-main focus:ring-2 focus:ring-main/20 dark:border-border-dark dark:bg-surface-hover-dark dark:text-slate-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-text-muted-light dark:text-text-muted-dark">
                  Decrement
                </span>
                <input
                  type="number"
                  value={settings.globalDecrement}
                  onChange={(e) =>
                    updateSettings({
                      globalDecrement: Number(e.target.value) || 1,
                    })
                  }
                  className="w-full rounded-xl border border-border-light bg-surface-light px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-main focus:ring-2 focus:ring-main/20 dark:border-border-dark dark:bg-surface-hover-dark dark:text-slate-100"
                />
              </label>
            </div>
            <button
              onClick={applyGlobalIncrement}
              className="mt-3 w-full rounded-xl bg-main/10 px-4 py-2.5 text-sm font-bold text-main transition hover:bg-main/20 active:scale-[0.98]"
            >
              Apply to all counters
            </button>
            <p className="mt-2 text-center text-xs text-text-muted-light dark:text-text-muted-dark">
              Individual counters keep their own amount if you change it
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
