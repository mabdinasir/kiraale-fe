import apiConfig from '@config/apiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SignUpForm, SignUpResponse } from '@models/auth/SignupForm'
import { LoginForm, LoginResponse } from '@models/auth/LoginForm'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiConfig.authApi }),
    endpoints: (builder) => ({
        signUp: builder.mutation<SignUpResponse, SignUpForm>({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                body: userData,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginForm>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const { useSignUpMutation, useLoginMutation } = authApi
