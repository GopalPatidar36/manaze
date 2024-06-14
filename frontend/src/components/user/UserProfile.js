import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const ErrorPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const handleSubmit = (e) => {
    dispatch(logout());
  };

  return (
    <div>
      <h3>token:{token}</h3>{" "}
      <input
        className={"inputButton"}
        type="button"
        onClick={handleSubmit}
        value={"Log out"}
      />
    </div>
  );
};
export default ErrorPage;
