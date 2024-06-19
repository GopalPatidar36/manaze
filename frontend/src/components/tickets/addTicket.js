import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, refreshState, getTicketById, updateTicket } from "../../redux/slices/backlogTickets";
import { searchUser, refreshUserState } from "../../redux/slices/userSlice";
import { IoMdClose } from "react-icons/io";

const AddTicket = ({ closeModal, ticketId }) => {
  const newUsers = useSelector((state) => state.user.list);
  const ticketsData = useSelector((state) => state.backlog.ticketsData);

  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [userAdded, setUserAdded] = useState(false);
  const [assigneeUser, setAssigneeUser] = useState([]);
  const [selectUser, setSelectUser] = useState();
  const [titleError, setTitleError] = useState("");

  const [userUids, setUserUids] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setTitleError("Please Enter the ticket title");
      return;
    }
    if (!ticketId) await dispatch(addTicket({ title, description, userUids }));
    else await dispatch(updateTicket({ id: ticketId, title, description, userUids }));
    await dispatch(refreshState());
    setTitle("");
    setDescription("");
    setTitleError("");
    closeModal();
  };

  const addUser = async () => {
    setAssigneeUser((item) => [...item, { fullName: selectUser }]);
    const uid = newUsers.find((user) => user.fullName === selectUser).uid;
    uid && setUserUids((item) => [...item, uid]);
    setUserAdded(true);
    setSelectUser("");
    dispatch(refreshUserState());
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

    if (userAdded) {
      setUserAdded(false);
    }
  }, [selectUser]);

  useEffect(() => {
    if (!ticketsData[ticketId]) dispatch(getTicketById({ id: ticketId }));
    else {
      setDescription(ticketsData[ticketId].description);
      setTitle(ticketsData[ticketId].title);
      setAssigneeUser(ticketsData[ticketId]?.ticketIdUsers || []);
    }
  }, [ticketId, ticketsData[ticketId]]);

  const handleClose = () => {
    closeModal();
    dispatch(refreshUserState());
  };

  return (
    <div className="modal">
      <div className="boxMoal">
        <IoMdClose className="closeIcon" onClick={() => handleClose()} />
        <div className="boxModalContainer">
          <h3 className={"boxTitle"}>Log new ticket</h3>
          <br />
          <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
            <div className={"inputContainer"}>
              <input value={title} placeholder="Enter title" onChange={(ev) => setTitle(ev.target.value)} className={"inputBox"} />
              <label className="errorLabel">{titleError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
              <input value={description} placeholder="Enter description" onChange={(ev) => setDescription(ev.target.value)} className={"inputBox"} />
            </div>
            <br />

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
              <button className="datalistButton" disabled={!selectUser} onClick={() => addUser()}>
                Add User
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignSelf: "start" }}>
              {assigneeUser.map((item, index) => (
                <div key={item + index} style={{ marginLeft: "5px" }}>
                  <h3>{item.fullName}</h3>
                </div>
              ))}
            </div>

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
