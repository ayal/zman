import type { TimerSegment } from "@/types";

/**
 * Parses a schedule string into an array of timer segments.
 *
 * Format: sections separated by `|`.
 * Each section: `repeat,labels,times`
 *   - repeat: number of full cycles
 *   - labels: slash-separated names that alternate (e.g. "Work/Rest")
 *   - times: slash-separated durations in seconds that alternate (e.g. "30/10")
 *
 * Example: "1,Get ready,5|9,Work/Rest,30/10"
 *   -> [{ label: "Get ready", duration: 5 }, { label: "Work", duration: 30 }, { label: "Rest", duration: 10 }, ...]
 */
export function parseSchedule(input: string): TimerSegment[] {
  const segments: TimerSegment[] = [];
  const sections = input.split("|");

  for (const section of sections) {
    const parts = section.split(",");
    if (parts.length < 3) continue;

    const repeat = parseInt(parts[0]!, 10);
    if (isNaN(repeat) || repeat <= 0) continue;

    const labels = parts[1]!.split("/");
    const times = parts[2]!.split("/").map((t) => parseInt(t, 10));

    if (labels.length === 0 || times.length === 0) continue;

    const stepsPerCycle = labels.length;
    for (let i = 0; i < repeat * stepsPerCycle; i++) {
      const duration = times[i % times.length]!;
      if (isNaN(duration) || duration <= 0) continue;

      segments.push({
        label: labels[i % labels.length]!,
        duration,
      });
    }
  }

  return segments;
}

export const DEFAULT_SCHEDULE =
  "1,Get Ready,10" +
  "|3,Push-ups/Rest/Superman/Rest/Sit-ups/Rest,30/10/30/10/30/10" +
  "|1,Jumping Jacks/Rest/Plank/Rest/Tricep Dips,30/10/30/10/30";
