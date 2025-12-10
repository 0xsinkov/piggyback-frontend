'use client';

import { useState, type JSX } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { HEADER_NAV_ITEMS } from '@root/src/constants/layout.constants';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../../ui/sheet';
import { Button } from '../../ui/button';
import { ConnectTwitterButton } from '../../auth/connect-twitter-button';
import { HeaderProfileMenu } from './profile-menu';
import Image from 'next/image';
import { ProfileDto } from '@root/src/types/user.types';
import { ConnectWallet } from '@root/src/components/profile/navbar/connect-wallet';

export function HeaderMobileMenu({
  session,
  profile,
}: {
  session: boolean;
  profile: ProfileDto | undefined;
}): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="md:hidden" size="icon">
          <MenuIcon className="size-6 stroke-black" />
        </Button>
      </SheetTrigger>
      <SheetContent isCloseXHidden onCloseAutoFocus={(e) => e.preventDefault()}>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navigation Menu</SheetDescription>
        <div className="flex h-full flex-col gap-6">
          <div className="flex justify-between">
            <Link href={PUBLIC_PAGES_URLS.HOME} onClick={() => setOpen(false)}>
              <Image alt="logo" src="/shared/logo.svg" width={60} height={40} />
            </Link>
            <Button size="icon" onClick={() => setOpen(false)}>
              <XIcon className="size-6 stroke-black" />
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {HEADER_NAV_ITEMS.map((i) => (
              <Link key={i.href} href={i.href} onClick={() => setOpen(false)}>
                {i.label}
              </Link>
            ))}
          </div>
          {!session ? <ConnectTwitterButton /> : null}
          {session ? <ConnectWallet /> : null}
          {session ? <HeaderProfileMenu profile={profile} /> : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
