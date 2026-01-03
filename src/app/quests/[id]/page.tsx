import { redirect } from 'next/navigation';
import { Suspense, type JSX } from 'react';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import { QuestDetails } from '@root/src/components/quest/details/quest-details';
import { QuestDetailsSkeleton } from '@root/src/components/quest/details/skeleton';

async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;

  if (!id) {
    redirect(PUBLIC_PAGES_URLS.QUESTS);
  }

  return (
    <div className="flex w-full flex-col gap-16">
      <div className="relative bg-[url(/shared/quest-detail.png)] bg-cover bg-center">
        <div className="bg-pink-primary/60 absolute inset-0"></div>
        <h1 className="relative z-10 py-24 text-center text-5xl font-bold text-black md:text-6xl">
          <span className="bg-purple-dark text-background rounded-lg px-4 py-1">
            Quest
          </span>{' '}
          Detail
        </h1>
      </div>
      <div className="px-4 pb-16 md:px-16">
        <Suspense fallback={<QuestDetailsSkeleton />}>
          <QuestDetails id={id} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
