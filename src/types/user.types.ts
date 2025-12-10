import type { GenericResponse } from './base.types';

export interface ProfileDto {
  id: string;
  email?: string;
  username?: string;
  profilePictureUrl?: string;
  isRestricted: boolean;
  walletAddress?: string;
}

export interface GetProfileResponse extends GenericResponse<ProfileDto> {}

export interface TransactionDto {
  hash: string;
  amount: number;
  tokenDecimals: number;
  symbol: string;
  category: TransactionCategory;
  date: Date;
}

export enum TransactionCategory {
  WITHDRAW = 'withdraw',
}

export interface GetTransactionsResponseDto
  extends GenericResponse<TransactionDto[]> {}
