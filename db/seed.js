import db from "./client.js";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1990-03-15", salary: 55000 },
    { name: "Bob Smith", birthday: "1985-07-22", salary: 60000 },
    { name: "Charlie Brown", birthday: "1992-01-10", salary: 48000 },
    { name: "Dana White", birthday: "1988-11-05", salary: 62000 },
    { name: "Evan Green", birthday: "1995-08-19", salary: 51000 },
    { name: "Fiona Lee", birthday: "1993-04-12", salary: 57000 },
    { name: "George King", birthday: "1989-09-09", salary: 59000 },
    { name: "Hannah Kim", birthday: "1991-02-28", salary: 53000 },
    { name: "Ian Clark", birthday: "1994-12-25", salary: 56000 },
    { name: "Julia Lopez", birthday: "1987-06-30", salary: 61000 },
  ];

  for (const emp of employees) {
    await createEmployee(emp);
  }
}
