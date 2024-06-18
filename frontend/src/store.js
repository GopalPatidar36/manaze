import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/authSlice";
import backlogTickets from "./redux/slices/backlogTickets";

export default configureStore({
  reducer: {
    auth: authReducer,
    backlog: backlogTickets,
  },
});
