import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { userServiceClient } from '@root/src/api/services/user.client.service';
import type { GetTransactionsResponseDto } from '@root/src/types/user.types';
import { type ApiError } from '@root/src/utils/api-error.utils';
import { getAccessToken } from '@root/src/utils/token-storage.utils';

export const TRANSACTIONS_QUERY_KEY = 'transactions';

export const useTransactions = (): UseQueryResult<
  GetTransactionsResponseDto,
  ApiError
> =>
  useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY],
    queryFn: async () => await userServiceClient.getTransactions(),
    enabled: Boolean(getAccessToken()),
  });
