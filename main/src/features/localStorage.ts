import { Organization } from "../store/organizationSlice";
import { Employee } from "../store/employeeSlice";

const ORGANIZATIONS_KEY = 'organizations';
const EMPLOYEES_KEY = 'employees';

export const loadOrganizations = (): Organization[] => {
    const data = localStorage.getItem(ORGANIZATIONS_KEY);
    return data ? JSON.parse(data) : [];
}

export const saveOrganizations = (organizations: Organization[]) => {
    localStorage.setItem(ORGANIZATIONS_KEY, JSON.stringify(organizations));
}

export const loadEmployees = (): Employee[] => {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    return data ? JSON.parse(data) : [];
}

export const saveEmployees = (employees: Employee[]) => {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
}