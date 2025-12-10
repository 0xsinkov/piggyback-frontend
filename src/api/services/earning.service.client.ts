import { GET, POST } from '@root/src/api/fetcher/client/fetcher';
import { BaseService } from '@root/src/api/services/base.service';
import {
  ClaimRewardRequestDto,
  GetClaimableRewardsResponse,
} from '@root/src/types/earnings.types';

export class EarningsServiceClient extends BaseService {
  private BASE_URL = '/reward';

  async getClaimableRewards(): Promise<GetClaimableRewardsResponse> {
    const result = await GET<GetClaimableRewardsResponse>({
      route: `${this.BASE_URL}/get-claimable-rewards`,
    });

    return this.handleApiResult(result);
  }

  async claimReward(request: ClaimRewardRequestDto): Promise<unknown> {
    const result = await POST<ClaimRewardRequestDto, unknown>({
      route: `${this.BASE_URL}/claim-reward?rewardId=${request.rewardId}`,
      body: undefined,
    });

    return this.handleApiResult(result);
  }
}

export const earningsServiceClient = new EarningsServiceClient();
