import { User } from '@models/user/user'
import { jwtDecode } from 'jwt-decode'

const decodeAuthToken = (token: string | undefined): User | null => {
    if (!token) return null
    try {
        const decodedUser: User = jwtDecode(token)
        return decodedUser
    } catch (error) {
        throw new Error(`Invalid token ${error}`)
        return null
    }
}

export default decodeAuthToken
