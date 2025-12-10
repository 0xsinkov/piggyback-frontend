'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type JSX } from 'react';
import { useProfile } from '@root/src/hooks/user/use-profile';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import { SettingsForm } from './setting-form';

export function AccountSettings(): JSX.Element {
  const router = useRouter();
  const { data: profile, isLoading } = useProfile();

  useEffect(() => {
    if (!isLoading && (!profile || !profile.data)) {
      router.push(PUBLIC_PAGES_URLS.HOME);
    }
  }, [profile, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile || !profile.data) {
    return <div />;
  }

  return <SettingsForm profile={profile.data} />;
}
