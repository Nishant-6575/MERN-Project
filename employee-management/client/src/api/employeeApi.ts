import type { CreateEmployeeRequest, DeleteEmployeeResponse, EmployeeListResponse, EmployeeQueryParams } from "@/types/employee"
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
): Promise<void> => {
    await api.post("/employees", employee);
};