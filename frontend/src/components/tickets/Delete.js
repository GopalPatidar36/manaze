import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshState, getTicketById, deleteTicket } from "../../redux/slices/backlogTickets";

const DeleteTicket = ({ closeModal, ticketId }) => {
  const ticketsData = useSelector((state) => state.backlog.ticketsData);

  const dispatch = useDispatch();

  const handleDeleteTicket = async () => {
    dispatch(deleteTicket({ ticketId }));
    await dispatch(refreshState());
    await closeModal({ isDelete: true });
  };

  useEffect(() => {
    if (!ticketsData[ticketId] && ticketId) dispatch(getTicketById({ id: ticketId }));
  }, []);

  return (
    <div className="modal">
      <div className="deleteBoxMoal">
        <div className="deleteBoxMoal2">
          <h3 className="closeIcon" onClick={() => closeModal({ isDelete: true })}>
            X
          </h3>
          <p className={"deleteBoxTitle"}>Are you sure you want to delete this ticket?</p>

          <label style={{ color: "grey" }}>Title</label>
          <p style={{ margin: "0px", marginBottom: "10px", marginLeft: "10px" }}>{ticketsData[ticketId]?.title}</p>

          <label style={{ color: "grey" }}>Description</label>
          <p style={{ margin: "0px", marginBottom: "10px", marginLeft: "10px" }}>{ticketsData[ticketId]?.description || "N/A"}</p>

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
            {ticketsData[ticketId]?.ticketIdUsers?.map((item, index) => (
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
