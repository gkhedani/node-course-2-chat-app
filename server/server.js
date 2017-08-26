// chat-app for node course
const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();


//console.log(__dirname + "/../public");
// console.log(publicPath);

// create static middleware to serve up the public folder
app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Server started at port ${port}`);
});
