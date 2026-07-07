import { deleteEmployee, getEmployees } from "@/api/employeeApi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { departments } from "@/constants/departments";
import { sortOptions } from "@/constants/sortOptions";
import { useDebounce } from "@/hooks/useDebounce";
import type { Employee } from "@/types/employee";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [department, setDepartment] = useState<any>("all");
  const [sort, setSort] = useState<any>("-createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees({
        search: debouncedSearch,
        department: department === "all" ? undefined : department,
        sort,
        page,
      })
      setEmployees(data.employees)
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setHasPreviousPage(data.hasPreviousPage);
      setPageNumber(data.pageNumber);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [debouncedSearch, department, sort, page])

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, department, sort]);

  const handleDeleteEmployee = async () => {
    if (!selectedEmployeeId) return;

    try {
      const result = await deleteEmployee(selectedEmployeeId);

      // Refresh employee list
      await fetchEmployees();

      // Close dialog
      setOpen(false);

      // Clear selected employee
      setSelectedEmployeeId(null);

      // Later we'll replace this with toast.success()
      toast.success("Employee deleted successfully");
      toast.success(result.message);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete employee");
    } finally {
      setDeleting(false);
    }
  };



  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Employees
          </h1>
          <p className="text-muted-foreground">
            Manage all employees in your organization.
          </p>
        </div>

        {/* Right Section */}
        <Button asChild >
          <Link to="/employees/add" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Link>
        </Button>

      </div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-sm"
        />

        {/* Department Filter */}
        <Select value={department}
          onValueChange={(value) => setDepartment(value)}>
          <SelectTrigger className="w-full md:w-55">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full md:w-55">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div >
      <Table>
        <TableCaption><span>A list of employees</span>
          <div className="mt-6 mx-5 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={!hasPreviousPage}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {pageNumber} of {totalPages}
            </span>

            <Button
              variant="outline"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-100">Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead className="text-right">Salary</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No employees found.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell className="w-100">{employee.employeeId}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell className="text-right">₹ {employee.salary.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" className="mx-2">Edit</Button>
                  <Button variant="destructive" onClick={() => {
                    setSelectedEmployeeId(employee._id);
                    setOpen(true);
                  }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Employee
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this employee?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteEmployee}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
