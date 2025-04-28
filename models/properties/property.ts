// Base interfaces for individual entities
export interface PropertyBase {
    id: string
    title: string
    description: string
    address: string
    price: number
    country: 'SOMALIA' | 'KENYA'
    propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND'
    listingType: 'SALE' | 'RENT'
    status: 'PENDING' | 'REJECTED' | 'EXPIRED' | 'AVAILABLE' | 'SOLD' | 'LEASED'
}

export interface PropertyDetails extends PropertyBase {
    createdAt: string
    updatedAt: string
    updatedBy: string
    isFavorited: boolean
    expiresAt: string | null
    approvedAt: string | null
    approvedBy: string | null
    rejectedAt: string | null
    rejectedBy: string | null
    isDeleted: boolean
    deletedAt: string | null
    deletedBy: string | null
    userId: string
}

export interface PropertyFeatures {
    id: string
    propertyId: string
    bedroom: number
    livingRoom: number
    bathroom: number
    kitchen: number
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
    uploadedBy: string
    createdAt: string
    updatedAt: string
}

export interface PropertyUser {
    id: string
    firstName: string
    lastName: string
    mobile: string
    email: string
}

export interface PropertyFormData extends Omit<PropertyBase, 'id'> {
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
    country: 'SOMALIA' | 'KENYA'
    query?: string
    minPrice?: number
    maxPrice?: number
    propertyType?: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND'
    listingType?: 'SALE' | 'RENT'
}
