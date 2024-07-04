import { createSlice } from "@reduxjs/toolkit"

export interface Record {
    id?: string
    userId: string
    date: number
    description: string
    category: string
    amount: number
    createdOn: number
    lastModifiedOn: number
}

const initialState = {
    records: [] as Record[],
}

const appSlice = createSlice({
    name: "record",
    initialState,
    reducers: {
        setRecords: (state, action) => {
            state.records = action.payload
        },
        addNewRecord: (state, action) => {
            state.records.push(action.payload)
        },
    },
})

export const { setRecords, addNewRecord } = appSlice.actions
export default appSlice.reducer
