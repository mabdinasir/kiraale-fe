export interface UpdateUserPassword {
    id: string
    passwords: {
        oldPassword: string
        newPassword: string
        confirmNewPassword: string
    }
}
