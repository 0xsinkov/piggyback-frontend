'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type JSX } from 'react';
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
  const [hasSession, setHasSession] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial session
    setHasSession(Boolean(getAccessToken()));

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = () => {
      setHasSession(Boolean(getAccessToken()));
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab updates
    const handleAuthChange = () => {
      setHasSession(Boolean(getAccessToken()));
    };

    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  return (
    <header className="bg-background border-neutral-border w-full border-b">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-4 md:px-16">
        <Link
          href={PUBLIC_PAGES_URLS.HOME}
          className="transition-opacity hover:opacity-80"
        >
          <Image alt="logo" src="/shared/logo.svg" width={100} height={40} />
        </Link>

        <nav className="hidden gap-8 md:flex">
          {HEADER_NAV_ITEMS.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-foreground font-medium transition-opacity hover:opacity-70"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {mounted ? (
            <>
              <div className="flex gap-4">
                {hasSession ? <ConnectWallet /> : null}
              </div>
              {hasSession ? (
                <HeaderProfileMenu profile={profile?.data} />
              ) : (
                <ConnectTwitterButton />
              )}
            </>
          ) : (
            <ConnectTwitterButton />
          )}
        </div>

        <HeaderMobileMenu session={hasSession} profile={profile?.data} />
      </div>
    </header>
  );
}
