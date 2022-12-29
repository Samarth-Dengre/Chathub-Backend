const Message = require("../model/message");
const User = require("../model/userModel");

module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    const toUser = await User.findById(to);
    if (!toUser) {
      return res.json({
        msg: "The user you are trying to send message does not exist",
        status: false,
      });
    }

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({
        msg: "Message added successfully",
        status: true,
      });
    }
    return res.json({
      msg: "failed to add message",
      status: false,
    });
  } catch (error) {
    return res.json({
      msg: "An error occured at our end",
      status: false,
    });
  }
};

module.exports.getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json(projectMessages);
  } catch (error) {
    return res.json({
      msg: "Some error occured at our end",
      status: false,
    });
  }
};
