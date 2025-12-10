import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type ApiError } from '@root/src/utils/api-error.utils';
import { userServiceClient } from '@root/src/api/services/user.client.service';

export const UPDATE_INFO_MUTATION_KEY = 'update-info';

export const useUpdateInfo = (): UseMutationResult<
  unknown,
  ApiError,
  FormData
> =>
  useMutation({
    mutationKey: [UPDATE_INFO_MUTATION_KEY],
    mutationFn: async (request: FormData) =>
      await userServiceClient.updateInfo(request),
  });
