import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        boxSizing:"border-box",
      }}
    >
      <Header />
      <Sidebar />
      <div className="outletContainer">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;

