import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicketById, deleteUserFromTicket, assignUserToTicket, updateTicket } from "../../redux/slices/backlogTickets";
import { searchUser, refreshUserState } from "../../redux/slices/userSlice";
import { dataFormate } from "../../utils/index";
import { IoMdTrash } from "react-icons/io";

const TicketDetail = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ticketsData = useSelector((state) => state.backlog.ticketsData);
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [assigneeUser, setAssigneeUser] = useState([]);
  const [selectUser, setSelectUser] = useState();
  const newUsers = useSelector((state) => state.user.list);
  const [isEditFistDiv, setFirstDiv] = useState(false);
  const [isEditSecondDiv, setSecondDiv] = useState(false);

  useEffect(() => {
    if (!ticketsData[id] && id) dispatch(getTicketById({ id: id }));
    else if (ticketsData[id]) {
      setPriority(ticketsData[id].priority);
      setStatus(ticketsData[id].status);
      setTitle(ticketsData[id].title);
      setDescription(ticketsData[id].description);
      setAssigneeUser(ticketsData[id]?.ticketIdUsers || []);
    }
  }, [id, ticketsData[id]]);

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
  }, [selectUser]);

  const addUser = async (e) => {
    const user = newUsers.find((user) => user.fullName === selectUser);
    if (user.uid) {
      setAssigneeUser((item) => [...item, user]);
    }
    dispatch(assignUserToTicket({ ticketId: id, uid: [user.uid] }));
    setSelectUser("");
    dispatch(refreshUserState());
  };

  const deleteUser = (removedUser) => {
    const users = assigneeUser.filter((item) => item.uid !== removedUser.uid);
    setAssigneeUser(users);
    dispatch(deleteUserFromTicket({ ticketId: id, uid: removedUser.uid }));
  };

  const handleSave = () => {
    dispatch(updateTicket({ id, title, description, priority, status }));
  };

  return (
    <div className="detailsContainer">
      <div className="firstDiv">
        <h3>Ticket details</h3>
        <label>Title</label>
        <textarea
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setFirstDiv(true);
          }}
          rows={5}
          cols={10}
        />
        <label>Description</label>
        <textarea
          value={description}
          rows={10}
          onChange={(e) => {
            setDescription(e.target.value);
            setFirstDiv(true);
          }}
        />
        {isEditFistDiv ? (
          <button
            onClick={() => {
              setFirstDiv(false);
              handleSave();
            }}
          >
            Save
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="secondDiv">
        <div className="innerSelectContainer">
          <label>Priority</label>
          <select
            className="selectOption"
            value={priority}
            onChange={(ev) => {
              setPriority(ev.target.value);
              setSecondDiv(true);
            }}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className="innerSelectContainer">
          <label>Status</label>
          <select
            className="selectOption"
            value={status}
            onChange={(ev) => {
              setStatus(ev.target.value);
              setSecondDiv(true);
            }}
          >
            <option value="OPEN">Open</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="CLOSED">Close</option>
          </select>
        </div>

        {isEditSecondDiv ? (
          <button
            className="isEditSecondDiv"
            onClick={() => {
              setSecondDiv(false);
              handleSave();
            }}
          >
            Save
          </button>
        ) : (
          ""
        )}

        <div className="innerSelectContainer">
          <label>Created At</label>
          <p>{dataFormate(ticketsData[id]?.createdAt)}</p>
        </div>

        <div className="innerSelectContainer">
          <label>Updated At</label>
          <p>{dataFormate(ticketsData[id]?.updatedAt)}</p>
        </div>
        <div className="innerSelectContainer">
          <label style={{ marginBottom: "5px" }}>Users</label>
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
        </div>
      </div>
    </div>
  );
};
export default TicketDetail;
