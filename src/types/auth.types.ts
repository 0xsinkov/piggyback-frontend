import { type GenericResponse } from '@root/src/types/base.types';

export interface SessionPayload {
  userId: string;
  email: string;
}

export interface LogInRequest {
  email: string;
  password: string;
}

export type LogInResponse = TokenPair;

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export type RefreshTokenResponse = TokenPair;

export interface TokenPair {
  accessToken: string;
  accessExpiresAt: string;
  refreshToken: string;
  refreshExpiresAt: string;
}

export interface GetAuthUrlResponse
  extends GenericResponse<{
    redirectLink: string;
  }> {}
export interface AuthenticateResponse
  extends GenericResponse<{
    accessToken: string;
  }> {}

export interface AuthenticateRequest {
  code: string;
  state: string;
}
