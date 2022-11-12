import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import FormContainer from "../Styles/FormContainer";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../assets/toastOptions";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import Input from "../assets/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import NavBar from "../components/NavBar";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && user !== null) {
      navigate("/");
    }
  }, [user, navigate, isAuth]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        console.log(data.eror);
        return;
      }
      if (data.status === true) {
        dispatch(
          userActions.setUser({
            user: data.user,
            isAuthenticated: true,
          })
        );
        navigate("/");
      }
    }
  };

  const handleValidation = useCallback(() => {
    const { password, username } = values;
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than or equal to 8 characters",
        toastOptions
      );
      return false;
    }

    return true;
  }, [values]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
      <NavBar/>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div className="brand">
            <img src={Logo} alt="LOGO"></img>
            <h1>Chathub</h1>
          </div>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <NavLink to="/register">Register</NavLink>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </React.Fragment>
  );
}
