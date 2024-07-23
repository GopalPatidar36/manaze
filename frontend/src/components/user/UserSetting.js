import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CURRENT_USER, UPDATE_USER } from "../../Query/index";
import { alertMessage } from "../ToastifyAlert";

const UserSetting = (props) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const user = !loading ? data?.me : {};

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onCompleted: () => alertMessage("userUpdated"),
  });

  const [isEdit, setIsEdit] = useState(true);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const handleSubmit = (e) => {
    setIsEdit((item) => !item);
    if (user.uid) {
      updateUser({ variables: { uid: user.uid, firstName, lastName } });
    }
  };

  useEffect(() => {
    if (data?.me) {
      setFirstName(data?.me.firstName);
      setLastName(data?.me.lastName);
    }
  }, [data]);

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
