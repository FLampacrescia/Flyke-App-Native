import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  localId: null,
  token: null,
  profileImage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.localId = action.payload.localId;
      state.token = action.payload.token;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    clearUser: (state) => {
      state.email = null;
      state.localId = null;
      state.token = null;
      state.profileImage = null;
    },
  },
});

export const { setUser, setProfileImage, clearUser } = userSlice.actions;

export default userSlice.reducer;

