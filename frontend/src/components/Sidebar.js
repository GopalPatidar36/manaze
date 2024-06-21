import React from "react";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher, FaBoxTissue } from "react-icons/fa";
import { SiNamecheap } from "react-icons/si";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <NavLink to="/">
        <FaChalkboardTeacher className="sidebarIcon" /> Board
      </NavLink> */}
      <NavLink to="/">
        <FaBoxTissue className="sidebarIcon" /> Issue
      </NavLink>
      <NavLink to="/backlog">
        <SiNamecheap className="sidebarIcon" />
        Backlog
      </NavLink>
    </div>
  );
};

export default Sidebar;
