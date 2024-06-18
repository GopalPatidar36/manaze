import React, { useState } from "react";
import { getTicket } from "../../redux/slices/backlogTickets";
import DataTable from "../DataTable";
import AddTicket from "./addTicket";

const Backlog = () => {
  const headers = ["title", "description", "status", "createdAt", "updatedAt"];
  const [modal, setModal] = useState(false);

  const openModel = () => {
    setModal((item)=>!item);
  };

  return (
    <div className="backlog">
      <button className="createButton" type="submit" onClick={() => openModel()}>
        Create Issue
      </button>
      <DataTable headers={headers} api={getTicket} slice="backlog" />
      {modal && <AddTicket closeModal={openModel}/>}
    </div>
  );
};
export default Backlog;
