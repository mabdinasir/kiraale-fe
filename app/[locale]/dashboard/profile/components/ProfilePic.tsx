'use client' // This is a client component 👈🏽

import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Image from 'next/image'
import { User } from '@models/user'
import Button from '@components/UI/Button'

type ProfilePicProps = {
    user?: Omit<User, 'password'>
    hasEditButton?: boolean
}

const ProfilePic: FC<ProfilePicProps> = ({ user, hasEditButton }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState(user?.profilePicture || '/images/profile/profile-picture-3.jpg')
    // useUpdateProfileMutation
    // const [updateProfile] = useUpdateProfileMutation()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFile = URL.createObjectURL(e.target.files[0])
            setFile(newFile)
        }
    }

    const handleEditClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="profile-header flex flex-col items-center mb-3">
            <div className="relative flex-shrink-0 mb-3">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                        src={user?.profilePicture ?? file}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                        alt="Profile picture"
                    />
                    <label className="absolute inset-0 cursor-pointer" htmlFor="pro-img"></label>
                </div>
            </div>
            {hasEditButton && <Button title="Edit Profile Picture" onClick={handleEditClick} />}
            <input
                id="profile-img"
                ref={fileInputRef}
                name="profile-image"
                type="file"
                className="hidden"
                onChange={handleChange}
            />
        </div>
    )
}

export default ProfilePic
