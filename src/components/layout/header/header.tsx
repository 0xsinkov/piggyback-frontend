'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import { HEADER_NAV_ITEMS } from '@root/src/constants/layout.constants';
import { ConnectTwitterButton } from '../../auth/connect-twitter-button';
import { HeaderProfileMenu } from './profile-menu';
import { HeaderMobileMenu } from './mobile-menu';
import { useProfile } from '@root/src/hooks/user/use-profile';
import { ConnectWallet } from '@root/src/components/profile/navbar/connect-wallet';
import { getAccessToken } from '@root/src/utils/token-storage.utils';

export function Header(): JSX.Element {
  const { data: profile } = useProfile();
  const hasSession = Boolean(getAccessToken());

  return (
    <header className="bg-background w-full border-b-2 border-black">
      <div className="mx-auto flex h-19.5 w-full items-center justify-between px-4 md:px-16">
        <Link href={PUBLIC_PAGES_URLS.HOME}>
          <Image alt="logo" src="/shared/logo.svg" width={100} height={40} />
        </Link>

        <nav className="hidden gap-8 md:flex">
          {HEADER_NAV_ITEMS.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex gap-4">
            {hasSession ? <ConnectWallet /> : null}
          </div>
          {hasSession ? (
            <HeaderProfileMenu profile={profile?.data} />
          ) : (
            <ConnectTwitterButton />
          )}
        </div>

        <HeaderMobileMenu session={hasSession} profile={profile?.data} />
      </div>
    </header>
  );
}
