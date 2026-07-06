const Employee = require("../models/employee")

async function createEmployee(req, res, next) {
    try {
        const findemoloyeeEmail = await Employee.findOne({
            email: req.body.email,
        })

        const findemoloyeeId = await Employee.findOne({
            employeeId: req.body.employeeId
        })

        if (findemoloyeeEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already created",
            })
        } else if (findemoloyeeId) {
            return res.status(400).json({
                success: false,
                message: "EmployeeId already created",
            })
        }

        const employee = await Employee.create(req.body)

        return res.status(201).json({
            success: true,
            message: "employee created",
            employee
        })
    } catch (error) {
        next(error)
    }
}

async function getEmployee(req, res, next) {
    try {
        const { search = "", page = "1", limit = "10", sort = "-createdAt", department = "" } = req.query
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const skip = (pageNumber - 1) * limitNumber

        const filter = {}
        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    employeeId: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        }

        if (department) {
            filter.department = {
                $regex: department,
                $options: "i"
            }
        }

        const employees = await Employee.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber)

        const totalEmployees = await Employee.countDocuments(filter)

        const totalPages = Math.ceil(totalEmployees / limitNumber)

        const hasNextPage = pageNumber < totalPages
        const hasPreviousPage = pageNumber > 1


        return res.status(200).json({
            success: true,
            message: "all employee found",
            limitNumber,
            totalEmployees,
            totalPages,
            pageNumber,
            hasNextPage,
            hasPreviousPage,
            employees
        })
    } catch (error) {
        next(error)
    }
}

async function getEmployeebyId(req, res, next) {
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
        next(error)
    }
}

async function editEmployeebyId(req, res, next) {
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
        next(error)
    }
}

async function deleteEmployeebyId(req, res, next) {
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
        next(error)
    }
}

async function getEmployeeStats(req, res, next) {
    try {
        const totalEmployees = await Employee.countDocuments()

        const totalDepartments = (await Employee.distinct("department")).length

        const employees = await Employee.find()

        const totalSalary = employees.reduce((sum, employee) => {
            return sum + employee.salary
        }, 0)

        const averageSalary = Math.round(totalSalary / totalEmployees)

        const highestSalary = await Employee.findOne()
            .sort("-salary")
            .select("name salary")

        const lowestSalary = await Employee.findOne()
            .sort("salary")
            .select("name salary")

        return res.status(200).json({
            success: true,
            stats: {
                totalEmployees,
                highestSalary,
                lowestSalary,
                totalDepartments,
                averageSalary
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { createEmployee, getEmployee, getEmployeebyId, editEmployeebyId, deleteEmployeebyId, getEmployeeStats }