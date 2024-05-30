import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, getMeWithToken } from "@/services/auth";

const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (infoUser, thunkAPI) => {
    const data = await login(infoUser);
    const profile = await getMeWithToken(data.jwt);
    data.user = { ...data.user, ...profile };
    console.log(data);
    return data;
  }
);

export default loginThunk;