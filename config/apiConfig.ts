const baseUrl = 'http://localhost:8080/api'

const apiConfig = {
    baseUrl,
    authApi: `${baseUrl}/auth`,
    usersApi: `${baseUrl}/users`,
    propertiesApi: `${baseUrl}/properties`,
    mediaApi: `${baseUrl}/media`,
    subscriberApi: `${baseUrl}/subscriber`,
    contactAPi: `${baseUrl}/contact`,
}

export default apiConfig
