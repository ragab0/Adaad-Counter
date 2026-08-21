import { useEffect, useRef, useState } from "react";
import { useCounterContext } from "@/context/CounterContext";
import { getMascotById } from "@/constants";
import { MascotAvatar } from "@/components/MascotAvatar/MascotAvatar";
import { CounterModal } from "@/components/CounterModal/CounterModal";
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog";
import type { Counter } from "@/types/counter";
import {
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  Maximize2,
} from "lucide-react";

export function FloatingMode({ onExit }: { onExit: () => void }) {
  const {
    counters,
    settings,
    incrementCounter,
    decrementCounter,
    deleteCounter,
  } = useCounterContext();

  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState({ x: 80, y: 80 });
  const [dragging, setDragging] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Counter | null>(null);
  const dragRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const mascot = getMascotById(settings.selectedMascot);

  const sorted = [...counters].sort((a, b) => a.order - b.order);
  const current = sorted[Math.min(index, sorted.length - 1)] ?? null;

  useEffect(() => {
    if (index >= sorted.length) setIndex(0);
  }, [sorted.length, index]);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      const x = Math.max(
        0,
        Math.min(window.innerWidth - 320, e.clientX - dragRef.current.dx)
      );
      const y = Math.max(
        0,
        Math.min(window.innerHeight - 60, e.clientY - dragRef.current.dy)
      );
      setPos({ x, y });
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging]);

  if (!current) {
    return (
      <div
        className="floating-window fixed z-50 flex w-80 flex-col rounded-2xl bg-white dark:bg-slate-800"
        style={{ left: pos.x, top: pos.y }}
      >
        <div
          className="flex cursor-grab items-center justify-between rounded-t-2xl bg-slate-800 px-3 py-2 text-white active:cursor-grabbing dark:bg-slate-900"
          onMouseDown={handleHeaderMouseDown}
        >
          <span className="text-sm font-bold">عـــــداد</span>
          <button
            onClick={onExit}
            className="rounded p-1 hover:bg-white/10"
            aria-label="Exit"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 text-center text-sm text-slate-400 dark:text-slate-500">
          No counters. Create one from the full view.
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="floating-window fixed z-50 flex w-80 flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800"
        style={{ left: pos.x, top: pos.y }}
      >
        {/* Header */}
        <div
          className="flex cursor-grab items-center justify-between bg-slate-800 px-3 py-2 text-white active:cursor-grabbing dark:bg-slate-900"
          onMouseDown={handleHeaderMouseDown}
        >
          <div className="flex items-center gap-2">
            <MascotAvatar
              avatar={mascot.avatar}
              color={mascot.color}
              size={22}
            />
            <span className="text-sm font-bold">عـــــداد</span>
            <span className="rounded-full bg-amber-500/80 px-1.5 text-[10px] font-bold">
              معامل
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onExit}
              className="rounded p-1 transition hover:bg-white/10"
              aria-label="Expand"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onExit}
              className="rounded p-1 transition hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Counter nav */}
        {sorted.length > 1 && (
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-2 py-1.5 dark:border-slate-700 dark:bg-slate-700/40">
            <button
              onClick={() =>
                setIndex((i) => (i - 1 + sorted.length) % sorted.length)
              }
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-600"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <select
              value={current.id}
              onChange={(e) => {
                const idx = sorted.findIndex((c) => c.id === e.target.value);
                if (idx >= 0) setIndex(idx);
              }}
              className="flex-1 rounded-lg bg-transparent px-2 py-1 text-center text-xs font-bold text-slate-600 outline-none dark:text-slate-300"
            >
              {sorted.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIndex((i) => (i + 1) % sorted.length)}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-600"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Counter body */}
        <div className="p-4">
          <h3 className="mb-1 text-center text-sm font-bold text-slate-700 dark:text-slate-200">
            {current.name}
          </h3>
          <div className="flex items-center justify-center py-3">
            <span className="tabular-nums text-6xl font-extrabold leading-none text-slate-800 dark:text-slate-100">
              {current.value.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => decrementCounter(current.id)}
              className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-3 text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Decrement"
            >
              <Minus className="h-5 w-5" />
            </button>
            <button
              onClick={() => incrementCounter(current.id)}
              className="flex flex-[2] items-center justify-center rounded-xl bg-main py-3 font-bold text-white transition hover:brightness-110 active:scale-95"
              aria-label="Increment"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Footer mini */}
        <div className="flex items-center justify-between border-t border-slate-100 px-3 py-1.5 text-[10px] text-slate-400 dark:border-slate-700 dark:text-slate-500">
          <span>
            {index + 1} / {sorted.length}
          </span>
          <button
            onClick={() => setMenuOpen(true)}
            className="font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Manage
          </button>
        </div>
      </div>

      {/* Mini management menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="animate-scale-in relative max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-800">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Counters
              </h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-slate-400 dark:text-slate-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1.5">
              {sorted.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-700/40"
                >
                  <span className="flex-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {c.name}
                  </span>
                  <span className="tabular-nums text-sm font-bold text-slate-500 dark:text-slate-400">
                    {c.value}
                  </span>
                  <button
                    onClick={() => {
                      const idx = sorted.findIndex((x) => x.id === c.id);
                      setIndex(idx);
                      setMenuOpen(false);
                    }}
                    className="rounded-lg bg-main px-2 py-1 text-xs font-bold text-white"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setDeleteTarget(c)}
                    className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  >
                    Del
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                setModalOpen(true);
              }}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-main py-2.5 text-sm font-bold text-white"
            >
              <Plus className="h-4 w-4" />
              New counter
            </button>
          </div>
        </div>
      )}

      <CounterModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete counter"
        message={<>Delete «{deleteTarget?.name}»?</>}
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteTarget) deleteCounter(deleteTarget.id);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
