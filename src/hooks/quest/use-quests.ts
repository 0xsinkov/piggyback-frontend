import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { questServiceClient } from '@root/src/api/services/quest.service.client';
import type { AvailableQuestsResponse } from '@root/src/types/quest.types';
import { type ApiError } from '@root/src/utils/api-error.utils';

export const QUESTS_QUERY_KEY = 'quests';

export const useQuests = (): UseQueryResult<
  AvailableQuestsResponse,
  ApiError
> =>
  useQuery({
    queryKey: [QUESTS_QUERY_KEY],
    queryFn: async () => await questServiceClient.getAllAvailableQuests(),
  });
