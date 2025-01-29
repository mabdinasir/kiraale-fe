'use client' // This is a client component 👈🏽

import ReusableLink from '@components/Links/ReusableLink'
import Button from '@components/UI/Button'
import Error from '@components/UI/Error'
import { useLoginMutation } from '@store/services/auth'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useAppDispatch } from '@hooks/rtkHooks'
import { setToken } from '@store/slices/tokenSlice'
import { z } from 'zod'
import { loginSchema } from 'schemas'
import type { LoginForm } from '@models/auth/LoginForm'
import isApiError from '@utils/isApiError'

type FormErrors = Record<keyof LoginForm, string>

const LoginForm = () => {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const initialUserData = React.useMemo<LoginForm>(
        () => ({
            email: '',
            password: '',
        }),
        [],
    )

    const [login, { isLoading, error }] = useLoginMutation()
    const [userData, setUserData] = useState<LoginForm>(initialUserData)
    const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' })
    const [rememberMe, setRememberMe] = useState(false)

    const validateFields = useCallback(async () => {
        try {
            await loginSchema.parseAsync(userData)
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
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }, [])

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!(await validateFields())) return

            const response = await login({ ...userData }).unwrap()
            dispatch(setToken(response.jwt))

            setTimeout(() => {
                router.push('/')
                setUserData(initialUserData)
            }, 1500)
        },
        [validateFields, login, userData, dispatch, router, initialUserData],
    )

    return (
        <form className="text-start" noValidate onSubmit={handleSubmit}>
            <fieldset disabled={isLoading}>
                <div className="grid grid-cols-1">
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="font-semibold" htmlFor="LoginEmail">
                            {t('email-address')}
                        </label>
                        <input
                            id="LoginEmail"
                            type="email"
                            name="email"
                            autoComplete="username"
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
                    <div className="mb-4 relative">
                        <label className="font-semibold" htmlFor="LoginPassword">
                            {t('password')}
                        </label>
                        <input
                            id="LoginPassword"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            aria-invalid={!!errors.password}
                            aria-describedby="password-error"
                            className={`form-input pr-10 ${errors.password ? 'border-red-500' : ''}`}
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

                    {/* Remember Me & Forgot Password */}
                    <div className="flex justify-between mb-4">
                        <div className="inline-flex items-center">
                            <input
                                id="RememberMe"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                            />
                            <label htmlFor="RememberMe" className="form-check-label text-slate-400">
                                {t('remember-me')}
                            </label>
                        </div>

                        <ReusableLink href="/auth/reset-password" className="text-slate-400">
                            {t('forgot-password')}
                        </ReusableLink>
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
                    <div className="mb-4 mt-4">
                        <Button
                            isLoading={isLoading}
                            title={isLoading ? t('login-in') : t('login-sign-in')}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Signup Link */}
                    <div className="text-center">
                        <span className="text-slate-400 me-2">{t('dont-have-account')}</span>
                        <ReusableLink href="/auth/signup" className="text-black dark:text-white font-bold">
                            {t('sign-up')}
                        </ReusableLink>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default LoginForm
