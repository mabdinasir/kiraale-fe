import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'
import { AddMediaResponse, Media } from 'schemas/media.schema'

const token = Cookies.get('authToken')

export const mediaAPi = createApi({
    reducerPath: 'mediaAPi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.mediaApi,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        addMedia: builder.mutation<AddMediaResponse, Media>({
            query: (body) => ({
                url: '/addMedia',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useAddMediaMutation } = mediaAPi
