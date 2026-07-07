import EmployeeForm from "@/common/EmployeeForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function AddEmployee() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
        <CardDescription>
          Enter employee information below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <EmployeeForm mode={"create"} />
      </CardContent>
    </Card>
  )
}
