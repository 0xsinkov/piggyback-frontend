import { Suspense, type JSX } from 'react';
import { AvailableQuestsList } from '@root/src/components/quest/available/quests-list';
import { AvailableQuestsListSkeleton } from '@root/src/components/quest/available/skeleton';

function Page(): JSX.Element {
  return (
    <div className="flex w-full flex-col gap-15">
      <div className="relative bg-[url(/shared/explore-quests.png)] bg-cover bg-center">
        <div className="bg-pink-primary/60 absolute inset-0"></div>
        <h1 className="relative z-10 py-[110px] text-center text-[56px]/17 font-bold text-black">
          Explore <span className="bg-purple-dark text-background">Quests</span>
        </h1>
      </div>
      <div className="px-4 md:px-16">
        <Suspense fallback={<AvailableQuestsListSkeleton />}>
          <AvailableQuestsList />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
