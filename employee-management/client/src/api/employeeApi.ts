import type { ApiResponse, CreateEmployeeRequest, DeleteEmployeeResponse, Employee, EmployeeListResponse, EmployeeQueryParams } from "@/types/employee"
import api from "./axios"

export const getEmployees = async (
    params?: EmployeeQueryParams
): Promise<EmployeeListResponse> => {
    const res = await api.get<EmployeeListResponse>("/employees", {
        params,
    })
    return res.data
}

export const deleteEmployee = async (id: string): Promise<DeleteEmployeeResponse> => {
    const response = await api.delete<DeleteEmployeeResponse>(`/employees/${id}`);
    return response.data;
};


export const createEmployee = async (
    employee: CreateEmployeeRequest
): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/employees", employee);
    return response.data
};

export const getEmployeeById = async (
    id: string
): Promise<Employee> => {
    const response = await api.get(`/employees/${id}`);

    return response.data.employee;
}

export const updateEmployee = async (
    id: string,
    employee: CreateEmployeeRequest
): Promise<ApiResponse> => {
    const response = await api.post(`/employees/${id}`, employee);

    return response.data;
}