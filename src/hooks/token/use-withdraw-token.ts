import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type ApiError } from '@root/src/utils/api-error.utils';
import { tokenServiceClient } from '@root/src/api/services/token.service.client';
import type { WithdrawTokenRequest } from '@root/src/types/token.types';

export const WITHDRAW_TOKEN_MUTATION_KEY = 'withdraw-token';

export const useWithdrawToken = (): UseMutationResult<
  unknown,
  ApiError,
  WithdrawTokenRequest
> =>
  useMutation({
    mutationKey: [WITHDRAW_TOKEN_MUTATION_KEY],
    mutationFn: async (request: WithdrawTokenRequest) =>
      await tokenServiceClient.withdraw(request),
  });
