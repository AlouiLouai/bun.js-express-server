import { ApiUser, User } from '@/lib/types/users';
import AuthService from '@/services/auth.services';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Type for the error response
type FetchUsersError = string | { message: string };

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: FetchUsersError }>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const authService = new AuthService();
      const response: ApiUser[] = await authService.users(); // Assuming the response is an array of ApiUser

      // Transform API response to match `User` structure
      return response.map((user: ApiUser) => ({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password, // Optional field, add only if needed
        role: user.role,
      }));
    } catch (error: unknown) {
      // Error handling: type the error properly
      console.error('Error in fetchUsers:', error);

      if (error instanceof Error) {
        // If the error is an instance of the `Error` class
        return rejectWithValue(error.message || 'An unknown error occurred');
      } else {
        // If the error is not an instance of `Error`
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);
