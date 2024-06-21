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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, userEmail: userEmail.toLowerCase(), password }));
    setEmail("");
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
  };

  return (
    <div className={"mainContainer"}>
      <div className="boxContainer">
        <div className={"titleContainer"}>
          <div>Signup</div>
        </div>
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
              required
              value={firstName}
              placeholder="Enter your first name here"
              onChange={(ev) => setFirstName(ev.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />

          <div className={"inputContainer"}>
            <input required value={lastName} placeholder="Enter your last name here" onChange={(ev) => setLastName(ev.target.value)} className={"inputBox"} />
          </div>
          <br />

          <div className={"inputContainer"}>
            <input
              type="email"
              required
              value={userEmail}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              required
              type="password"
              minLength={5}
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />
          <button className={"inputButton"} type="submit">
            Signup
          </button>
        </form>
        <br />
        <Link to="/">Have an account? Log In</Link>
      </div>
    </div>
  );
};

export default connect()(Signup);
