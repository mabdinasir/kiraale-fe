'use client' // This is a client component 👈🏽

import React, { useCallback, useState } from 'react'
import { FiUser, FiMail, FiPhone, FiUserCheck, FiEdit } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import { User } from '@models/user'
import { Profile } from 'schemas'
import profileSchema from 'schemas/profile.schema'
import { z } from '@node_modules/zod'
import { useUpdateUserProfileMutation } from '@store/services/users'
import showToast from '@utils/showToast'
import isApiError from '@utils/isApiError'
import Error from '@components/UI/Error'
import Button from '@components/UI/Button'

type PersonalDetailsFormProps = {
    user?: User
}

type FormErrors = Partial<Record<keyof Profile, string>>

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ user }) => {
    const t = useTranslations()
    const [errors, setErrors] = React.useState<FormErrors>({})
    const [updateUserProfile, { isLoading, error }] = useUpdateUserProfileMutation()

    const [formData, setFormData] = useState<Profile>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        bio: user?.bio || '',
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

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            }
        },
        [validateFields, updateUserProfile, user?.id, formData, t],
    )

    return (
        <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
            <h5 className="text-lg font-semibold mb-4">{t('personal-details')} :</h5>
            <form noValidate onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <label className="form-label font-medium">
                            {t('firstName')} : <span className="text-red-600">*</span>
                        </label>
                        <div className="form-icon relative mt-2">
                            <FiUser className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="text"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('firstName')}
                                id="firstName"
                                name="firstName"
                                value={formData?.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label className="form-label font-medium">
                            {t('lastName')} : <span className="text-red-600">*</span>
                        </label>
                        <div className="form-icon relative mt-2">
                            <FiUserCheck className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="text"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('lastName')}
                                id="lastName"
                                name="lastName"
                                value={formData?.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                        <label className="form-label font-medium">
                            {t('your-email')} : <span className="text-red-600">*</span>
                        </label>
                        <div className="form-icon relative mt-2">
                            <FiMail className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="email"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('email')}
                                name="email"
                                id="email"
                                value={formData?.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="form-label font-medium">{t('phone')} :</label>
                        <div className="form-icon relative mt-2">
                            <FiPhone className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                name="mobile"
                                id="number"
                                type="tel"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('phone')}
                                value={formData?.mobile}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    <div className="mt-5">
                        <label className="form-label font-medium">{t('profile-desc')} : </label>
                        <div className="form-icon relative mt-2">
                            <FiEdit className="w-4 h-4 absolute top-3 start-4" />
                            <textarea
                                name="bio"
                                id="bio"
                                className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('profile-desc')}
                                value={formData?.bio}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && isApiError(error) && (
                    <div>
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

export default PersonalDetailsForm
