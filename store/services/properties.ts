import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddPropertyResponse, AddPropertyForm } from '@models/properties/property'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'

const token = Cookies.get('authToken')

export const propertiesAPi = createApi({
    reducerPath: 'propertiesAPi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.propertiesApi,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        addProperty: builder.mutation<AddPropertyResponse, AddPropertyForm>({
            query: (body) => ({
                url: '/addProperty',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useAddPropertyMutation } = propertiesAPi
