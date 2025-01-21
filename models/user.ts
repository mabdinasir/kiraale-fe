/* eslint-disable no-unused-vars */

export enum Role {
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
    isSignedIn: boolean
    isDeleted: boolean
    roles: Role[]
    createdAt: Date
    updatedAt: Date
}
