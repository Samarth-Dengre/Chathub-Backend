import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "../../Styles/MessagesContainer";
import ChatInput from "../Chat/ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
const MessagesContainer = (props) => {
  const { currentChat, currentUser, socket } = props;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChat = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchChat();
  }, [currentChat._id, currentUser._id]);

  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        if (currentChat._id === msg.from)
          setArrivalMessage({ fromSelf: false, message: msg.msg });
      });
    }
  }, [socket]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const viewSelectedUserProfile = (id) => {
    return () => {
      navigate(`/users/id=${id}`);
    };
  };

  return (
    currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt="avatar"
              ></img>
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <button onClick={viewSelectedUserProfile(currentChat._id)}>
            View Profile
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => {
            return (
              <div ref={scrollRef} key={index}>
                <div
                  className={`message ${
                    message.fromSelf ? "sent" : "recieved"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMessage={handleSendMessage} />
      </Container>
    )
  );
};

export default MessagesContainer;
