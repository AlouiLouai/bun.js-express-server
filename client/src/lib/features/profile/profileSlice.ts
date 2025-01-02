import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '@/types/users';

const initialState: UserState = {
  user: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = ProfileSlice.actions;

export default ProfileSlice.reducer;
