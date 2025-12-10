'use client';

import { type JSX } from 'react';
import { Button } from '@root/src/components/ui/button';
import { useClaimReward } from '@root/src/hooks/earnings/use-claim-reward';
import { ERROR_MESSAGES } from '@root/src/constants/error.constants';
import { isApiError } from '@root/src/utils/api-error.utils';
import toast from 'react-hot-toast';
import { revalidate } from '@root/src/utils/revalidate.utils';
import { PROTECTED_PAGES_URLS } from '@root/src/constants/routes.constants';

export function RewardClaimButton({
  rewardId,
}: {
  rewardId: string;
}): JSX.Element {
  const { isPending, mutateAsync } = useClaimReward();

  const onClick = async (): Promise<void> => {
    try {
      await mutateAsync({ rewardId });
      await revalidate(PROTECTED_PAGES_URLS.PROFILE_REWARDS);
      toast.success('Reward claimed successfully');
    } catch (err) {
      toast.error(isApiError(err) ? err.message : ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  return (
    <div className="ml-auto flex flex-col items-center gap-2">
      <Button
        variant="secondary"
        className="w-min"
        disabled={isPending}
        onClick={onClick}
      >
        Claim
      </Button>
    </div>
  );
}
