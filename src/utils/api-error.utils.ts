import {
  type GenericError,
  ResponseStatusCodes,
  type ValidationError,
} from '@src/types/base.types';
import {
  ERROR_CODES,
  ERROR_MESSAGES,
} from '@root/src/constants/error.constants';
import { lowercaseFirstLetter } from './text.utils';

/**
 * Custom error class for API-related errors
 */
export class ApiError extends Error {
  public readonly statusCode: ResponseStatusCodes;
  public readonly errorCode: string;
  public readonly validationErrors?: ValidationError[];
  public readonly originalError?: unknown;

  constructor(
    statusCode: ResponseStatusCodes,
    errorCode: string,
    message: string,
    validationErrors?: ValidationError[],
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.validationErrors = validationErrors;

    // Ensures proper instanceof checks work
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Creates an ApiError from a GenericError object
   */
  static fromGenericError(
    statusCode: ResponseStatusCodes,
    error: GenericError,
  ): ApiError {
    return new ApiError(
      statusCode,
      error.errorCode,
      error.errorMessage,
      error.validationErrors,
    );
  }

  /**
   * Creates a generic server error
   */
  static internalServerError(): ApiError {
    return new ApiError(
      ResponseStatusCodes.InternalServerError,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.GENERIC_ERROR,
      undefined,
    );
  }
}

/**
 * Parses an error response from the API
 * The API always returns errors in a standard format with errorCode and errorMessage
 */
export function parseErrorResponse(data: any): GenericError {
  try {
    if (data && typeof data === 'object') {
      return {
        errorCode:
          data.errorCode || data.ErrorCode || ERROR_CODES.GENERIC_ERROR,
        errorMessage:
          data.errorMessage ||
          data.ErrorMessage ||
          data.message ||
          ERROR_MESSAGES.GENERIC_ERROR,
        validationErrors:
          data.validationErrors ||
          data.ValidationErrors?.map((e: any) => {
            const newError: Record<string, any> = {};
            for (const key in e) {
              if (Object.prototype.hasOwnProperty.call(e, key)) {
                const lowerCaseKey = lowercaseFirstLetter(key);
                newError[lowerCaseKey] = e[key];
              }
            }
            return newError;
          }),
      };
    }

    // Fallback for unexpected formats
    return {
      errorCode: ERROR_CODES.GENERIC_ERROR,
      errorMessage: ERROR_MESSAGES.GENERIC_ERROR,
    };
  } catch {
    // Exception during parsing
    return {
      errorCode: ERROR_CODES.GENERIC_ERROR,
      errorMessage: ERROR_MESSAGES.GENERIC_ERROR,
    };
  }
}

/**
 * Type guard to check if a caught error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Type guard to check if a caught error is a specific type of ApiError
 */
export function isApiErrorWithCode(error: unknown, errorCode: string): boolean {
  return isApiError(error) && error.errorCode === errorCode;
}

/**
 * Checks if an error is an unauthorized error
 */
export function isUnauthorizedError(error: unknown): boolean {
  return (
    isApiError(error) && error.statusCode === ResponseStatusCodes.Unauthorized
  );
}
