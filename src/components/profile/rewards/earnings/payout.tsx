'use client';

import { type JSX } from 'react';
import { Button } from '@root/src/components/ui/button';
import { useWithdrawToken } from '@root/src/hooks/token/use-withdraw-token';
import { PROTECTED_PAGES_URLS } from '@root/src/constants/routes.constants';
import { revalidate } from '@root/src/utils/revalidate.utils';
import { ERROR_MESSAGES } from '@root/src/constants/error.constants';
import { isApiError } from '@root/src/utils/api-error.utils';
import toast from 'react-hot-toast';

export function PayoutButton({
  tokenId,
  amount,
}: {
  tokenId: string;
  amount: number;
}): JSX.Element {
  const { isPending, mutateAsync } = useWithdrawToken();

  const onClick = async (): Promise<void> => {
    try {
      await mutateAsync({
        amount,
        tokenId,
      });
      await revalidate(PROTECTED_PAGES_URLS.PROFILE_REWARDS);
      toast.success('Tokens withdrawn successfully');
    } catch (err) {
      toast.error(isApiError(err) ? err.message : ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  return (
    <div className="ml-auto flex flex-col items-center gap-2">
      <Button
        disabled={isPending}
        variant="secondary"
        className="w-min"
        onClick={onClick}
      >
        Payout
      </Button>
    </div>
  );
}
