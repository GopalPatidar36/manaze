import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";
import backlogTickets from "./redux/slices/backlogTickets";
import errorMiddleware from "./redux/slices/errorMiddleware";
import userSlice from "./redux/slices/userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    backlog: backlogTickets,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware),
});
