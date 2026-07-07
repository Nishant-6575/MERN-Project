import { getDashboardStatistics } from "@/api/employeeApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardStats } from "@/types/employee";
import { Building2, ChartArea, Loader2, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [statistics, setStatistics] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchDashboardStatistics = async () => {
    setLoading(true);

    try {
      const data = await getDashboardStatistics();

      setStatistics(data.stats);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Employees
          </CardTitle>

          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {statistics?.totalEmployees}
          </div>

          <p className="text-sm text-muted-foreground">
            Total registered employees
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Highest Salary
          </CardTitle>

          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {`₹ ${statistics?.highestSalary.salary.toLocaleString("en-IN")}`}
          </div>

          <p className="text-sm text-muted-foreground">
            {statistics?.highestSalary.name}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Lowest Salary
          </CardTitle>

          <TrendingDown className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {`₹ ${statistics?.lowestSalary.salary.toLocaleString("en-IN")}`}
          </div>

          <p className="text-sm text-muted-foreground">
            {statistics?.lowestSalary.name}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Salary
          </CardTitle>

          <ChartArea className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {`₹ ${statistics?.averageSalary.toLocaleString("en-IN")}`}
          </div>

          <p className="text-sm text-muted-foreground">
            Average Salary of employees
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Departments
          </CardTitle>

          <Building2 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {statistics?.totalDepartments}
          </div>

          <p className="text-sm text-muted-foreground">
            Total Departments
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
