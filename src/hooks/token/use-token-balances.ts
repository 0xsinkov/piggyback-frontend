import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { tokenServiceClient } from '@root/src/api/services/token.service.client';
import type { GetTokenBalancesResponse } from '@root/src/types/token.types';
import { type ApiError } from '@root/src/utils/api-error.utils';
import { getAccessToken } from '@root/src/utils/token-storage.utils';

export const TOKEN_BALANCES_QUERY_KEY = 'token-balances';

export const useTokenBalances = (): UseQueryResult<
  GetTokenBalancesResponse,
  ApiError
> =>
  useQuery({
    queryKey: [TOKEN_BALANCES_QUERY_KEY],
    queryFn: async () => await tokenServiceClient.getTokenBalances(),
    enabled: Boolean(getAccessToken()),
  });
