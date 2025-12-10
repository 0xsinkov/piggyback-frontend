import {
  type UseFormReturn,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { type ApiError, isApiError } from '@src/utils/api-error.utils';
import { ERROR_MESSAGES } from '@src/constants/error.constants';

/**
 * Type for custom error handlers
 */
export type FormErrorHandler<TFormValues extends FieldValues> = (
  error: ApiError,
  form: UseFormReturn<TFormValues>,
) => void;

/**
 * Handles API errors for forms by setting the appropriate field or root errors
 */
export function handleApiFormErrors<TFormValues extends FieldValues>(
  error: unknown,
  form: UseFormReturn<TFormValues>,
  fieldMapping?: Record<string, keyof TFormValues>,
  errorCodeHandlers?: Record<string, FormErrorHandler<TFormValues>>,
): void {
  if (!isApiError(error)) {
    form.setError('root', {
      message: ERROR_MESSAGES.GENERIC_ERROR,
      type: 'error',
    });

    return;
  }

  if (error.validationErrors?.length) {
    error.validationErrors.forEach((validationError) => {
      const fieldName =
        fieldMapping?.[validationError.fieldName.toLowerCase()] ||
        validationError.fieldName.toLowerCase();

      form.setError(fieldName as FieldPath<TFormValues>, {
        message: validationError.error,
        type: 'error',
      });
    });

    return;
  }

  if (
    error.errorCode &&
    errorCodeHandlers &&
    error.errorCode in errorCodeHandlers
  ) {
    const handler = errorCodeHandlers[
      error.errorCode
    ] as FormErrorHandler<TFormValues>;
    handler(error, form);

    return;
  }

  form.setError('root', {
    message: error.message || ERROR_MESSAGES.GENERIC_ERROR,
    type: 'error',
  });
}
