'use client';

import Image from 'next/image';
import { useState, type JSX } from 'react';
import {
  type QuestActionDto,
  QuestActionType,
} from '@root/src/types/quest.types';
import { cn } from '@root/src/utils/tailwind.utils';
import { Badge } from '../ui/badge';
import { Icons } from '../icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function QuestActionCard({
  action,
  disabled,
  isQuestDetail = false,
  tokenDecimals,
  isCompleted,
}: {
  action: QuestActionDto;
  disabled?: boolean;
  isQuestDetail?: boolean;
  tokenDecimals: number;
  isCompleted?: boolean;
}): JSX.Element {
  const [buttonStyles, setButtonStyles] = useState<string>('');

  const handleButtonClick = (): void => {
    setButtonStyles(
      isCompleted
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-gray-500 hover:bg-gray-600',
    );
  };

  const getButtonText = (): string => {
    if (buttonStyles === '') {
      return 'Verify';
    }

    return isCompleted ? 'Completed' : 'Not completed';
  };

  return (
    <div className="bg-purple-light flex flex-col gap-6 rounded-lg p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <p>
            <span className="font-semibold">
              {action.actionType === QuestActionType.FOLLOW
                ? 'Follow'
                : 'Repost'}
            </span>{' '}
            on
          </p>
          <Image
            src="/shared/twitter.svg"
            alt="Twitter"
            width={18}
            height={16}
          />
        </div>
        <Badge className="gap-2">
          <Icons.Relume />
          {isQuestDetail ? action.reward / 10 ** tokenDecimals : action.reward}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <p>Task Address</p>
        <Input disabled value={action.url} />
      </div>
      <Button
        className="ml-auto"
        onClick={() =>
          disabled ? undefined : window.open(action.url, '_blank')
        }
        disabled={disabled}
      >
        Go To Task
      </Button>

      {isCompleted !== undefined && (
        <Button
          className={cn('ml-auto', buttonStyles)}
          onClick={handleButtonClick}
          disabled={buttonStyles !== ''}
        >
          {getButtonText()}
        </Button>
      )}
    </div>
  );
}
