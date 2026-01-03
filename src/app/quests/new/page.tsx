'use client';

import { type JSX } from 'react';
import { useTokens } from '@root/src/hooks/token/use-tokens';
import { CreateQuestForm } from '@root/src/components/quest/create/create-quest-form';

function Page(): JSX.Element {
  const { data: tokens, isLoading } = useTokens();

  return (
    <div className="flex w-full flex-col gap-16">
      <div className="relative bg-[url(/shared/create-quest.png)] bg-cover bg-center">
        <div className="bg-pink-primary/60 absolute inset-0" />
        <h1 className="relative z-10 py-24 text-center text-5xl font-bold text-black md:text-6xl">
          Create a{' '}
          <span className="bg-purple-dark text-background rounded-lg px-4 py-1">
            Quest
          </span>
        </h1>
      </div>
      <div className="px-4 pb-16 md:px-16">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CreateQuestForm tokens={tokens?.data ?? []} />
        )}
      </div>
    </div>
  );
}

export default Page;
