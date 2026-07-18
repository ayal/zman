import { useState } from "react";
import { useTimerSet } from "@/hooks/useTimerSet";
import { useWakeLock } from "@/hooks/useWakeLock";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Timer } from "@/components/Timer";
import { TimerControls } from "@/components/TimerControls";
import { TimerProgress } from "@/components/TimerProgress";
import { WorkoutLibrary } from "@/components/WorkoutLibrary";
import { WorkoutEditor } from "@/components/WorkoutEditor";
import { parseSchedule } from "@/lib/parseSchedule";
import { PRESETS, newId } from "@/lib/workoutStore";
import { List, RotateCcw } from "lucide-react";
import type { Workout } from "@/types";

type View = "timer" | "library" | "editor";

function getInitialWorkout(): Workout {
  const params = new URLSearchParams(window.location.search);
  const set = params.get("set");
  if (set) {
    const segments = parseSchedule(set);
    if (segments.length > 0) {
      return { id: "url-custom", name: "Custom Workout", segments, preset: true };
    }
  }
  return PRESETS[0]!;
}

export default function App() {
  const { presets, saved, upsert, remove } = useWorkouts();

  const [active, setActive] = useState<Workout>(() => getInitialWorkout());
  const [view, setView] = useState<View>("timer");
  const [editorTarget, setEditorTarget] = useState<Workout | null>(null);

  const timerSet = useTimerSet(active.segments);
  useWakeLock(timerSet?.isRunning ?? false);

  function startWorkout(workout: Workout) {
    setActive(workout);
    setView("timer");
  }

  function editWorkout(workout: Workout) {
    setEditorTarget(workout);
    setView("editor");
  }

  function duplicateWorkout(workout: Workout) {
    const copy: Workout = {
      id: newId(),
      name: `${workout.name} (copy)`,
      segments: workout.segments.map((s) => ({ ...s })),
      preset: false,
    };
    upsert(copy);
  }

  // Editor callbacks. A preset being edited becomes a new saved workout.
  function handleEditorSave(workout: Workout, start: boolean) {
    const target = editorTarget;
    const persisted: Workout =
      target && !target.preset
        ? workout
        : { ...workout, id: newId(), preset: false };
    upsert(persisted);
    if (start) startWorkout(persisted);
    else {
      setEditorTarget(null);
      setView("library");
    }
  }

  if (view === "library") {
    return (
      <WorkoutLibrary
        presets={presets}
        saved={saved}
        activeId={active.id}
        onStart={startWorkout}
        onEdit={editWorkout}
        onDuplicate={duplicateWorkout}
        onDelete={remove}
        onNew={() => {
          setEditorTarget(null);
          setView("editor");
        }}
        onClose={() => setView("timer")}
      />
    );
  }

  if (view === "editor") {
    return (
      <WorkoutEditor
        workout={editorTarget}
        onSave={(w) => handleEditorSave(w, false)}
        onStart={(w) => handleEditorSave(w, true)}
        onCancel={() => {
          setEditorTarget(null);
          setView(saved.length > 0 || editorTarget ? "library" : "timer");
        }}
      />
    );
  }

  if (!timerSet) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-black text-white">
        <p className="text-lg text-zinc-400">This workout is empty.</p>
        <button
          onClick={() => setView("library")}
          className="rounded-full bg-rose-500 px-5 py-2 text-sm font-medium hover:bg-rose-400"
        >
          Choose a workout
        </button>
      </div>
    );
  }

  const {
    segments,
    currentIndex,
    currentSegment,
    nextSegment,
    remaining,
    isRunning,
    progress,
    togglePlayPause,
    skipToNext,
    restart,
  } = timerSet;

  const finished = currentIndex === segments.length - 1 && remaining <= 0 && !isRunning;

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center gap-2 bg-black px-6 text-white select-none">
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setView("library")}
          aria-label="Workouts"
          className="flex items-center gap-2 rounded-full bg-zinc-900/70 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white active:scale-95"
        >
          <List className="h-4 w-4" />
          <span className="max-w-[45vw] truncate">{active.name}</span>
        </button>
        <button
          onClick={restart}
          aria-label="Restart workout"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/70 text-zinc-400 hover:bg-zinc-800 hover:text-white active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="text-2xl font-light capitalize tracking-wide text-zinc-300">
        {finished ? "Done! 🎉" : currentSegment.label}
      </div>

      <Timer remaining={remaining} />

      <TimerProgress
        progress={progress}
        currentStep={currentIndex + 1}
        totalSteps={segments.length}
        nextSegment={nextSegment}
        onSkip={skipToNext}
      />

      <TimerControls isRunning={isRunning} onToggle={togglePlayPause} />
    </div>
  );
}
