import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useCounterContext } from "@/context/CounterContext";
import type { Counter, LayoutType } from "@/types/counter";
import { CounterCard } from "@/components/CounterCard/CounterCard";

interface Props {
  counters: Counter[];
  layout: LayoutType;
  selectedCounterId: string | null;
  onEditName: (c: Counter) => void;
  onSetValue: (c: Counter) => void;
  onSetIncrement: (c: Counter) => void;
  onConfirmDelete: (c: Counter) => void;
}

export function CounterGrid({
  counters,
  layout,
  selectedCounterId,
  onEditName,
  onSetValue,
  onSetIncrement,
  onConfirmDelete,
}: Props) {
  const { reorderCounters, selectCounter } = useCounterContext();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    })
  );

  const sorted = useMemo(
    () => [...counters].sort((a, b) => a.order - b.order),
    [counters]
  );
  const activeCounter = activeId
    ? sorted.find((c) => c.id === activeId) ?? null
    : null;

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string);
    document.body.classList.add("dragging-active");
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    document.body.classList.remove("dragging-active");
    const { active, over } = e;
    if (over && active.id !== over.id) {
      reorderCounters(active.id as string, over.id as string);
    }
  };

  const gridColsClass =
    layout === "two-column"
      ? "grid-cols-1 sm:grid-cols-2"
      : layout === "three-column"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sorted.map((c) => c.id)}
        strategy={rectSortingStrategy}
      >
        <div className={`grid gap-3 ${gridColsClass}`}>
          {sorted.map((c) => (
            <CounterCard
              key={c.id}
              counter={c}
              isSelected={selectedCounterId === c.id}
              onSelect={() => selectCounter(c.id)}
              onEditName={() => onEditName(c)}
              onSetValue={() => onSetValue(c)}
              onSetIncrement={() => onSetIncrement(c)}
              onConfirmDelete={() => onConfirmDelete(c)}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeCounter ? (
          <div className="rotate-2 opacity-90">
            <div className="flex flex-col rounded-xl border-2 border-brand-300 bg-white p-5 shadow-2xl dark:bg-slate-800">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {activeCounter.name}
              </h3>
              <span className="py-4 text-center text-5xl font-extrabold tabular-nums text-slate-800 dark:text-slate-100">
                {activeCounter.value.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
