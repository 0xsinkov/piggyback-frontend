import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { tokenServiceClient } from '@root/src/api/services/token.service.client';
import type { AllTokensResponse } from '@root/src/types/token.types';
import { type ApiError } from '@root/src/utils/api-error.utils';

export const TOKENS_QUERY_KEY = 'tokens';

export const useTokens = (): UseQueryResult<AllTokensResponse, ApiError> =>
  useQuery({
    queryKey: [TOKENS_QUERY_KEY],
    queryFn: async () => await tokenServiceClient.getAllTokens(),
  });
