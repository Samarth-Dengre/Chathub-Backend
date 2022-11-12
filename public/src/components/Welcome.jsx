import React from "react";
import { useSelector } from "react-redux";
import Robot from "../assets/robot.gif";
import { Container } from "../Styles/Welcome";
const Welcome = (props) => {
  const user = useSelector(state => state.user.user);
  return (
    <React.Fragment>
      <Container>
        <img src={Robot} alt="ROBOT"></img>
        <h1>
          Welcome, <span>{user.username}!</span>
        </h1>
        <h3>Please select a chat to start messaging</h3>
      </Container>
    </React.Fragment>
  );
};

export default Welcome;
