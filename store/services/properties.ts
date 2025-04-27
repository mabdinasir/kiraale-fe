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
    tagTypes: [
        'Property',
        'PropertyList',
        'UserProperties',
        'RejectedProperties',
        'FavoriteProperties',
        'PendingProperties',
        'FeaturedProperties',
    ],
    keepUnusedDataFor: 0,

    endpoints: (builder) => ({
        addProperty: builder.mutation<{ success: boolean; property: Property }, PropertyFormData>({
            query: (body) => ({
                url: '/addProperty',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['PropertyList', 'UserProperties', 'PendingProperties', 'FeaturedProperties'],
        }),

        searchProperties: builder.query<PropertiesResponse, PropertySearchParams>({
            query: (params) => ({
                url: `/searchProperties`,
                method: 'GET',
                params,
            }),
            providesTags: ['PropertyList'],
        }),

        getPropertyById: builder.query<PropertyResponse, string>({
            query: (id) => `/getPropertyById/${id}`,
            providesTags: ['Property'],
        }),

        getFeaturedProperties: builder.query<PropertiesResponse, void>({
            query: () => '/getFeaturedProperties',
            providesTags: ['FeaturedProperties'],
        }),

        getPropertiesByUser: builder.query<PropertiesResponse, void>({
            query: () => `/getPropertiesByUser`,
            providesTags: ['UserProperties'],
        }),

        getFavoriteProperties: builder.query<PropertiesResponse, void>({
            query: () => '/getFavoriteProperties',
            providesTags: ['FavoriteProperties'],
        }),

        toggleFavoriteProperty: builder.mutation<{ success: boolean }, string>({
            query: (propertyId) => ({
                url: `/toggleFavoriteProperty/${propertyId}`,
                method: 'POST',
            }),
            invalidatesTags: ['FavoriteProperties'],
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
            invalidatesTags: ['Property', 'UserProperties', 'PendingProperties', 'FeaturedProperties'],
        }),

        getPendingProperties: builder.query<PropertiesResponse, void>({
            query: () => '/getPendingProperties',
            providesTags: ['PendingProperties'],
        }),

        getRejectedProperties: builder.query<PropertiesResponse, void>({
            query: () => '/getRejectedProperties',
            providesTags: ['RejectedProperties'],
        }),

        updatePropertyStatus: builder.mutation<PropertiesResponse, { propertyId: string; status: string }>({
            query: ({ propertyId, status }) => ({
                url: '/updatePropertyStatus',
                method: 'PUT',
                body: { propertyId, status },
            }),
            invalidatesTags: ['Property', 'PendingProperties', 'RejectedProperties', 'UserProperties'],
        }),

        softDeleteProperty: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/softDeleteProperty/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [
                'Property',
                'PendingProperties',
                'RejectedProperties',
                'UserProperties',
                'FeaturedProperties',
                'FavoriteProperties',
            ],
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
    useGetPendingPropertiesQuery,
    useGetRejectedPropertiesQuery,
    useUpdatePropertyStatusMutation,
    useSoftDeletePropertyMutation,
} = propertiesApi
