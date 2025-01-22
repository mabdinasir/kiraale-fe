'use client' // This is a client component 👈🏽

import ReusableLink from '@components/Links/ReusableLink'
import Button from '@components/UI/Button'
import Error from '@components/UI/Error'
import { FieldRules } from '@models/auth/FieldRules'
import { useLoginMutation } from '@store/services/auth'
import validateEmail from '@utils/validateEmail'
import validatePassword from '@utils/validatePassword'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAppDispatch } from '@hooks/rtkHooks'
import { setToken } from '@store/slices/tokenSlice'

const LoginForm = () => {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const initialUserData = {
        email: '',
        password: '',
    }

    const initialErrors = {
        email: '',
        password: '',
    }

    const fieldRules: { [key: string]: FieldRules } = {
        email: { minLength: 5, required: true },
        password: { minLength: 8, required: true },
    }

    const [login, { isLoading, error }] = useLoginMutation()

    const [userData, setUserData] = useState(initialUserData)
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

        const response = await login(userData).unwrap()

        router.push('/')

        dispatch(setToken(response.jwt))

        setUserData({
            email: '',
            password: '',
        })
    }

    return (
        <form className="text-start" noValidate>
            <div className="grid grid-cols-1">
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

                <div className="flex justify-between mb-4">
                    <div className="inline-flex items-center">
                        <input
                            className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                            type="checkbox"
                            value=""
                            id="RememberMe"
                        />
                        <label className="form-check-label text-slate-400" htmlFor="RememberMe">
                            {t('remember-me')}
                        </label>
                    </div>

                    <p className="text-slate-400 mb-0">
                        <ReusableLink href="/auth/reset-password" className="text-slate-400">
                            {t('forgot-password')}
                        </ReusableLink>
                    </p>
                </div>

                {error && 'data' in error && (error as { data: { message: string } }).data?.message && (
                    <Error error={(error as { data: { message: string } }).data.message} />
                )}

                <div className="mb-4 mt-4">
                    <Button
                        isLoading={isLoading}
                        title={isLoading ? t('login-in') : t('login-sign-in')}
                        disabled={isLoading}
                        onClick={handleSubmit}
                    />
                </div>

                <div className="text-center">
                    <span className="text-slate-400 me-2">{t('dont-have-account')}</span>{' '}
                    <ReusableLink href="/auth/signup" className="text-black dark:text-white font-bold">
                        {t('signup')}
                    </ReusableLink>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
