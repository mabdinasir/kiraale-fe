const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_LOCAL_URL

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
