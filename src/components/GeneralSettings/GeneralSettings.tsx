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
      <div className="animate-scale-in relative w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-background">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-background/90">
          <h2 className="text-lg font-bold text-background dark:text-slate-100">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-background/90"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <section>
            <h3 className="mb-3 text-sm font-bold text-background/90 dark:text-slate-200">
              Default increment & decrement
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-background outline-none transition focus:border-main focus:ring-2 focus:ring-main/20 dark:border-slate-600 dark:bg-background/90 dark:text-slate-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-background outline-none transition focus:border-main focus:ring-2 focus:ring-main/20 dark:border-slate-600 dark:bg-background/90 dark:text-slate-100"
                />
              </label>
            </div>
            <button
              onClick={applyGlobalIncrement}
              className="mt-3 w-full rounded-xl bg-main/10 px-4 py-2.5 text-sm font-bold text-main transition hover:bg-main/20 active:scale-[0.98]"
            >
              Apply to all counters
            </button>
            <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
              Individual counters keep their own amount if you change it
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
