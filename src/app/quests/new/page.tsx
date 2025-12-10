'use client';

import { type JSX } from 'react';
import { useTokens } from '@root/src/hooks/token/use-tokens';
import { CreateQuestForm } from '@root/src/components/quest/create/create-quest-form';

function Page(): JSX.Element {
  const { data: tokens, isLoading } = useTokens();

  return (
    <div className="flex w-full flex-col gap-15">
      <div className="relative bg-[url(/shared/create-quest.png)] bg-cover bg-center">
        <div className="bg-pink-primary/60 absolute inset-0"></div>
        <h1 className="relative z-10 py-[110px] text-center text-[56px]/17 font-bold text-black">
          Create a <span className="text-background bg-purple-dark">Quest</span>
        </h1>
      </div>
      <div className="px-4 md:px-16">
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
