import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddPropertyResponse, AddPropertyForm } from '@models/properties/property'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'
import {
    GetPropertyByIdResponse,
    PropertySearchParams,
    PropertySearchResponse,
} from '@models/properties/propertySearch'

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

        searchProperties: builder.query<PropertySearchResponse, PropertySearchParams>({
            query: (params) => ({
                url: `/searchProperties`,
                method: 'GET',
                params,
            }),
        }),

        getPropertyById: builder.query<GetPropertyByIdResponse, string>({
            query: (id) => `/getPropertyById/${id}`,
        }),
    }),
})

export const { useAddPropertyMutation, useSearchPropertiesQuery, useGetPropertyByIdQuery } = propertiesAPi
