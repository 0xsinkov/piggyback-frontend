import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { type ApiError } from '@root/src/utils/api-error.utils';
import type { JoinQuestRequest } from '@root/src/types/quest.types';
import { questServiceClient } from '@root/src/api/services/quest.service.client';
import { QUEST_QUERY_KEY } from '@root/src/hooks/quest/use-quest';

export const JOIN_QUEST_MUTATION_KEY = 'join-quest';

export const useJoinQuest = (
  questId: string,
): UseMutationResult<unknown, ApiError, JoinQuestRequest> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [JOIN_QUEST_MUTATION_KEY],
    mutationFn: async (request: JoinQuestRequest) =>
      await questServiceClient.join(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUEST_QUERY_KEY, questId],
      });
    },
  });
};
