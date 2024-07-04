import { configureStore } from "@reduxjs/toolkit"
import appReducer from "./Slices/appSlice"
import recordReducer from "./Slices/recordsSlice"

export const store = configureStore({
    reducer: {
        app: appReducer,
        record: recordReducer,
    },
})
