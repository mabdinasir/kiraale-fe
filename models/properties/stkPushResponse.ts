export interface StkPushResponse {
    message: boolean
    data: {
        MerchantRequestID: string
        CheckoutRequestID: string
        ResponseCode: string
        ResponseDescription: string
        CustomerMessage: string
    }
}
