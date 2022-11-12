import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AvatarContainer from "../Styles/SetAvatar";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { toastOptions } from "../assets/toastOptions";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const [avatars, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const navigate = useNavigate();

  const user = useSelector(state => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const fetchImages = useCallback(async () => {
    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!isAuth || user === null) {
      navigate("/login");
    } else {
      fetchImages();
    }
  }, [navigate, fetchImages, isAuth, user]);

  const setProfilePic = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        dispatch(
          userActions.setUser({
            user: { ...user, isAvatarImageSet: true, avatarImage: data.image },
            isAuthenticated: true,
          })
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar", toastOptions);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <AvatarContainer>
          <img src={Loader} alt={Loader} className="loader"></img>
        </AvatarContainer>
      ) : (
        <AvatarContainer>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="Avatar "
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="Submit-btn" onClick={setProfilePic}>
            Set as Profile Picture
          </button>
        </AvatarContainer>
      )}
      <ToastContainer />
    </>
  );
}
