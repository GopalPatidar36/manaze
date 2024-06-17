import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const handleSubmit = (e) => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <p className="welComeNote">Hi {user?.firstName}! Wel-come to manaze</p>
      <button className="logoutButton" onClick={handleSubmit} type="submit">
        logout
        <HiOutlineLogout className="logoutIcon"  />
      </button>
    </div>
  );
};
export default Header;
