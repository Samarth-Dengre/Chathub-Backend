const Contact = (props) => {
  const { contact, index, currentSelected, onClick } = props;
  return (
    <div
      className={`contact ${index === currentSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="avatar">
        <img
          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
          alt="avatar"
        ></img>
      </div>
      <div className="username">
        <h3>{contact.username}</h3>
      </div>
    </div>
  );
};

export default Contact;
