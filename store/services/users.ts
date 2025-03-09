import apiConfig from '@config/apiConfig'
import { GetUserByIdResponse } from '@models/user/getUserByIdResponse'
import { UpdateUserPassword } from '@models/user/updateUserPassword'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { Profile } from 'schemas'

const token = Cookies.get('authToken')

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.usersApi,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getUserById: builder.query<GetUserByIdResponse, string>({
            query: (userId) => ({
                url: `/getUserById/${userId}`,
                method: 'GET',
            }),
        }),
        updateUserProfile: builder.mutation<void, { id: string; data: Partial<Profile> }>({
            query: ({ id, data }) => ({
                url: `/updateUserProfile/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateUserPassword: builder.mutation<void, UpdateUserPassword>({
            query: ({ id, passwords }) => ({
                url: `/updateUserPassword/${id}`,
                method: 'PUT',
                body: {
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword,
                    confirmNewPassword: passwords.confirmNewPassword,
                },
            }),
        }),
    }),
})

export const { useGetUserByIdQuery, useUpdateUserProfileMutation, useUpdateUserPasswordMutation } = usersApi
