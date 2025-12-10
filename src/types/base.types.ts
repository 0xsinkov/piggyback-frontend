import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export interface GenericError {
  errorCode: string;
  errorMessage: string;
  validationErrors?: ValidationError[];
}

export interface ValidationError {
  fieldName: string;
  error: string;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: GenericError;
  httpStatus?: ResponseStatusCodes;
}

export interface FetchParameters {
  route: string;
  params?: RequestInit;
  attachCookies?: boolean;
  serverCookies?: () => Promise<ReadonlyRequestCookies>;
}

export interface FetchParametersWithBody<TRequest> extends FetchParameters {
  body?: TRequest;
  contentType?: 'application/json' | 'multipart/form-data';
}

export enum ResponseStatusCodes {
  Success = 200,
  Created = 201,
  NoContent = 204,
  Unauthorized = 401,
  BadRequest = 400,
  Forbidden = 403,
  UnprocessableEntity = 422,
  NotFound = 404,
  InternalServerError = 500,
}

export interface PaginationMetadata {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  limit: number;
  page: number;
  pageCount: number;
}

export interface PaginatedRequest {
  page: number;
  limit: number;
  search?: string;
}

export interface GenericResponse<T> {
  data?: T;
}
