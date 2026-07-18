import { useCallback, useMemo, useState } from "react";
import { useTimer } from "./useTimer";
import { useAudio } from "./useAudio";
import type { TimerSegment } from "@/types";

type UseTimerSetReturn = {
  segments: TimerSegment[];
  currentIndex: number;
  currentSegment: TimerSegment;
  nextSegment: TimerSegment | null;
  remaining: number;
  isRunning: boolean;
  progress: number;
  togglePlayPause: () => void;
  skipToNext: () => void;
  restart: () => void;
};

export function useTimerSet(segments: TimerSegment[]): UseTimerSetReturn | null {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [prevSegments, setPrevSegments] = useState(segments);
  const { ensureResumed, playBeep } = useAudio();

  // Reset to the beginning whenever the segment list itself changes
  // (e.g. the user loads a different workout). Adjusting state during render
  // per https://react.dev/learn/you-might-not-need-an-effect.
  if (prevSegments !== segments) {
    setPrevSegments(segments);
    setCurrentIndex(0);
    setIsRunning(false);
  }

  const currentSegment = segments[currentIndex];

  const handleTick = useCallback(
    (remaining: number) => {
      const ceiled = Math.ceil(remaining);
      const prevCeiled = Math.ceil(remaining + 0.017);
      if (ceiled < prevCeiled && ceiled <= 3 && ceiled > 0) {
        playBeep(ceiled <= 1 ? 2 : 1);
      }
    },
    [playBeep],
  );

  const handleEnd = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next < segments.length) {
        // Auto-advance: isRunning stays true, timer continues with new duration
        return next;
      }
      // Last segment finished
      setIsRunning(false);
      return prev;
    });
  }, [segments.length]);

  const remaining = useTimer({
    duration: currentSegment?.duration ?? 0,
    isActive: isRunning,
    onTick: handleTick,
    onEnd: handleEnd,
  });

  const togglePlayPause = useCallback(() => {
    ensureResumed();
    setIsRunning((prev) => !prev);
  }, [ensureResumed]);

  const skipToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next < segments.length ? next : prev;
    });
    setIsRunning(false);
  }, [segments.length]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setIsRunning(false);
  }, []);

  const progress = useMemo(() => {
    if (segments.length === 0) return 0;
    const segmentProgress =
      remaining > 0 && currentSegment ? 1 - remaining / currentSegment.duration : 1;
    return ((currentIndex + segmentProgress) / segments.length) * 100;
  }, [segments.length, currentIndex, currentSegment, remaining]);

  if (segments.length === 0 || !currentSegment) return null;

  return {
    segments,
    currentIndex,
    currentSegment,
    nextSegment: segments[currentIndex + 1] ?? null,
    remaining,
    isRunning,
    progress,
    togglePlayPause,
    skipToNext,
    restart,
  };
}
