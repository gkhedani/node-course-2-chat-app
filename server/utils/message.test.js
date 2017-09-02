const expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "gail";
    var text = "hi";
    var msg = generateMessage(from, text);

    expect(msg.from).toBe("gail");
    expect(msg.text).toBe("hi");
    // can do the above in one statement
    expect(msg).toInclude({from, text});

    expect(msg.createdAt).toBeA.number;

  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = "gail";
    var latitude = 10;
    var longitude = 200;
    var locMsg = generateLocationMessage(from, latitude,longitude);

    expect(locMsg.from).toBe("gail");
    expect(locMsg.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(locMsg.createdAt).toBeA.number;
  });
});
