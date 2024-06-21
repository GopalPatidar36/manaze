import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../redux/slices/authSlice";
import { getCurrentUser } from "../redux/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleSubmit = (e) => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user.currentUser) dispatch(getCurrentUser());
  }, []);

  return (
    <div className="header">
      <p className="welComeNote">Hi {user?.firstName}! Wel-come to manaze</p>
      <div>
        <button className="profileButton" onClick={() => navigate("/userprofile")} type="submit">
          {user?.firstName && user.firstName[0].toUpperCase()}
          {user?.lastName && user?.lastName[0]?.toUpperCase()}
        </button>
        <button className="logoutButton" onClick={handleSubmit} type="submit">
          logout
          <HiOutlineLogout className="logoutIcon" />
        </button>
      </div>
    </div>
  );
};
export default Header;
