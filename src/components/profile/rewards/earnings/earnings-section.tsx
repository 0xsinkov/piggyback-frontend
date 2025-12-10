'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type JSX } from 'react';
import { Progress } from '@root/src/components/ui/progress';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import type { TokenBalanceDto } from '@root/src/types/token.types';
import { useTokenBalances } from '@root/src/hooks/token/use-token-balances';
import { useClaimableRewards } from '@root/src/hooks/earnings/use-claimable-rewards';
import { PayoutButton } from './payout';
import { ClaimableRewardDto } from '@root/src/types/earnings.types';
import { RewardClaimButton } from '@root/src/components/profile/rewards/earnings/claim-button';

export function EarningsSection(): JSX.Element {
  const router = useRouter();
  const { data: balances, isLoading: balancesLoading } = useTokenBalances();
  const { data: rewards, isLoading: rewardsLoading } = useClaimableRewards();

  const isLoading = balancesLoading || rewardsLoading;

  useEffect(() => {
    if (
      !isLoading &&
      (!balances || !balances.data || !rewards || !rewards.data)
    ) {
      router.push(PUBLIC_PAGES_URLS.HOME);
    }
  }, [balances, rewards, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!balances || !balances.data || !rewards || !rewards.data) {
    return <div />;
  }

  const rewardsData = rewards.data;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-black">My Tokens</h2>
      {balances.data.map((b) => (
        <BalanceItem key={b.tokenId} balance={b} />
      ))}

      <h2 className="text-2xl font-bold text-black">My Rewards</h2>
      {rewardsData.map((r) => (
        <RewardItem key={r.questActionId} reward={r} />
      ))}
    </div>
  );
}

function BalanceItem({ balance }: { balance: TokenBalanceDto }): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>{balance.symbol}</p>
          <p>
            <span className="text-pink-primary font-medium">
              {balance.balance / 10 ** balance.tokenDecimals}
            </span>
          </p>
        </div>
        <Progress
          value={
            balance.balance
              ? Math.min((balance.balance * 100) / balance.balance, 100)
              : 0
          }
        />
        <p className="text-sm text-black">
          Minimum payout amount:{' '}
          <span className="font-semibold">
            {balance.minWithdrawAmount / 10 ** balance.tokenDecimals}{' '}
            {balance.symbol}
          </span>
        </p>
      </div>
      {balance.balance > 0 ? (
        <PayoutButton tokenId={balance.tokenId} amount={balance.balance} />
      ) : null}
    </div>
  );
}

function RewardItem({ reward }: { reward: ClaimableRewardDto }): JSX.Element {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black">{reward.questTitle}</h1>
        <p>
          {reward.amount / 10 ** reward.tokenDecimals} {reward.tokenSymbol}
        </p>
      </div>
      <RewardClaimButton rewardId={reward.id} />
    </div>
  );
}
