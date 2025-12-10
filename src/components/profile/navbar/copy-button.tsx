'use client';

import type { JSX } from 'react';
import { CopyIcon } from 'lucide-react';
import { Button } from '../../ui/button';

export function CopyIdButton({ id }: { id: string }): JSX.Element {
  return (
    <Button
      variant="ghost"
      className="absolute top-3 right-2 size-6 border-none p-0"
      onClick={() => navigator.clipboard.writeText(id)}
    >
      <CopyIcon className="stroke-purple-dark size-6" />
    </Button>
  );
}
