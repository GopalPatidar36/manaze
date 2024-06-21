import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toatMessage } from "../../components/ToastifyAlert";
import api from "../../plugin/axios";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  localStorage.setItem("accessToken", response?.data?.token);
  return response?.data;
});

export const registerUser = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  try {
    const response = await api.put("/auth/register", credentials);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  status: "loading",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload?.token;
        state.currentUser = action.payload?.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toatMessage("Please enter valid username and password", "error");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        toatMessage("user created successfully", "success");
      });
  },
});

export const { logout, changeUserState } = authSlice.actions;
export default authSlice.reducer;
