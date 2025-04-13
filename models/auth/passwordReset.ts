export interface PasswordResetRequest {
    token: string
    newPassword: string
    confirmPassword: string
}

export interface PasswordResetResponse {
    success: boolean
    message: string
}
