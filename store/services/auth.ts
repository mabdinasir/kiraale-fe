import apiConfig from '@config/apiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SignupForm, SignupResponse } from '@models/auth/signupForm'
import { LoginForm, LoginResponse } from '@models/auth/loginForm'
import { SignOutResponse } from '@models/auth/signout'
import Cookies from 'js-cookie'

const token = Cookies.get('authToken')

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.authApi,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation<SignupResponse, SignupForm>({
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
        signOut: builder.mutation<SignOutResponse, void>({
            query: () => ({
                url: '/signout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useSignUpMutation, useLoginMutation, useSignOutMutation } = authApi
