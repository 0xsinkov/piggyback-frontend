import * as React from 'react';
import { cn } from '@src/utils/tailwind.utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="border-purple-light placeholder:text-neutral-dark">
        <input
          type={type}
          className={cn(
            'border-purple-light placeholder:text-neutral-dark focus-visible:ring-ring bg-background flex h-12 w-full rounded-md border px-3 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
