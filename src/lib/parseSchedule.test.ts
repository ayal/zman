import { describe, it, expect } from "vitest";
import { parseSchedule, DEFAULT_SCHEDULE } from "./parseSchedule";

describe("parseSchedule", () => {
  it("parses the default HIIT schedule", () => {
    const result = parseSchedule(DEFAULT_SCHEDULE);

    expect(result[0]).toEqual({ label: "Get Ready", duration: 10 });
    // 1 warmup + 3×(3 exercises + 3 rests) + 3 exercises + 2 rests = 24
    expect(result).toHaveLength(24);
    expect(result[1]).toEqual({ label: "Push-ups", duration: 30 });
    expect(result[2]).toEqual({ label: "Rest", duration: 10 });
    expect(result[3]).toEqual({ label: "Superman", duration: 30 });
    expect(result[5]).toEqual({ label: "Sit-ups", duration: 30 });
    // Round 2 starts at index 7
    expect(result[7]).toEqual({ label: "Push-ups", duration: 30 });
    // Finishers
    expect(result[result.length - 1]).toEqual({ label: "Tricep Dips", duration: 30 });
  });

  it("parses a simple single-section schedule", () => {
    const result = parseSchedule("1,Timer,60");

    expect(result).toEqual([{ label: "Timer", duration: 60 }]);
  });

  it("handles multiple cycles with alternating labels/times", () => {
    const result = parseSchedule("3,Work/Rest,20/10");

    expect(result).toHaveLength(6);
    expect(result[0]).toEqual({ label: "Work", duration: 20 });
    expect(result[1]).toEqual({ label: "Rest", duration: 10 });
    expect(result[4]).toEqual({ label: "Work", duration: 20 });
    expect(result[5]).toEqual({ label: "Rest", duration: 10 });
  });

  it("handles multiple sections separated by pipes", () => {
    const result = parseSchedule("1,Warm up,30|2,Work/Rest,45/15|1,Cool down,60");

    expect(result).toHaveLength(1 + 4 + 1);
    expect(result[0]).toEqual({ label: "Warm up", duration: 30 });
    expect(result[1]).toEqual({ label: "Work", duration: 45 });
    expect(result[2]).toEqual({ label: "Rest", duration: 15 });
    expect(result[3]).toEqual({ label: "Work", duration: 45 });
    expect(result[4]).toEqual({ label: "Rest", duration: 15 });
    expect(result[5]).toEqual({ label: "Cool down", duration: 60 });
  });

  it("returns empty array for empty string", () => {
    expect(parseSchedule("")).toEqual([]);
  });

  it("skips sections with invalid repeat count", () => {
    expect(parseSchedule("0,Work,30")).toEqual([]);
    expect(parseSchedule("-1,Work,30")).toEqual([]);
    expect(parseSchedule("abc,Work,30")).toEqual([]);
  });

  it("skips sections with too few parts", () => {
    expect(parseSchedule("1,Work")).toEqual([]);
  });

  it("skips segments with non-positive durations", () => {
    expect(parseSchedule("1,Work,0")).toEqual([]);
    expect(parseSchedule("1,Work,-5")).toEqual([]);
  });

  it("handles tabata format", () => {
    const result = parseSchedule("1,Get ready,5|8,Work/Rest,20/10");

    expect(result).toHaveLength(17); // 1 + 16
    expect(result[0]).toEqual({ label: "Get ready", duration: 5 });

    for (let i = 1; i < 17; i += 2) {
      expect(result[i]).toEqual({ label: "Work", duration: 20 });
      expect(result[i + 1]).toEqual({ label: "Rest", duration: 10 });
    }
  });
});
