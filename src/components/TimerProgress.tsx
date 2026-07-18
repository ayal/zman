import { Progress } from "./ui/progress";
import type { TimerSegment } from "@/types";

type TimerProgressProps = {
  progress: number;
  currentStep: number;
  totalSteps: number;
  nextSegment: TimerSegment | null;
  onSkip: () => void;
};

export function TimerProgress({ progress, currentStep, totalSteps, nextSegment, onSkip }: TimerProgressProps) {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-3">
      <div className="flex w-full items-center gap-3">
        <Progress value={progress} className="flex-1" />
        <span className="shrink-0 text-xs tabular-nums text-zinc-500">
          {currentStep}/{totalSteps}
        </span>
      </div>
      {nextSegment ? (
        <button
          onClick={onSkip}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-zinc-800/60 px-4 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700/80 hover:text-zinc-200 active:scale-95"
        >
          Next: {nextSegment.label} / {nextSegment.duration}s
          <span className="text-xs">▸</span>
        </button>
      ) : (
        <div className="h-5" />
      )}
    </div>
  );
}
