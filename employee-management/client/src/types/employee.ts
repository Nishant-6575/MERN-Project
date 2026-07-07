export interface Employee {
    _id: string,
    name: string,
    email: string,
    employeeId: string,
    department: string,
    salary: number,
    createdAt: string
    updatedAt: string
}

export interface EmployeeListResponse {
    success: boolean,
    message: string,
    employees: Employee[],
    totalEmployees: number,
    totalPages: number,
    pageNumber: number,
    limitNumber: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}

export interface EmployeeQueryParams {
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
    department?: string;
}

export interface CreateEmployeeRequest {
    name: string;
    email: string;
    employeeId: string;
    department: string | null;
    salary: string | number;
}

export interface DeleteEmployeeResponse {
  success: boolean;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}