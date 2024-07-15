import React from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MESSAGE = {
  ticketCreated: "Ticket created successfully",
  ticketUpdated: "Ticket updated successfully",
  ticketDeleted: "Ticket deleted successfully",
  userCreated: "User created successfully",
  userUpdated: "User updated successfully",
};

export const alertMessage = (message, type = "success") => {
  toatMessage(message, type);
};

export const toatMessage = (message, type) => {
  if (type === "error") toast.error(message, { theme: "colored" });
  else if (type === "success") toast.success(message);
};

function ToastifyAlert() {
  return (
    <ToastContainer
      transition={Slide}
      autoClose={2000}
      hideProgressBar
      position="top-center"
      theme="light"
      closeOnClick={false}
      pauseOnHover={true}
      progress={false}
    />
  );
}

export default ToastifyAlert;
