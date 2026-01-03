import { Suspense, type JSX } from 'react';
import { AccountSettings } from '@root/src/components/profile/settings/account-settings';
import { AccountSettingSkeleton } from '@root/src/components/profile/settings/skeleton';

function Page(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-5xl font-bold text-black md:text-6xl">
        <span className="bg-pink-primary text-background rounded-lg px-4 py-1">
          Account
        </span>{' '}
        Settings
      </h1>
      <Suspense fallback={<AccountSettingSkeleton />}>
        <AccountSettings />
      </Suspense>
    </div>
  );
}

export default Page;
