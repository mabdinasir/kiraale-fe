export interface ApiError {
    status: number
    data: {
        success: boolean
        message: string
        errors?: Array<{
            field: string
            message: string
        }>
    }
}
