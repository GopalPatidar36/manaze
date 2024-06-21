import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) {
      setEmailError("Please Enter Valide email");
      return;
    }
    if (!password) {
      setPasswordError("Please Enter password");
      return;
    }
    dispatch(login({ userEmail, password }));
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className={"mainContainer"}>
      <div className="boxContainer">
        <div className={"titleContainer"}>
          <div>Login</div>
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
              value={userEmail}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)} 
              className={"inputBox"}
              type="email"
              required
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
              required
              type="password"
              minLength={5}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <button className={"inputButton"} type="submit">
            Login
          </button>
        </form>
        <br />
        <Link to="/signup">If you don't have account</Link>
      </div>
    </div>
  );
};

export default Login;
