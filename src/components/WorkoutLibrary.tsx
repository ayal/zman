import { ArrowLeft, Plus, Pencil, Trash2, Play, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { workoutSummary } from "@/lib/format";
import type { Workout } from "@/types";

type WorkoutLibraryProps = {
  presets: Workout[];
  saved: Workout[];
  activeId: string | null;
  onStart: (workout: Workout) => void;
  onEdit: (workout: Workout) => void;
  onDuplicate: (workout: Workout) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  onClose: () => void;
};

function WorkoutRow({
  workout,
  active,
  onStart,
  onEdit,
  onDuplicate,
  onDelete,
}: {
  workout: Workout;
  active: boolean;
  onStart: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete?: () => void;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-xl border p-2 pl-3",
        active ? "border-rose-500/60 bg-rose-500/5" : "border-zinc-800 bg-zinc-900",
      )}
    >
      <button onClick={onStart} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            active ? "bg-rose-500 text-white" : "bg-zinc-800 text-zinc-300",
          )}
        >
          <Play className="ml-0.5 h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-white">{workout.name}</span>
          <span className="block text-xs text-zinc-500">{workoutSummary(workout.segments)}</span>
        </span>
      </button>

      <button
        onClick={onDuplicate}
        aria-label="Duplicate"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-white"
      >
        <Copy className="h-4 w-4" />
      </button>
      <button
        onClick={onEdit}
        aria-label="Edit"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-white"
      >
        <Pencil className="h-4 w-4" />
      </button>
      {onDelete && (
        <button
          onClick={onDelete}
          aria-label="Delete"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-rose-500/10 hover:text-rose-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </li>
  );
}

export function WorkoutLibrary({
  presets,
  saved,
  activeId,
  onStart,
  onEdit,
  onDuplicate,
  onDelete,
  onNew,
  onClose,
}: WorkoutLibraryProps) {
  return (
    <div className="flex h-dvh flex-col bg-black text-white">
      <header className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <button
          onClick={onClose}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 text-lg font-medium">Workouts</h1>
        <button
          onClick={onNew}
          className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-black hover:bg-white active:scale-95"
        >
          <Plus className="h-4 w-4" /> New
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {saved.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
              My Workouts
            </h2>
            <ul className="flex flex-col gap-2">
              {saved.map((w) => (
                <WorkoutRow
                  key={w.id}
                  workout={w}
                  active={w.id === activeId}
                  onStart={() => onStart(w)}
                  onEdit={() => onEdit(w)}
                  onDuplicate={() => onDuplicate(w)}
                  onDelete={() => onDelete(w.id)}
                />
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Presets
          </h2>
          <ul className="flex flex-col gap-2">
            {presets.map((w) => (
              <WorkoutRow
                key={w.id}
                workout={w}
                active={w.id === activeId}
                onStart={() => onStart(w)}
                onEdit={() => onEdit(w)}
                onDuplicate={() => onDuplicate(w)}
              />
            ))}
          </ul>
          <p className="mt-2 px-1 text-xs text-zinc-600">
            Presets are read-only — edit or duplicate one to make it yours.
          </p>
        </section>
      </div>
    </div>
  );
}
