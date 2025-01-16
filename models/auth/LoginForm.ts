import { User } from '@models/user'

export interface LoginForm {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
    message: string
    user: User
    jwt: string
}
