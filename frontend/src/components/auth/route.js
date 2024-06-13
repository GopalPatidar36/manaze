import React from "react";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";

export default [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];
