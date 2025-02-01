import apiConfig from '@config/apiConfig'
import { User } from '@models/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const token = Cookies.get('authToken')

type GetUserByIdResponse = {
    success: boolean
    user: Omit<User, 'password'>
}

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
    }),
})

export const { useGetUserByIdQuery } = usersApi
