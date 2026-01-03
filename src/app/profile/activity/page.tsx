import { Suspense, type JSX } from 'react';
import { TransactionsSkeleton } from '@root/src/components/profile/activity/skeleton';
import { TransactionsSection } from '@root/src/components/profile/activity/transactions-section';

function Page(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-5xl font-bold text-black md:text-6xl">
        My{' '}
        <span className="bg-pink-primary text-background rounded-lg px-4 py-1">
          Activity
        </span>
      </h1>
      <Suspense fallback={<TransactionsSkeleton />}>
        <TransactionsSection />
      </Suspense>
    </div>
  );
}

export default Page;
