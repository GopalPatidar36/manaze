import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toatMessage } from "../../components/ToastifyAlert";
import api from "../../plugin/axios";
import { logout } from "./authSlice";
export const getTicket = createAsyncThunk("/ticket/search", async (data) => {
  const response = await api.get("/ticket/search", { params: data });
  return response?.data;
});

export const addTicket = createAsyncThunk("/ticket", async (data) => {
  const response = await api.put("/ticket", data);
  return response?.data;
});

export const initialState = {
  count: 0,
  list: [],
  status: "idel",
};

const backlogSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshState: (state) => {
      state.list = [];
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.count = action.payload?.count;
        state.list = action.payload?.rows;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toatMessage(action.error.message, "error");
      })
      .addCase(addTicket.fulfilled, () => {
        toatMessage("Ticket logged successfuly", "success");
      })
      .addCase(logout, () => initialState);
  },
});

export const { refreshState } = backlogSlice.actions;
export default backlogSlice.reducer;
