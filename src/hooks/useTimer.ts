import { useEffect, useRef, useState } from "react";

type UseTimerOptions = {
  duration: number;
  isActive: boolean;
  onTick?: (remaining: number) => void;
  onEnd?: () => void;
};

/**
 * Countdown timer driven by requestAnimationFrame.
 *
 * `isActive` is controlled externally. When true, counts down.
 * When false, pauses. When duration changes while active,
 * restarts from the new duration.
 */
export function useTimer({ duration, isActive, onTick, onEnd }: UseTimerOptions): number {
  const [remaining, setRemaining] = useState(duration);
  const [prevDuration, setPrevDuration] = useState(duration);

  const baseRemainingRef = useRef(duration);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const prevDurationInEffectRef = useRef(duration);
  const onTickRef = useRef(onTick);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  // Derive remaining during render when duration changes (new segment)
  if (duration !== prevDuration) {
    setPrevDuration(duration);
    setRemaining(duration);
  }

  // Main timer loop — re-runs when isActive or duration changes
  useEffect(() => {
    // Only reset the base when duration actually changed (new segment),
    // not on every pause/resume toggle.
    if (duration !== prevDurationInEffectRef.current) {
      baseRemainingRef.current = duration;
      prevDurationInEffectRef.current = duration;
    }

    if (!isActive) {
      // Pausing: capture how far we got and store it
      if (startTimeRef.current) {
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        baseRemainingRef.current = Math.max(0, baseRemainingRef.current - elapsed);
        startTimeRef.current = null;
      }
      cancelAnimationFrame(rafRef.current);
      return;
    }

    // Starting/resuming: begin from wherever baseRemainingRef left off
    startTimeRef.current = performance.now();

    const tick = () => {
      if (!startTimeRef.current) return;

      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const newRemaining = Math.max(0, baseRemainingRef.current - elapsed);

      setRemaining(newRemaining);
      onTickRef.current?.(newRemaining);

      if (newRemaining <= 0) {
        startTimeRef.current = null;
        onEndRef.current?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, duration]);

  return remaining;
}
