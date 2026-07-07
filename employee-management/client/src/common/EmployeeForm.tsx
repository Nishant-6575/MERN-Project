interface EmployeeFormProps {
    mode: "create" | "edit";
    employeeId?: string;
}
import { createEmployee, getEmployeeById, updateEmployee } from "@/api/employeeApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments } from "@/constants/departments";
import type { CreateEmployeeRequest } from "@/types/employee";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EmployeeForm({ mode, employeeId }: EmployeeFormProps) {
    const [formData, setFormData] = useState<CreateEmployeeRequest>({
        name: "",
        email: "",
        employeeId: "",
        department: "",
        salary: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        employeeId: "",
        department: "",
        salary: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            if (mode === "create") {
                const result = await createEmployee({
                    ...formData,
                    salary: Number(formData.salary),
                });

                toast.success(result.message);
                toast.success("Employee added successfully.");

                navigate("/employees");
            } else {
                const result = await updateEmployee(
                    employeeId!,
                    {
                        ...formData,
                        salary: Number(formData.salary),
                    }
                );

                toast.success(result.message);

                navigate("/employees");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong.");
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            employeeId: "",
            department: "",
            salary: "",
        };

        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!formData.employeeId.trim()) {
            newErrors.employeeId = "Employee ID is required.";
            isValid = false;
        }

        if (!formData.department) {
            newErrors.department = "Department is required.";
            isValid = false;
        }

        if (Number(formData.salary) <= 0) {
            newErrors.salary = "Salary must be greater than 0.";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    useEffect(() => {
        if (mode !== "edit" || !employeeId) return;

        fetchEmployee();
    }, [mode, employeeId]);

    const fetchEmployee = async () => {
        if (!employeeId) return;

        try {
            const employee = await getEmployeeById(employeeId);

            setFormData({
                name: employee.name,
                email: employee.email,
                employeeId: employee.employeeId,
                department: employee.department,
                salary: employee.salary.toString(),
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to load employee.");
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter employee name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Employee ID */}
                    <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <Input
                            id="employeeId"
                            name="employeeId"
                            placeholder="EMP001"
                            value={formData.employeeId}
                            onChange={handleChange}
                        />
                        {errors.employeeId && (
                            <p className="text-sm text-red-500">
                                {errors.employeeId}
                            </p>
                        )}
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                        <Label>Department</Label>

                        <Select
                            value={formData.department}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    department: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            {errors.department && (
                                <p className="text-sm text-red-500">
                                    {errors.department}
                                </p>
                            )}

                            <SelectContent>
                                {departments.map((department) => (
                                    <SelectItem
                                        key={department}
                                        value={department}
                                    >
                                        {department}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Salary */}
                    <div className="space-y-2">
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                            id="salary"
                            type="text"
                            name="salary"
                            placeholder="50000"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                        {errors.salary && (
                            <p className="text-sm text-red-500">
                                {errors.salary}
                            </p>
                        )}
                    </div>

                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/employees")}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" disabled={submitting}>
                        {submitting
                            ? mode === "create"
                                ? "Adding..."
                                : "Updating..."
                            : mode === "create"
                                ? "Add Employee"
                                : "Update Employee"}
                    </Button>
                </div>
            </form>
        </>
    )
}