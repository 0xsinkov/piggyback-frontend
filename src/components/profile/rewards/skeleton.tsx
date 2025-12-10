import type { JSX } from 'react';
import { Skeleton } from '../../ui/skeleton';

export function RewardsSkeleton(): JSX.Element {
  return <Skeleton className="h-56 w-full" />;
}
