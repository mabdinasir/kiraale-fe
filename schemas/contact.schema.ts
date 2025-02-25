import { z } from 'zod'

const contactSchema = z
    .object({
        firstName: z.string().min(2, 'First name is required'),
        lastName: z.string().min(2, 'Last name is required'),
        email: z.string().email('Invalid email format').min(1, 'Email is required'),
        subject: z.string().min(2, 'Subject is required'),
        message: z.string().min(5, 'Message is required'),
    })
    .strict()

export default contactSchema
