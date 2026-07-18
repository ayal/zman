import type { TimerSegment } from "@/types";

/** Total duration of a segment list, in seconds. */
export function totalSeconds(segments: TimerSegment[]): number {
  return segments.reduce((sum, s) => sum + (s.duration || 0), 0);
}

/** Formats seconds as `m:ss` (or `h:mm:ss` when over an hour). */
export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/** e.g. "12 exercises · 4:00" — rests are not counted as exercises. */
export function workoutSummary(segments: TimerSegment[]): string {
  const exercises = segments.filter(
    (s) => s.label.trim().toLowerCase() !== "rest",
  ).length;
  const label = exercises === 1 ? "move" : "moves";
  return `${exercises} ${label} · ${formatDuration(totalSeconds(segments))}`;
}
