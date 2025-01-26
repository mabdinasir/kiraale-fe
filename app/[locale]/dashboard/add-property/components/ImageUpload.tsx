'use client' // This is a client component 👈🏽

import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MdDeleteForever } from 'react-icons/md'

const ImageUpload = () => {
    const t = useTranslations()
    const [files, setFiles] = useState<string[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFiles = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setFiles((prevFiles) => [...prevFiles, ...uploadedFiles])
        }
    }

    const handleRemove = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }

    return (
        <div>
            <p className="font-medium mb-4">
                {t('upload-property-image')} <span className="text-red-500">*</span>
            </p>

            {files.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative group">
                            <Image
                                src={file}
                                alt={`Uploaded image ${index + 1}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                                className="preview-content rounded-md"
                            />
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
                type="file"
                id="input-file"
                name="input-file"
                accept="image/*"
                multiple
                onChange={handleChange}
                hidden
            />
            <label
                className="btn-upload btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-6 cursor-pointer"
                htmlFor="input-file"
            >
                {t('upload-image')}
            </label>
        </div>
    )
}

export default ImageUpload
