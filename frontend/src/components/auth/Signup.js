import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/slices/authSlice";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPass !== password) {
      setPassError("Password and Confirm Password do not match. Please try again");
      return;
    }
    dispatch(registerUser({ firstName, lastName, userEmail: userEmail.toLowerCase(), password }));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };

  return (
    <div className={"mainContainer"}>
      <div className="boxContainer">
        <h3>Signup</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input required value={firstName} placeholder="Enter your first name here" onChange={(ev) => setFirstName(ev.target.value)} className={"inputBox"} />

          <input required value={lastName} placeholder="Enter your last name here" onChange={(ev) => setLastName(ev.target.value)} className={"inputBox"} />

          <input
            type="email"
            required
            value={userEmail}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"inputBox"}
          />
          <input
            required
            type="password"
            minLength={5}
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPassError("");
            }}
            className={"inputBox"}
          />
          <label className="errorLabel">{passError}</label>

          <input
            required
            type="password"
            minLength={5}
            value={confirmPass}
            placeholder="Enter confirm password here"
            onChange={(ev) => {
              setConfirmPass(ev.target.value);
              setPassError("");
            }}
            className={"inputBox"}
          />
          <label className="errorLabel">{passError}</label>

          <button className={"inputButton"} type="submit">
            Signup
          </button>
        </form>
        <Link to="/">Have an account? Log In</Link>
      </div>
    </div>
  );
};

export default connect()(Signup);
