import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, refreshState, getTicketById, updateTicket, deleteUserFromTicket } from "../../redux/slices/backlogTickets";
import { searchUser, refreshUserState } from "../../redux/slices/userSlice";
import { IoMdClose, IoMdTrash } from "react-icons/io";

const AddTicket = ({ closeModal, ticketId } = {}) => {
  const newUsers = useSelector((state) => state.user.list);
  const ticketsData = useSelector((state) => state.backlog.ticketsData);

  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [refreState, setRefreState] = useState(false);
  const [assigneeUser, setAssigneeUser] = useState([]);
  const [selectUser, setSelectUser] = useState();
  const [titleError, setTitleError] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [status, setStatus] = useState("OPEN");

  const [userUids, setUserUids] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setTitleError("Please Enter the ticket title");
      return;
    }
    if (!ticketId) await dispatch(addTicket({ title, description, userUids, priority, status }));
    else await dispatch(updateTicket({ id: ticketId, title, description, userUids, priority, status }));
    await dispatch(refreshState());
    setTitle("");
    setDescription("");
    setTitleError("");
    closeModal({ isEdit: true });
  };

  useEffect(() => {
    if (selectUser)
      dispatch(
        searchUser({
          firstName: `or|%${selectUser}%`,
          userEmail: `or|%${selectUser}%`,
          lastName: `or|%${selectUser}%`,
          fullName: `or|%${selectUser}%`,
        })
      );

    if (refreState) {
      setRefreState(false);
    }
  }, [selectUser]);

  useEffect(() => {
    if (!ticketsData[ticketId] && ticketId) dispatch(getTicketById({ id: ticketId }));
    else if (ticketsData[ticketId]) {
      setDescription(ticketsData[ticketId].description);
      setTitle(ticketsData[ticketId].title);
      setAssigneeUser(ticketsData[ticketId]?.ticketIdUsers || []);
    }
  }, [ticketId, ticketsData[ticketId]]);

  const addUser = async (e) => {
    const user = newUsers.find((user) => user.fullName === selectUser);
    if (user.uid) {
      setAssigneeUser((item) => [...item, user]);
      setUserUids((item) => [...item, user.uid]);
    }
    setRefreState(true);
    setSelectUser("");
    dispatch(refreshUserState());
  };

  const handleClose = () => {
    closeModal({ isEdit: true });
    dispatch(refreshUserState());
  };

  const deleteUser = (removedUser) => {
    setRefreState(true);
    const users = assigneeUser.filter((item) => item.uid !== removedUser.uid);
    setAssigneeUser(users);
    dispatch(deleteUserFromTicket({ ticketId, uid: removedUser.uid }));
  };

  return (
    <div className="modal">
      <div className="boxMoal">
        <h3 className="closeIcon" onClick={() => handleClose()}>
          X
        </h3>
        <p className={"boxTitle"}>{ticketId ? "Update" : " Log new"} ticket</p>
        <form style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
          <label className="modalErrorLabel">{titleError}</label>
          <input value={title} placeholder="Enter title" onChange={(ev) => setTitle(ev.target.value)} className={"modalInput"} />
          <input value={description} placeholder="Enter description" onChange={(ev) => setDescription(ev.target.value)} className={"modalInput"} />

          <div className="selectContainer">
            <div className="innerSelectContainer">
              <label>Priority</label>
              <select className="selectOption" id="country" value={priority} onChange={(ev) => setPriority(ev.target.value)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div className="innerSelectContainer">
              <label>Status</label>
              <select className="selectOption" id="country" value={status} onChange={(ev) => setStatus(ev.target.value)}>
                <option value="OPEN">Open</option>
                <option value="INPROGRESS">In Progress</option>
                <option value="CLOSED">Close</option>
              </select>
            </div>
          </div>

          <div className="datalistContainer">
            <input
              className={"datalistBox"}
              value={selectUser}
              placeholder="Search User"
              type="text"
              list="data"
              onChange={(ev) => setSelectUser(ev.target.value)}
            />
            <datalist id="data">
              {newUsers.map((item, key) => (
                <option key={key} value={item.fullName} />
              ))}
            </datalist>
            <button type="button" className="datalistButton" disabled={!selectUser} onClick={() => addUser()}>
              Add
            </button>
          </div>

          <div className="assignUser">
            {assigneeUser.map((item, index) => (
              <h3 key={item + index} class="userInfo">
                {item.fullName}
                <button type="button" className="deleteIcon" onClick={() => deleteUser(item)}>
                  <IoMdTrash />
                </button>
              </h3>
            ))}
          </div>

          <button className={"inputButton"} type="submit">
            {ticketId ? "Update" : "Create"}
          </button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default AddTicket;
