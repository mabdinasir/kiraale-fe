const baseUrl = 'http://localhost:8080/api'

const apiConfig = {
    baseUrl,
    authApi: `${baseUrl}/auth`,
    usersApi: `${baseUrl}/users`,
    propertiesApi: `${baseUrl}/properties`,
}

export default apiConfig
