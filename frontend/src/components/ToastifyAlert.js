import React from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toatMessage = (message, type) => {
  if (type === "error") toast.error(message, { theme: "colored" });
  else if (type === "success") toast.success(message);
};

function ToastifyAlert() {
  return (
    <ToastContainer
      transition={Slide}
      autoClose={1000}
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
