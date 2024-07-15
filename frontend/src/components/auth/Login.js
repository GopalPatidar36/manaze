import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";
import { updateAuthState } from "../../redux/slices/authSlice";
import { toatMessage } from "../../components/ToastifyAlert";

const LOGIN = gql`
  query Login($userEmail: String!, $password: String!) {
    login(userEmail: $userEmail, password: $password) {
      token
      user {
        uid
        userEmail
        password
        firstName
        lastName
      }
    }
  }
`;

const Login = (props) => {
  const [login, { loading, error, data }] = useLazyQuery(LOGIN, {
    context: { public: true },
    onError: (error) => {
      toatMessage("Please enter valid username and password", "error");
    },
  });

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
    login({ variables: { userEmail, password } });
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  useEffect(() => {
    if (data?.login?.token) dispatch(updateAuthState(data.login));
  }, [loading, error, data]);
  return (
    <div className={"mainContainer"}>
      <div className="boxContainer">
        <h3>Login</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            value={userEmail}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"inputBox"}
            type="email"
            required
          />
          <label className="errorLabel">{emailError}</label>

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
          <Button sx={{ margin: "15px" }} disabled={loading} variant="contained" type="submit" color="success" size="large" className="inputButton">
            Login
          </Button>
        </form>
        <Link to="/signup">If you don't have account</Link>
      </div>
    </div>
  );
};

export default Login;
