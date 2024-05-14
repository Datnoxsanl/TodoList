import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: '',
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      console.log(action.payload);
    },
  },
});

export const { setUserAccess } = authSlice.actions;

export default authSlice.reducer;
