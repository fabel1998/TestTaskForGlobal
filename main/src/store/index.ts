import { configureStore } from "@reduxjs/toolkit";
import organizationReducer from "./organizationSlice";
import employeeReducer from "./employeeSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";

export const store = configureStore({
    reducer: {
        organizations: organizationReducer,
        employees: employeeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch