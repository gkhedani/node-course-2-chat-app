// unix epic January 1st 1970 00:00:00 am UTC
// Javascript stores time in milliseconds
// 1000 = 1 second

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

// let date = new Date();
// console.log(date.getMonth());

const moment = require("moment");

let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234;
let date = moment(createdAt);
// date.add(100, "year").subtract(9, "months");
// console.log(date.format("MMM Do, YYYY"));

console.log(date.format("h:mm a"));
