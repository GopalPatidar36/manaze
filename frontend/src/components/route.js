import React from "react";
import UserProfile from "./user/UserProfile";
import Backlog from "./tickets/Backlog";
import Layout from "./Layout";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <UserProfile /> },
      { path: "/issue", element: <UserProfile /> },
      { path: "/backlog", element: <Backlog /> },
    ],
  },
];
