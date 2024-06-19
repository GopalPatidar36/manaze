import { isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toatMessage } from "../../components/ToastifyAlert";
import { logout } from "./authSlice";

const errorMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      toatMessage(action.payload.message || "An error occurred", "error");
       if(action.payload.statusCode===401) dispatch(logout());
    } else if (isFulfilled(action) && action.payload?.toastType) {
      toatMessage(action.payload.message, "success");
    }
    return next(action);
  };

export default errorMiddleware;
