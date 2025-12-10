import { Suspense, type JSX } from 'react';
import { EarningsSection } from '@root/src/components/profile/rewards/earnings/earnings-section';
import { RewardsSkeleton } from '@root/src/components/profile/rewards/skeleton';
import { WalletSection } from '@root/src/components/profile/rewards/wallet/wallet-section';

function Page(): JSX.Element {
  return (
    <div className="flex max-w-125 flex-col gap-12">
      <h1 className="text-[56px]/17 font-bold text-black">
        My <span className="bg-pink-primary text-background">Rewards</span>
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
