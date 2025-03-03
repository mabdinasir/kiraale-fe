export interface AddPropertyForm {
    id?: string
    title: string
    description?: string
    address: string
    price: number
    propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND'
    listingType: 'SALE' | 'RENT'
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
    approvedAt?: string | null
    expiredAt?: string | null
    approvedBy?: string | null
    isActive: boolean
    bedrooms?: number
    bathrooms?: number
    parking?: number
    area?: number
    yearBuilt?: number
    pool?: boolean
    furnished?: boolean
    dishwasher?: boolean
    airConditioning?: boolean
    laundry?: boolean
    wardrobe?: boolean
    oven?: boolean
    createdAt?: string
    updatedAt?: string
}
