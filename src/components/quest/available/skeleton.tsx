import type { JSX } from 'react';
import { Skeleton } from '../../ui/skeleton';

export function AvailableQuestsListSkeleton(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, idx) => (
        <Skeleton key={idx} className="h-90" />
      ))}
    </div>
  );
}
