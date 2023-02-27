import { configureStore } from "@reduxjs/toolkit"
import introduction from "./../src/features/main/introduction"

export const store = configureStore({
    reducer: {
        introduction,
    },
})
