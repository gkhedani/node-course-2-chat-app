
// ES6 class
// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} years(s) old`;
//   }
// }
//
// let me = new Person("Gail", "61");
// let description = me.getUserDescription();
// console.log(description);

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    //return user that was removed
    // let users = this.users.filter((user) => user.id === id);
    // let userName = users.map((user) => user.name);
    // let idx = this.users.findIndex(user => user.id === id);
    // if (idx > -1) {
    //   this.users.splice(idx, 1);
    //   console.log(this.users);
    // }
    // return userName;
    let user = this.getUser(id);
    let idx = this.users.findIndex(user => user.id === id);
    if (idx > -1) {
      this.users.splice(idx, 1);
      console.log(this.users);
    }
    return user;
  }
  getUser (id) {
    // let users = this.users.filter((user) => user.id === id);
    // let userName = users.map((user) => user.name);
    // return userName;
    // if it finds a match, it should be only one
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    // let users = this.users.filter(() => {
    //   return user.room === room;
    // });
    // ES6 shortcut below
    let users = this.users.filter((user) => user.room === room);
    // let namesArray = users.map((user) => {
    //   return user.name;
    // });
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
}


module.exports = {Users};
