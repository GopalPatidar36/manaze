import React, { useState } from "react";
import { getTicket } from "../../redux/slices/backlogTickets";
import DataTable from "../DataTable";
import AddTicket from "./addTicket";
import DeleteTicket from "./Delete";
import { GET_ALL_TICKET } from "../../Query/index";
const Backlog = () => {
  const headers = [
    { field: "title", searchable: true },
    { field: "description", searchable: true },
    { field: "priority" },
    { field: "status" },
    { field: "createdAt" },
    { field: "updatedAt" },
  ];
  const [modal, setModal] = useState(false);
  const [deleteTicket, setDeleteTicket] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const openModel = ({ id, isEdit, isDelete }) => {
    setTicketId(id);
    if (isEdit) setModal((item) => !item);
    else if (isDelete) setDeleteTicket((item) => !item);
  };

  return (
    <div className="backlog">
      <div className="backlog2">
        <h3 className="">Backlog Issue</h3>
        <button className="createButton" type="submit" onClick={() => openModel({ isEdit: true })}>
          Create Issue
        </button>
      </div>
      <DataTable headers={headers} api={getTicket} modalToggle={openModel} query={GET_ALL_TICKET} slice="ticketList" />
      {modal && <AddTicket ticketId={ticketId} closeModal={openModel} />}
      {deleteTicket && <DeleteTicket ticketId={ticketId} closeModal={openModel} />}
    </div>
  );
};
export default Backlog;
