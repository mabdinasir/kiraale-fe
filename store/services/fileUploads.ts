import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'

const token = Cookies.get('authToken')

export const fileUploadsApi = createApi({
    reducerPath: 'fileUploadsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.fileUploadsApi,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        uploadProfilePic: builder.mutation<{ success: boolean; profilePicture: string }, FormData>({
            query: (formData) => ({
                url: '/uploadProfilePic',
                method: 'POST',
                body: formData,
            }),
        }),
        uploadProperties: builder.mutation<{ success: boolean; propertyPictures: string[] }, FormData>({
            query: (formData) => ({
                url: '/uploadProperties',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
})

export const { useUploadProfilePicMutation, useUploadPropertiesMutation } = fileUploadsApi
