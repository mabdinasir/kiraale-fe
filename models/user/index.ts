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
    hasAcceptedTnC: boolean
    isSignedIn: boolean
    isDeleted: boolean
    role: Role[]
    createdAt: Date
    updatedAt: Date
    profilePicture?: string
    bio?: string
    address?: string
    agencyName?: string
    licenseNumber?: string
    yearsOfExperience?: number
    nationalIdNumber?: string
    passportNumber?: string
}
