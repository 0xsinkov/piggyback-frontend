import type {
  AvailableQuestsResponse,
  CreateQuestRequest,
  CreateQuestResponse,
  GetQuestByIdResponse,
  JoinQuestRequest,
} from '@root/src/types/quest.types';
import { GET, POST } from '@src/api/fetcher/client/fetcher';
import { BaseService } from '@src/api/services/base.service';

class QuestServiceClient extends BaseService {
  private BASE_URL = `/quest`;

  async getAllAvailableQuests(): Promise<AvailableQuestsResponse> {
    const result = await GET<AvailableQuestsResponse>({
      route: `${this.BASE_URL}/get-all-available-quests`,
    });

    return this.handleApiResult(result);
  }

  async getById(id: string): Promise<GetQuestByIdResponse> {
    const result = await GET<GetQuestByIdResponse>({
      route: `${this.BASE_URL}/get-quest-by-id/${id}`,
    });

    return this.handleApiResult(result);
  }

  async create(request: CreateQuestRequest): Promise<CreateQuestResponse> {
    const result = await POST<CreateQuestRequest, CreateQuestResponse>({
      route: `${this.BASE_URL}/create-quest`,
      body: request,
    });

    return this.handleApiResult(result);
  }

  async join(request: JoinQuestRequest): Promise<unknown> {
    const result = await POST<JoinQuestRequest, unknown>({
      route: `${this.BASE_URL}/join-quest`,
      body: request,
    });

    return this.handleApiResult(result);
  }
}

export const questServiceClient = new QuestServiceClient();
