import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";

const UserSetting = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [isEdit, setIsEdit] = useState(true);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleSubmit = (e) => {
    setIsEdit((item) => !item);
    if (user.uid) dispatch(updateUser({ uid: user.uid, firstName, lastName }));
  };

  return (
    <div className="userSetting">
      <div className="innerUserSetting">
        <h3>Personal Information</h3>
        {isEdit ? (
          <button type="submit" onClick={() => setIsEdit((item) => !item)}>
            Edit
          </button>
        ) : (
          <button type="button" onClick={() => handleSubmit()}>
            Save
          </button>
        )}
        <div className="formUserSetting">
          <div className="fieldContainer">
            <label>First Name</label>
            {!isEdit ? (
              <input value={firstName} type="text" placeholder="Enter your first name here" onChange={(ev) => setFirstName(ev.target.value)} />
            ) : (
              <p>{firstName}</p>
            )}
          </div>

          <div className="fieldContainer">
            <label>Last Name</label>
            {!isEdit ? (
              <input value={lastName} type="text" placeholder="Enter your last name here" onChange={(ev) => setLastName(ev.target.value)} />
            ) : (
              <p>{lastName}</p>
            )}
          </div>

          <div className="fieldContainer">
            <label>Role</label>
            <p>{user.role}</p>
          </div>

          <div className="fieldContainer">
            <label>User Email</label>
            <p>{user.userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
