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
  var li = jQuery("<li></li>");
  li.text(`${msg.from}: ${msg.text}`);

  jQuery("#messages").append(li);
});

// socket.emit("createMessage", {
//   from: "Frank",
//   text: "Hi"
// }, function (data) {
//   // the acknowledgement
//   console.log("Got it", data);
// });

jQuery("#message-form").on("submit", function (e) {
  // overrides the default behavior of re-rendering the entire page
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, function () {

  });
});
