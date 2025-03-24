import { z } from 'zod'

export const stkPushSchema = z.object({
    phoneNumber: z.string().min(1, 'Phone number is required'),
    userId: z.string(),
    propertyId: z.string(),
})

const CallbackMetadataItemSchema = z.object({
    Name: z.string(),
    Value: z.union([z.string(), z.number()]),
})

const CallbackMetadataSchema = z.object({
    Item: z.array(CallbackMetadataItemSchema),
})

export const StkPushCallbackSchema = z.object({
    Body: z.object({
        stkCallback: z.object({
            MerchantRequestID: z.string(),
            CheckoutRequestID: z.string(),
            ResultCode: z.number(),
            ResultDesc: z.string(),
            CallbackMetadata: z.optional(CallbackMetadataSchema),
        }),
    }),
})
