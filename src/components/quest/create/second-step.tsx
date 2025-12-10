import { type PropsWithChildren, type JSX } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ChevronDownIcon, ChevronUpIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@root/src/utils/tailwind.utils';
import { QuestActionType } from '@root/src/types/quest.types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Icons } from '../../icons';
import { CreateQuestStepCard } from './step-card';
import type { CreateQuestFormValues } from './form-schema';

const isValidTwitterUrl = (url: string): boolean => {
  const twitterUrlRegex =
    /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[a-zA-Z0-9_]+(?:\/.*)?$/;

  return twitterUrlRegex.test(url);
};

export function CreateQuestFormSecondStep({
  onNextClick,
  onBackClick,
}: {
  onNextClick: () => void;
  onBackClick: () => void;
}): JSX.Element {
  const form = useFormContext<CreateQuestFormValues>();

  const { fields, append, remove } = useFieldArray({
    name: 'actions',
    control: form.control,
  });

  const onNextClickWrapper = (): void => {
    if (form.getValues('actions').length === 0) {
      toast.error('Please create at least one action');

      return;
    }

    for (const action of form.getValues('actions')) {
      if (
        action.url === '' ||
        action.action === undefined ||
        action.maxCount === 0 ||
        action.rewardAmount === 0
      ) {
        toast.error('Please fill in all fields');

        return;
      }

      if (!isValidTwitterUrl(action.url)) {
        toast.error(
          'Please enter a valid Twitter/X URL (e.g., https://twitter.com/username or https://x.com/username)',
        );

        return;
      }
    }

    onNextClick();
  };

  return (
    <CreateQuestStepCard
      currentStep={2}
      title="Let's continue with entries settings"
      description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing"
      onNextClick={onNextClickWrapper}
      onBackClick={onBackClick}
    >
      {form.formState.errors.actions?.message ? (
        <FormRootMessage>
          {form.formState.errors.actions.message}
        </FormRootMessage>
      ) : null}
      {fields.map((f, idx) => (
        <div
          key={f.id}
          className="bg-purple-light relative flex flex-col gap-6 rounded-lg p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
        >
          {idx ? (
            <div className="bg-background absolute -top-6 -right-6 size-12 rounded-full">
              <Button
                type="button"
                className="size-12 rounded-full"
                onClick={() => remove(idx)}
              >
                <Trash2Icon className="size-6 stroke-black" />
              </Button>
            </div>
          ) : null}

          <FormField
            control={form.control}
            name={`actions.${idx}.action`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action Type</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        'border-purple-dark flex-1 rounded-full p-3',
                        {
                          'bg-pink-primary/50':
                            field.value === QuestActionType.FOLLOW,
                        },
                      )}
                      onClick={() => field.onChange(QuestActionType.FOLLOW)}
                    >
                      Follow
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        'border-purple-dark flex-1 rounded-full p-3',
                        {
                          'bg-pink-primary/50':
                            field.value === QuestActionType.REPOST,
                        },
                      )}
                      onClick={() => field.onChange(QuestActionType.REPOST)}
                    >
                      Repost
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`actions.${idx}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name={`actions.${idx}.rewardAmount`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Total Token Amount</FormLabel>
                  <NumberInputWithArrows
                    value={Number(field.value)}
                    onChange={field.onChange}
                    step={0.01}
                  >
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        placeholder="10"
                        inputMode="decimal"
                        className="w-full"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </NumberInputWithArrows>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`actions.${idx}.maxCount`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Number of Rewards</FormLabel>
                  <NumberInputWithArrows
                    value={Number(field.value)}
                    onChange={field.onChange}
                    step={1}
                  >
                    <FormControl>
                      <Input
                        type="number"
                        step={1}
                        placeholder="10"
                        className="w-full"
                        inputMode="numeric"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (value === '') {
                            field.onChange(0);

                            return;
                          }

                          const intValue = Math.floor(Number(value));

                          if (!isNaN(intValue)) {
                            field.onChange(intValue);
                          }
                        }}
                      />
                    </FormControl>
                  </NumberInputWithArrows>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        className="bg-purple-light w-full gap-3"
        onClick={() =>
          append({
            url: '',
            action: undefined as unknown as QuestActionType,
            maxCount: 0,
            rewardAmount: 0,
          })
        }
      >
        Add Action
        <Icons.Plus />
      </Button>
    </CreateQuestStepCard>
  );
}

function NumberInputWithArrows({
  children,
  value,
  onChange,
  step = 1,
}: PropsWithChildren<{
  value: number;
  onChange: (...event: any[]) => void;
  step?: number;
}>): JSX.Element {
  return (
    <div className="relative h-fit w-full">
      {children}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="size-6 border-none px-0 py-0"
          onClick={() => onChange(Number((value - step).toFixed(4)))}
          disabled={value - step < 0}
        >
          <ChevronDownIcon className="text-purple-dark size-6" />
        </Button>
        <div className="bg-purple-light h-6 w-0.5" />
        <Button
          type="button"
          variant="outline"
          className="size-6 border-none px-0 py-0"
          onClick={() => onChange(Number((value + step).toFixed(4)))}
          disabled={value + step > 1000000}
        >
          <ChevronUpIcon className="text-purple-dark size-6" />
        </Button>
      </div>
    </div>
  );
}
