import React from "react";
import UserProfile from "./user/UserProfile";
import Backlog from "./tickets/Backlog";
import CurrectUserTickets from "./tickets/CurrectUserTickets"
import Layout from "./Layout";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <UserProfile /> },
      { path: "/issue", element: <CurrectUserTickets /> },
      { path: "/backlog", element: <Backlog /> },
    ],
  },
];
