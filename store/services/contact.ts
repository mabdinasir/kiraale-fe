import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiConfig from '@config/apiConfig'
import { Contact, ContactResponse } from '@models/contact'

export const contactAPi = createApi({
    reducerPath: 'contactAPi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.contactAPi,
    }),
    endpoints: (builder) => ({
        contact: builder.mutation<ContactResponse, Contact>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useContactMutation } = contactAPi
