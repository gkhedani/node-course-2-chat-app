// chat-app for node course
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");
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

  socket.emit("newMessage",
    generateMessage("Admin", "Welcome to the chat app!"));

  socket.broadcast.emit("newMessage",
    generateMessage("Admin", "New user joined us!"));

  socket.on("createMessage", (newMsg, callback) => {
      console.log("message received on server", newMsg);
      // emits the message to all connections
      io.emit("newMessage",
        generateMessage(newMsg.from, newMsg.text));

      callback("This is from the server.");  
      // broadcast to all except me
      // socket.broadcast.emit("newMessage", {
      //   from: newMsg.from,
      //   text: newMsg.text,
      //   createdAt:  new Date().getTime()
      // });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the client");
  });
});


server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
