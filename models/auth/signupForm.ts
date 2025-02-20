import { User } from '@models/user'
import { signUpSchema } from 'schemas'
import { z } from 'zod'

export type SignupForm = z.infer<typeof signUpSchema>

export interface SignupResponse {
    success: boolean
    message: string
    User?: User
}
