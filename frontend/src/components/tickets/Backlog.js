import React, { useState } from "react";
import { getTicket } from "../../redux/slices/backlogTickets";
import DataTable from "../DataTable";
import AddTicket from "./addTicket";

const Backlog = () => {
  const headers = ["title", "description", "status", "createdAt", "updatedAt"];
  const [modal, setModal] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const openModel = (id) => {
    console.log("🚀 ~ openModel ~ id:", id);
    setTicketId(id);
    setModal((item) => !item);
  };

  return (
    <div className="backlog">
      <div className="backlog2">
        <h3 className="">Backlog Issue</h3>
        <button
          className="createButton"
          type="submit"
          onClick={() => openModel()}
        >
          Create Issue
        </button>
      </div>
      <DataTable
        headers={headers}
        api={getTicket}
        modalToggle={openModel}
        slice="backlog"
      />
      {modal && <AddTicket ticketId={ticketId} closeModal={openModel} />}
    </div>
  );
};
export default Backlog;