import { User } from '@models/user'

export interface SignUpForm {
    firstName: string
    lastName: string
    email: string
    password: string
    mobile: string
}

export interface SignUpResponse {
    success: boolean
    message: string
    User?: User
}
