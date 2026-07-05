const Employee = require("../models/employee")

async function createEmployee(req, res) {
    try {
        const employee = await Employee.create(req.body)

        return res.status(201).json({
            success: true,
            message: "employee created",
            employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getEmployee(req, res) {
    try {
        const employees = await Employee.find()

        return res.status(200).json({
            success: true,
            message: "all employee found",
            employees
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getEmployeebyId(req, res) {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "no employee with this id"
            })
        }
        return res.status(200).json({
            success: true,
            message: "employee found",
            employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function editEmployeebyId(req, res) {
    try {
        const updatedemployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        if (!updatedemployee) {
            return res.status(404).json({
                success: false,
                message: "no employee with this id"
            })
        }

        return res.status(200).json({
            success: true,
            message: "employee found",
            updatedemployee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function deleteEmployeebyId(req, res) {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "no employee with this id"
            })
        }

        return res.status(200).json({
            success: true,
            message: "employee deleted",
            employee
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { createEmployee, getEmployee, getEmployeebyId, editEmployeebyId, deleteEmployeebyId }