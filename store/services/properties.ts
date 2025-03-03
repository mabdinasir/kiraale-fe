import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'
import { AddPropertyForm } from '@models/properties/addPropertyForm'
import { Property, PropertyResponse, PropertySearchParams } from '@models/properties/property'

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
        addProperty: builder.mutation<PropertyResponse, AddPropertyForm>({
            query: (body) => ({
                url: '/addProperty',
                method: 'POST',
                body,
            }),
        }),

        searchProperties: builder.query<PropertyResponse, PropertySearchParams>({
            query: (params) => ({
                url: `/searchProperties`,
                method: 'GET',
                params,
            }),
        }),

        getPropertyById: builder.query<PropertyResponse, Pick<Property, 'id'>>({
            query: (id) => `/getPropertyById/${id}`,
        }),
        getFeaturedProperties: builder.query<PropertyResponse, void>({
            query: () => '/featuredProperties',
        }),
        getPropertiesByUser: builder.query<PropertyResponse, string>({
            query: (userId) => `/getPropertiesByUser/${userId}`,
        }),
    }),
})

export const {
    useAddPropertyMutation,
    useSearchPropertiesQuery,
    useGetPropertyByIdQuery,
    useGetFeaturedPropertiesQuery,
    useGetPropertiesByUserQuery,
} = propertiesAPi
