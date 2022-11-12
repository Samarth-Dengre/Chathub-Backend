import { Button } from "../Styles/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    dispatch(
      userActions.setUser({
        user: null,
        isAuthenticated: false,
      })
    );
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

export default Logout;
