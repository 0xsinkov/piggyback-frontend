import { GET, PATCH } from '@src/api/fetcher/client/fetcher';
import { BaseService } from '@src/api/services/base.service';
import type {
  GetProfileResponse,
  GetTransactionsResponseDto,
} from '@root/src/types/user.types';

class UserServiceClient extends BaseService {
  private BASE_URL = `/user`;

  async getProfile(): Promise<GetProfileResponse> {
    const result = await GET<GetProfileResponse>({
      route: `${this.BASE_URL}/get-profile`,
    });

    return this.handleApiResult(result);
  }

  async getTransactions(): Promise<GetTransactionsResponseDto> {
    const result = await GET<GetTransactionsResponseDto>({
      route: `${this.BASE_URL}/get-transactions`,
    });

    return this.handleApiResult(result);
  }

  async updateInfo(request: FormData): Promise<unknown> {
    const result = await PATCH<FormData, unknown>({
      route: `${this.BASE_URL}/update-info`,
      contentType: 'multipart/form-data',
      body: request,
    });

    return this.handleApiResult(result);
  }
}

export const userServiceClient = new UserServiceClient();
