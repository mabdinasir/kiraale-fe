import { z } from 'zod'

export const mediaSchema = z.object({
    propertyId: z.string().uuid('Invalid Property ID Format Provided!'),
    url: z.string().url('Invalid URL format'),
    type: z.enum(['IMAGE', 'VIDEO']),
})

export type Media = z.infer<typeof mediaSchema>

export type AddMediaResponse = {
    success: boolean
    media: Media
}
