import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";

type TimerControlsProps = {
  isRunning: boolean;
  onToggle: () => void;
  className?: string;
};

export function TimerControls({ isRunning, onToggle, className }: TimerControlsProps) {
  const Icon = isRunning ? Pause : Play;

  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-full",
        "bg-rose-500 text-white shadow-lg",
        "transition-transform active:scale-95",
        "hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className,
      )}
      aria-label={isRunning ? "Pause timer" : "Start timer"}
    >
      <Icon className={cn("h-7 w-7", !isRunning && "ml-0.5")} />
    </button>
  );
}
