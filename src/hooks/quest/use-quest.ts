import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { questServiceClient } from '@root/src/api/services/quest.service.client';
import type { GetQuestByIdResponse } from '@root/src/types/quest.types';
import { type ApiError } from '@root/src/utils/api-error.utils';

export const QUEST_QUERY_KEY = 'quest';

export const useQuest = (
  id: string,
): UseQueryResult<GetQuestByIdResponse, ApiError> =>
  useQuery({
    queryKey: [QUEST_QUERY_KEY, id],
    queryFn: async () => await questServiceClient.getById(id),
    enabled: Boolean(id),
  });
