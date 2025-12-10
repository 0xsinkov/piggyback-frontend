'use client';

import type { JSX } from 'react';
import { useQuests } from '@root/src/hooks/quest/use-quests';
import { QuestCard } from './quest-card';

export function AvailableQuestsList(): JSX.Element {
  const { data: quests, isLoading } = useQuests();

  if (isLoading) {
    return <div className="col-span-4 text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {!quests?.data?.length ? (
        <p className="col-span-4 text-center">No quests found</p>
      ) : null}
      {quests?.data
        ?.filter((q) => q.isPaid)
        .map((q) => <QuestCard key={q.id} quest={q} />)}
    </div>
  );
}
