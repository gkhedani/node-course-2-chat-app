// chat-app for node course
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

// instead of using the express http server:
var app = express();
var server = http.createServer(app);
// with this, we are ready to accept connections
// we now have access to routes and a javascript library
var io = socketIO(server);
var users = new Users();


//console.log(__dirname + "/../public");
// console.log(publicPath);

// create static middleware to serve up the public folder
app.use(express.static(publicPath));

// register an event listener
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required.");
    }

    socket.join(params.room);
    //socket.leave(xxxx);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit("newMessage",
      generateMessage("Admin", "Welcome to the chat app!"));

    socket.broadcast.to(params.room).emit("newMessage",
      generateMessage("Admin", `${params.name} joined us!`));



    callback();
  });

  socket.on("createMessage", (newMsg, callback) => {
      console.log("message received on server", newMsg);
      let user = users.getUser(socket.id);
      if (user && isRealString(newMsg.text)) {
        // emits the message to the room
        io.to(user.room).emit("newMessage",
          generateMessage(user.name, newMsg.text));
      }

      callback("This is from the server.");
      // broadcast to all except me
      // socket.broadcast.emit("newMessage", {
      //   from: newMsg.from,
      //   text: newMsg.text,
      //   createdAt:  new Date().getTime()
      // });
  });

  socket.on("createLocationMessage", (coords) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit("newLocationMessage",
      generateLocationMessage(user.name, coords.latitude,
      coords.longitude));
    }
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from the client");
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left.`));
    }
  });
});


server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
