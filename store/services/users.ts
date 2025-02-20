import apiConfig from '@config/apiConfig'
import { GetUserByIdResponse } from '@models/users/getUserByIdResponse'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

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
    }),
})

export const { useGetUserByIdQuery } = usersApi
