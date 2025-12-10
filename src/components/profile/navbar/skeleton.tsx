import type { JSX } from 'react';
import { Skeleton } from '../../ui/skeleton';

export function ProfileNavbarSkeleton(): JSX.Element {
  return <Skeleton className="h-185 w-78" />;
}
