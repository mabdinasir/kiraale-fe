import { User } from '@models/user'

export interface SignOutResponse {
    success: boolean
    message: string
    user: User
    jwt: string
}
