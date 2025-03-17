export interface FavoritePropertiesResponse {
    success: boolean
    message: string
    favorited: boolean
    favorite?: {
        id: string
        userId: string
        propertyId: string
        createdAt: string
    }
}
