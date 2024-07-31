import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserFromTicket } from "../../redux/slices/backlogTickets";
import { refreshUserState } from "../../redux/slices/userSlice";
import { IoMdTrash } from "react-icons/io";
import { useOutsideClick } from "../UseOutsideClick";
import { UPDATE_TICKET, GET_ALL_TICKET, GET_CURRENT_USER_TICKET, GET_TICKET, CREATE_TICKET, SEARCH_USER } from "../../Query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { alertMessage, MESSAGE } from "../ToastifyAlert";

const AddTicket = ({ closeModal, ticketId } = {}) => {
  const [getTicketDetail, { loading: loadTD, data: getTD }] = useLazyQuery(GET_TICKET, {
    variables: { id: Number(ticketId) },
  });

  const [searchUser, { data: { userList: { rows: newUsers = [] } = {} } = {}, loading: userLoading } = {}] = useLazyQuery(SEARCH_USER, {
    fetchPolicy: "no-cache",
  });

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    refetchQueries: [
      { query: GET_ALL_TICKET, variables: { offset: 0 } },
      { query: GET_CURRENT_USER_TICKET, variables: { offset: 0 } },
      { query: GET_TICKET, variables: { id: Number(ticketId) } },
    ],
    onCompleted: () => alertMessage(MESSAGE.ticketUpdated),
  });

  const [addTicket] = useMutation(CREATE_TICKET, {
    refetchQueries: [
      { query: GET_ALL_TICKET, variables: { offset: 0 } },
      { query: GET_CURRENT_USER_TICKET, variables: { offset: 0 } },
    ],
    onCompleted: () => alertMessage(MESSAGE.ticketCreated),
  });

  const ticketsData = !loadTD && getTD?.ticketByID ? getTD.ticketByID : {};

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
    if (!ticketId) await addTicket({ variables: { title, description, priority, status } });
    else await updateTicket({ variables: { id: Number(ticketId), title, description, priority, status } });
    setTitle("");
    setDescription("");
    setTitleError("");
    closeModal({ isEdit: true });
  };

  useEffect(() => {
    if (selectUser)
      searchUser({
        variables: { firstName: `or|%${selectUser}%`, userEmail: `or|%${selectUser}%`, lastName: `or|%${selectUser}%`, fullName: `or|%${selectUser}%` },
      });
    if (refreState) {
      setRefreState(false);
    }
  }, [selectUser]);

  useEffect(() => {
    if (ticketsData?.id) {
      setDescription(ticketsData.description);
      setTitle(ticketsData.title);
      setAssigneeUser(ticketsData?.ticketUsersDetails || []);
    }
  }, [ticketsData]);

  useEffect(() => {
    if (ticketId) getTicketDetail({ variables: { id: Number(ticketId) } });
  }, []);

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

  const ref = useOutsideClick(() => {
    handleClose();
  });

  return (
    <div className="modal">
      <div className="boxMoal" ref={ref}>
        <h3 className="closeIcon" onClick={() => handleClose()}>
          X
        </h3>
        <p className={"boxTitle"}>{ticketId ? "Update" : " Log new"} ticket</p>
        <form style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "12px" }} onSubmit={handleSubmit}>
          <label className="modalErrorLabel">{titleError}</label>
          <input value={title} placeholder="Enter title" onChange={(ev) => setTitle(ev.target.value)} className={"modalInput"} />
          <input value={description} placeholder="Enter description" onChange={(ev) => setDescription(ev.target.value)} className={"modalInput"} />

          <div className="selectContainer">
            <div className="innerSelectContainer">
              <label>Priority</label>
              <select className="selectOption" id="priority" value={priority} onChange={(ev) => setPriority(ev.target.value)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div className="innerSelectContainer">
              <label>Status</label>
              <select className="selectOption" id="status" value={status} onChange={(ev) => setStatus(ev.target.value)}>
                <option value="OPEN">Open</option>
                <option value="INPROGRESS">In Progress</option>
                <option value="CLOSED">Close</option>
              </select>
            </div>
          </div>

          <div className="datalistContainer">
            <input
              className={"datalistInput"}
              value={selectUser}
              placeholder="Search User"
              type="text"
              list="data"
              onChange={(ev) => setSelectUser(ev.target.value)}
            />
            <datalist id="data">
              {newUsers.map((item, key) => (
                <>
                <option key={key} value={item.fullName} />
                </>
              ))}
            </datalist>
            <button type="button" className="datalistButton" disabled={!selectUser} onClick={() => addUser()}>
              Add
            </button>
          </div>

          <div className="assignUser">
            {assigneeUser.map((item, index) => (
              <h3 key={item + index} className="userInfo">
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
