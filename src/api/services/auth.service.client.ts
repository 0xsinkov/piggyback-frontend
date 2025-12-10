import { GET, POST } from '@root/src/api/fetcher/client/fetcher';
import { BaseService } from '@root/src/api/services/base.service';
import {
  type AuthenticateResponse,
  type AuthenticateRequest,
  type GetAuthUrlResponse,
} from '@src/types/auth.types';

class AuthServiceClient extends BaseService {
  private BASE_URL = `/auth`;

  async requestAuthUrl(): Promise<GetAuthUrlResponse> {
    const result = await GET<GetAuthUrlResponse>({
      route: `${this.BASE_URL}/get-auth-url`,
    });

    return this.handleApiResult(result);
  }

  async authenticate(
    request: AuthenticateRequest,
  ): Promise<AuthenticateResponse> {
    const result = await POST<AuthenticateRequest, AuthenticateResponse>({
      route: `${this.BASE_URL}/authenticate?code=${request.code}&state=${request.state}`,
    });

    return this.handleApiResult(result);
  }
}

export const authServiceClient = new AuthServiceClient();
