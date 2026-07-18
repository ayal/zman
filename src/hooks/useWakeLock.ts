import { useEffect, useRef } from "react";
import NoSleep from "nosleep.js";

/**
 * Keeps the screen awake while the component is mounted and `enabled` is true.
 * Uses the native Wake Lock API where available, with NoSleep.js as fallback.
 */
export function useWakeLock(enabled: boolean) {
  const noSleepRef = useRef<NoSleep | null>(null);

  useEffect(() => {
    if (!enabled) {
      noSleepRef.current?.disable();
      return;
    }

    if (!noSleepRef.current) {
      noSleepRef.current = new NoSleep();
    }

    noSleepRef.current.enable();

    return () => {
      noSleepRef.current?.disable();
    };
  }, [enabled]);
}
