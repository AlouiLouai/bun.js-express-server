import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Directly setting users in the state
    users: (state, action) => {
      state.users = action.payload; // Directly set users from the action payload
    },
    // Reset users state
    resetUsers: (state) => {
      state.users = []; // Clear the users state
    },
    // Set loading state
    loading: (state, action) => {
      state.loading = action.payload; // Set loading to true/false based on the payload
    },
    // Set error state
    error: (state, action) => {
      state.error = action.payload; // Set error message in the state
    },
  },
});

export const { users, resetUsers, loading, error } = UserSlice.actions;

export default UserSlice.reducer;
