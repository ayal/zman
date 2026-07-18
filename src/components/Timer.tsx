type TimerProps = {
  remaining: number;
};

export function Timer({ remaining }: TimerProps) {
  const display = Math.ceil(remaining);

  return (
    <div className="flex items-center justify-center font-mono text-[min(10rem,25vw)] font-bold leading-none tracking-tight tabular-nums text-white">
      {display}
    </div>
  );
}
