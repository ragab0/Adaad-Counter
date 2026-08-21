import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { CharacterMood, Mascot } from '@/types/counter';
import { MascotAvatar } from '@/components/MascotAvatar/MascotAvatar';
import { useCharacterReaction } from '@/context/CharacterReactionContext';

export interface AnimatedCharacterHandle {
  react: (mood: CharacterMood, quote?: string) => void;
}

interface Props {
  mascot: Mascot;
  size?: number;
  showQuote?: boolean;
  showSleepState?: boolean;
  idleAnimation?: boolean;
  className?: string;
  interactive?: boolean;
  noClip?: boolean;
}

export const AnimatedCharacter = forwardRef<AnimatedCharacterHandle, Props>(
  function AnimatedCharacter(
    {
      mascot,
      size = 80,
      showQuote = true,
      showSleepState = true,
      idleAnimation = true,
      className = '',
      interactive = false,
      noClip = false,
    },
    ref,
  ) {
    const { lastReaction, isBored, triggerReaction: globalTrigger } = useCharacterReaction();

    const [activeMood, setActiveMood] = useState<CharacterMood>('idle');
    const [quote, setQuote] = useState<string | null>(null);
    const [quoteKey, setQuoteKey] = useState(0);
    const [isMilestone, setIsMilestone] = useState(false);

    const moodTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const quoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastReactionIdRef = useRef<string | null>(null);
    const localOverrideRef = useRef<{ mood: CharacterMood; quote?: string } | null>(null);

    const clearMoodTimer = useCallback(() => {
      if (moodTimerRef.current) {
        clearTimeout(moodTimerRef.current);
        moodTimerRef.current = null;
      }
    }, []);

    const clearQuoteTimer = useCallback(() => {
      if (quoteTimerRef.current) {
        clearTimeout(quoteTimerRef.current);
        quoteTimerRef.current = null;
      }
    }, []);

    const getAnimationClass = useCallback(
      (mood: CharacterMood, bored: boolean): string => {
        if (bored && mood === 'idle') return mascot.animations.bored;
        const a = mascot.animations;
        switch (mood) {
          case 'increase':
            return a.increase;
          case 'decrease':
            return a.decrease;
          case 'reset':
            return a.reset;
          case 'milestone':
            return a.milestone;
          case 'rapid':
            return a.rapid;
          case 'bored':
            return a.bored;
          case 'idle':
          default:
            return idleAnimation ? a.idle : '';
        }
      },
      [mascot.animations, idleAnimation],
    );

    const getQuoteForMood = useCallback(
      (mood: CharacterMood, overrideQuote?: string): string | undefined => {
        if (overrideQuote) return overrideQuote;
        const q = mascot.quotes;
        switch (mood) {
          case 'increase':
            return q.increase;
          case 'decrease':
            return q.decrease;
          case 'reset':
            return q.reset;
          case 'milestone':
            return q.milestone;
          case 'rapid':
            return q.rapid;
          case 'bored':
            return showSleepState ? q.bored : undefined;
          case 'idle':
          default:
            return undefined;
        }
      },
      [mascot.quotes, showSleepState],
    );

    const getMoodDurationMs = useCallback((mood: CharacterMood): number => {
      switch (mood) {
        case 'reset':
          return 900;
        case 'milestone':
          return 950;
        case 'increase':
          return 500;
        case 'decrease':
          return 550;
        case 'rapid':
          return 350;
        case 'bored':
          return 0;
        case 'idle':
        default:
          return 0;
      }
    }, []);

    const triggerInternal = useCallback(
      (mood: CharacterMood, overrideQuote?: string) => {
        if (mood === 'idle') {
          setActiveMood('idle');
          return;
        }

        const duration = getMoodDurationMs(mood);
        clearMoodTimer();

        setActiveMood(mood);

        if (mood === 'milestone') {
          setIsMilestone(true);
          setTimeout(() => setIsMilestone(false), 800);
        }

        if (duration > 0) {
          moodTimerRef.current = setTimeout(() => {
            setActiveMood('idle');
          }, duration);
        }

        const q = getQuoteForMood(mood, overrideQuote);
        if (showQuote && q) {
          clearQuoteTimer();
          setQuote(q);
          setQuoteKey((k) => k + 1);
          quoteTimerRef.current = setTimeout(() => setQuote(null), 2400);
        }
      },
      [clearMoodTimer, clearQuoteTimer, getQuoteForMood, getMoodDurationMs, showQuote],
    );

    useImperativeHandle(
      ref,
      () => ({
        react: (mood: CharacterMood, q?: string) => {
          localOverrideRef.current = { mood, quote: q };
          triggerInternal(mood, q);
        },
      }),
      [triggerInternal],
    );

    useEffect(() => {
      if (!lastReaction) return;
      if (lastReaction.id === lastReactionIdRef.current) return;
      lastReactionIdRef.current = lastReaction.id;
      triggerInternal(lastReaction.mood, lastReaction.quote);
    }, [lastReaction, triggerInternal]);

    useEffect(() => {
      if (isBored && activeMood === 'idle' && showSleepState) {
        const boredQuote = getQuoteForMood('bored');
        if (showQuote && boredQuote && !quote) {
          setQuote(boredQuote);
          setQuoteKey((k) => k + 1);
        }
      }
      if (!isBored && quote && !moodTimerRef.current) {
        setQuote(null);
      }
    }, [isBored, activeMood, showSleepState, showQuote, quote, getQuoteForMood]);

    useEffect(() => {
      return () => {
        clearMoodTimer();
        clearQuoteTimer();
      };
    }, [clearMoodTimer, clearQuoteTimer]);

    const effectiveMood: CharacterMood = useMemo(() => {
      if (isBored && activeMood === 'idle' && showSleepState) return 'bored';
      return activeMood;
    }, [activeMood, isBored, showSleepState]);

    const animationClass = getAnimationClass(activeMood, isBored && showSleepState);

    const handleClick = () => {
      if (!interactive) return;
      globalTrigger('milestone', mascot.quotes.interaction);
    };

    return (
      <div className={`char-reaction-wrap ${className}`}>
        <div
          onClick={handleClick}
          className={`relative inline-flex items-center justify-center ${
            interactive ? 'cursor-pointer' : ''
          } ${isMilestone ? 'milestone-active' : ''}`}
          style={{ color: mascot.color }}
        >
          <div className={animationClass} style={{ transformOrigin: 'bottom center' }}>
            <MascotAvatar
              avatar={mascot.avatar}
              color={mascot.color}
              size={size}
              mood={effectiveMood}
              noClip={noClip}
            />
          </div>
          {isMilestone && <div className="milestone-sparkle" aria-hidden />}
        </div>

        {quote && (
          <div
            key={quoteKey}
            className="anim-float-up pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold shadow-md"
            style={{
              background: `${mascot.color}22`,
              color: mascot.color,
              border: `1px solid ${mascot.color}44`,
            }}
          >
            {quote}
          </div>
        )}
      </div>
    );
  },
);
