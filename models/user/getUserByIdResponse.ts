import { User } from '@models/user/user'

export interface GetUserByIdResponse {
    success: boolean
    user: User
}
