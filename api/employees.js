import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

const router = express.Router();

// Helper: check if id is a numeric integer (allow 0 for 404 testing)
function isValidId(id) {
  return /^\d+$/.test(id);
}

// === GET /employees ===
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

// === POST /employees ===
router.post("/", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body || {};

    if (!req.body) return res.status(400).send("Request body required.");
    if (!name || !birthday || !salary)
      return res.status(400).send("Missing required fields.");

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

// === GET /employees/:id ===
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).send("Invalid employee ID.");

    const employee = await getEmployee(Number(id));
    if (!employee) return res.status(404).send("Employee not found.");

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
});

// === DELETE /employees/:id ===
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).send("Invalid employee ID.");

    const employee = await deleteEmployee(Number(id));
    if (!employee) return res.status(404).send("Employee not found.");

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// === PUT /employees/:id ===
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, birthday, salary } = req.body || {};

    if (!req.body) return res.status(400).send("Request body required.");
    if (!name || !birthday || !salary)
      return res.status(400).send("Missing required fields.");
    if (!isValidId(id)) return res.status(400).send("Invalid employee ID.");

    const employee = await updateEmployee({
      id: Number(id),
      name,
      birthday,
      salary,
    });

    if (!employee) return res.status(404).send("Employee not found.");

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
});

export default router;
