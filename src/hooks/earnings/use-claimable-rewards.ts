import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { earningsServiceClient } from '@root/src/api/services/earning.service.client';
import type { GetClaimableRewardsResponse } from '@root/src/types/earnings.types';
import { type ApiError } from '@root/src/utils/api-error.utils';
import { getAccessToken } from '@root/src/utils/token-storage.utils';

export const CLAIMABLE_REWARDS_QUERY_KEY = 'claimable-rewards';

export const useClaimableRewards = (): UseQueryResult<
  GetClaimableRewardsResponse,
  ApiError
> =>
  useQuery({
    queryKey: [CLAIMABLE_REWARDS_QUERY_KEY],
    queryFn: async () => await earningsServiceClient.getClaimableRewards(),
    enabled: Boolean(getAccessToken()),
  });
