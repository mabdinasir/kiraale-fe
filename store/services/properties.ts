import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddPropertyResponse, AddPropertyForm } from '@models/properties/property'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'
import { PropertySearchResponse } from '@models/properties/propertySearch'

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
        searchProperties: builder.query<PropertySearchResponse, string>({
            query: (searchTerm) => ({
                url: `/searchProperties`,
                method: 'GET',
                params: { query: searchTerm },
            }),
        }),
    }),
})

export const { useAddPropertyMutation, useSearchPropertiesQuery } = propertiesAPi
