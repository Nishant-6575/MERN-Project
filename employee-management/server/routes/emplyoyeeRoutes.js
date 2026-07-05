const express = require("express")
const { createEmployee, getEmployee, getEmployeebyId, editEmployeebyId, deleteEmployeebyId } = require("../controllers/employeeController");

const router = express.Router()

router.post("/", createEmployee)

router.get("/", getEmployee)

router.get("/:id", getEmployeebyId)

router.post("/:id", editEmployeebyId)

router.delete("/:id", deleteEmployeebyId)

module.exports = router