import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_TICKET, GET_ALL_TICKET, GET_CURRENT_USER_TICKET, GET_TICKET } from "../../Query/index";
import { alertMessage, MESSAGE } from "../ToastifyAlert";

const DeleteTicket = ({ closeModal, ticketId }) => {
  const { data: { ticketByID: ticketsData } = {} } = useLazyQuery(GET_TICKET, {
    variables: { id: Number(ticketId) },
  });

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    refetchQueries: [
      { query: GET_ALL_TICKET, variables: { offset: 0 } },
      { query: GET_CURRENT_USER_TICKET, variables: { offset: 0 } },
    ],
    onCompleted: () => alertMessage(MESSAGE.ticketDeleted),
  });

  const handleDeleteTicket = async () => {
    await deleteTicket({ variables: { id: Number(ticketId) } });
    closeModal({ isDelete: true });
  };

  return (
    <div className="modal">
      <div className="deleteBoxMoal">
        <div className="deleteBoxMoal2">
          <h3 className="closeIcon" onClick={() => closeModal({ isDelete: true })}>
            X
          </h3>
          <p className={"deleteBoxTitle"}>Are you sure you want to delete this ticket?</p>

          <label style={{ color: "grey" }}>Title</label>
          <p style={{ margin: "0px", marginBottom: "10px", marginLeft: "10px" }}>{ticketsData?.title}</p>

          <label style={{ color: "grey" }}>Description</label>
          <p style={{ margin: "0px", marginBottom: "10px", marginLeft: "10px" }}>{ticketsData?.description || "N/A"}</p>

          <label style={{ margin: "0px", color: "grey" }}>Assigned User</label>
          <div
            style={{
              marginTop: "0px",
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              maxWidth: "400px",
              marginLeft: "10px",
            }}
          >
            {ticketsData?.ticketIdUsers?.map((item, index) => (
              <h3 key={item + index} class="userInfo">
                {item.fullName}
              </h3>
            ))}
          </div>

          <button className={"deleteButton"} onClick={() => handleDeleteTicket()} type="submit">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTicket;
