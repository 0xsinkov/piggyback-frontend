import * as React from 'react';

import { cn } from '@src/utils/tailwind.utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'border-purple-light placeholder:text-neutral-dark focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border bg-white p-3 text-base focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
