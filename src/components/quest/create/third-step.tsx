import { type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import { useWallet } from '@solana/wallet-adapter-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { FormRootMessage } from '../../ui/form';
import { Countdown } from '../countdown';
import { QuestActionCard } from '../action-card';
import type { CreateQuestFormValues } from './form-schema';
import { CreateQuestStepCard } from './step-card';

export function CreateQuestFormThirdStep({
  onBackClick,
  disabled,
}: {
  onBackClick: () => void;
  disabled: boolean;
}): JSX.Element {
  const form = useFormContext<CreateQuestFormValues>();
  const { publicKey } = useWallet();

  return (
    <CreateQuestStepCard
      currentStep={3}
      title="Let's Preview"
      description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing"
      onBackClick={onBackClick}
      submit={
        <Button disabled={disabled || !publicKey} type="submit">
          {publicKey ? 'Release Quest' : 'Connect your wallet in settings'}
        </Button>
      }
    >
      <div className="border-pink-primary flex flex-col gap-8 border-2 border-dashed p-4">
        <div className="flex flex-col gap-4">
          <Badge className="ml-auto">
            End Date&nbsp;
            <span className="font-normal">
              {form.getValues('endDate').toLocaleDateString()}
            </span>
          </Badge>
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold text-black">
              {form.getValues('title')}
            </p>
            <p>{form.getValues('description')}</p>
          </div>
        </div>

        <Countdown date={form.getValues('endDate')} />

        <div className="flex flex-col gap-4">
          <p className="text-[20px]/7 font-bold">Tasks</p>
          {form.getValues('actions').map((a) => (
            <QuestActionCard
              tokenDecimals={0}
              key={a.url}
              action={{
                actionType: a.action,
                id: a.url,
                reward: a.rewardAmount * a.maxCount,
                url: a.url,
              }}
              disabled
            />
          ))}
        </div>
      </div>
      {form.formState.errors.root?.message ? (
        <FormRootMessage>{form.formState.errors.root.message}</FormRootMessage>
      ) : null}
    </CreateQuestStepCard>
  );
}
