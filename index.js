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
async function addEmployees(team, ids) {
  let continueAddingEmployees = true;
  do {
    const newEmployee = await inquirer.prompt([
      {
        name: "add",
        type: "list",
        message: "Which type of team member would you like to add",
        choices: ["Engineer", "Intern", "Finished"],
      },
    ]);
    if (newEmployee.add === "Engineer") {
      team.unshift(await addEngineer(ids));
    } else if (newEmployee.add === "Intern") {
      team.push(await addIntern(ids));
    } else {
      console.log("Team is complete!");
      continueAddingEmployees = false;
    }
  } while (continueAddingEmployees);
}

async function addEngineer(ids) {
  const newEngineer = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter your engineer's name:",
    },
    {
      name: "id",
      type: "input",
      message: "Enter your engineer's ID number:",
    },
    {
      name: "email",
      type: "input",
      message: "Enter your engineer's email address:",
    },
    {
      name: "github",
      type: "input",
      message: "Enter your engineer's GitHub username:",
    },
  ]);
  ids.push(newEngineer.id);
  return new Engineer(newEngineer.name, newEngineer.id, newEngineer.email, newEngineer.github);
}

async function addIntern(ids) {
  const newIntern = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter your intern's name:",
    },
    {
      name: "id",
      type: "input",
      message: "Enter your intern's ID number:",
    },
    {
      name: "email",
      type: "input",
      message: "Enter your intern's email address:",
    },
    {
      name: "school",
      type: "input",
      message: "Enter your intern's school name:",
    },
  ]);
  ids.push(newIntern.id);
  return new Intern(newIntern.name, newIntern.id, newIntern.email, newIntern.school);
}

const getHeader = () => `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>My Team</title>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" />
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    </head>
    <body>
      <div>
        <nav class="navbar navbar-dark bg-dark" style="padding:10px;">
          <h1 class="navbar-text text-white mx-auto">My Team</h1>
        </nav>
        <br>
        <div class="container mx-auto" style="margin:10px;">
            <div class="row">`;

function generateCard(employee) {
  const name = employee.getName();
  const role = employee.getRole();
  const id = employee.getId();
  const email = employee.getEmail();
  let iconClass = "";
  let lastItemLabel = "";
  let lastItem = "";
  let color = "";

  if (role === "Intern") {
    iconClass = "fas fa-book";
    lastItemLabel = "School";
    lastItem = employee.getSchool();
    color = "warning";
  } else if (role === "Engineer") {
    iconClass = "fas fa-laptop-code";
    lastItemLabel = "GitHub";
    lastItem = employee.getGithub();
    color = "danger";
  } else {
    iconClass = "fas fa-crown";
    lastItemLabel = "Office Number";
    lastItem = employee.getOffice();
    color = "info";
  }

  return getCardMarkup({
    color: color,
    name: name,
    role: role,
    iconClass: iconClass,
    id: id,
    email: email,
    lastItemLabel: lastItemLabel,
    lastItem: lastItem,
  });
}

function getCardMarkup(properties) {
  const { color, name, role, iconClass, id, email, lastItemLabel, lastItem } = properties;
  return `
                <div class="card mx-auto" style="margin:5px;">
                <div class="card border-${color} mb-3" style="width: 18rem;">
                  <div class="card-header bg-${color} mb-3 text-white">
                    ${name}
                    <div>${role} <i class="${iconClass}"></i></div>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email: ${email}</li>
                    <li class="list-group-item">${lastItemLabel}: ${lastItem}</li>
                  </ul>
                </div>
              </div>
              `;
}

const getFooter = () =>
  `
                        </div>
                    </div>  
                </body>
              </html>`;
promptUser();
