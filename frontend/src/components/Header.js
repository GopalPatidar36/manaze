import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../redux/slices/authSlice";
import { updateCurrentUser } from "../redux/slices/userSlice";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../Query/index";
import HeaderElement from "../CustomElement/HeaderElement";

const Header = () => {
  const headerRef = useRef();
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = !loading ? data?.me : {};
  const [hoverDisabled, setHoverDisabled] = useState(false);
  const handleSubmit = (e) => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!loading) dispatch(updateCurrentUser(data.me));
  }, [loading]);

  useEffect(() => {
    if (hoverDisabled) setHoverDisabled(false);
    headerRef.current.navigate = navigate;
    headerRef.current.logout = handleSubmit;
  }, [hoverDisabled]);

  return (
    <header-element ref={headerRef} hoverDisabled={hoverDisabled}>
      <span slot="headerTitle">Hi {user?.firstName}! Wel-come to manaze</span>
      <span slot="buttonTitle">
        {user?.firstName && user.firstName[0].toUpperCase()}
        {user?.lastName && user?.lastName[0]?.toUpperCase()}
      </span>
      <span slot="logout">
        logout
        <HiOutlineLogout class="logoutIcon" />
      </span>
    </header-element>
  );
};
export default Header;
