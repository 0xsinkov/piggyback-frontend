import * as React from 'react';

import { cn } from '@src/utils/tailwind.utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'bg-background border-neutral-border placeholder:text-neutral-dark focus-visible:ring-purple-dark focus-visible:border-purple-dark flex min-h-[80px] w-full rounded-xl border-2 px-4 py-3 text-base transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
