export interface PropertyFeatures {
    id: string
    bedrooms: number
    bathrooms: number
    area: number
    pool: boolean
    furnished: boolean
    dishwasher: boolean
    airConditioning: boolean
    laundry: boolean
    wardrobe: boolean
    oven: boolean
    propertyId: string
    parking: number
    yearBuilt: number
}

export interface PropertyMedia {
    id: string
    url: string
    type: 'IMAGE' | 'VIDEO'
    propertyId: string
}

export interface PropertyUser {
    firstName: string
    lastName: string
    mobile: string
    email: string
}

export interface Property {
    id: string
    title: string
    description?: string
    address: string
    price: number
    createdAt?: string
    updatedAt?: string
    propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND'
    listingType: 'SALE' | 'RENT'
    status: 'PENDING' | 'REJECTED' | 'EXPIRED' | 'AVAILABLE' | 'SOLD' | 'LEASED'
    approvedAt?: string | null
    expiresAt?: string | null
    approvedBy?: string | null
    features: PropertyFeatures
    media: PropertyMedia[]
    user: PropertyUser
}

export interface PropertySearchParams {
    query?: string
    minPrice?: number
    maxPrice?: number
    propertyType?: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND'
    listingType?: 'SALE' | 'RENT'
}

export interface PropertiesResponse {
    success: boolean
    message: string
    properties: Property[]
}

export interface PropertyResponse {
    success: boolean
    message: string
    property: Property
}
