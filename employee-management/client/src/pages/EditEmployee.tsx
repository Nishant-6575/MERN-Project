import EmployeeForm from "@/common/EmployeeForm";
import { useParams } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Employee
        </h1>

        <p className="text-muted-foreground">
          Update employee details.
        </p>
      </div>

      <EmployeeForm
        mode="edit"
        employeeId={id}
      />
    </>
  )
}
