import { createSlice } from "@reduxjs/toolkit"

export interface User {
    id?: string
    username?: string
    email?: string
    role?: string
    status?: string
    createdOn?: number
    lastModifiedOn?: number
}

export const enum UserRole {
    USER = "user",
    ADMIN = "admin",
}

const initialState = {
    accessToken: "",
    role: "user",
    user: {} as User,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
        setUserRole: (state, action) => {
            state.role = action.payload
        },
    },
})

export const { setAccessToken, setUserInfo, setUserRole } =
    appSlice.actions
export default appSlice.reducer
