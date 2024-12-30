import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './productActions';
import { ProductState } from '@/lib/types/product';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error occurred';
        state.loading = false;
      });
  },
});

export const { resetUsers } = UserSlice.actions;

export default UserSlice.reducer;
