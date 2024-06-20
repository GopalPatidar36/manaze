import React from "react";
import Board from "./tickets/Board";
import Backlog from "./tickets/Backlog";
import CurrectUserTickets from "./tickets/CurrectUserTickets"
import Layout from "./Layout";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Board /> },
      { path: "/issue", element: <CurrectUserTickets /> },
      { path: "/backlog", element: <Backlog /> },
    ],
  },
];
