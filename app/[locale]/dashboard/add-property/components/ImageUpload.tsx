'use client' // This is a client component 👈🏽

import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MdDeleteForever } from 'react-icons/md'
import getSignedURL from 'app/actions/getSignedUrl'
import computeSHA256 from '@utils/computeSHA256'
import isValidFile from '@utils/isValidFile'
import Error from '@components/UI/Error'
import useCurrentUser from '@hooks/useCurrentUser'
import { User } from '@models/user'
import { useAddMediaMutation } from '@store/services/media'
import showToast from '@utils/showToast'
import Button from '@components/UI/Button'

const ImageUpload = () => {
    const t = useTranslations()
    const [files, setFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const currentUser = useCurrentUser()
    const [addMedia, { isSuccess }] = useAddMediaMutation()

    const handleUploadImages = async () => {
        setUploading(true)
        setErrorMessage(null)

        try {
            for (const file of files) {
                const checksum = await computeSHA256(file)

                const signedURLResult = await getSignedURL({
                    fileSize: file.size,
                    fileType: file.type,
                    checksum,
                    user: currentUser as User,
                })

                if (signedURLResult.success) {
                    const { url } = signedURLResult.success

                    const uploadResponse = await fetch(url, {
                        method: 'PUT',
                        body: file,
                        headers: {
                            'Content-Type': file.type,
                        },
                    })

                    if (!uploadResponse.ok) {
                        setErrorMessage(t('upload-error', { fileName: file.name }))
                    }

                    const addMediaResponse = await addMedia({
                        propertyId: 'f8c9ea8a-4a8d-4f8f-b079-6196f2238337',
                        url: signedURLResult?.success?.url.split('?')[0],
                        type: file.type.includes('video') ? 'VIDEO' : 'IMAGE',
                    }).unwrap()

                    if (!addMediaResponse.success) {
                        setErrorMessage(t('database-save-error', { fileName: file.name }))
                    } else {
                        showToast('success', t('image-uploaded'), 15)
                    }
                } else if (signedURLResult.failure) {
                    setErrorMessage(t('signed-url-error', { fileName: file.name, error: signedURLResult.failure }))
                }
            }
        } catch (error) {
            setErrorMessage(t('unexpected-error', { error: (error as Error).message || 'Unknown error' }))
        } finally {
            setUploading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFiles = Array.from(e.target.files)
            setFiles((prevFiles) => [...prevFiles, ...uploadedFiles])
        }
    }

    const handleRemove = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }

    const isUploadDisabled =
        files.length < 4 || files.length > 10 || uploading || !!errorMessage || files.some((file) => !isValidFile(file))

    return (
        <div>
            <p className="font-medium mb-4">
                {t('upload-property-image')} <span className="text-red-500">*</span>
            </p>

            {files.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative group">
                            {file.type.includes('video') ? (
                                <video
                                    src={URL.createObjectURL(file)}
                                    controls
                                    preload="metadata"
                                    className="preview-content rounded-md w-full h-auto"
                                />
                            ) : (
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded image ${index + 1}`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                    className="preview-content rounded-md"
                                />
                            )}
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 shadow-md group-hover:opacity-100 opacity-0 transition-opacity"
                            >
                                <MdDeleteForever className="text-xl hover:text-red-700" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="preview-box flex justify-center rounded-md shadow dark:shadow-gray-800 overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 text-center small w-auto max-h-60">
                    {t('image-upload-info')}
                </div>
            )}

            <input
                id="input-file"
                type="file"
                name="input-file"
                accept="image/jpeg,image/png,video/mp4,video/quicktime"
                multiple
                onChange={handleChange}
                hidden
            />

            <div className="mt-5">{errorMessage && <Error error={errorMessage} />}</div>

            <div className="flex flex-row justify-between gap-4 mt-6">
                <div>
                    <label
                        className="btn-upload btn bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white rounded-md cursor-pointer px-4 py-2"
                        htmlFor="input-file"
                    >
                        {t('select-images')}
                    </label>
                </div>
                <div>
                    <Button
                        title={uploading ? t('saving-images') : t('save-images')}
                        onClick={handleUploadImages}
                        isLoading={uploading}
                        disabled={isUploadDisabled || isSuccess}
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageUpload
