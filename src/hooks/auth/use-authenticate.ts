import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { authServiceClient } from '@src/api/services/auth.service.client';
import {
  type AuthenticateRequest,
  type AuthenticateResponse,
} from '@src/types/auth.types';
import { type ApiError } from '@root/src/utils/api-error.utils';

export const AUTHENTICATE_MUTATION_KEY = 'authenticate';

export const useAuthenticate = (): UseMutationResult<
  AuthenticateResponse,
  ApiError,
  AuthenticateRequest,
  unknown
> =>
  useMutation({
    mutationKey: [AUTHENTICATE_MUTATION_KEY],
    mutationFn: async (request: AuthenticateRequest) =>
      await authServiceClient.authenticate(request),
  });
