import React, { useState } from "react";
import { Container } from "../../Styles/ChatInput";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = (props) => {
  const [showEmojiPicker, setShowEmofiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPickerHideShow = () => {
    setShowEmofiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji, event) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      props.handleSendMessage(msg);
      setMsg("");
      setShowEmofiPicker(false);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && (
              <EmojiPicker theme="dark" onEmojiClick={handleEmojiClick} />
            )}
          </div>
        </div>
        <form className="input-container" onSubmit={sendChat}>
          <input
            type="text"
            name=""
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="type your message here"
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default ChatInput;
