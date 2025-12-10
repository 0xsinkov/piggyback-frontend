import type { JSX } from 'react';

export function StepsProgress({
  steps,
  current,
}: {
  steps: number;
  current: number;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {Array.from({ length: current }).map((_, idx) => (
          <div
            key={`completed-${idx}`}
            className="bg-pink-primary h-1 flex-1 border-b border-black"
          />
        ))}
        {Array.from({ length: steps - current }).map((_, idx) => (
          <div
            key={`future-${idx}`}
            className="bg-neutral h-1 flex-1 border-b border-black"
          />
        ))}
      </div>
      <p className="text-sm text-black">
        Step <span className="font-semibold">{current}</span>/{steps}
      </p>
    </div>
  );
}
