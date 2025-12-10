import type { GenericResponse } from './base.types';

export interface AvailableQuestDto {
  id: string;
  rewardAmount: number;
  tokenSymbol: string;
  tokenDecimals: number;
  endDate: string;
  isJoined: boolean;
  actions: QuestActionDto[];
  description: string;
  title: string;
  isPaid: boolean;
}

export interface QuestActionDto {
  id: string;
  actionType: QuestActionType;
  url: string;
  reward: number;
}

export enum QuestActionType {
  FOLLOW = 'follow',
  REPOST = 'repost',
}

export interface AvailableQuestsResponse
  extends GenericResponse<AvailableQuestDto[]> {}

export interface CreateQuestRequest {
  title: string;
  description: string;
  endDate: string;
  actions: CreateQuestActionDto[];
  tokenId: string;
}

export interface CreateQuestActionDto {
  url: string;
  action: QuestActionType;
  maxCount: number;
  rewardAmount: number;
}

export interface CreateQuestResponse
  extends GenericResponse<{
    id: string;
    rewardAmount: number;
    depositAddress: string;
  }> {}

export interface JoinQuestRequest {
  questId: string;
}

export interface QuestByIdDto {
  id: string;
  rewardAmount: number;
  tokenSymbol: string;
  tokenDecimals: number;
  endDate: Date;
  isJoined: boolean;
  actions: Array<QuestActionDto & { isCompleted: boolean }>;
  description: string;
  title: string;
  isPaid: boolean;
}

export interface GetQuestByIdResponse extends GenericResponse<QuestByIdDto> {}
