import React, { Fragment, useState } from "react";
import NavBarContainer from "../Styles/NavBar";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../assets/searchengin.svg";
import { Cancel } from "@mui/icons-material";
import axios from "axios";
import { searchRoute } from "../utils/APIRoutes";
import SearchedUsers from "./SearchedUsers";
const NavBar = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [value, setValue] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const loggedUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const navigateToHomeHandler = () => {
    navigate("/");
  };
  const setAvatarClickHandler = () => {
    navigate("/setAvatar");
  };
  const navigateToProfileHandler = () => {
    navigate(`/users/id=${loggedUser._id}`);
  };

  const handleSearch = async (e) => {
    const word = e.target.value;
    if (word.length !== 0) {
      setValue(word);
      setIsEmpty(false);
      const { data } = await axios.get(`${searchRoute}/${word}`);
      if (data.status === true) {
        setFetchedUsers(data.users);
      }
    } else {
      setValue("");
      setIsEmpty(true);
    }
  };

  const handleCancelSearch = () => {
    setIsEmpty(true);
    setValue("");
  };

  return (
    <Fragment>
      <NavBarContainer>
        <div className="brand">
          <img onClick={navigateToHomeHandler} src={Logo} alt="LOGO"></img>
          <h1 onClick={navigateToHomeHandler}>ChatHUB</h1>
        </div>
        {isAuth && (
          <>
            <div className="navigation-buttons">
              <button onClick={navigateToHomeHandler}>HOME</button>
              <button onClick={navigateToProfileHandler}>MY PROFILE</button>
              <button
                className="set-new-avatar"
                onClick={setAvatarClickHandler}
              >
                Change Avatar
              </button>
            </div>
            <div className="right-links-and-buttons">
              <div className="search-bar">
                <input type="text" onChange={handleSearch} value={value} />
                {isEmpty ? (
                  <button className="search-button">
                    <img src={Search} alt="search" className="search-buttons" />
                  </button>
                ) : (
                  <button
                    className="search-button"
                    onClick={handleCancelSearch}
                  >
                    <Cancel id="cancel-button" className="search-buttons" />
                  </button>
                )}
                {!isEmpty && <SearchedUsers users={fetchedUsers} />}
              </div>
              <Logout />
            </div>
          </>
        )}
      </NavBarContainer>
    </Fragment>
  );
};

export default NavBar;
