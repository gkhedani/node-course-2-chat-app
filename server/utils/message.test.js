const expect = require("expect");

var {generateMessage} = require("./message");

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
