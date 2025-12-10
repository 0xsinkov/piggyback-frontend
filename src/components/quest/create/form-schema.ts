import { z } from 'zod';
import { QuestActionType } from '@root/src/types/quest.types';

const twitterUrlRegex =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[a-zA-Z0-9_]+(?:\/.*)?$/;

export const actionSchema = z.object({
  url: z
    .string()
    .min(1, 'Address is required')
    .url('Invalid URL')
    .refine(
      (url) => twitterUrlRegex.test(url),
      'URL must be a valid Twitter/X URL (e.g., https://twitter.com/username or https://x.com/username)',
    ),
  action: z.nativeEnum(QuestActionType, {
    required_error: 'Action Type is required',
  }),
  maxCount: z
    .number({
      required_error: 'Required',
    })
    .positive('Must be greater than 0'),
  rewardAmount: z
    .number({
      required_error: 'Required',
    })
    .min(0.00001, 'Must be not less than 0.00001'),
});

export const createQuestFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  endDate: z.date({
    required_error: 'End Date is required',
  }),
  tokenId: z.string().min(1, 'Token Type is required'),
  actions: z.array(actionSchema).min(1, 'Create at least one action'),
});

export type CreateQuestFormValues = z.infer<typeof createQuestFormSchema>;
