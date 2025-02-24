import apiConfig from '@config/apiConfig'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const subscriberApi = createApi({
    reducerPath: 'subscriberApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.subscriberApi,
    }),
    endpoints: (builder) => ({
        addSubscriber: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: '/addSubscriber',
                method: 'POST',
                body: { email },
            }),
        }),
        deleteSubscriber: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: `/deleteSubscriber?email=${email}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useAddSubscriberMutation, useDeleteSubscriberMutation } = subscriberApi
