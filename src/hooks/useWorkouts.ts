import { useCallback, useState } from "react";
import type { Workout } from "@/types";
import { loadWorkouts, saveWorkouts, PRESETS } from "@/lib/workoutStore";

type UseWorkoutsReturn = {
  /** Presets first, then user-saved workouts. */
  workouts: Workout[];
  presets: Workout[];
  saved: Workout[];
  /** Inserts or updates a user workout by id and returns the stored value. */
  upsert: (workout: Workout) => void;
  remove: (id: string) => void;
};

export function useWorkouts(): UseWorkoutsReturn {
  const [saved, setSaved] = useState<Workout[]>(() => loadWorkouts());

  const upsert = useCallback(
    (workout: Workout) => {
      setSaved((prev) => {
        const exists = prev.some((w) => w.id === workout.id);
        const next = exists
          ? prev.map((w) => (w.id === workout.id ? workout : w))
          : [...prev, workout];
        saveWorkouts(next);
        return next;
      });
    },
    [],
  );

  const remove = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveWorkouts(next);
      return next;
    });
  }, []);

  return {
    workouts: [...PRESETS, ...saved],
    presets: PRESETS,
    saved,
    upsert,
    remove,
  };
}
