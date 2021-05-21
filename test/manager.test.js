const Manager = require("../lib/Manager");

describe("manager", () => {
  it("Can set office number via constructor argument", () => {
    const testValue = 10;
    const e = new Manager("Value", 1, "test@test.com", testValue);
    expect(e.officeNumber).toBe(testValue);
  });

  it('getRole() should return "Manager"', () => {
    const testValue = "Manager";
    const e = new Manager("Value", 1, "test@test.com", 10);
    expect(e.getRole()).toBe(testValue);
  });

  it("Can get office number via getOffice()", () => {
    const testValue = 10;
    const e = new Manager("Value", 1, "test@test.com", testValue);
    expect(e.getOfficeNumber()).toBe(testValue);
  });
});
