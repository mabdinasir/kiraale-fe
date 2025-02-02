import { User } from '@models/user'

export interface GetUserByIdResponse {
    success: boolean
    user: Omit<User, 'password'>
}
