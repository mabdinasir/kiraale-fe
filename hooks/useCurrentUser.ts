import decodeAuthToken from '@utils/decodeJwt'
import Cookies from 'js-cookie'

const useCurrentUser = () => {
    const token = Cookies.get('authToken')
    return decodeAuthToken(token)
}

export default useCurrentUser
