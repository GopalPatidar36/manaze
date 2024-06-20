import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toatMessage } from "../../components/ToastifyAlert";
import api from "../../plugin/axios";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  localStorage.setItem("accessToken", response?.data?.token);
  localStorage.setItem("currentUser", JSON.stringify(response?.data?.user))
  return response?.data;
});

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  status: "loading",
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action)
        state.status = "succeeded";
        state.accessToken = action.payload?.token;
        state.currentUser = action.payload?.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toatMessage("Please enter valid username and password", "error");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
