import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MoreVertical,
  Plus,
  Minus,
  GripVertical,
  Pencil,
  Check,
  X,
} from "lucide-react";
import type { Counter } from "@/types/counter";
import { useCounterContext } from "@/context/CounterContext";
import { useCharacterReaction } from "@/context/CharacterReactionContext";
import { CounterSettings } from "@/components/CounterSettings/CounterSettings";

interface Props {
  counter: Counter;
  isSingle?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onEditName: () => void;
  onSetValue: () => void;
  onSetIncrement: () => void;
  onConfirmDelete: () => void;
}

export function CounterCard({
  counter,
  isSingle = false,
  isSelected = false,
  onSelect,
  onEditName,
  onSetValue,
  onSetIncrement,
  onConfirmDelete,
}: Props) {
  void onEditName;
  const { incrementCounter, decrementCounter, selectCounter, updateCounter } =
    useCounterContext();
  const { registerCounterAction } = useCharacterReaction();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pop, setPop] = useState<"up" | "down" | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(counter.name);
  const popTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: counter.id });

  const triggerPop = (dir: "up" | "down") => {
    setPop(dir);
    if (popTimer.current) clearTimeout(popTimer.current);
    popTimer.current = setTimeout(() => setPop(null), 300);
  };

  useEffect(() => {
    return () => {
      if (popTimer.current) clearTimeout(popTimer.current);
    };
  }, []);

  useEffect(() => {
    if (editingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [editingName]);

  const handleIncrement = () => {
    const prev = counter.value;
    incrementCounter(counter.id);
    triggerPop("up");
    registerCounterAction("increase", prev + counter.increment, prev);
  };
  const handleDecrement = () => {
    const prev = counter.value;
    decrementCounter(counter.id);
    triggerPop("down");
    registerCounterAction("decrease", prev - counter.decrement, prev);
  };

  const handleClick = () => {
    if (isSingle && onSelect) onSelect();
    else selectCounter(counter.id);
  };

  const saveName = () => {
    if (nameDraft.trim()) {
      updateCounter(counter.id, { name: nameDraft.trim() });
    } else {
      setNameDraft(counter.name);
    }
    setEditingName(false);
  };

  const cancelEdit = () => {
    setNameDraft(counter.name);
    setEditingName(false);
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isSingle ? "col-span-full" : ""} ${
        isDragging ? "z-50" : ""
      }`}
      {...attributes}
    >
      <div
        onClick={handleClick}
        style={{
          backgroundColor: "#33333d",
          borderRadius: "0.375rem",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)",
        }}
        className={`group relative flex flex-col transition hover:brightness-110 ${
          isSelected ? "ring-2 ring-main/40" : ""
        } ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
      >
        {/* Drag handle */}
        <button
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="absolute left-1 top-1/2 -translate-y-1/2 cursor-grab p-1 text-slate-500 opacity-0 transition hover:text-slate-300 group-hover:opacity-100 active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        {/* Header — centered name + settings */}
        <div className="flex flex-col items-center px-4 pt-4 relative">
          {/* Settings button */}
          <div className=" self-end flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700/50 hover:text-slate-200 "
              aria-label="Counter settings"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {menuOpen && (
              <CounterSettings
                counter={counter}
                onClose={() => setMenuOpen(false)}
                onEditName={() => {
                  setEditingName(true);
                  setNameDraft(counter.name);
                }}
                onSetValue={onSetValue}
                onSetIncrement={onSetIncrement}
                onConfirmDelete={onConfirmDelete}
                clsName="left-[unset] right-4 top-14"
              />
            )}
          </div>
          <div className="w-full">
            {editingName ? (
              <div
                className={`flex-1 w-[90%] mx-auto flex items-center gap-1 ${
                  editingName ? "animate-edit-pulse rounded-lg" : ""
                }`}
              >
                <input
                  ref={nameInputRef}
                  type="text"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveName();
                    if (e.key === "Escape") cancelEdit();
                  }}
                  className="rounded-md w-full flex-1 border-none bg-[#2a2a32] p-3 text-center text-base font-bold text-slate-100 outline-none focus:ring-2 focus:ring-main/30"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveName();
                  }}
                  className="rounded-lg bg-main p-3 text-white transition hover:brightness-110"
                  aria-label="Save name"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelEdit();
                  }}
                  className="rounded-lg bg-slate-600 p-3 text-white transition hover:bg-slate-500"
                  aria-label="Cancel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                className="w-fit mx-auto p-3 ps-0 flex justify-center items-center gap-2 hover:bg-[#292932] [&:hover>svg]:animate-spin"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingName(true);
                  setNameDraft(counter.name);
                }}
              >
                <h3 className="truncate ms-6 text-base font-bold text-slate-200">
                  {counter.name}
                </h3>
                <Pencil className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Number — much bigger */}
        <div className="flex flex-1 items-center justify-center">
          <span
            className={`tabular-nums text-[180px] lg:text-[230px] font-extrabold leading-[200px] lg:leading-[280px] text-main ${
              pop === "up" ? "animate-pop" : ""
            } ${pop === "down" ? "animate-shake text-red-400" : ""}`}
          >
            {counter.value.toLocaleString("en-US")}
          </span>
        </div>

        {/* Controls — bigger buttons */}
        <div className="flex gap-3 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDecrement();
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-600 bg-slate-700/50 py-4 text-slate-300 transition hover:bg-slate-700 active:scale-95"
            aria-label={`Decrement by ${counter.decrement}`}
          >
            <Minus className="h-7 w-7" />
            {counter.decrement !== 1 && (
              <span className="text-base font-bold">{counter.decrement}</span>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleIncrement();
            }}
            className="flex flex-[2] items-center justify-center gap-1.5 rounded-lg bg-main py-4 text-lg font-bold text-white transition hover:brightness-110 active:scale-95"
            aria-label={`Increment by ${counter.increment}`}
          >
            <Plus className="h-7 w-7" />
            {counter.increment !== 1 && (
              <span className="text-base">{counter.increment}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
