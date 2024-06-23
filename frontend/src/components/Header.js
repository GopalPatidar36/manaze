import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../redux/slices/authSlice";
import { getCurrentUser } from "../redux/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [hoverDisabled, setHoverDisabled] = useState([false, false, false]);
  const handleSubmit = (e) => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user.currentUser) dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    if (hoverDisabled) setHoverDisabled(false);
  }, [hoverDisabled]);

  return (
    <div className="header">
      <p className="welComeNote">Hi {user?.firstName}! Wel-come to manaze</p>
      <div className="dropDown">
        <button className="dropButton">
          {user?.firstName && user.firstName[0].toUpperCase()}
          {user?.lastName && user?.lastName[0]?.toUpperCase()}
        </button>
        <div style={hoverDisabled ? { display: "none" } : {}} className="dropContain">
          <button
            className="profileSettingBtn"
            onClick={() => {
              navigate("/userprofile");
              setHoverDisabled(true);
            }}
            type="submit"
          >
            Profile Settings
          </button>
          <button className="logoutButton" onClick={handleSubmit} type="submit">
            logout
            <HiOutlineLogout className="logoutIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
