import React from "react";
import SearchedUsersContainer from "../Styles/SearchedUsers";
import { Person, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { addFriendRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../assets/toastOptions";
import "react-toastify/dist/ReactToastify.css";
const SearchedUsers = ({ users }) => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user.user);

  const viewProfile = (id) => {
    return () => {
      navigate(`/users/id=${id}`);
    };
  };

  const addFriend = (friendId) => {
    return async () => {
      const { data } = await axios.get(
        `${addFriendRoute}/?fromId=${loggedUser._id}&toId=${friendId}`
      );

      if (data.status === true) {
        toast.success(`New Friend Added`, toastOptions);
      } else if (data.status === false && data.isFriend === true) {
        toast.error(data.msg, toastOptions);
      }
    };
  };

  return (
    <>
      <ToastContainer />
      <SearchedUsersContainer>
        <div className="users">
          {users.length > 0 ? (
            users.map((user, index) => {
              return (
                <div className="user" key={index}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${user.avatarImage}`}
                      alt="avatar"
                    ></img>
                  </div>
                  <div className="username">
                    <h3>{user.username}</h3>
                  </div>
                  <div className="view-profile">
                    <Person
                      onClick={viewProfile(user._id)}
                      className="searched-users-buttons"
                    />
                    {user._id !== loggedUser._id && (
                      <Add
                        className="searched-users-buttons"
                        onClick={addFriend(user._id)}
                      />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No user exists with this name</p>
          )}
        </div>
      </SearchedUsersContainer>
    </>
  );
};

export default SearchedUsers;
