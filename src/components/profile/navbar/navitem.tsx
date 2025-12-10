'use client';

import Link from 'next/link';
import type { JSX } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@root/src/utils/tailwind.utils';

export function ProfileLayoutNavItem({
  href,
  icon,
  label,
}: {
  icon: JSX.Element;
  label: string;
  href: string;
}): JSX.Element {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div
      className={cn('flex items-center gap-3 p-2 text-black', {
        'text-pink-primary': isActive,
      })}
    >
      {icon}
      <Link
        className={cn({
          'font-semibold': isActive,
        })}
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
