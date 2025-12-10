import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type ApiError } from '@root/src/utils/api-error.utils';
import type { ClaimRewardRequestDto } from '@root/src/types/earnings.types';
import { earningsServiceClient } from '@root/src/api/services/earning.service.client';
import { PROTECTED_PAGES_URLS } from '@root/src/constants/routes.constants';
import { revalidate } from '@root/src/utils/revalidate.utils';

export const CLAIM_REWARD_MUTATION_KEY = 'claim-reward';

export const useClaimReward = (): UseMutationResult<
  unknown,
  ApiError,
  ClaimRewardRequestDto
> => {
  return useMutation({
    mutationKey: [CLAIM_REWARD_MUTATION_KEY],
    mutationFn: async (request: ClaimRewardRequestDto) =>
      await earningsServiceClient.claimReward(request),
    onSuccess: () => {
      revalidate(PROTECTED_PAGES_URLS.PROFILE_REWARDS);
    },
  });
};
