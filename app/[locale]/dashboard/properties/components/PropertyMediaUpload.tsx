'use client' // This is a client component 👈🏽

import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MdDeleteForever } from 'react-icons/md'
import isValidFile from '@utils/isValidFile'
import Error from '@components/UI/Error'
import showToast from '@utils/showToast'
import Button from '@components/UI/Button'
import { useAppDispatch, useAppSelector } from '@hooks/rtkHooks'
import { updateStep } from '@store/slices/stepValidation'
import { useUploadPropertiesMutation } from '@store/services/fileUploads'
import { useRouter } from 'next/navigation'

const PropertyMediaUpload = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [files, setFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [uploadProperties, { isSuccess }] = useUploadPropertiesMutation()
    const propertyId = useAppSelector((state) => state.stepValidation.steps[1].propertyId)

    const handleUploadMedia = async () => {
        setUploading(true)
        setErrorMessage(null)
        const newUploadedMediaUrls: string[] = []

        try {
            const formData = new FormData()
            formData.append('propertyId', propertyId)
            files.forEach((file) => {
                formData.append('file', file)
            })

            const uploadResponse = await uploadProperties(formData).unwrap()

            if (uploadResponse.success) {
                showToast('success', t('property-uploaded'))
                newUploadedMediaUrls.push(...uploadResponse.propertyPictures)
            } else {
                setErrorMessage(t('upload-error', { fileName: files[0].name }))
                return
            }

            dispatch(updateStep({ step: 2, isValid: true, data: { imageUrls: newUploadedMediaUrls } }))
            showToast('success', t('images-saved-go-to-my-properties'))
            router.push('/dashboard/properties/my-properties')
        } catch (error) {
            showToast('error', t('upload-error', { fileName: files[0].name }))
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
        files.length < 4 || files.length > 10 || uploading || files.some((file) => !isValidFile(file))
    const isSelectDisabled = isSuccess || uploading

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
                            {!isSuccess && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 shadow-md group-hover:opacity-100 opacity-0 transition-opacity"
                                    disabled={uploading}
                                >
                                    <MdDeleteForever className="text-xl hover:text-red-700" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="preview-box flex justify-center rounded-md shadow dark:shadow-gray-800 overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 text-center small w-auto max-h-60">
                    {t('image-upload-info')}
                </div>
            )}

            <div className="mt-5">{errorMessage && <Error error={errorMessage} />}</div>
            {isSuccess && <p className="text-green-600">{t('images-saved-go-to-payment')}</p>}

            <input
                id="input-file"
                type="file"
                name="input-file"
                accept="image/jpeg,image/png,video/mp4,video/quicktime"
                multiple
                onChange={handleChange}
                hidden
                disabled={isSelectDisabled}
            />
            <div className="flex flex-row justify-between gap-4 mt-6">
                <div>
                    <label
                        className={`btn-upload btn bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white rounded-md cursor-pointer px-4 py-2 ${
                            isSelectDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        htmlFor="input-file"
                    >
                        {t('select-images')}
                    </label>
                </div>
                <div>
                    <Button
                        title={uploading ? t('saving-images') : t('save-images')}
                        onClick={handleUploadMedia}
                        isLoading={uploading}
                        disabled={isUploadDisabled || isSuccess}
                    />
                </div>
            </div>
        </div>
    )
}

export default PropertyMediaUpload
