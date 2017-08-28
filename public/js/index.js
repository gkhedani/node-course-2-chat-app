var socket = io();

socket.on("connect", function () {
  console.log("Connected to server");
});

socket.on("disconnect", function () {
  console.log("Disconnected from server");
});

//listening to a custom event
socket.on("newMessage", function (msg) {
  console.log("New message received", msg);
});
