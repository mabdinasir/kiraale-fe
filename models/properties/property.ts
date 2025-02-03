import { addPropertySchema } from 'schemas'
import { z } from 'zod'

export interface Property {
    id: string
    title: string
    description?: string
    address: string
    price: number
    propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND' | 'INDUSTRIAL' | 'HOTEL'
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
    createdAt: string
    updatedAt: string
}

export type AddPropertyForm = z.infer<typeof addPropertySchema>

export interface AddPropertyResponse {
    success: boolean
    message: string
    property?: Property
}
