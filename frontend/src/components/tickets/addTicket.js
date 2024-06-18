import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket, refreshState } from "../../redux/slices/backlogTickets";
import { IoMdClose } from "react-icons/io";

const AddTicket = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!title) {
      setTitleError("Please Enter the ticket title");
      return;
    }
    await dispatch(addTicket({ title, description }));
    await dispatch(refreshState())
    setTitle("");
    setDescription("");
    setTitleError("");
    closeModal();
  };

  return (
    <div className="modal">
      <div className="boxMoal">
        <IoMdClose className="closeIcon" onClick={() => closeModal()} />
        <div className="boxModalContainer">
          <h3 className={"boxTitle"}>Log new ticket</h3>
          <br />
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <div className={"inputContainer"}>
              <input
                value={title}
                placeholder="Enter title"
                onChange={(ev) => setTitle(ev.target.value)}
                className={"inputBox"}
              />
              <label className="errorLabel">{titleError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
              <input
                value={description}
                placeholder="Enter description"
                onChange={(ev) => setDescription(ev.target.value)}
                className={"inputBox"}
              />
            </div>
            <br />
            <button className={"inputButton"} type="submit">
              Create
            </button>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
