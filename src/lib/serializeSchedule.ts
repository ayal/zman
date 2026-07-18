import type { TimerSegment } from "@/types";

/**
 * Serializes a flat list of segments back into a schedule string usable as
 * the `?set=` URL param. Each segment becomes its own single-cycle section
 * (`1,label,duration`), which round-trips through {@link parseSchedule}.
 */
export function serializeSchedule(segments: TimerSegment[]): string {
  return segments
    .filter((s) => s.duration > 0)
    .map((s) => `1,${s.label},${s.duration}`)
    .join("|");
}

/** Builds a shareable URL for the given segments. */
export function buildShareUrl(segments: TimerSegment[]): string {
  const url = new URL(window.location.href);
  url.searchParams.set("set", serializeSchedule(segments));
  return url.toString();
}
