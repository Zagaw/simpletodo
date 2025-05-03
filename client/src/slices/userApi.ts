import { apiSlice } from "./api";

interface loginInput {
    email: string,
    password: string
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Login: builder.mutation({
            query: (data: loginInput) => ({
                url: "login",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        })
    }),
});

export const {useLoginMutation} = userApiSlice;