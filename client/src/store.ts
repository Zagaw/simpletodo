import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auths";

export const store = configureStore({
    reducer:{
        auth: authSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptch = typeof store.dispatch;