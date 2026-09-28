import { useEffect, useRef } from "react";
import { Pencil, Hash, ArrowUpCircle, RotateCcw, Trash2 } from "lucide-react";
import type { Counter } from "@/types/counter";
import { useCounterContext } from "@/context/CounterContext";
import { useCharacterReaction } from "@/context/CharacterReactionContext";

interface Props {
  counter: Counter;
  onClose: () => void;
  onEditName: () => void;
  onSetValue: () => void;
  onSetIncrement: () => void;
  onConfirmDelete: () => void;
  clsName?: string;
}

export function CounterSettings({
  counter,
  onClose,
  onEditName,
  onSetValue,
  onSetIncrement,
  onConfirmDelete,
  clsName = "",
}: Props) {
  const { resetCounter } = useCounterContext();
  const { registerCounterAction } = useCharacterReaction();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`animate-slide-down absolute left-0 top-12 z-50 w-52 rounded-xl border border-border-light bg-surface-light p-1.5 shadow-xl dark:border-border-dark dark:bg-surface-dark ${clsName}`}
    >
      <MenuItem
        icon={Pencil}
        label="Edit name"
        onClick={() => {
          onEditName();
          onClose();
        }}
      />
      <MenuItem
        icon={Hash}
        label="Set value"
        onClick={() => {
          onSetValue();
          onClose();
        }}
      />
      <MenuItem
        icon={ArrowUpCircle}
        label="Increment amount"
        onClick={() => {
          onSetIncrement();
          onClose();
        }}
      />
      <MenuItem
        icon={RotateCcw}
        label="Reset"
        onClick={() => {
          const prev = counter.value;
          resetCounter(counter.id);
          registerCounterAction("reset", 0, prev);
          onClose();
        }}
      />
      <div className="my-1 h-px bg-border-light dark:bg-border-dark" />
      <MenuItem
        icon={Trash2}
        label="Delete"
        onClick={() => {
          onConfirmDelete();
          onClose();
        }}
        danger
      />
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof Pencil;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
        danger
          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
          : "text-slate-700 hover:bg-surface-hover-light dark:text-slate-200 dark:hover:bg-surface-hover-dark"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="flex-1 font-bold">{label}</span>
    </button>
  );
}
