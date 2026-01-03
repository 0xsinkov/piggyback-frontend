'use client';

import type { JSX } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { AvailableQuestDto } from '@root/src/types/quest.types';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Icons } from '../../icons';
import { getAccessToken } from '@root/src/utils/token-storage.utils';
import toast from 'react-hot-toast';

export function QuestCard({
  quest,
}: {
  quest: AvailableQuestDto;
}): JSX.Element {
  const router = useRouter();

  const handleCardClick = (): void => {
    const token = getAccessToken();

    if (token) {
      router.push(`${PUBLIC_PAGES_URLS.QUESTS}/${quest.id}`);
    } else {
      toast.error('You need to be logged in to view quest details');
    }
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl"
      onClick={handleCardClick}
    >
      <CardHeader className="relative h-35 space-y-0 overflow-hidden rounded-t-2xl p-0">
        <Image
          src="/shared/card-header.webp"
          alt="quest"
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="relative flex flex-col gap-6 pt-12">
        <div className="absolute -top-10 right-6 left-6 flex justify-center">
          <div className="border-background relative size-20 overflow-hidden rounded-full border-4 shadow-lg">
            <Image
              src="/shared/card-secondary.webp"
              alt="quest"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <p className="text-center text-base font-semibold">{quest.title}</p>
        <p className="text-lg leading-snug font-bold">{quest.description}</p>
        <div className="flex gap-3">
          <Badge>{quest.tokenSymbol}</Badge>
          <Badge className="gap-2">
            <Icons.Relume /> {quest.rewardAmount / 10 ** quest.tokenDecimals}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
