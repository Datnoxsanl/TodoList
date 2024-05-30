
import { createSlice } from "@reduxjs/toolkit";
import loginThunk  from "./thunk";

const initialState = {
  token: "",
  user: {},
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = {};
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.jwt;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {setUserAccess, logout } = authSlice.actions;
export { loginThunk }; 
export default authSlice.reducer;