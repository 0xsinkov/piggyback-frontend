import type {
  AllTokensResponse,
  GetTokenBalancesResponse,
  WithdrawTokenRequest,
} from '@root/src/types/token.types';
import { GET, POST } from '@src/api/fetcher/client/fetcher';
import { BaseService } from '@src/api/services/base.service';

class TokenServiceClient extends BaseService {
  private BASE_URL = `/token`;

  async getAllTokens(): Promise<AllTokensResponse> {
    const result = await GET<AllTokensResponse>({
      route: `${this.BASE_URL}/get-all-tokens`,
    });

    return this.handleApiResult(result);
  }

  async getTokenBalances(): Promise<GetTokenBalancesResponse> {
    const result = await GET<GetTokenBalancesResponse>({
      route: `${this.BASE_URL}/get-token-balances`,
    });

    return this.handleApiResult(result);
  }

  async withdraw(request: WithdrawTokenRequest): Promise<unknown> {
    const result = await POST<WithdrawTokenRequest, unknown>({
      route: `${this.BASE_URL}/withdraw-token`,
      body: request,
    });

    return this.handleApiResult(result);
  }
}

export const tokenServiceClient = new TokenServiceClient();
