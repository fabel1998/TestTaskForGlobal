import { Middleware } from "@reduxjs/toolkit";
import { saveEmployees, saveOrganizations } from "../../features/localStorage";

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    saveOrganizations(state.organizations.organizations);
    saveEmployees(state.employees.employees);
    return result;
}


   