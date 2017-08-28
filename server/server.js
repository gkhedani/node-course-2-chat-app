// chat-app for node course
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

// instead of using the express http server:
var app = express();
var server = http.createServer(app);
// with this, we are ready to accept connections
// we now have access to routes and a javascript library
var io = socketIO(server);


//console.log(__dirname + "/../public");
// console.log(publicPath);

// create static middleware to serve up the public folder
app.use(express.static(publicPath));

// register an event listener
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "mom",
    text: "What are you doing?",
    createdAt: 123
  });

  socket.on("createMessage", (newMsg) => {
      console.log("message received on server", newMsg);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the client");
  });
});


server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
