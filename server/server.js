const app = require("express")(),
  bodyParser = require("body-parser"),
  socket = require("socket.io");

app.use(bodyParser.json());

const io = socket(
  app.listen(3213, () => console.log("listening on port 3213"))
);

io.on("connection", socket => {
  console.log("A user has connected");

  socket.on("send-message", message => {
    console.log(message);
    io.sockets
      .in(message.room)
      .emit("message-to-user", { message: message.message });
  });

  socket.on("room-change", roomObj => {
    console.log(roomObj.room);
    socket.join(roomObj.room);
    io.sockets
      .in(roomObj.room)
      .emit("joined-room", { message: "somone joined the room" });
  });
});
