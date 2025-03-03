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
    profilePicture: string | null
    bio: string | null
    address: string | null
    agencyName: string | null
    licenseNumber: string | null
    yearsOfExperience: number | null
    nationalIdNumber: string | null
    passportNumber: string | null
}
