const expect = require("expect");

const {Users} = require("./users");


describe("Users", () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: "1",
      name: "Gail",
      room: "Node Course"
    }, {
      id: "2",
      name: "Justin",
      room: "React Course"
    }, {
      id: "3",
      name: "Reed",
      room: "Node Course"
    }
  ];
  });

  it("should add new user", () => {
    let users = new Users();
    let user = {
      id: 123,
      name: "Gail",
      room: "Rurouni Kenshin Fans"
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it("should return names for node course", () => {
    let userList = users.getUserList("Node Course");

    expect(userList).toEqual(["Gail", "Reed"]);
  });
  it("should return names for react course", () => {
    let userList = users.getUserList("React Course");

    expect(userList).toEqual(["Justin"]);
  });

  it("should remove a user", () => {
    // let userName = users.removeUser("3");
    // expect(userName).toEqual("Reed");
    let user = users.removeUser("3");
    expect(user.name).toBe("Reed");
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user", () => {
    // let userName = users.removeUser("5");
    // expect(userName).toBe.null;
    let user = users.removeUser("5");
    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    // let user = users.getUser("2");
    // expect(user).toEqual("Justin");
    let user = users.getUser("2");
    expect(user.id).toBe("2");
  });

  it("should not find user", () => {
    // let user = users.getUser("9");
    // expect(user).toEqual.null;
    let user = users.getUser("9");
    expect(user).toNotExist;
  });
});
