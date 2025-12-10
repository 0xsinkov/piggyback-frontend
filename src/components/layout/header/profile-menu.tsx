'use client';

import { useState, type JSX } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { PROTECTED_PAGES_URLS } from '@root/src/constants/routes.constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { ProfileDto } from '@root/src/types/user.types';
import Image from 'next/image';

const MENU_ITEMS = [
  {
    href: PROTECTED_PAGES_URLS.PROFILE_REWARDS,
    label: 'Profile',
  },
  {
    href: PROTECTED_PAGES_URLS.DISCONNECT,
    label: 'Disconnect',
  },
];

export function HeaderProfileMenu({
  profile,
}: {
  profile: ProfileDto | undefined;
}): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="mt-auto cursor-pointer focus:outline-none">
        <div className="flex items-center gap-2">
          <div className="relative size-12 overflow-hidden rounded-full">
            <Image
              src={
                profile?.profilePictureUrl ?? '/shared/profile-placeholder.webp'
              }
              alt="Profile picture"
              fill
              className="object-cover"
            />
            <div className="bg-pink-primary border-background absolute top-0 right-0 size-3.5 rounded-full border-4" />
          </div>
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-medium">
              {profile?.username ?? 'Username'}
            </p>
            <ChevronDownIcon className="size-6 stroke-black transition-transform data-[state=open]:rotate-90" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-4" sideOffset={10}>
        {MENU_ITEMS.map((i) => (
          <DropdownMenuItem key={i.href}>
            <Link href={i.href} onClick={() => setOpen(false)}>
              {i.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
