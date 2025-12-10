import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type ApiError } from '@root/src/utils/api-error.utils';
import type {
  CreateQuestRequest,
  CreateQuestResponse,
} from '@root/src/types/quest.types';
import { questServiceClient } from '@root/src/api/services/quest.service.client';

export const CREATE_QUEST_MUTATION_KEY = 'create-quest';

export const useCreateQuest = (): UseMutationResult<
  CreateQuestResponse,
  ApiError,
  CreateQuestRequest
> =>
  useMutation({
    mutationKey: [CREATE_QUEST_MUTATION_KEY],
    mutationFn: async (request: CreateQuestRequest) =>
      await questServiceClient.create(request),
  });
