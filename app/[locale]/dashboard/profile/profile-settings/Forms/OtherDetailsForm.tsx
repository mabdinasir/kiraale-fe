'use client' // This is a client component 👈🏽

import React, { useState, useCallback } from 'react'
import { z } from 'zod'
import { FaPassport, FaIdCard } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { GrOrganization } from 'react-icons/gr'
import { TbSortAscendingNumbers } from 'react-icons/tb'
import { useTranslations } from 'next-intl'
import { profileSchema, Profile } from 'schemas/profile.schema'
import Button from '@components/UI/Button'
import { User } from '@models/user'
import isApiError from '@utils/isApiError'
import Error from '@components/UI/Error'
import { useUpdateUserProfileMutation } from '@store/services/users'
import showToast from '@utils/showToast'

type OtherDetailsFormProps = {
    user?: User
}

type FormErrors = Partial<Record<keyof Profile, string>>

const OtherDetailsForm: React.FC<OtherDetailsFormProps> = ({ user }) => {
    const t = useTranslations()
    const [errors, setErrors] = useState<FormErrors>({})
    const [updateUserProfile, { isLoading, error }] = useUpdateUserProfileMutation()

    const [formData, setFormData] = useState<Profile>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        bio: user?.bio || '',
        address: user?.address || '',
        passportNumber: user?.passportNumber || '',
        nationalIdNumber: user?.nationalIdNumber || '',
        agencyName: user?.agencyName || '',
        yearsOfExperience: user?.yearsOfExperience || 0,
    })

    const validateFields = useCallback(async () => {
        try {
            await profileSchema.parseAsync(formData)
            setErrors({})
            return true
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: FormErrors = {}
                err.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof Profile
                    newErrors[field] = issue.message
                })
                setErrors(newErrors)
            }
            return false
        }
    }, [formData])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) || null : value,
        }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }, [])

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!(await validateFields())) return

            try {
                await updateUserProfile({ id: user?.id || '', data: formData }).unwrap()
                showToast('success', t('profile-details-updated-successfully'))
            } catch (err) {
                if (isApiError(err)) {
                    showToast('error', err.data.message)
                } else {
                    showToast('error', t('something-went-wrong'))
                }
            } finally {
                setFormData(formData)
            }
        },
        [validateFields, updateUserProfile, user?.id, formData, t],
    )

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">{t('other-details')} :</h5>
            <form noValidate onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="form-label font-medium">{t('address')} :</label>
                        <div className="form-icon relative mt-2">
                            <FaLocationDot className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                name="address"
                                id="address"
                                type="text"
                                className={`form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border ${errors.address ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} focus:border-green-600 focus:ring-0`}
                                placeholder={t('address')}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                        <label className="form-label font-medium">{t('passport-number')} :</label>
                        <div className="form-icon relative mt-2">
                            <FaPassport className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                name="passportNumber"
                                id="passportNumber"
                                type="text"
                                className={`form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border ${errors.passportNumber ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} focus:border-green-600 focus:ring-0`}
                                placeholder={t('passport-number')}
                                value={formData.passportNumber}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber}</p>}
                    </div>
                    <div>
                        <label className="form-label font-medium">{t('national-id')} :</label>
                        <div className="form-icon relative mt-2">
                            <FaIdCard className="w-4 h-4 absolute top-3 start-4"></FaIdCard>
                            <input
                                name="nationalIdNumber"
                                id="nationalIdNumber"
                                type="text"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('national-id')}
                                value={formData.nationalIdNumber}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.nationalIdNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.nationalIdNumber}</p>
                        )}
                    </div>
                    <div>
                        <label className="form-label font-medium">{t('agency-name')} :</label>
                        <div className="form-icon relative mt-2">
                            <GrOrganization className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="text"
                                name="agencyName"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('agency-name')}
                                value={formData.agencyName}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.agencyName && <p className="text-red-500 text-sm mt-1">{errors.agencyName}</p>}
                    </div>
                    <div>
                        <label className="form-label font-medium">{t('years-of-experience')} :</label>
                        <div className="form-icon relative mt-2">
                            <TbSortAscendingNumbers className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="number"
                                name="yearsOfExperience"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('years-of-experience')}
                                value={formData.yearsOfExperience}
                                onChange={handleChange}
                                minLength={1}
                            />
                        </div>
                        {errors.yearsOfExperience && (
                            <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>
                        )}
                    </div>
                </div>

                {/* Error Message */}
                {error && isApiError(error) && (
                    <div className="mt-4">
                        {/* Display the generic error message */}
                        <Error error={error.data.message} />

                        {/* Display field-specific validation errors (if they exist) */}
                        {error.data.errors?.map((err, index) => (
                            <Error key={index} error={`${err.field}: ${err.message}`} />
                        ))}
                    </div>
                )}

                <Button
                    title={isLoading ? t('saving-changes') : t('save-changes')}
                    className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-5"
                    isLoading={isLoading}
                    disabled={isLoading || Object.values(errors).some((err) => !!err)}
                />
            </form>
        </div>
    )
}

export default OtherDetailsForm
