'use client' // This is a client component 👈🏽

import { useTranslations } from 'next-intl'
import React, { useCallback, useState } from 'react'
import { useContactMutation } from '@store/services/contact'
import contactSchema from 'schemas/contact.schema'
import { z } from 'zod'
import isApiError from '@utils/isApiError'
import Error from '@components/UI/Error'
import showToast from '@utils/showToast'

type ContactFormData = z.infer<typeof contactSchema>
type FormErrors = Record<keyof ContactFormData, string>

const ContactForm = () => {
    const t = useTranslations()
    const [contact, { isLoading }] = useContactMutation()
    const initialFormData = React.useMemo<ContactFormData>(
        () => ({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
        }),
        [],
    )
    const [formData, setFormData] = useState<ContactFormData>(initialFormData)
    const [errors, setErrors] = useState<FormErrors>({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    })
    const [apiError, setApiError] = useState<string>('')

    const validateFields = useCallback(async () => {
        try {
            await contactSchema.parseAsync(formData)
            return true
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = {} as FormErrors
                err.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof FormErrors
                    newErrors[field] = issue.message
                })
                setErrors(newErrors)
            }
            return false
        }
    }, [formData])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }, [])

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            setApiError('')
            if (!(await validateFields())) return

            try {
                await contact(formData).unwrap()
                showToast('success', t('contact-success'))
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: '',
                })
            } catch (error) {
                if (isApiError(error)) {
                    setApiError(error.data.message)
                    showToast('error', error.data.message)
                } else {
                    setApiError(t('errors.generic'))
                }
            }
        },
        [validateFields, contact, formData, t],
    )

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="grid lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-6 mb-5">
                    <label htmlFor="firstName" className="font-medium">
                        {t('firstName')}
                    </label>
                    <input
                        name="firstName"
                        id="firstName"
                        type="text"
                        className={`form-input mt-2 ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder={t('firstName')}
                        value={formData.firstName}
                        onChange={handleChange}
                        aria-invalid={!!errors.firstName}
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div className="lg:col-span-6 mb-5">
                    <label htmlFor="lastName" className="font-medium">
                        {t('lastName')}
                    </label>
                    <input
                        name="lastName"
                        id="lastName"
                        type="text"
                        className={`form-input mt-2 ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder={t('lastName')}
                        value={formData.lastName}
                        onChange={handleChange}
                        aria-invalid={!!errors.lastName}
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                            {errors.lastName}
                        </p>
                    )}
                </div>
            </div>

            <div className="lg:col-span-6 mb-5">
                <label htmlFor="email" className="font-medium">
                    {t('your-email')}
                </label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    className={`form-input mt-2 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder={t('your-email')}
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1">
                <div className="mb-5">
                    <label htmlFor="subject" className="font-medium">
                        {t('your-question')}
                    </label>
                    <input
                        name="subject"
                        id="subject"
                        className={`form-input mt-2 ${errors.subject ? 'border-red-500' : ''}`}
                        placeholder={t('subject')}
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                            {errors.subject}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="message" className="font-medium">
                        {t('your-comment')}
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        className={`form-input mt-2 textarea ${errors.message ? 'border-red-500' : ''}`}
                        placeholder={t('message')}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={!!errors.message}
                    ></textarea>
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                            {errors.message}
                        </p>
                    )}
                </div>
            </div>

            {apiError && <Error error={apiError} />}

            <button
                type="submit"
                className={`btn bg-green-600 hover:bg-green-700 text-white rounded-md ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? t('sending') : t('send-message')}
            </button>
        </form>
    )
}

export default ContactForm
