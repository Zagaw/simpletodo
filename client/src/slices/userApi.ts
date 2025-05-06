import { apiSlice } from "./api";

interface loginInput {
    email: string,
    password: string
}

interface registerInput extends loginInput {
    name: string,
}

interface profileUpdateInput {
    name?: string,
    email?: string,
    password?: string
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
        }),
        Logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "DELETE",
                credentials: "include",
            })
        }),
        Register: builder.mutation({
            query: (data : registerInput) => ({
                url: "register",
                method: "POST",
                body: data,
                credentials: "include",
            })
        }),
        profileUpdate: builder.mutation({
            query:(data: profileUpdateInput) => ({
                url: "profile",
                method: "PUT",
                body: data,
                credentials: "include",
            })
        })
    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileUpdateMutation} = userApiSlice;