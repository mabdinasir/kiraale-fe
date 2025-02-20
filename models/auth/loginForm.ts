import { User } from '@models/user'
import { loginSchema } from 'schemas'
import { z } from 'zod'

export type LoginForm = z.infer<typeof loginSchema>

export interface LoginResponse {
    success: boolean
    message: string
    user: User
    jwt: string
}
