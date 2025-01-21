import apiConfig from '@config/apiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SignUpForm, SignUpResponse } from '@models/auth/SignupForm'
import { LoginForm, LoginResponse } from '@models/auth/LoginForm'
import { SignOutResponse } from '@models/auth/Signout'
import { User } from '@models/user'
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
        signOut: builder.mutation<SignOutResponse, User>({
            query: (credentials) => ({
                url: '/signout',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const { useSignUpMutation, useLoginMutation, useSignOutMutation } = authApi
