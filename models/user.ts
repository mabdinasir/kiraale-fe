/* eslint-disable no-unused-vars */

enum Role {
    USER,
    MODERATOR,
    AGENT,
}

export interface User {
    id: string
    password: string
    firstName: string
    lastName: string
    mobile: string
    email: string
    isDeleted: boolean
    roles: Role[]
    createdAt: Date
    updatedAt: Date
}
