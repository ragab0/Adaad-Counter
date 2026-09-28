import { useRef } from "react";
import { useCounterContext } from "@/context/CounterContext";
import { getMascotById } from "@/constants";
import {
  AnimatedCharacter,
  type AnimatedCharacterHandle,
} from "@/components/AnimatedCharacter/AnimatedCharacter";

export function MascotMood() {
  const { settings } = useCounterContext();
  const mascot = getMascotById(settings.selectedMascot);
  const charRef = useRef<AnimatedCharacterHandle>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <AnimatedCharacter
        ref={charRef}
        mascot={mascot}
        size={56}
        showQuote={true}
        showSleepState={true}
        idleAnimation={true}
      />
      <p className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark">
        {mascot.personalityLabel}
      </p>
    </div>
  );
}
