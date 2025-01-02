import HttpClient from '@/lib/http';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
}

interface forgotPassword {
  email: string;
}

interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export default class AuthService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(API_BASE_URL);
  }

  public async register(userData: Partial<User>): Promise<User> {
    return this.httpClient.post<User>(`/auth/register`, userData);
  }

  public async login(userData: Partial<User>): Promise<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`/auth/login`, userData)
      .then((response) => {
        return {
          user: response.user,
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        };
      });
  }

  public async logout(): Promise<void> {
    return this.httpClient.post(`/auth/logout`, undefined); // Pass undefined as body
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

  public async users() {
    return this.httpClient.get<User[]>(`/auth/users`);
  }
}
