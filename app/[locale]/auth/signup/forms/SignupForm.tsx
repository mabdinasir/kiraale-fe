'use client' // This is a client component 👈🏽

import React, { useState } from 'react'
import { useSignUpMutation } from '@store/services/auth'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { useParams, useRouter } from 'next/navigation'
import validateEmail from '@utils/validateEmail'
import validatePassword from '@utils/validatePassword'
import Error from '@components/UI/Error'
import Button from '@components/UI/Button'
import { FieldRules } from '@models/auth/FieldRules'

const SignupForm = () => {
    const t = useTranslations()
    const { locale } = useParams()
    const router = useRouter()

    const initialUserData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
    }

    const initialErrors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        terms: '',
    }

    const fieldRules: { [key: string]: FieldRules } = {
        firstName: { minLength: 2, required: true },
        lastName: { minLength: 2, required: true },
        email: { minLength: 5, required: true },
        password: { minLength: 8, required: true },
        mobile: { minLength: 10, maxLength: 15, required: true },
    }

    const [signUp, { isLoading, error }] = useSignUpMutation()

    const [userData, setUserData] = useState(initialUserData)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [errors, setErrors] = useState(initialErrors)

    const validateFields = async () => {
        const newErrors = { ...initialErrors }
        let isValid = true

        Object.keys(fieldRules).forEach((field) => {
            const rules = fieldRules[field as keyof typeof fieldRules]
            const value = userData[field as keyof typeof userData].trim()

            // Check for required field first
            if (rules.required && !value) {
                newErrors[field as keyof typeof newErrors] = t('field-required')
                isValid = false
            }

            // Check for minLength if not empty
            else if (rules.minLength && value.length < rules.minLength) {
                newErrors[field as keyof typeof newErrors] = t('min-length', { field: t(field), min: rules.minLength })
                isValid = false
            }

            // Check for maxLength if not empty
            else if (rules?.maxLength && value.length > rules.maxLength) {
                newErrors[field as keyof typeof newErrors] = t('max-length', { field: t(field), max: rules.maxLength })
                isValid = false
            }
        })

        if (!newErrors.email) {
            try {
                await validateEmail(userData.email)
            } catch (err: Error | unknown) {
                newErrors.email = (err as Error).message
                isValid = false
            }
        }

        if (!newErrors.password) {
            try {
                await validatePassword(userData.password)
            } catch (err: Error | unknown) {
                newErrors.password = (err as Error).message
                isValid = false
            }
        }

        if (!termsAccepted) {
            newErrors.terms = t('accept-terms-required')
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

        if (errors[name as keyof typeof initialErrors]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = await validateFields()
        if (!isValid) return

        const dataToSubmit = {
            ...userData,
            hasAcceptedTnC: termsAccepted,
        }

        await signUp(dataToSubmit).unwrap()

        router.push(`/${locale}/auth/login`)

        setUserData(initialUserData)
        setTermsAccepted(false)
    }

    return (
        <form className="text-start" noValidate>
            <div className="grid grid-cols-1">
                <div className="grid grid-cols-1 md:gap-4 md:grid-cols-2">
                    <div className="mb-4">
                        <label className="font-semibold" htmlFor="FirstName">
                            {t('firstName')}
                        </label>
                        <input
                            id="FirstName"
                            type="text"
                            name="firstName"
                            className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                            placeholder="First Name"
                            value={userData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold" htmlFor="LastName">
                            {t('lastName')}
                        </label>
                        <input
                            id="LastName"
                            type="text"
                            name="lastName"
                            className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                            placeholder="Last Name"
                            value={userData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">
                        {t('email-address')}
                    </label>
                    <input
                        id="LoginEmail"
                        type="email"
                        name="email"
                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="name@example.com"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">
                        {t('password')}
                    </label>
                    <input
                        id="LoginPassword"
                        type="password"
                        name="password"
                        className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                        placeholder={t('password')}
                        value={userData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label className="font-semibold" htmlFor="MobileNumber">
                        {t('mobile-number')}
                    </label>
                    <input
                        id="MobileNumber"
                        type="text"
                        name="mobile"
                        className={`form-input ${errors.mobile ? 'border-red-500' : ''}`}
                        placeholder="0123456789"
                        value={userData.mobile}
                        onChange={handleChange}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>

                <div className="mb-4">
                    <div className="flex items-center w-full mb-0">
                        <input
                            className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                            type="checkbox"
                            value=""
                            id="AcceptT&C"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted((prev) => !prev)}
                        />
                        <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">
                            {t('i-accept')}{' '}
                            <ReusableLink href="/terms" className="text-green-600">
                                {t('terms-conditions')}
                            </ReusableLink>
                        </label>
                    </div>
                    {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                </div>

                {error && 'data' in error && (error as { data: { message: string } }).data?.message && (
                    <Error error={(error as { data: { message: string } }).data.message} />
                )}

                <div className="mb-4">
                    <Button
                        isLoading={isLoading}
                        title={isLoading ? t('registering') : t('register')}
                        disabled={isLoading}
                        onClick={handleSubmit}
                    />
                </div>

                <div className="text-center">
                    <span className="text-slate-400 me-2">{t('already-have-account')} </span>{' '}
                    <ReusableLink href="/auth/login" className="text-black dark:text-white font-bold">
                        {t('sign-in')}
                    </ReusableLink>
                </div>
            </div>
        </form>
    )
}

export default SignupForm
