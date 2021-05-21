const Intern = require("../intern.js");

describe("intern", () => {
  it("Can set school via constructor", () => {
    const testValue = "KU";
    const e = new Intern("Value", 1, "test@test.com", testValue);
    expect(e.school).toBe(testValue);
  });

  it('getRole() should return "Intern"', () => {
    const testValue = "Intern";
    const e = new Intern("Value", 1, "test@test.com", "KU");
    expect(e.getRole()).toBe(testValue);
  });

  it("Can get school via getSchool()", () => {
    const testValue = "KU";
    const e = new Intern("Value", 1, "test@test.com", testValue);
    expect(e.getSchool()).toBe(testValue);
  });
});
