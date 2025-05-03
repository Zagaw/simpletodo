import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auths";
import { apiSlice } from "./slices/api";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptch = typeof store.dispatch;