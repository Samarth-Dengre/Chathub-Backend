import React, { Fragment, useEffect, useState } from "react";
import { Contacts as ContactsContainer } from "../../Styles/Contacts";
import logo from "../../assets/logo.svg";
import Contact from "./Contact";
import { useSelector } from "react-redux";
export default function Contacts(props) {
  const { contacts, changeChat } = props;
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuth) {
      setCurrentUserImage(user.avatarImage);
      setCurrentUserName(user.username);
    }
  }, [isAuth, user]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <ContactsContainer>
          <div className="brand">
            <img src={logo} alt="LOGO"></img>
            <h3>Chathub</h3>
          </div>
          <div className="contacts">
            {contacts !== null && contacts.length > 0 ? (
              contacts.map((contact, index) => {
                return (
                  <Contact
                    key={index}
                    onClick={() => changeCurrentChat(index, contact)}
                    index={index}
                    currentSelected={currentSelected}
                    contact={contact}
                  />
                );
              })
            ) : (
              <p>Add some friends</p>
            )}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              ></img>
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </ContactsContainer>
      )}
    </>
  );
}
