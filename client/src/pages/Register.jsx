import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toastOptions } from "../assets/toastOptions";
import { NavLink, useNavigate } from "react-router-dom";
import FormContainer from "../Styles/FormContainer";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import Input from "../assets/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import NavBar from "../components/NavBar";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.isAuthenticated);
  useEffect(() => {
    if(isAuth){
      navigate('/');
    }
  }, [isAuth, navigate]);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        return;
      }
      if (data.status === true) {
        dispatch(userActions.setUser({
          user: data.user,
          isAuthenticated: true
        }))
        navigate("/setAvatar");
      }
    }
  };

  const handleValidation = useCallback(() => {
    const { password, confirmPassword, username, email } = values;
    if (password.length < 8) {
      toast.error(
        "Password should be greater than or equal to 8 characters",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is empty!!!", toastOptions);
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
            <h1>ChatHub</h1>
          </div>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <NavLink to="/login">Login</NavLink>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </React.Fragment>
  );
}
