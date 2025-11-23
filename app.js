import express from "express";
import employeesRouter from "#api/employees.js";
const app = express();
export default app;

// === Middleware ===
app.use(express.json());

// === Routes ===
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", employeesRouter);

// === Error handling ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
