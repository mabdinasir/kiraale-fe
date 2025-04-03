export interface MpesaPaymentStatusResponse {
    success: boolean
    data: {
        transactionId: string
        paymentStatus: 'COMPLETED' | 'FAILED'
        amountPaid: number
        receiptNumber: string
        transactionDate: Date
        phoneNumber: string
        paymentMethod: string
    }
}
