import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'
import {
    PropertyFormData,
    PropertiesResponse,
    PropertyResponse,
    PropertySearchParams,
    Property,
} from '@models/properties/property'

const token = Cookies.get('authToken')

export const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
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
        addProperty: builder.mutation<{ success: boolean; property: Property }, PropertyFormData>({
            query: (body) => ({
                url: '/addProperty',
                method: 'POST',
                body,
            }),
        }),

        searchProperties: builder.query<PropertiesResponse, PropertySearchParams>({
            query: (params) => ({
                url: `/searchProperties`,
                method: 'GET',
                params,
            }),
        }),

        getPropertyById: builder.query<PropertyResponse, string>({
            query: (id) => `/getPropertyById/${id}`,
        }),

        getFeaturedProperties: builder.query<PropertiesResponse, void>({
            query: () => '/getFeaturedProperties',
        }),

        getPropertiesByUser: builder.query<PropertiesResponse, void>({
            query: () => `/getPropertiesByUser`,
        }),

        getFavoriteProperties: builder.query<PropertiesResponse, void>({
            query: () => '/getFavoriteProperties',
        }),

        toggleFavoriteProperty: builder.mutation<{ success: boolean }, string>({
            query: (propertyId) => ({
                url: `/toggleFavoriteProperty/${propertyId}`,
                method: 'POST',
            }),
        }),

        updateProperty: builder.mutation<
            { success: boolean; property: Property },
            { id: string; body: Partial<PropertyFormData> }
        >({
            query: ({ id, body }) => ({
                url: `/updateProperty/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddPropertyMutation,
    useSearchPropertiesQuery,
    useGetPropertyByIdQuery,
    useGetFeaturedPropertiesQuery,
    useGetPropertiesByUserQuery,
    useGetFavoritePropertiesQuery,
    useToggleFavoritePropertyMutation,
    useUpdatePropertyMutation,
} = propertiesApi
