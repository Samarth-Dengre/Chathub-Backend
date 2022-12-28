const express = require("express");
const db = require("./config/mongoose");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: ["https://stunning-madeleine-57de3f.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use("/", require("./routes"));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port", process.env.PORT || 5000);
});

const io = socket(server, {
  cors: {
    origin: ["https://stunning-madeleine-57de3f.netlify.app", "http://localhost:3000"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      //If online
      msg = data.message;
      from = data.from;
      socket.to(sendUserSocket).emit("msg-recieve", { msg, from });
    }
  });
});
