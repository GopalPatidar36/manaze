import React from "react";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";

export default [
  {
    path: "/",
    element: <Login />,
    isAuthRoute: true
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
    isAuthRoute: true
  },
  {
    path: "/signup",
    element: <Signup />,
    isAuthRoute: true
  },
];
