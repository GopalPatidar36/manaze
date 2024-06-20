import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toatMessage } from "../../components/ToastifyAlert";
import api from "../../plugin/axios";
import { logout } from "./authSlice";

export const getTicket = createAsyncThunk("/ticket/search", async (data, thunkAPI) => {
  try {
    const response = await api.get("/ticket/search", { params: data });
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const currentUserTicket = createAsyncThunk("/ticket/me", async (data, thunkAPI) => {
  try {
    const response = await api.get("/ticket/me", { params: data });
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getTicketById = createAsyncThunk("/ticket/id", async (data, thunkAPI) => {
  try {
    const response = await api.get(`/ticket/${data.id}`);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addTicket = createAsyncThunk("/ticket", async (data, thunkAPI) => {
  try {
    const response = await api.put("/ticket", data);
    thunkAPI.dispatch(assignUserToTicket({ ticketId: response.data.id, uid: data.userUids }));
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const deleteTicket = createAsyncThunk("/ticket/deleteId", async (data, thunkAPI) => {
  try {
    await api.delete(`/ticket/${data.ticketId}`, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateTicket = createAsyncThunk("/updateTicket/", async (data, thunkAPI) => {
  try {
    const response = await api.post(`/ticket/${data.id}`, data);
    thunkAPI.dispatch(assignUserToTicket({ ticketId: data.id, uid: data.userUids }));
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const assignUserToTicket = createAsyncThunk("/userticket/put", async (data, thunkAPI) => {
  try {
    await api.put(`/userticket/${data.ticketId}`, data);
    return { ticketId: data.ticketId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteUserFromTicket = createAsyncThunk("/userticket/delete", async (data, thunkAPI) => {
  try {
    await api.delete(`/userticket/${data.ticketId}`, { data });
    return { ticketId: data.ticketId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const initialState = {
  count: 0,
  list: [],
  status: "idel",
  ticketsData: {},
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
      })
      .addCase(addTicket.fulfilled, () => {
        toatMessage("Ticket logged successfuly", "success");
      })
      .addCase(currentUserTicket.fulfilled, (state, action) => {
        state.count = action.payload?.count;
        state.list = action.payload?.rows;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.ticketsData[action.payload.id] = action.payload;
      })
      .addCase(assignUserToTicket.fulfilled, (state, action) => {
        state.ticketsData[action.payload.ticketId] = null;
      })
      .addCase(logout, () => initialState);
  },
});

export const { refreshState } = backlogSlice.actions;
export default backlogSlice.reducer;
