import { Suspense, type JSX } from 'react';
import { AvailableQuestsList } from '@root/src/components/quest/available/quests-list';
import { AvailableQuestsListSkeleton } from '@root/src/components/quest/available/skeleton';

function Page(): JSX.Element {
  return (
    <div className="flex w-full flex-col gap-16">
      <div className="relative bg-[url(/shared/explore-quests.png)] bg-cover bg-center">
        <div className="bg-pink-primary/60 absolute inset-0" />
        <h1 className="relative z-10 py-24 text-center text-5xl font-bold text-black md:text-6xl">
          Explore{' '}
          <span className="bg-purple-dark text-background rounded-lg px-4 py-1">
            Quests
          </span>
        </h1>
      </div>
      <div className="px-4 pb-16 md:px-16">
        <Suspense fallback={<AvailableQuestsListSkeleton />}>
          <AvailableQuestsList />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
