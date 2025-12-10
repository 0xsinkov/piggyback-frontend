import { makeApiRequest } from '@src/api/fetcher/base.fetcher';
import {
  type FetchParameters,
  type FetchParametersWithBody,
  type ApiResult,
} from '@src/types/base.types';

export async function GET<TResponse>({
  route,
  params,
  attachCookies = true,
}: FetchParameters): Promise<ApiResult<TResponse>> {
  return await makeApiRequest<undefined, TResponse>({
    method: 'GET',
    route,
    attachCookies,
    params,
  });
}

export async function POST<TRequest, TResponse>({
  route,
  params,
  body,
  contentType,
  attachCookies = true,
}: FetchParametersWithBody<TRequest>): Promise<ApiResult<TResponse>> {
  return await makeApiRequest<TRequest, TResponse>({
    method: 'POST',
    route,
    body,
    contentType,
    attachCookies,
    params,
  });
}

export async function PUT<TRequest, TResponse>({
  route,
  params,
  body,
  contentType,
  attachCookies = true,
}: FetchParametersWithBody<TRequest>): Promise<ApiResult<TResponse>> {
  return await makeApiRequest<TRequest, TResponse>({
    method: 'PUT',
    route,
    body,
    contentType,
    attachCookies,
    params,
  });
}

export async function PATCH<TRequest, TResponse>({
  route,
  params,
  body,
  contentType,
  attachCookies = true,
}: FetchParametersWithBody<TRequest>): Promise<ApiResult<TResponse>> {
  return await makeApiRequest<TRequest, TResponse>({
    method: 'PATCH',
    route,
    body,
    contentType,
    attachCookies,
    params,
  });
}

export async function DELETE<TRequest, TResponse>({
  route,
  params,
  body,
  contentType,
  attachCookies = true,
}: FetchParametersWithBody<TRequest>): Promise<ApiResult<TResponse>> {
  return await makeApiRequest<TRequest, TResponse>({
    method: 'DELETE',
    route,
    body,
    contentType,
    attachCookies,
    params,
  });
}
