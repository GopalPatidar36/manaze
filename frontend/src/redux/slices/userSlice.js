import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../plugin/axios";
import { logout } from "./authSlice";

export const searchUser = createAsyncThunk(
  "/user/search",
  async (data, thunkAPI) => {
    try {
      const response = await api.get("/user/search", { params: data });
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const initialState = {
  count: 0,
  list: [],
  status: "idel",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshUserState: (state) => {
      state.list = [];
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.fulfilled, (state, action) => {
        state.count = action.payload?.count;
        state.list = action.payload?.rows;
      })
      .addCase(logout, () => initialState);
  },
});

export const { refreshUserState } = userSlice.actions;
export default userSlice.reducer;
