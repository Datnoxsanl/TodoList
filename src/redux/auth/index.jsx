import { createSlice } from "@reduxjs/toolkit";
// import auth from "./thunk";
const initialState = {
  token: "",
  user: {},
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  // extraReducers: auth,
});
export const { setUserAccess } = authSlice.actions;

export default authSlice.reducer;
