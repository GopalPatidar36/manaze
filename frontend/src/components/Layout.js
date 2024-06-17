import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar style={{ display: "flex", justifyContent: "center" }} />
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
