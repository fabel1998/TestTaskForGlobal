import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadEmployees } from "../features/localStorage";


export interface Employee {
    id: string;
    name: string;
    organizationId: string;
}

interface EmployeeState {
    employees: Employee[];
}

const initialState: EmployeeState = {
    employees: loadEmployees(),
};

export const EmployeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            const index = state.employees.findIndex(
                (employee) => employee.id === action.payload.id
            )
            if (index !== -1) {
                state.employees[index] = action.payload
            }
        },
        deleteEmployee: (state, action: PayloadAction<string>) => {
            state.employees = state.employees.filter((employee) => employee.id !== action.payload)
        },
    },
});

export const { addEmployee, updateEmployee, deleteEmployee } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;