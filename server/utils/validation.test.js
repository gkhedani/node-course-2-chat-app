const expect = require("expect");

const {isRealString} = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    let val = 123;
    expect(isRealString(val)).toBe(false);
  });

  it("should reject string with only spaces", () => {
    let val = "   ";
    expect(isRealString(val)).toBe(false);
  });

  it("should allow string with non-space characters", () => {
    let val = "  St. Louis ";
    expect(isRealString(val)).toBe(true);
  });
});
