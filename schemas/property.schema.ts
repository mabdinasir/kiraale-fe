// property.schema.ts
import { z } from 'zod'

const propertyStatusEnum = z.enum(['PENDING', 'REJECTED', 'EXPIRED', 'AVAILABLE', 'SOLD', 'LEASED'])

// Features schema
export const propertyFeaturesSchema = z.object({
    bedrooms: z.number().min(0, 'Bedrooms must be a positive number').optional(),
    bathrooms: z.number().min(0, 'Bathrooms must be a positive number').optional(),
    parking: z.number().min(0, 'Parking must be a positive number').optional(),
    area: z.number().min(0, 'Area must be a positive number').optional(),
    yearBuilt: z
        .number()
        .int()
        .min(1900, `Year must be greater than 1900`)
        .max(new Date().getFullYear(), `Year must be less than ${new Date().getFullYear()}`)
        .optional(),
    pool: z.boolean().optional(),
    furnished: z.boolean().optional(),
    dishwasher: z.boolean().optional(),
    airConditioning: z.boolean().optional(),
    laundry: z.boolean().optional(),
    wardrobe: z.boolean().optional(),
    oven: z.boolean().optional(),
})

// Main property schema (matches backend Prisma model)
export const propertySchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    price: z.number().min(1, 'Price must be a positive number'),
    listingType: z.enum(['SALE', 'RENT']),
    propertyType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND']),
    status: propertyStatusEnum.optional(),
    features: propertyFeaturesSchema.optional(), // Nested features
})

// Form schema should match the API request structure
export const propertyFormSchema = propertySchema

// Search query schema remains the same
export const propertySearchQuerySchema = z.object({
    query: z.string().optional(),
    minPrice: z
        .string()
        .optional()
        .transform((val) => (val ? parseFloat(val) : undefined))
        .refine((val) => val === undefined || val >= 0, 'Price must be a positive number'),
    maxPrice: z
        .string()
        .optional()
        .transform((val) => (val ? parseFloat(val) : undefined))
        .refine((val) => val === undefined || val >= 0, 'Price must be a positive number'),
    propertyType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND']).optional(),
    listingType: z.enum(['SALE', 'RENT']).optional(),
})
