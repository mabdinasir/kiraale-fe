'use client'
import React, { ChangeEvent, FC, useState } from 'react'
import Image from 'next/image'
import { User } from '@models/user'
// import { useUpdateProfileMutation } from '@store/services/users'

type UploadProfileImgProps = {
    hasInput?: boolean
    user?: Omit<User, 'password'>
}

const UploadProfileImg: FC<UploadProfileImgProps> = ({ hasInput, user }) => {
    const [file, setFile] = useState(user?.profilePicture || '/images/profile/profile-picture-3.jpg')
    // useUpdateProfileMutation
    // const [updateProfile] = useUpdateProfileMutation()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFile = URL.createObjectURL(e.target.files[0])
            setFile(newFile)
        }
    }

    return (
        <div className="profile-header flex flex-col items-center mb-3">
            <div className="relative flex-shrink-0">
                {hasInput && (
                    <input id="pro-img" name="profile-image" type="file" className="hidden" onChange={handleChange} />
                )}
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                        src={user?.profilePicture || file}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                        alt="Profile picture"
                    />
                    <label className="absolute inset-0 cursor-pointer" htmlFor="pro-img"></label>
                </div>
            </div>

            <div className="mt-4 text-center">
                <h5 className="text-lg font-semibold">
                    {user?.firstName} {user?.lastName}
                </h5>
                <p className="text-slate-400">{user?.email}</p>
            </div>
        </div>
    )
}

export default UploadProfileImg
