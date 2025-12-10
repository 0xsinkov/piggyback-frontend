import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { authServiceClient } from '@src/api/services/auth.service.client';
import { type GetAuthUrlResponse } from '@root/src/types/auth.types';
import { type ApiError } from '@root/src/utils/api-error.utils';

export const REQUEST_AUTH_LINK_MUTATION_KEY = 'request-auth-link';

export const useRequestAuthLink = (): UseMutationResult<
  GetAuthUrlResponse,
  ApiError,
  void,
  unknown
> =>
  useMutation({
    mutationKey: [REQUEST_AUTH_LINK_MUTATION_KEY],
    mutationFn: async () => await authServiceClient.requestAuthUrl(),
  });
