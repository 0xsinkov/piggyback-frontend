'use client';

import { useEffect, useState, type JSX } from 'react';
import { calculateTimeLeft, type TimeLeft } from '@root/src/utils/date.utils';

export function Countdown({ date }: { date: Date }): JSX.Element {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(date));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(date);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days <= 0 &&
        newTimeLeft.hours <= 0 &&
        newTimeLeft.minutes <= 0 &&
        newTimeLeft.seconds <= 0
      ) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, date]);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <TimePart value={timeLeft.days} label="Days" />
      <TimePart value={timeLeft.hours} label="Hours" />
      <TimePart value={timeLeft.minutes} label="Min" />
      <TimePart value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

function TimePart({
  value,
  label,
}: {
  value: number;
  label: string;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-purple-dark w-24.5 rounded-lg p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <p className="text-background text-center text-[40px]/12 font-bold">
          {value}
        </p>
      </div>
      <p className="text-center">{label}</p>
    </div>
  );
}
