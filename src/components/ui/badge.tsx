import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@src/utils/tailwind.utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring border',
  {
    variants: {
      variant: {
        default: 'bg-mint-light text-black border-black',
        secondary: 'border-black bg-purple-light text-black',
        destructive: 'border-red-500 bg-red-500 text-white',
        outline: 'border-black bg-transparent text-black',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
