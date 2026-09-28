import { useEffect, useMemo, useState } from "react";
import { useCounterContext } from "@/context/CounterContext";
import { useCharacterReaction } from "@/context/CharacterReactionContext";
import { CounterGrid } from "@/components/CounterGrid/CounterGrid";
import { CounterCard } from "@/components/CounterCard/CounterCard";
import { CounterModal } from "@/components/CounterModal/CounterModal";
import { LayoutSelector } from "@/components/LayoutSelector/LayoutSelector";
import { ConfirmDialog } from "@/components/ConfirmDialog/ConfirmDialog";
import { getMascotById } from "@/constants";
import type { Counter } from "@/types/counter";
import { MascotAvatar } from "@/components/MascotAvatar/MascotAvatar";
import { Plus } from "lucide-react";

export function Dashboard() {
  const {
    counters,
    settings,
    selectedCounterId,
    selectCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    deleteCounter,
  } = useCounterContext();
  const { registerCounterAction } = useCharacterReaction();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Counter | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Counter | null>(null);
  const [singleIndex, setSingleIndex] = useState(0);

  const sorted = useMemo(
    () => [...counters].sort((a, b) => a.order - b.order),
    [counters]
  );

  useEffect(() => {
    if (singleIndex >= sorted.length) setSingleIndex(0);
  }, [sorted.length, singleIndex]);

  useEffect(() => {
    if (settings.layout !== "single") return;
    if (sorted.length === 0) return;

    const selectedIdx = selectedCounterId
      ? sorted.findIndex((c) => c.id === selectedCounterId)
      : -1;

    const targetIdx =
      selectedIdx >= 0 ? selectedIdx : Math.min(singleIndex, sorted.length - 1);

    if (targetIdx !== singleIndex) setSingleIndex(targetIdx);

    const targetId = sorted[targetIdx]?.id ?? null;
    if (targetId && selectedCounterId !== targetId) selectCounter(targetId);
  }, [settings.layout, sorted, selectedCounterId, singleIndex, selectCounter]);

  const openEdit = (c: Counter) => {
    setEditing(c);
    setModalOpen(true);
  };
  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  // listen for add-counter events from Header
  useEffect(() => {
    const handler = () => openAdd();
    window.addEventListener("add-counter", handler);
    return () => window.removeEventListener("add-counter", handler);
  }, []);

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      )
        return;

      const selId = selectedCounterId ?? sorted[singleIndex]?.id;
      const sel = counters.find((c) => c.id === selId);
      if (!sel) return;

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        const prev = sel.value;
        incrementCounter(sel.id);
        registerCounterAction("increase", prev + sel.increment, prev);
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        const prev = sel.value;
        decrementCounter(sel.id);
        registerCounterAction("decrease", prev - sel.decrement, prev);
      }
      // else if (e.key.toLowerCase() === "r") {
      //   e.preventDefault();
      //   const prev = sel.value;
      //   resetCounter(sel.id);
      //   registerCounterAction("reset", 0, prev);
      // }
      else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        openAdd();
      } else if (settings.layout === "single") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setSingleIndex((i) => (i + 1) % sorted.length);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setSingleIndex((i) => (i - 1 + sorted.length) % sorted.length);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    selectedCounterId,
    singleIndex,
    sorted,
    counters,
    settings.layout,
    incrementCounter,
    decrementCounter,
    resetCounter,
    registerCounterAction,
  ]);

  const mascot = getMascotById(settings.selectedMascot);

  // Empty state
  if (counters.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 mt-4 animate-wiggle">
            <MascotAvatar
              avatar={mascot.avatar}
              color={mascot.color}
              size={80}
            />
          </div>
          <h2 className="mb-2 text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            عـــــبده النــــيمان 👀
          </h2>
          <p className="mb-6 text-sm text-text-muted-light dark:text-text-muted-dark">
            Shift ends in 30 minutes, let's do some work?
          </p>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-xl bg-main px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Create first counter
          </button>
        </div>
        <CounterModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // Single counter layout — toolbar stays visible
  if (settings.layout === "single" && sorted.length > 0) {
    const current = sorted[Math.min(singleIndex, sorted.length - 1)];

    return (
      <>
        {/* Toolbar — LayoutSelector left, New button right */}
        <div className="mb-6 mt-4 flex items-center justify-between gap-4">
          <LayoutSelector />
          {/* Counter navigation */}
          <div className="mx-auto flex items-center justify-between gap-16">
            {/* <button
              onClick={prev}
              disabled={sorted.length < 2}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-background dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button> */}

            <div className="flex items-center gap-2">
              <select
                value={current.id}
                onChange={(e) => {
                  const idx = sorted.findIndex((c) => c.id === e.target.value);
                  if (idx >= 0) {
                    setSingleIndex(idx);
                    selectCounter(sorted[idx]?.id ?? null);
                  }
                }}
                className="rounded-xl border border-border-light bg-surface-light px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-main hover:brightness-[0.98] dark:border-border-dark dark:bg-surface-dark dark:text-slate-100 dark:hover:brightness-110"
              >
                {sorted.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="text-xs font-bold text-text-muted-light dark:text-text-muted-dark">
                {singleIndex + 1} / {sorted.length}
              </span>
            </div>

            {/* <button
              onClick={next}
              disabled={sorted.length < 2}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-background dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button> */}
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 rounded-xl bg-main px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New counter</span>
          </button>
        </div>

        <div className="mx-auto">
          <CounterCard
            counter={current}
            isSingle
            isSelected
            onSelect={() => selectCounter(current.id)}
            onEditName={() => openEdit(current)}
            onSetValue={() => openEdit(current)}
            onSetIncrement={() => openEdit(current)}
            onConfirmDelete={() => setDeleteTarget(current)}
          />
        </div>

        <CounterModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          editing={editing}
        />
        <ConfirmDialog
          open={deleteTarget !== null}
          title="Delete counter"
          message={
            <>
              Delete «{deleteTarget?.name}»? Current value{" "}
              <span className="font-bold">{deleteTarget?.value}</span> can't be
              undone.
            </>
          }
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

  // Grid layout — New button beside LayoutSelector
  return (
    <>
      <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-3">
        <LayoutSelector />
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 rounded-xl bg-main px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New counter</span>
        </button>
      </div>

      <CounterGrid
        counters={sorted}
        layout={settings.layout}
        selectedCounterId={selectedCounterId}
        onEditName={openEdit}
        onSetValue={openEdit}
        onSetIncrement={openEdit}
        onConfirmDelete={(c) => setDeleteTarget(c)}
      />

      <CounterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
      />
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete counter"
        message={
          <>
            Delete «{deleteTarget?.name}»? Current value{" "}
            <span className="font-bold">{deleteTarget?.value}</span> can't be
            undone.
          </>
        }
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
