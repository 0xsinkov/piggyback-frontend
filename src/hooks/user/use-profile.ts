import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { userServiceClient } from '@root/src/api/services/user.client.service';
import type { GetProfileResponse } from '@root/src/types/user.types';
import { type ApiError } from '@root/src/utils/api-error.utils';
import { getAccessToken } from '@root/src/utils/token-storage.utils';

export const PROFILE_QUERY_KEY = 'profile';

export const useProfile = (): UseQueryResult<GetProfileResponse, ApiError> =>
  useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: async () => await userServiceClient.getProfile(),
    enabled: Boolean(getAccessToken()),
  });
