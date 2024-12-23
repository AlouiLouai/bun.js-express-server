import HttpClient from '@/lib/http';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface User {
  id: string;
  firtname: string;
  lastname: string;
  name: string;
  email: string;
}

interface forgotPassword {
  email: string;
}

export default class AuthService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(API_BASE_URL);
  }

  public async register(userData: Partial<User>): Promise<User> {
    return this.httpClient.post<User>(`/auth/register`, userData);
  }

  public async login(userData: Partial<User>): Promise<User> {
    return this.httpClient.post<User>(`/auth/login`, userData);
  }

  public async forgotPassword(userData: forgotPassword) {
    return this.httpClient.post<User>(`/auth/forgot-password`, userData);
  }

  public async resetPassword(
    token: string,
    newPassword: string
  ): Promise<User> {
    return this.httpClient.post<User>(`/auth/reset-password?token=${token}`, {
      new_password: newPassword,
    });
  }
}
