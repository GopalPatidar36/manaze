import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../plugin/axios";
import { logout } from "./authSlice";

export const getCurrentUser = createAsyncThunk("/user/me", async (data, thunkAPI) => {
  try {
    const response = await api.get("/user/me");
    localStorage.setItem("currentUser", JSON.stringify(response?.data));
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const searchUser = createAsyncThunk("/user/search", async (data, thunkAPI) => {
  try {
    const response = await api.get("/user/search", { params: data });
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk("/user/uid", async (data, thunkAPI) => {
  try {
    const response = await api.post(`/user/${data.uid}`, data);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const initialState = {
  count: 0,
  list: [],
  status: "idel",
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refreshUserState: (state) => {
      state.list = [];
      state.count = 0;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser.firstName = action.payload.firstName;
      state.currentUser.lastName = action.payload.lastName;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.fulfilled, (state, action) => {
        state.count = action.payload?.count;
        state.list = action.payload?.rows;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(logout, () => initialState);
  },
});

export const { refreshUserState, updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
