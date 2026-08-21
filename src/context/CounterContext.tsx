import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AppSettings, Counter, LayoutType, ThemeMode } from '@/types/counter';
import { DEFAULT_COUNTERS, DEFAULT_SETTINGS, STORAGE_KEY } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface PersistShape {
  counters: Counter[];
  settings: AppSettings;
}

interface CounterContextValue {
  counters: Counter[];
  settings: AppSettings;
  selectedCounterId: string | null;

  addCounter: (data: Partial<Counter> & { name: string }) => string;
  updateCounter: (id: string, patch: Partial<Counter>) => void;
  deleteCounter: (id: string) => void;
  incrementCounter: (id: string) => void;
  decrementCounter: (id: string) => void;
  resetCounter: (id: string) => void;
  setCounterValue: (id: string, value: number) => void;
  reorderCounters: (activeId: string, overId: string) => void;

  updateSettings: (patch: Partial<AppSettings>) => void;
  setLayout: (layout: LayoutType) => void;
  setMascot: (id: string) => void;
  toggleFloatingMode: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  applyGlobalIncrement: () => void;

  selectCounter: (id: string | null) => void;
}

const CounterContext = createContext<CounterContextValue | null>(null);

function uid(prefix = 'c'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function CounterProvider({ children }: { children: ReactNode }) {
  const [persist, setPersist] = useLocalStorage<PersistShape>(STORAGE_KEY, {
    counters: DEFAULT_COUNTERS,
    settings: DEFAULT_SETTINGS,
  });

  const { counters, settings } = persist;
  const [selectedCounterId, setSelectedCounterId] = useState<string | null>(null);

  // keep selection valid
  useEffect(() => {
    if (selectedCounterId && !counters.some((c) => c.id === selectedCounterId)) {
      setSelectedCounterId(null);
    }
  }, [counters, selectedCounterId]);

  // apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [settings.theme]);

  const patchPersist = useCallback(
    (fn: (prev: PersistShape) => PersistShape) => setPersist((prev) => fn(prev)),
    [setPersist],
  );

  const addCounter = useCallback(
    (data: Partial<Counter> & { name: string }): string => {
      const id = uid();
      patchPersist((prev) => {
        const order = prev.counters.length;
        const newCounter: Counter = {
          id,
          name: data.name,
          value: data.value ?? 0,
          increment: data.increment ?? prev.settings.globalIncrement,
          decrement: data.decrement ?? prev.settings.globalDecrement,
          order,
          createdAt: Date.now(),
        };
        return { ...prev, counters: [...prev.counters, newCounter] };
      });
      return id;
    },
    [patchPersist],
  );

  const updateCounter = useCallback(
    (id: string, patch: Partial<Counter>) => {
      patchPersist((prev) => ({
        ...prev,
        counters: prev.counters.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      }));
    },
    [patchPersist],
  );

  const deleteCounter = useCallback(
    (id: string) => {
      patchPersist((prev) => ({
        ...prev,
        counters: prev.counters.filter((c) => c.id !== id),
      }));
    },
    [patchPersist],
  );

  const incrementCounter = useCallback(
    (id: string) => {
      patchPersist((prev) => ({
        ...prev,
        counters: prev.counters.map((c) =>
          c.id === id ? { ...c, value: c.value + c.increment } : c,
        ),
      }));
    },
    [patchPersist],
  );

  const decrementCounter = useCallback(
    (id: string) => {
      patchPersist((prev) => ({
        ...prev,
        counters: prev.counters.map((c) =>
          c.id === id ? { ...c, value: c.value - c.decrement } : c,
        ),
      }));
    },
    [patchPersist],
  );

  const resetCounter = useCallback(
    (id: string) => {
      patchPersist((prev) => ({
        ...prev,
        counters: prev.counters.map((c) => (c.id === id ? { ...c, value: 0 } : c)),
      }));
    },
    [patchPersist],
  );

  const setCounterValue = useCallback(
    (id: string, value: number) => {
      patchPersist((prev) => ({
        ...prev,
        counters: prev.counters.map((c) => (c.id === id ? { ...c, value } : c)),
      }));
    },
    [patchPersist],
  );

  const reorderCounters = useCallback(
    (activeId: string, overId: string) => {
      if (activeId === overId) return;
      patchPersist((prev) => {
        const sorted = [...prev.counters].sort((a, b) => a.order - b.order);
        const fromIdx = sorted.findIndex((c) => c.id === activeId);
        const toIdx = sorted.findIndex((c) => c.id === overId);
        if (fromIdx === -1 || toIdx === -1) return prev;
        const [moved] = sorted.splice(fromIdx, 1);
        sorted.splice(toIdx, 0, moved);
        const reordered = sorted.map((c, i) => ({ ...c, order: i }));
        return { ...prev, counters: reordered };
      });
    },
    [patchPersist],
  );

  const updateSettings = useCallback(
    (patch: Partial<AppSettings>) => {
      patchPersist((prev) => ({
        ...prev,
        settings: { ...prev.settings, ...patch },
      }));
    },
    [patchPersist],
  );

  const setLayout = useCallback(
    (layout: LayoutType) => updateSettings({ layout }),
    [updateSettings],
  );
  const setMascot = useCallback(
    (id: string) => updateSettings({ selectedMascot: id }),
    [updateSettings],
  );
  const toggleFloatingMode = useCallback(
    () => updateSettings({ floatingMode: !persist.settings.floatingMode }),
    [updateSettings, persist.settings.floatingMode],
  );
  const setTheme = useCallback(
    (theme: ThemeMode) => updateSettings({ theme }),
    [updateSettings],
  );
  const toggleTheme = useCallback(() => {
    patchPersist((prev) => ({
      ...prev,
      settings: { ...prev.settings, theme: prev.settings.theme === 'dark' ? 'light' : 'dark' },
    }));
  }, [patchPersist]);

  const applyGlobalIncrement = useCallback(() => {
    patchPersist((prev) => ({
      ...prev,
      counters: prev.counters.map((c) => ({
        ...c,
        increment: prev.settings.globalIncrement,
        decrement: prev.settings.globalDecrement,
      })),
    }));
  }, [patchPersist]);

  const selectCounter = useCallback((id: string | null) => setSelectedCounterId(id), []);

  const value = useMemo<CounterContextValue>(
    () => ({
      counters,
      settings,
      selectedCounterId,
      addCounter,
      updateCounter,
      deleteCounter,
      incrementCounter,
      decrementCounter,
      resetCounter,
      setCounterValue,
      reorderCounters,
      updateSettings,
      setLayout,
      setMascot,
      toggleFloatingMode,
      setTheme,
      toggleTheme,
      applyGlobalIncrement,
      selectCounter,
    }),
    [
      counters,
      settings,
      selectedCounterId,
      addCounter,
      updateCounter,
      deleteCounter,
      incrementCounter,
      decrementCounter,
      resetCounter,
      setCounterValue,
      reorderCounters,
      updateSettings,
      setLayout,
      setMascot,
      toggleFloatingMode,
      setTheme,
      toggleTheme,
      applyGlobalIncrement,
      selectCounter,
    ],
  );

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
}

export function useCounterContext(): CounterContextValue {
  const ctx = useContext(CounterContext);
  if (!ctx) throw new Error('useCounterContext must be used within CounterProvider');
  return ctx;
}
