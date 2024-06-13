import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onButtonClick = () => {
    // You'll update this function later...
  };

  return (
    <div className={"mainContainer"}>
      <div className="boxContainer">
        <div className={"titleContainer"}>
          <div>Signup</div>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={firstName}
            placeholder="Enter your first name here"
            onChange={(ev) => setFirstName(ev.target.value)}
            className={"inputBox"}
          />
        </div>
        <br />

        <div className={"inputContainer"}>
          <input
            value={lastName}
            placeholder="Enter your last name here"
            onChange={(ev) => setLastName(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />

        <div className={"inputContainer"}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Sign up"}
          />
        </div>
        <br />
        <Link to="/">Have an account? Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
