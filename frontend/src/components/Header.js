import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../redux/slices/authSlice";
import { updateCurrentUser } from "../redux/slices/userSlice";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../Query/index";

const Header = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = !loading ? data?.me : {};
  const [hoverDisabled, setHoverDisabled] = useState([false, false, false]);
  const handleSubmit = (e) => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!loading) dispatch(updateCurrentUser(data.me));
  }, [loading]);

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
