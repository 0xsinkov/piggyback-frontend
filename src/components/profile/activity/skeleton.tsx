import type { JSX } from 'react';
import { Skeleton } from '../../ui/skeleton';

export function TransactionsSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-21 w-full" />
      <Skeleton className="h-21 w-full" />
      <Skeleton className="h-21 w-full" />
      <Skeleton className="h-21 w-full" />
      <Skeleton className="h-21 w-full" />
      <Skeleton className="h-21 w-full" />
      <Skeleton className="h-21 w-full" />
    </div>
  );
}
