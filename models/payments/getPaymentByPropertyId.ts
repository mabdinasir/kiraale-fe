export interface GetPaymentByPropertyIdRequest {
    propertyId: string
}

export interface PaymentData {
    id: string
    transactionId: string
    amount: number
    receiptNumber: string
    transactionDate: string
    phoneNumber: string
    paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
    paymentMethod: 'MPESA' | 'EVC'
    propertyId: string
    userId: string
    createdAt: string
    updatedAt: string
    user: {
        firstName: string
        lastName: string
        email: string
        mobile: string
    }
    property: {
        id: string
        title: string
        description: string
        address: string
        price: number
        createdAt: string
        updatedAt: string
        listingType: string
        status: string
        approvedAt: string | null
        expiresAt: string | null
        approvedBy: string | null
        propertyType: string
        userId: string
    }
}

export interface GetPaymentByPropertyIdResponse {
    success: boolean
    message: string
    payment: PaymentData
}
