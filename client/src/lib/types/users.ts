export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface ApiUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string; // Optional, depending on your API response
  role: string;
}
