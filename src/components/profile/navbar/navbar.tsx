'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type JSX } from 'react';
import { PlusIcon, SettingsIcon, TrendingUpIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import {
  PROTECTED_PAGES_URLS,
  PUBLIC_PAGES_URLS,
} from '@root/src/constants/routes.constants';
import { useProfile } from '@root/src/hooks/user/use-profile';
import { useTokenBalances } from '@root/src/hooks/token/use-token-balances';
import type { TokenBalanceDto } from '@root/src/types/token.types';
import { Input } from '../../ui/input';
import { Card, CardContent } from '../../ui/card';
import { Icons } from '../../icons';
import { Progress } from '../../ui/progress';
import { ProfileLayoutNavItem } from './navitem';
import { ConnectWallet } from './connect-wallet';
import { CopyIdButton } from './copy-button';

export function ProfileNavbar(): JSX.Element {
  const router = useRouter();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: balances, isLoading: balancesLoading } = useTokenBalances();

  const isLoading = profileLoading || balancesLoading;

  useEffect(() => {
    if (
      !isLoading &&
      (!profile || !profile.data || !balances || !balances.data)
    ) {
      router.push(PUBLIC_PAGES_URLS.HOME);
    }
  }, [profile, balances, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile || !profile.data || !balances || !balances.data) {
    return <div />;
  }

  return (
    <Card className="hidden w-78 shrink-0 md:block">
      <CardContent className="flex flex-col gap-6 p-4 pt-8">
        <div className="flex items-center gap-3">
          <div className="relative size-10 overflow-hidden rounded-full">
            <Image
              src={
                profile.data.profilePictureUrl ??
                '/shared/profile-placeholder.webp'
              }
              alt="Profile image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{profile.data.username}</p>
            <p className="text-sm">{profile.data.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm">Username</p>
          <div className="relative h-fit w-full">
            <Input
              disabled
              value={profile.data.username ?? undefined}
              placeholder="Username"
              className="pr-10"
            />
            <UserIcon className="stroke-purple-dark absolute top-3 right-2 size-6" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm">My Account Id</p>
          <div className="relative h-fit w-full">
            <Input disabled value={profile.data.id} className="pr-10" />
            <CopyIdButton id={profile.data.id} />
          </div>
        </div>

        {balances.data.length ? (
          <div className="flex flex-col gap-3">
            {balances.data.map((b) => (
              <BalanceItem key={b.tokenId} balance={b} />
            ))}
          </div>
        ) : null}

        <ConnectWallet />

        <div className="flex flex-col">
          <p className="p-2 font-semibold text-black">Dashboard</p>
          <ProfileLayoutNavItem
            href={PROTECTED_PAGES_URLS.CREATE_QUEST}
            label="Create Quest"
            icon={<PlusIcon className="size-6" />}
          />
          <ProfileLayoutNavItem
            href={PROTECTED_PAGES_URLS.PROFILE_REWARDS}
            label="My Rewards"
            icon={<Icons.Rewards />}
          />
          <ProfileLayoutNavItem
            href={PROTECTED_PAGES_URLS.PROFILE_ACTIVITY}
            label="My Activity"
            icon={<TrendingUpIcon className="size-6" />}
          />
        </div>

        <div className="flex flex-col">
          <p className="p-2 font-semibold text-black">Settings</p>
          <ProfileLayoutNavItem
            href={PROTECTED_PAGES_URLS.PROFILE}
            label="Settings"
            icon={<SettingsIcon className="size-6" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function BalanceItem({ balance }: { balance: TokenBalanceDto }): JSX.Element {
  return (
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
            ? Math.min((balance.balance * 100) / balance.minWithdrawAmount, 100)
            : 0
        }
      />
    </div>
  );
}
