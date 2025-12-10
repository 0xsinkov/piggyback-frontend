import { ResponseStatusCodes, type ApiResult } from '@src/types/base.types';
import { ApiError } from '@root/src/utils/api-error.utils';

export abstract class BaseService {
  handleApiResult<T>(result: ApiResult<T>): T {
    if (result.success && result.data) {
      return result.data;
    }

    if (result.success && result.httpStatus === ResponseStatusCodes.NoContent) {
      return undefined as T;
    }

    if (result.httpStatus && result.error) {
      throw ApiError.fromGenericError(result.httpStatus, result.error);
    }

    throw ApiError.internalServerError();
  }
}
