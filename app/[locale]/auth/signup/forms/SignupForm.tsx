'use client' // This is a client component 👈🏽

import React, { useCallback, useState } from 'react'
import { useSignUpMutation } from '@store/services/auth'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { useParams, useRouter } from 'next/navigation'
import Error from '@components/UI/Error'
import Button from '@components/UI/Button'
import { z } from 'zod'
import type { SignupForm } from '@models/auth/SignupForm'
import isApiError from '@utils/isApiError'
import { signUpSchema } from 'schemas'

type FormErrors = Record<keyof SignupForm, string>

const SignupForm = () => {
    const t = useTranslations()
    const { locale } = useParams()
    const router = useRouter()

    const initialUserData = React.useMemo<SignupForm>(
        () => ({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobile: '',
            hasAcceptedTnC: false,
        }),
        [],
    )

    const [signUp, { isLoading, error }] = useSignUpMutation()
    const [userData, setUserData] = useState<SignupForm>(initialUserData)
    const [errors, setErrors] = useState<FormErrors>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        hasAcceptedTnC: '',
    })

    const validateFields = useCallback(async () => {
        try {
            await signUpSchema.parseAsync(userData)
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
    }, [userData])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setUserData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }, [])

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!(await validateFields())) return

            await signUp({ ...userData }).unwrap()

            setTimeout(() => {
                router.push(`/${locale}/auth/login`)
                setUserData(initialUserData)
            }, 1500)
        },
        [validateFields, signUp, userData, router, locale, initialUserData],
    )

    return (
        <form className="text-start" noValidate onSubmit={handleSubmit}>
            <fieldset disabled={isLoading}>
                <div className="grid grid-cols-1">
                    <div className="grid grid-cols-1 md:gap-4 md:grid-cols-2">
                        {/* First Name Input */}
                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="FirstName">
                                {t('firstName')}
                            </label>
                            <input
                                id="FirstName"
                                type="text"
                                name="firstName"
                                aria-invalid={!!errors.firstName}
                                aria-describedby="firstName-error"
                                className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                                placeholder="First Name"
                                value={userData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && (
                                <p id="firstName-error" className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        {/* Last Name Input */}
                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="LastName">
                                {t('lastName')}
                            </label>
                            <input
                                id="LastName"
                                type="text"
                                name="lastName"
                                aria-invalid={!!errors.lastName}
                                aria-describedby="lastName-error"
                                className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                                placeholder="Last Name"
                                value={userData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && (
                                <p id="lastName-error" className="text-red-500 text-sm mt-1" role="alert">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="font-semibold" htmlFor="LoginEmail">
                            {t('email-address')}
                        </label>
                        <input
                            id="LoginEmail"
                            type="email"
                            name="email"
                            aria-invalid={!!errors.email}
                            aria-describedby="email-error"
                            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="name@example.com"
                            value={userData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="font-semibold" htmlFor="LoginPassword">
                            {t('password')}
                        </label>
                        <input
                            id="LoginPassword"
                            type="password"
                            name="password"
                            aria-invalid={!!errors.password}
                            aria-describedby="password-error"
                            className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                            placeholder={t('password')}
                            value={userData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Mobile Input */}
                    <div className="mb-4">
                        <label className="font-semibold" htmlFor="MobileNumber">
                            {t('mobile-number')}
                        </label>
                        <input
                            id="MobileNumber"
                            type="text"
                            name="mobile"
                            aria-invalid={!!errors.mobile}
                            aria-describedby="mobile-error"
                            className={`form-input ${errors.mobile ? 'border-red-500' : ''}`}
                            placeholder="0123456789"
                            value={userData.mobile}
                            onChange={handleChange}
                        />
                        {errors.mobile && (
                            <p id="mobile-error" className="text-red-500 text-sm mt-1" role="alert">
                                {errors.mobile}
                            </p>
                        )}
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="mb-4">
                        <div className="flex items-center w-full mb-0">
                            <input
                                id="AcceptT&C"
                                type="checkbox"
                                name="hasAcceptedTnC"
                                checked={userData.hasAcceptedTnC}
                                onChange={handleChange}
                                className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                            />
                            <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">
                                {t('i-accept')}{' '}
                                <ReusableLink href="/terms" className="text-green-600">
                                    {t('terms-conditions')}
                                </ReusableLink>
                            </label>
                        </div>
                        {errors.hasAcceptedTnC && (
                            <p id="terms-error" className="text-red-500 text-sm mt-1" role="alert">
                                {errors.hasAcceptedTnC}
                            </p>
                        )}
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

                    {/* Submit Button */}
                    <div className="my-4">
                        <Button
                            isLoading={isLoading}
                            title={isLoading ? t('registering') : t('register')}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <span className="text-slate-400 me-2">{t('already-have-account')}</span>
                        <ReusableLink href="/auth/login" className="text-black dark:text-white font-bold">
                            {t('sign-in')}
                        </ReusableLink>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default SignupForm
