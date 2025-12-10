'use client';

import { useState, type JSX } from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { useJoinQuest } from '@root/src/hooks/quest/use-join-quest';
import { revalidate } from '@root/src/utils/revalidate.utils';
import { isApiError } from '@root/src/utils/api-error.utils';
import { ERROR_MESSAGES } from '@root/src/constants/error.constants';
import { Button } from '../../ui/button';

export function QuestDetailsJoin({
  questId,
}: {
  questId: string;
}): JSX.Element {
  const pathname = usePathname();
  const { isPending, mutateAsync } = useJoinQuest(questId);
  const [error, setError] = useState<string>();

  const onJoinClick = async (): Promise<void> => {
    setError(undefined);
    try {
      await mutateAsync({ questId });

      await revalidate(pathname);
    } catch (err) {
      toast.error(isApiError(err) ? err.message : ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button className="w-min" disabled={isPending} onClick={onJoinClick}>
        Join Quest
      </Button>
      {error ? (
        <p className="text-desctructive text-center text-sm">{error}</p>
      ) : null}
    </div>
  );
}
