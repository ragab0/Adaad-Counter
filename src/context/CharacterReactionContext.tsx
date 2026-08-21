import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { CharacterMood } from '@/types/counter';
import { MILESTONES } from '@/constants';

export interface ReactionEvent {
  id: string;
  mood: CharacterMood;
  quote?: string;
  timestamp: number;
}

interface CharacterReactionContextValue {
  lastReaction: ReactionEvent | null;
  triggerReaction: (mood: CharacterMood, overrideQuote?: string) => void;
  registerCounterAction: (action: 'increase' | 'decrease' | 'reset', newValue: number, prevValue: number) => void;
  rapidClickLevel: number;
  isBored: boolean;
}

const CharacterReactionContext = createContext<CharacterReactionContextValue | null>(null);

const RAPID_CLICK_WINDOW = 350;
const BORED_TIMEOUT = 30000;

export function CharacterReactionProvider({ children }: { children: ReactNode }) {
  const [lastReaction, setLastReaction] = useState<ReactionEvent | null>(null);
  const [rapidClickLevel, setRapidClickLevel] = useState(0);
  const [isBored, setIsBored] = useState(false);

  const lastClickTimesRef = useRef<number[]>([]);
  const boredTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rapidDecayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reactionIdRef = useRef(0);

  const clearBoredTimer = useCallback(() => {
    if (boredTimerRef.current) {
      clearTimeout(boredTimerRef.current);
      boredTimerRef.current = null;
    }
  }, []);

  const startBoredTimer = useCallback(() => {
    clearBoredTimer();
    boredTimerRef.current = setTimeout(() => {
      setIsBored(true);
    }, BORED_TIMEOUT);
  }, [clearBoredTimer]);

  const clearRapidDecayTimer = useCallback(() => {
    if (rapidDecayTimerRef.current) {
      clearTimeout(rapidDecayTimerRef.current);
      rapidDecayTimerRef.current = null;
    }
  }, []);

  const triggerReaction = useCallback((mood: CharacterMood, overrideQuote?: string) => {
    reactionIdRef.current += 1;
    setLastReaction({
      id: `r-${reactionIdRef.current}`,
      mood,
      quote: overrideQuote,
      timestamp: Date.now(),
    });
    setIsBored(false);
    startBoredTimer();
  }, [startBoredTimer]);

  const updateRapidLevel = useCallback(() => {
    const now = Date.now();
    lastClickTimesRef.current.push(now);
    lastClickTimesRef.current = lastClickTimesRef.current.filter(
      (t) => now - t < RAPID_CLICK_WINDOW,
    );
    const count = lastClickTimesRef.current.length;
    const level = Math.min(5, Math.max(0, count - 2));
    setRapidClickLevel(level);

    clearRapidDecayTimer();
    rapidDecayTimerRef.current = setTimeout(() => {
      setRapidClickLevel(0);
      lastClickTimesRef.current = [];
    }, 600);
  }, [clearRapidDecayTimer]);

  const isMilestone = useCallback((val: number, prev: number): boolean => {
    return MILESTONES.some((m) => prev < m && val >= m);
  }, []);

  const registerCounterAction = useCallback(
    (action: 'increase' | 'decrease' | 'reset', newValue: number, prevValue: number) => {
      setIsBored(false);
      clearBoredTimer();

      if (action === 'reset') {
        triggerReaction('reset');
        startBoredTimer();
        return;
      }

      updateRapidLevel();

      if (action === 'increase' && isMilestone(newValue, prevValue)) {
        triggerReaction('milestone');
        startBoredTimer();
        return;
      }

      if (rapidClickLevel >= 2) {
        triggerReaction('rapid');
        startBoredTimer();
        return;
      }

      triggerReaction(action);
      startBoredTimer();
    },
    [triggerReaction, updateRapidLevel, isMilestone, rapidClickLevel, clearBoredTimer, startBoredTimer],
  );

  useEffect(() => {
    startBoredTimer();
    return () => {
      clearBoredTimer();
      clearRapidDecayTimer();
    };
  }, [startBoredTimer, clearBoredTimer, clearRapidDecayTimer]);

  const value = useMemo<CharacterReactionContextValue>(
    () => ({
      lastReaction,
      triggerReaction,
      registerCounterAction,
      rapidClickLevel,
      isBored,
    }),
    [lastReaction, triggerReaction, registerCounterAction, rapidClickLevel, isBored],
  );

  return (
    <CharacterReactionContext.Provider value={value}>
      {children}
    </CharacterReactionContext.Provider>
  );
}

export function useCharacterReaction(): CharacterReactionContextValue {
  const ctx = useContext(CharacterReactionContext);
  if (!ctx) throw new Error('useCharacterReaction must be used within CharacterReactionProvider');
  return ctx;
}
