import { useMemo, useState } from "react";
import { ArrowLeft, ChevronUp, ChevronDown, Trash2, Plus, Play, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration, totalSeconds } from "@/lib/format";
import { newId } from "@/lib/workoutStore";
import type { TimerSegment, Workout } from "@/types";

type Row = { id: string; label: string; duration: number };

type WorkoutEditorProps = {
  /** Existing workout to edit, or null to create a new one. */
  workout: Workout | null;
  onSave: (workout: Workout) => void;
  onStart: (workout: Workout) => void;
  onCancel: () => void;
};

function toRows(segments: TimerSegment[]): Row[] {
  return segments.map((s) => ({ id: newId(), label: s.label, duration: s.duration }));
}

const DEFAULT_ROWS: Row[] = [
  { id: newId(), label: "Get Ready", duration: 10 },
  { id: newId(), label: "Exercise", duration: 30 },
  { id: newId(), label: "Rest", duration: 10 },
];

function isRest(label: string): boolean {
  return label.trim().toLowerCase() === "rest";
}

export function WorkoutEditor({ workout, onSave, onStart, onCancel }: WorkoutEditorProps) {
  const [name, setName] = useState(workout?.name ?? "");
  const [rows, setRows] = useState<Row[]>(() =>
    workout ? toRows(workout.segments) : DEFAULT_ROWS.map((r) => ({ ...r, id: newId() })),
  );

  const total = useMemo(() => totalSeconds(rows), [rows]);
  const isValid =
    name.trim().length > 0 && rows.length > 0 && rows.every((r) => r.duration > 0 && r.label.trim());

  function updateRow(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function move(id: string, dir: -1 | 1) {
    setRows((prev) => {
      const i = prev.findIndex((r) => r.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j]!, next[i]!];
      return next;
    });
  }

  function addRow(kind: "exercise" | "rest") {
    setRows((prev) => [
      ...prev,
      kind === "rest"
        ? { id: newId(), label: "Rest", duration: 10 }
        : { id: newId(), label: "", duration: 30 },
    ]);
  }

  function buildWorkout(): Workout {
    return {
      id: workout?.id ?? newId(),
      name: name.trim() || "Untitled Workout",
      segments: rows.map((r) => ({ label: r.label.trim() || "Exercise", duration: r.duration })),
      preset: false,
    };
  }

  return (
    <div className="flex h-dvh flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <button
          onClick={onCancel}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 text-lg font-medium">
          {workout ? "Edit workout" : "New workout"}
        </h1>
        <button
          onClick={() => isValid && onSave(buildWorkout())}
          disabled={!isValid}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium",
            isValid
              ? "bg-zinc-100 text-black hover:bg-white active:scale-95"
              : "cursor-not-allowed bg-zinc-800 text-zinc-500",
          )}
        >
          <Save className="h-4 w-4" />
          Save
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workout name"
          className="mb-1 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:border-rose-500 focus:outline-none"
        />
        <p className="mb-4 px-1 text-xs text-zinc-500">
          {rows.length} steps · {formatDuration(total)} total
        </p>

        <ul className="flex flex-col gap-2">
          {rows.map((row, i) => {
            const rest = isRest(row.label);
            return (
              <li
                key={row.id}
                className={cn(
                  "flex items-center gap-2 rounded-xl border p-2",
                  rest ? "border-zinc-800/60 bg-zinc-900/40" : "border-zinc-800 bg-zinc-900",
                )}
              >
                {/* Reorder */}
                <div className="flex flex-col">
                  <button
                    onClick={() => move(row.id, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="flex h-5 w-6 items-center justify-center text-zinc-500 hover:text-white disabled:opacity-25"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => move(row.id, 1)}
                    disabled={i === rows.length - 1}
                    aria-label="Move down"
                    className="flex h-5 w-6 items-center justify-center text-zinc-500 hover:text-white disabled:opacity-25"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Label */}
                <input
                  value={row.label}
                  onChange={(e) => updateRow(row.id, { label: e.target.value })}
                  placeholder="Exercise name"
                  className={cn(
                    "min-w-0 flex-1 rounded-lg bg-transparent px-2 py-2 text-base focus:bg-black/40 focus:outline-none",
                    rest ? "text-zinc-400" : "text-white",
                  )}
                />

                {/* Duration */}
                <div className="flex shrink-0 items-center gap-1 rounded-lg bg-black/40 px-1">
                  <button
                    onClick={() =>
                      updateRow(row.id, { duration: Math.max(1, row.duration - 5) })
                    }
                    aria-label="Decrease seconds"
                    className="flex h-8 w-7 items-center justify-center text-zinc-400 hover:text-white"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={row.duration}
                    onChange={(e) =>
                      updateRow(row.id, { duration: Math.max(0, Math.floor(+e.target.value) || 0) })
                    }
                    className="w-10 bg-transparent text-center text-base tabular-nums text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="pr-1 text-xs text-zinc-500">s</span>
                  <button
                    onClick={() => updateRow(row.id, { duration: row.duration + 5 })}
                    aria-label="Increase seconds"
                    className="flex h-8 w-7 items-center justify-center text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeRow(row.id)}
                  aria-label="Delete step"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-rose-500/10 hover:text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Add buttons */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => addRow("exercise")}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-700 py-3 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" /> Exercise
          </button>
          <button
            onClick={() => addRow("rest")}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-700 py-3 text-sm text-zinc-400 hover:border-zinc-500 hover:text-white active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" /> Rest
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <button
          onClick={() => isValid && onStart(buildWorkout())}
          disabled={!isValid}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-medium",
            isValid
              ? "bg-rose-500 text-white hover:bg-rose-400 active:scale-[0.98]"
              : "cursor-not-allowed bg-zinc-800 text-zinc-500",
          )}
        >
          <Play className="h-5 w-5" /> Save &amp; Start
        </button>
      </footer>
    </div>
  );
}
