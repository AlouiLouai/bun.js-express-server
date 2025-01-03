import HttpClient from '@/lib/http';
import { User } from '@/types/users';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export default class ProfileService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(API_BASE_URL);
  }

  public async getProfile(): Promise<{ profile: Partial<User> }> {
    return this.httpClient.get<{ profile: Partial<User> }>(`/user/`);
  }
}
