import { Suspense, type JSX } from 'react';
import { EarningsSection } from '@root/src/components/profile/rewards/earnings/earnings-section';
import { RewardsSkeleton } from '@root/src/components/profile/rewards/skeleton';
import { WalletSection } from '@root/src/components/profile/rewards/wallet/wallet-section';

function Page(): JSX.Element {
  return (
    <div className="flex max-w-125 flex-col gap-12">
      <h1 className="text-5xl font-bold text-black md:text-6xl">
        My{' '}
        <span className="bg-pink-primary text-background rounded-lg px-4 py-1">
          Rewards
        </span>
      </h1>
      <Suspense fallback={<RewardsSkeleton />}>
        <EarningsSection />
      </Suspense>
      <Suspense fallback={<RewardsSkeleton />}>
        <WalletSection />
      </Suspense>
    </div>
  );
}

export default Page;
