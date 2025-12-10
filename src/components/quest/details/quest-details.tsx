'use client';

import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { CheckIcon } from 'lucide-react';
import { useQuest } from '@root/src/hooks/quest/use-quest';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Countdown } from '../countdown';
import { QuestActionCard } from '../action-card';
import { QuestDetailsJoin } from './join-action';

export function QuestDetails({ id }: { id: string }): JSX.Element {
  const { data: quest, isLoading } = useQuest(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!quest || !quest.data) {
    notFound();
  }

  return (
    <Card className="mx-auto max-w-156">
      <CardContent className="flex flex-col gap-8 p-4 pt-4 md:p-8 md:pt-8">
        <div className="flex flex-col gap-4">
          <Badge className="ml-auto">
            End Date&nbsp;
            <span className="font-normal">
              {new Date(quest.data.endDate).toLocaleDateString()}
            </span>
          </Badge>
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">{quest.data.title}</p>
            <p>{quest.data.description}</p>
          </div>
        </div>

        <Countdown date={new Date(quest.data.endDate)} />

        {quest.data.isJoined ? (
          <div className="border-success-dark bg-success-light flex items-center justify-center gap-6 rounded-lg border border-dashed p-6">
            <div className="bg-success-dark flex size-10 shrink-0 items-center justify-center rounded-full">
              <CheckIcon className="text-background size-6" />
            </div>
            <p>You have successfully participated in the quest.</p>
          </div>
        ) : (
          <QuestDetailsJoin questId={quest.data.id} />
        )}

        <div className="flex flex-col gap-4">
          <p className="text-[20px]/7 font-bold">Tasks</p>
          <div className="relative flex flex-col gap-4">
            {quest.data.actions.map((a) => (
              <QuestActionCard
                key={a.id}
                action={a}
                tokenDecimals={quest.data?.tokenDecimals ?? 0}
                isQuestDetail
                isCompleted={a.isCompleted}
              />
            ))}
            {!quest.data.isJoined ? (
              <div className="absolute -inset-2 z-10 rounded backdrop-blur" />
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
