import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Counter } from "@/types/counter";
import { useCounterContext } from "@/context/CounterContext";

interface Props {
  open: boolean;
  onClose: () => void;
  editing?: Counter | null;
}

export function CounterModal({ open, onClose, editing = null }: Props) {
  const { addCounter, updateCounter, settings } = useCounterContext();

  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [decrement, setDecrement] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      if (editing) {
        setName(editing.name);
        setValue(editing.value);
        setIncrement(editing.increment);
        setDecrement(editing.decrement);
      } else {
        setName("");
        setValue(0);
        setIncrement(settings.globalIncrement);
        setDecrement(settings.globalDecrement);
      }
      setError("");
    }
  }, [open, editing, settings.globalIncrement, settings.globalDecrement]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Enter a counter name");
      return;
    }
    if (editing) {
      updateCounter(editing.id, {
        name: name.trim(),
        value,
        increment,
        decrement,
      });
    } else {
      addCounter({ name: name.trim(), value, increment, decrement });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-scale-in relative w-full max-w-md rounded-2xl border border-border-light bg-surface-light shadow-2xl dark:border-border-dark dark:bg-surface-dark">
        <div className="flex items-center justify-between border-b border-border-light px-5 py-4 dark:border-border-dark">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {editing ? "Edit counter" : "New counter"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted-light transition hover:bg-surface-hover-light dark:text-text-muted-dark dark:hover:bg-surface-hover-dark"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <Field label="Counter name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Risks"
              className="w-full rounded-xl border border-border-light bg-surface-light px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-border-dark dark:bg-surface-hover-dark dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-900/40"
              autoFocus
            />
            {error && (
              <p className="mt-1 text-xs font-bold text-red-500">{error}</p>
            )}
          </Field>

          <Field label="Initial value">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-border-light bg-surface-light px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-border-dark dark:bg-surface-hover-dark dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-900/40"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Increment by">
              <input
                type="number"
                value={increment}
                onChange={(e) => setIncrement(Number(e.target.value) || 1)}
                className="w-full rounded-xl border border-border-light bg-surface-light px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-border-dark dark:bg-surface-hover-dark dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-900/40"
              />
            </Field>
            <Field label="Decrement by">
              <input
                type="number"
                value={decrement}
                onChange={(e) => setDecrement(Number(e.target.value) || 1)}
                className="w-full rounded-xl border border-border-light bg-surface-light px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-border-dark dark:bg-surface-hover-dark dark:text-slate-100 dark:focus:border-brand-500 dark:focus:ring-brand-900/40"
              />
            </Field>
          </div>
        </div>

        <div className="flex gap-2 border-t border-border-light px-5 py-4 dark:border-border-dark">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border-light bg-surface-light px-4 py-2.5 text-sm font-bold text-stone-700 transition hover:bg-surface-hover-light dark:border-border-dark dark:bg-btn-secondary-dark dark:text-slate-300 dark:hover:bg-btn-secondary-hover-dark"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-main px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
          >
            {editing ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-text-muted-light dark:text-text-muted-dark">
        {label}
      </span>
      {children}
    </label>
  );
}
