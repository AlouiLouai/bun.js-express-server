export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface UserState {
  user: User | null;
}

export interface ApiUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string; // Optional, depending on your API response
  role: string;
}
