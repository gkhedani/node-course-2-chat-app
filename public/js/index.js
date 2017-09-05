var socket = io();

function scrollToBottom () {
  // selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child");
  // heights
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight +
        lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}
socket.on("connect", function () {
  console.log("Connected to server");
});

socket.on("disconnect", function () {
  console.log("Disconnected from server");
});

//listening to a custom event
socket.on("newMessage", function (msg) {
  let formattedTime = moment(msg.createdAt).format("h:mm a");
  let template = jQuery("#message-template").html();
  let html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();

  // // console.log("New message received", msg);
  // var li = jQuery("<li></li>");
  // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  //
  // jQuery("#messages").append(li);
});

// socket.emit("createMessage", {
//   from: "Frank",
//   text: "Hi"
// }, function (data) {
//   // the acknowledgement
//   console.log("Got it", data);
// });

socket.on("newLocationMessage", function (message) {
  let formattedTime = moment(message.createdAt).format("h:mm a");
  let template = jQuery("#location-message-template").html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();

  // var li = jQuery("<li></li>");
  // var a = jQuery("<a target='_blank'>My current location</a>");
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr("href", message.url);
  // li.append(a);
  //
  // jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function (e) {
  // overrides the default behavior of re-rendering the entire page
  e.preventDefault();

  var messageTextbox = jQuery("[name=message]");

  socket.emit("createMessage", {
    from: "User",
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val("");
  });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disabled").text("Sending location ...");

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr("disabled").text("Send location");
    // console.log(position);
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr("disabled").text("Send location");
    alert("Unable to fetch location.");
  });
});
