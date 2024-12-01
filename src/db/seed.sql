INSERT INTO departments (name)
VALUES ('General Management'),
       ('Office'),
       ('Sales'),
       ('Accounting'),
       ('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES ('Regional Manager', 275000, 1),
       ('Sales Lead', 100000, 3), 
       ('Salesperson', 80000, 3),
       ('Senior Accountant', 160000, 4),
       ('Accountant', 125000, 4),
       ('HR Manager', 150000, 2),
       ('Customer Service', 60000, 5),       
       ('Receptionist', 50000, 2);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Melvin', 'Scott', 1, null),
       ('Briella', 'Purdy', 3, 1),
       ('Jim', 'Small', 3, 1),
       ('Pam', 'Chelsey', 8, 1),
       ('Murphy', 'Miiya', 2, 1),
       ('Yummy', 'Hudson', 3, 5),
       ('Desiree', 'Vance', 3, 5),
       ('Kevin', 'Teia', 5, 9),
       ('Claire', 'Martin', 4, 1),
       ('Oscar', 'Cailia', 5, 9),
       ('Toby', 'Brianna', 6, null),
       ('Ebony', 'Kapoor', 7, 1);