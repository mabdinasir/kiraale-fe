const baseUrl = 'http://localhost:8080/api'

const apiConfig = {
    baseUrl,
    authApi: `${baseUrl}/auth`,
    usersApi: `${baseUrl}/users`,
    propertiesApi: `${baseUrl}/properties`,
    mediaApi: `${baseUrl}/media`,
    subscriberApi: `${baseUrl}/subscriber`,
}

export default apiConfig
