import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiConfig from '@config/apiConfig'
import Cookies from 'js-cookie'
import { StkPushRequest, StkPushResponse } from '@models/payments/stkPush'
import { MpesaPaymentStatusResponse } from '@models/payments/mpesaPaymentStatusResponse'

const token = Cookies.get('authToken')

export const paymentsAPi = createApi({
    reducerPath: 'paymentsAPi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.paymentsApi,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        stkPush: builder.mutation<StkPushResponse, StkPushRequest>({
            query: ({ phoneNumber, userId, propertyId }) => ({
                url: '/stkPush',
                method: 'POST',
                body: { phoneNumber, userId, propertyId },
            }),
        }),
        checkMpesaPaymentStatus: builder.query<MpesaPaymentStatusResponse, string>({
            query: (transactionId) => `/checkMpesaPaymentStatus/${transactionId}`,
        }),
        evcPlusPurchase: builder.mutation<void, { phoneNumber: string; userId: string; propertyId: string }>({
            query: ({ phoneNumber, userId, propertyId }) => ({
                url: '/evcPlusPurchase',
                method: 'POST',
                body: { phoneNumber, userId, propertyId },
            }),
        }),
    }),
})

export const { useStkPushMutation, useCheckMpesaPaymentStatusQuery, useEvcPlusPurchaseMutation } = paymentsAPi
