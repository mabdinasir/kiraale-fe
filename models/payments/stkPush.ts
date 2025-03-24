import { z } from '@node_modules/zod'
import { StkPushCallbackSchema, stkPushSchema } from 'schemas/payment.schema'

export interface StkPushResponse {
    success: boolean
    data: {
        MerchantRequestID: string
        CheckoutRequestID: string
        ResponseCode: string
        ResponseDescription: string
        CustomerMessage: string
    }
}

export type StkPushRequest = z.infer<typeof stkPushSchema>
export type StkPushCallback = z.infer<typeof StkPushCallbackSchema>
