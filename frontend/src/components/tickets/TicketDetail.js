import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserFromTicket, assignUserToTicket } from "../../redux/slices/backlogTickets";
import { searchUser, refreshUserState } from "../../redux/slices/userSlice";
import { dataFormate } from "../../utils/index";
import { IoMdTrash } from "react-icons/io";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TICKET, GET_ALL_TICKET, GET_CURRENT_USER_TICKET, UPDATE_TICKET } from "../../Query/index";
import { alertMessage } from "../ToastifyAlert";

const TicketDetail = ({}) => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_TICKET, {
    variables: { id: Number(id) },
  });

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    refetchQueries: [{ query: GET_ALL_TICKET }, { query: GET_CURRENT_USER_TICKET }, { query: GET_TICKET, variables: { id: Number(id) } }],
    onCompleted: (success) => alertMessage("ticketUpdated"),
  });

  const dispatch = useDispatch();
  const ticketsData = !loading && data?.ticketByID ? data?.ticketByID : {};
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
    if (ticketsData.id) {
      setPriority(ticketsData.priority);
      setStatus(ticketsData.status);
      setTitle(ticketsData.title);
      setDescription(ticketsData.description);
      setAssigneeUser(ticketsData?.ticketUsersDetails || []);
    }
  }, [id, ticketsData]);

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
    updateTicket({ variables: { id: Number(id), title, description, priority, status } });
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
        <br />
        <label className="label">Priority</label>
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

        <label className="label">Status</label>
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

        <label className="label">Created At</label>
        <p>{dataFormate(ticketsData?.createdAt)}</p>

        <label className="label">Updated At</label>
        <p>{dataFormate(ticketsData?.updatedAt)}</p>

        <div className="innerSelectContainer">
          <label style={{ marginBottom: "5px" }}>Users</label>
          <div className="datalistContainer">
            <input
              className="datalistInput"
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
              <h3 key={item + index} className="userInfo">
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
