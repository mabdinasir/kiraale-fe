'use client' // This is a client component 👈🏽

import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Image from 'next/image'
import { User } from '@models/user'
import Button from '@components/UI/Button'
import { useUpdateUserProfileMutation } from '@store/services/users'
import getSignedURL from 'app/actions/getSignedUrl'
import computeSHA256 from '@utils/computeSHA256'
import showToast from '@utils/showToast'
import isValidFile from '@utils/isValidFile'
import { useTranslations } from 'next-intl'

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
    const [updateProfile] = useUpdateUserProfileMutation()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            e.target.value = ''

            if (!isValidFile(selectedFile)) {
                setErrorMessage(t('invalid-file-type'))
                return
            }

            setFile(URL.createObjectURL(selectedFile))
            setUploading(true)

            try {
                // Compute SHA256 checksum of the file
                const checksum = await computeSHA256(selectedFile)

                // Get signed URL for S3 upload
                const signedURLResult = await getSignedURL({
                    bucketName: process.env.PROFILE_PIC_BUCKET_NAME!,
                    bucketRegion: process.env.PROFILE_PIC_BUCKET_REGION!,
                    accessKeyId: process.env.PROFILE_PIC_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.PROFILE_PIC_SECRET_ACCESS_KEY!,
                    fileSize: selectedFile.size,
                    fileType: selectedFile.type,
                    checksum,
                    user: user as User,
                })

                if (signedURLResult.success) {
                    const { url } = signedURLResult.success

                    // Upload the file to S3 using the signed URL
                    const uploadResponse = await fetch(url, {
                        method: 'PUT',
                        body: selectedFile,
                        headers: {
                            'Content-Type': selectedFile.type,
                        },
                    })

                    if (!uploadResponse.ok) {
                        setErrorMessage(t('upload-error', { fileName: selectedFile.name }))
                        return
                    }

                    const mediaUrl = signedURLResult.success.url.split('?')[0]

                    // Update the user profile with the new image URL
                    const updatedUser = { ...user, profilePicture: mediaUrl }
                    await updateProfile({ id: user?.id || '', data: updatedUser })

                    showToast('success', 'Profile picture updated successfully')
                } else if (signedURLResult.failure) {
                    setErrorMessage(
                        t('signed-url-error', {
                            fileName: selectedFile.name,
                            error: signedURLResult.failure,
                        }),
                    )
                }
            } catch (error) {
                setErrorMessage(t('unexpected-error', { error: (error as Error).message || 'Unknown error' }))
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
                        src={file ?? user?.profilePicture}
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
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            {uploading && <div className="mt-2">{t('uploading')}</div>}
        </div>
    )
}

export default ProfilePic
