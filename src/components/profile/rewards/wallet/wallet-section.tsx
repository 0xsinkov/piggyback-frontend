'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type JSX } from 'react';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import { useProfile } from '@root/src/hooks/user/use-profile';
import { WalletForm } from './wallet-form';

export function WalletSection(): JSX.Element {
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

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-black">Wallet Informations</h2>
      <WalletForm profile={profile.data} />
    </div>
  );
}
