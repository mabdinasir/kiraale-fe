'use client' // This is a client component 👈🏽

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MdDeleteForever } from 'react-icons/md'
import isValidFile from '@utils/isValidFile'
import Error from '@components/UI/Error'
import showToast from '@utils/showToast'
import Button from '@components/UI/Button'
import { useAppDispatch, useAppSelector } from '@hooks/rtkHooks'
import { updateStep } from '@store/slices/stepValidation'
import { useDeletePropertyMediaMutation, useUploadPropertyMediaMutation } from '@store/services/fileUploads'
import { useRouter } from 'next/navigation'
import { useGetPropertyByIdQuery } from '@store/services/properties'
import LoadingIndicator from '@components/UI/LoadingIndicator'

interface MediaFile {
    id?: string // Existing media will have an ID
    url: string
    type: 'IMAGE' | 'VIDEO'
    file?: File // New files will have the File object
}

const PropertyMedia = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
    const [uploading, setUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [deletingMediaId, setDeletingMediaId] = useState<string | null>(null)

    const [uploadProperties, { isSuccess }] = useUploadPropertyMediaMutation()
    const [deletePropertyMedia, { isLoading: isDeletingMedia }] = useDeletePropertyMediaMutation()
    const propertyId = useAppSelector((state) => state.stepValidation.steps[1].propertyId)
    const { data: propertyData } = useGetPropertyByIdQuery(propertyId)

    // Initialize with existing media when property data loads
    useEffect(() => {
        if (propertyData?.property?.media) {
            setMediaFiles(
                propertyData.property.media.map((m) => ({
                    id: m.id,
                    url: m.url,
                    type: m.type,
                })),
            )
        }
    }, [propertyData])

    const handleUploadMedia = async () => {
        setUploading(true)
        setErrorMessage(null)

        try {
            const formData = new FormData()
            formData.append('propertyId', propertyId)

            // Only upload new files (those without IDs)
            mediaFiles.forEach((media) => {
                if (media.file) {
                    formData.append('file', media.file)
                }
            })

            const uploadResponse = await uploadProperties(formData).unwrap()

            if (uploadResponse.success) {
                showToast('success', t('property-uploaded'))
                dispatch(
                    updateStep({
                        step: 2,
                        isValid: true,
                        data: {
                            imageUrls: [
                                ...(propertyData?.property?.media?.map((m) => m.url) || []),
                                ...uploadResponse.propertyPictures,
                            ],
                        },
                    }),
                )
                showToast('success', t('images-saved-go-to-my-properties'))
                router.push('/dashboard/properties/my-properties')
            } else {
                setErrorMessage(t('upload-error'))
            }
        } catch (error) {
            showToast('error', t('upload-error'))
            setErrorMessage(t('unexpected-error', { error: (error as Error).message || 'Unknown error' }))
        } finally {
            setUploading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                url: URL.createObjectURL(file),
                type: file.type.includes('video') ? ('VIDEO' as const) : ('IMAGE' as const),
                file,
            }))

            setMediaFiles((prev) => [...prev, ...newFiles])
        }
    }

    const handleRemove = async (index: number) => {
        if (mediaFiles.length <= 4) {
            showToast('error', t('minimum-4-images-required'))
            return
        }
        try {
            const mediaToDelete = mediaFiles[index]

            // If it's an existing media (has ID), delete from backend
            if (mediaToDelete.id) {
                setDeletingMediaId(mediaToDelete.id)
                await deletePropertyMedia({
                    propertyId,
                    mediaIds: [mediaToDelete.id],
                }).unwrap()
                setDeletingMediaId(null)
            }

            // Remove from state in both cases
            setMediaFiles((prev) => prev.filter((_, i) => i !== index))
            showToast('success', t('media-deleted'))
        } catch {
            setDeletingMediaId(null)
            showToast('error', t('delete-error'))
        }
    }

    const isUploadDisabled =
        mediaFiles.length < 4 ||
        mediaFiles.length > 10 ||
        uploading ||
        mediaFiles.some((media) => media.file && !isValidFile(media.file)) ||
        mediaFiles.every((media) => media.id || !media.file)

    const isSelectDisabled = isSuccess || uploading || mediaFiles.length > 10 || isDeletingMedia

    return (
        <div>
            <p className="font-medium mb-4">
                {t('upload-property-image')} <span className="text-red-500">*</span>
            </p>

            {mediaFiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {mediaFiles.map((media, index) => (
                        <div key={media.id || media.url} className="relative group">
                            {media.type === 'VIDEO' ? (
                                <video
                                    src={media.url}
                                    controls
                                    preload="metadata"
                                    className="preview-content rounded-md w-full h-auto"
                                />
                            ) : (
                                <Image
                                    src={media.url}
                                    alt={`Media ${index + 1}`}
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
                                    className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 shadow-md flex items-center justify-center w-8 h-8"
                                    disabled={uploading || isDeletingMedia}
                                >
                                    {(uploading && media.file) ||
                                    (isDeletingMedia && media.id && media.id === deletingMediaId) ? (
                                        <LoadingIndicator redVariant />
                                    ) : (
                                        <MdDeleteForever className="text-xl hover:text-red-700" />
                                    )}
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

export default PropertyMedia
