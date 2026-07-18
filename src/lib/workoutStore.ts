import type { Workout } from "@/types";
import { parseSchedule, DEFAULT_SCHEDULE } from "./parseSchedule";

const STORAGE_KEY = "zman.workouts.v1";

const CLASSIC_7MIN =
  "1,Get Ready,10" +
  "|1,Jumping Jacks/Rest/Wall Sit/Rest/Push-ups/Rest/Abdominal Crunches/Rest/Step-ups/Rest/Squats/Rest/Tricep Dips/Rest/Plank/Rest/High Knees/Rest/Lunges/Rest/Push-up Rotation/Rest/Side Plank,30/10/30/10/30/10/30/10/30/10/30/10/30/10/30/10/30/10/30/10/30/10/30";

/** Built-in, read-only workouts always shown in the library. */
export const PRESETS: Workout[] = [
  {
    id: "preset-classic-7min",
    name: "Classic 7-Minute Workout",
    segments: parseSchedule(CLASSIC_7MIN),
    preset: true,
  },
  {
    id: "preset-default",
    name: "Quick Default",
    segments: parseSchedule(DEFAULT_SCHEDULE),
    preset: true,
  },
];

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `w-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function isValidWorkout(value: unknown): value is Workout {
  if (typeof value !== "object" || value === null) return false;
  const w = value as Record<string, unknown>;
  return (
    typeof w.id === "string" &&
    typeof w.name === "string" &&
    Array.isArray(w.segments) &&
    w.segments.every(
      (s) =>
        typeof s === "object" &&
        s !== null &&
        typeof (s as Record<string, unknown>).label === "string" &&
        typeof (s as Record<string, unknown>).duration === "number",
    )
  );
}

/** Reads user-saved workouts from localStorage (empty on any failure). */
export function loadWorkouts(): Workout[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidWorkout).map((w) => ({ ...w, preset: false }));
  } catch {
    return [];
  }
}

/** Persists the full list of user workouts. */
export function saveWorkouts(workouts: Workout[]): void {
  try {
    const toStore = workouts.filter((w) => !w.preset);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Storage unavailable / quota exceeded — silently ignore.
  }
}
