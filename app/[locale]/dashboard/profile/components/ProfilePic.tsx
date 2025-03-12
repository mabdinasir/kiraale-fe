'use client' // This is a client component 👈🏽

import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Image from 'next/image'
import { User } from '@models/user'
import Button from '@components/UI/Button'
import showToast from '@utils/showToast'
import isValidFile from '@utils/isValidFile'
import { useTranslations } from 'next-intl'
import { useUploadProfilePicMutation } from '@store/services/fileUploads'

type ProfilePicProps = {
    user?: Omit<User, 'password'>
    hasEditButton?: boolean
}

const ProfilePic: FC<ProfilePicProps> = ({ user, hasEditButton }) => {
    const t = useTranslations()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState(user?.profilePicture || '/images/profile/profile-picture-3.jpg')
    const [uploading, setUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [uploadProfilePic] = useUploadProfilePicMutation()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            e.target.value = ''

            // Validate file type and size
            if (!isValidFile(selectedFile)) {
                setErrorMessage(t('invalid-file-type'))
                return
            }

            // Show the file as a preview
            setFile(URL.createObjectURL(selectedFile))
            setUploading(true)

            try {
                // Create FormData and append the file
                const formData = new FormData()
                formData.append('file', selectedFile)
                const response = await uploadProfilePic(formData).unwrap()

                if (response.success) {
                    showToast('success', t('profile-picture-updated'))
                    setFile(response.profilePicture)
                }
            } catch {
                setErrorMessage(t('upload-error', { fileName: selectedFile.name }))
            } finally {
                setUploading(false)
            }
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
                        src={file ?? (user?.profilePicture || '/images/profile/profile-picture-3.jpg')}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                        alt="Profile picture"
                    />
                    <label className="absolute inset-0 cursor-pointer" htmlFor="profile-img"></label>
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
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            {uploading && <div className="mt-2">{t('uploading')}</div>}
        </div>
    )
}

export default ProfilePic
