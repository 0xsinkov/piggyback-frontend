import type { GenericResponse } from './base.types';

export interface TokenDto {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  imageUrl?: string;
  address?: string;
}

export interface AllTokensResponse extends GenericResponse<TokenDto[]> {}

export interface TokenBalanceDto {
  balance: number;
  minWithdrawAmount: number;
  tokenDecimals: number;
  tokenId: string;
  symbol: string;
  imageUrl: string;
}

export interface GetTokenBalancesResponse
  extends GenericResponse<TokenBalanceDto[]> {}

export interface WithdrawTokenRequest {
  tokenId: string;
  amount: number;
}
