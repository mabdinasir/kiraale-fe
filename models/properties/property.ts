// Base interfaces for individual entities
export interface PropertyBase {
    id: string
    title: string
    description?: string
    address: string
    price: number
    propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND'
    listingType: 'SALE' | 'RENT'
    status: 'PENDING' | 'REJECTED' | 'EXPIRED' | 'AVAILABLE' | 'SOLD' | 'LEASED'
}

export interface PropertyDetails extends PropertyBase {
    createdAt: string
    updatedAt: string
    isFavorited: boolean
    approvedAt: string | null
    expiresAt: string | null
    approvedBy: string | null
    userId: string
}

export interface PropertyFeatures {
    id: string
    propertyId: string
    bedrooms: number
    bathrooms: number
    area: number
    parking: number
    yearBuilt: number
    pool: boolean
    furnished: boolean
    dishwasher: boolean
    airConditioning: boolean
    laundry: boolean
    wardrobe: boolean
    oven: boolean
}

export interface PropertyMedia {
    id: string
    propertyId: string
    url: string
    type: 'IMAGE' | 'VIDEO'
}

export interface PropertyUser {
    firstName: string
    lastName: string
    mobile: string
    email: string
}

export interface PropertyFormData extends PropertyBase {
    features: Omit<PropertyFeatures, 'id' | 'propertyId'>
}

export interface Property extends PropertyDetails {
    features: PropertyFeatures
    media: PropertyMedia[]
    user: PropertyUser
}

// Response interfaces
export interface PropertyResponse {
    success: boolean
    property: Property
}

export interface PropertiesResponse {
    success: boolean
    properties: Property[]
}

export interface PropertySearchParams {
    query?: string
    minPrice?: number
    maxPrice?: number
    propertyType?: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND'
    listingType?: 'SALE' | 'RENT'
}
