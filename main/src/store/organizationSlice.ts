import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadOrganizations } from "../features/localStorage";

export interface Organization {
    id: string;
    name: string;
}

interface OrganizationState {
    organizations: Organization[];
}

const initialState: OrganizationState = {
    organizations: loadOrganizations(),
};

export const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
        addOrganization: (state, action: PayloadAction<Organization>) => {
            state.organizations.push(action.payload);
        },
        updateOrganization: (state, action: PayloadAction<Organization>) => {
            const index = state.organizations.findIndex(
                (organization) => organization.id === action.payload.id
            )
            if (index !== -1) {
                state.organizations[index] = action.payload
            }
        },
        deleteOrganization: (state, action: PayloadAction<string>) => {
            state.organizations = state.organizations.filter((organization) => organization.id !== action.payload)
        },
    },
});

export const { addOrganization, updateOrganization, deleteOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;