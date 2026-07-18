export type TimerSegment = {
  label: string;
  duration: number;
};

export type TimerState = "idle" | "running" | "paused" | "finished";

/** A saved, named collection of timer segments. */
export type Workout = {
  id: string;
  name: string;
  segments: TimerSegment[];
  /** True for read-only built-in workouts that can't be deleted. */
  preset?: boolean;
};
