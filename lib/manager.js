//require Employee
const Employee = require("./Employee");

//Start Manager class
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }
  getOffice() {
    return this.officeNumber;
  }
}
module.exports = Manager;
