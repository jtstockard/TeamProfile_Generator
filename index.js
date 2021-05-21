const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const writeFileAsync = util.promisify(fs.writeFile);

async function getManager(ids) {
  const manager = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter your manager's name:",
    },
    {
      name: "id",
      type: "input",
      message: "Enter your manager's ID number:",
    },
    {
      name: "email",
      type: "input",
      message: "Enter your manager's email address:",
    },
    {
      name: "officeNumber",
      type: "input",
      message: "Enter your manager's office number:",
    },
  ]);
  ids.push(manager.id);
  return new Manager(manager.name, manager.id, manager.email, manager.officeNumber);
}

async function promptUser() {
  const ids = [];
  const team = [];
  const manager = await getManager(ids);

  await addEmployees(team, ids);
  team.unshift(manager);
  const employeeCards = team.map((employee) => generateCard(employee));

  const fullHtml = [getHeader(), ...employeeCards, getFooter()].join("");

  await writeFileAsync("./dist/team.html", fullHtml, function (err) {
    if (err) {
      console.error(err);
    }
  });
}
promptUser();
