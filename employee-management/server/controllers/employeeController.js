const Employee = require("../models/employee")

async function createEmployee(req, res) {
    try {
        await Employee.create(req.body)

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

module.exports = createEmployee