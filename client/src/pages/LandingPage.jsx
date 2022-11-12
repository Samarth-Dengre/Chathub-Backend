import Container from "../Styles/LandingPage";
import Logo from "../assets/logo.svg";
import Robot from "../assets/robot.gif";
import { useNavigate } from "react-router-dom";
import linkedin from "../assets/linkedin-in.svg";
import github from "../assets/github.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTotalUsers } from "../utils/APIRoutes";

const LandingPage = () => {

  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const data = await axios.get(getTotalUsers);
      if(data.status === false){
        setTotalUsers(100);
      }
      else{
        setTotalUsers(data.data.totalUsers);
      }
    }
    fetchTotalCount();
  });

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Container>
      <nav>
        <div className="brand">
          <img src={Logo} alt="LOGO"></img>
          <h1>ChatHUB</h1>
        </div>

        <div className="links-and-buttons">
          <button onClick={handleRegisterClick}>Sign Up</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </nav>

      <div className="content">
        <img src={Robot} alt="WELCOME"/>
        <div className="introduction">
          <h1 className="gradient">It's easy talking to your friends with ChatHUB</h1>
          <p>One stop for all your chit-chats</p>
        </div>
      </div>
      <div className="traffic-details">
        <span>
          <h3>{totalUsers}+</h3>
          <p>registered users</p>
        </span>
      </div>
      <footer>
        <p>
          Made by <a href="https://github.com/Samarth-Dengre" target="_blank">Samarth Dengre</a>
        </p>
        <div className="socials">
          <a href="https://github.com/Samarth-Dengre" target="_blank">
            <img src={github} alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/samarth-dengre-ba7682244/" target="_blank">
            <img src={linkedin} alt="LinkedIn" />
          </a>
        </div>
      </footer>
    </Container>
  );
};

export default LandingPage;
