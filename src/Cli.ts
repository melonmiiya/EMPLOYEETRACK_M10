// code from a previous activity
import inquirer from "inquirer";
import { pool, connectToDb } from "./connections.js";
await connectToDb();

// Giving a title to the top of the actions list when first loaded
console.log(`---------- Welcome to the Employee Tracker ----------`);

// ////////////////// EMPLOYEE FUNCTIONS ///////////////// //
// function to view employees
function viewEmployees(): void {
  pool.query("SELECT * FROM employees", (err, data) => {
    if (err) {
      console.log(err);
      return performActions();
    }
    console.table(data.rows);
    performActions();
  });
}

// function to add a new employee
function addEmployee(): void {
  pool.query("SELECT * FROM roles", (_err, data) => {
    const roles = data.rows.map((r) => ({ name: r.title, value: r.id }));
    pool.query("SELECT * FROM employees", (_err, data) => {
      const employees = data.rows.map((e) => ({
        name: e.first_name + " " + e.last_name,
        value: e.id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstname",
            message: "Employee's First Name:",
          },
          {
            type: "input",
            name: "lastname",
            message: "Employee's Last Name:",
          },
          {
            type: "list",
            name: "roleid",
            message: "Employee's Role:",
            choices: roles,
          },
          {
            type: "list",
            name: "manager",
            message: "Employee's Manager:",
            choices: employees,
          },
        ])
        .then((answers) => {
          pool.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) values($1, $2, $3, $4)",
            [
              answers.firstname,
              answers.lastname,
              answers.roleid,
              answers.manager,
            ],
            (err) => {
              if (err) {
                console.log(err);
                return performActions();
              }
              console.log("Your employee has been created");
              performActions();
            }
          );
        });
    });
  });
}

// //////////////// ROLE FUNCTIONS //////////////////// //

// function to view all roles
function viewRoles(): void {
  pool.query("SELECT * FROM roles", (err, data) => {
    if (err) {
      console.log(err);
      return performActions();
    }
    console.table(data.rows);
    performActions();
  });
}

// function to create a new Role
function createRole(): void {
  pool.query("SELECT * FROM departments", (_err, data) => {
    const depts = data.rows.map((d) => ({ name: d.name, value: d.id }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Title of the new role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Salary for this role:",
        },
        {
          type: "list",
          name: "department",
          message: "Select department for this role:",
          choices: depts,
        },
      ])
      .then((answers) => {
        pool.query(
          "INSERT INTO roles (title, salary, department_id) values($1, $2, $3)",
          [answers.title, answers.salary, answers.department],
          (err) => {
            if (err) {
              console.log(err);
              return performActions();
            }
            console.log("The new role has been created.");
            performActions();
          }
        );
      });
  });
}

// /////////////// DEPARTMENT FUNCTIONS //////////// //
// function to
function viewDepts(): void {
  pool.query("SELECT * FROM departments", (err, data) => {
    if (err) {
      console.log(err);
      return performActions();
    }
    console.table(data.rows);
    performActions();
  });
}

// function to create a new department
function createDept(): void {
  pool.query("SELECT * FROM departments", (_err) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Title of the new department:",
        },
      ])
      .then((answers) => {
        pool.query(
          "INSERT INTO departments (name) values($1)",
          [answers.name],
          (err) => {
            if (err) {
              console.log(err);
              return performActions();
            }
            console.log("The new department has been created.");
            performActions();
          }
        );
      });
  });
}

// //////// FUNCTION TO PERFORM ACTIONS WITHIN EMPLOYEE_DB ///////////////// //
function performActions(): void {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Select an action",
        choices: [
          "View All Employees",
          "Add New Employee",
          "View All Roles",
          "Add New Role",
          "View All Departments",
          "Add New Department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      // perform the selected action
      if (answers.action === "View All Employees") {
        return viewEmployees(); // prints the employees table
      } else if (answers.action === "Add New Employee") {
        return addEmployee(); // adds an employee
      } else if (answers.action === "View All Roles") {
        return viewRoles();
      } else if (answers.action === "Add New Role") {
        return createRole(); // creates a new role
      } else if (answers.action === "View All Departments") {
        return viewDepts(); // print departments table
      } else if (answers.action === "Add New Department") {
        return createDept(); // add a new department
      } else if (answers.action === "Exit") {
        process.exit();
      }
    });
}

performActions();