import { parseErrorResponse } from '@src/utils/api-error.utils';
import { env } from '@src/env/client';
import {
  type ApiResult,
  type FetchParametersWithBody,
  ResponseStatusCodes,
} from '@src/types/base.types';
import { ERROR_CODES, ERROR_MESSAGES } from '@src/constants/error.constants';
import {
  getAccessToken,
  removeAccessToken,
} from '@src/utils/token-storage.utils';

/**
 * Makes an API request and returns a result object with success/failure status
 */
export const makeApiRequest = async <TRequest, TResponse>({
  route,
  body,
  params,
  attachCookies,
  method,
  contentType = 'application/json',
}: FetchParametersWithBody<TRequest> & {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
}): Promise<ApiResult<TResponse>> => {
  const headers: HeadersInit = {};
  const finalRoute = `${env.NEXT_PUBLIC_API_URL}${route}`;

  if (attachCookies) {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  if (body && contentType !== 'multipart/form-data') {
    headers['Content-Type'] = contentType;
  }

  try {
    let requestBody: BodyInit | undefined;

    if (body) {
      switch (contentType) {
        case 'application/json':
          requestBody = JSON.stringify(body);
          break;
        case 'multipart/form-data':
          if (body instanceof FormData) {
            requestBody = body;
          } else {
            const formData = new FormData();
            Object.entries(body as Record<string, any>).forEach(
              ([key, value]) => {
                if (value instanceof File) {
                  formData.append(key, value);
                } else if (value !== null && value !== undefined) {
                  formData.append(key, String(value));
                }
              },
            );
            requestBody = formData;
          }
          break;
        default:
          requestBody = body as BodyInit;
      }
    }

    const response = await fetch(finalRoute, {
      method,
      headers,
      body: requestBody,
      ...params,
    });

    if (response.status === ResponseStatusCodes.Unauthorized) {
      removeAccessToken();

      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }

      return {
        success: false,
        error: {
          errorCode: ERROR_CODES.UNAUTHORIZED,
          errorMessage: ERROR_MESSAGES.GENERIC_ERROR,
        },
        httpStatus: ResponseStatusCodes.Unauthorized,
      };
    }

    return await parseResponse<TResponse>(response);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console -- We need to log API errors in development
      console.error('API Request Error:', error);
    }

    return {
      success: false,
      error: {
        errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
        errorMessage: ERROR_MESSAGES.GENERIC_ERROR,
      },
      httpStatus: ResponseStatusCodes.InternalServerError,
    };
  }
};

/**
 * Parses API response into a consistent result object
 */
async function parseResponse<TResponse>(
  response: Response,
): Promise<ApiResult<TResponse>> {
  if (response.status === ResponseStatusCodes.NoContent) {
    return {
      success: true,
      data: undefined as unknown as TResponse,
      httpStatus: response.status,
    };
  }

  const data = await getResponseData(response);

  if (response.ok) {
    return {
      success: true,
      data: data as TResponse,
      httpStatus: response.status,
    };
  }

  const error = parseErrorResponse(data);
  return {
    success: false,
    error,
    httpStatus: response.status,
  };
}

/**
 * Gets data from response, handling different content types
 */
async function getResponseData(response: Response): Promise<unknown> {
  const responseContentType = response.headers.get('content-type');
  const isJson = responseContentType?.includes('application/json');

  if (isJson) {
    return await response.json();
  }

  const isBlob =
    responseContentType?.startsWith('image/') ||
    responseContentType?.startsWith('video/') ||
    responseContentType?.startsWith('audio/') ||
    responseContentType?.startsWith('application/pdf') ||
    responseContentType?.startsWith('application/zip') ||
    responseContentType?.startsWith('application/octet-stream') ||
    response.headers.get('content-disposition')?.includes('attachment');

  if (isBlob) {
    return await response.blob();
  }

  try {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch {
    return {};
  }
}
