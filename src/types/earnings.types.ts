import { GenericResponse } from '@root/src/types/base.types';
import { QuestActionType } from '@root/src/types/quest.types';

export interface ClaimableRewardDto {
  id: string;
  amount: number;
  tokenSymbol: string;
  tokenDecimals: number;
  questActionId: string;
  questActionType: QuestActionType;
  url: string;
  questTitle: string;
}

export interface GetClaimableRewardsResponse
  extends GenericResponse<ClaimableRewardDto[]> {}

export interface ClaimRewardRequestDto {
  rewardId: string;
}
