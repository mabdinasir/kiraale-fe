'use client' // This is a client component 👈🏽

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { z } from 'zod'
import Error from '@components/UI/Error'
import isApiError from '@utils/isApiError'
import Button from '@components/UI/Button'
import showToast from '@utils/showToast'
import PasswordInput from '@components/UI/PasswordInput'
import { useRouter, useSearchParams } from 'next/navigation'
import { passwordResetSchema } from 'schemas'
import { useResetPasswordMutation } from '@store/services/auth'
import { ApiError } from '@models/apiError'

type FormErrors = {
    password?: string
    confirmPassword?: string
}

const ResetPasswordForm = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')
    const [resetPassword, { isLoading, error }] = useResetPasswordMutation()
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = useCallback(async () => {
        try {
            await passwordResetSchema.parseAsync(formData)
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

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }, [])

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()

            if (!token) {
                showToast('error', t('invalid-reset-token'))
                return
            }

            if (!(await validateForm())) return

            try {
                await resetPassword({
                    token,
                    newPassword: formData.password,
                    confirmPassword: formData.confirmPassword,
                }).unwrap()

                showToast('success', t('password-reset-success'))
                setFormData({ password: '', confirmPassword: '' })
                setErrors({})
                router.push('/auth/login')
            } catch (err) {
                const errorMessage = (err as ApiError)?.data?.message
                showToast('error', `${t('password-reset-failed')}: ${errorMessage}`)
            }
        },
        [token, validateForm, t, resetPassword, formData.password, formData.confirmPassword, router],
    )

    return (
        <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
            <div
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2"></div>
            <div className="container z-3">
                <div className="flex justify-center">
                    <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
                        <Link href="/">
                            <Image
                                src="/images/logo-icon-64.png"
                                className="mx-auto"
                                alt=""
                                width={64}
                                height={64}
                                priority
                            />
                        </Link>
                        <h5 className="my-6 text-xl font-semibold">{t('reset-password')}</h5>
                        <div className="grid grid-cols-1">
                            <p className="text-slate-400 mb-6">{t('password-reset-instructions')}</p>
                            <form className="text-start" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <PasswordInput
                                            label={t('new-password')}
                                            name="password"
                                            aria-invalid={!!errors.password}
                                            aria-describedby="password-error"
                                            placeholder={t('new-password')}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && (
                                            <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <PasswordInput
                                            label={t('confirm-password')}
                                            name="confirmPassword"
                                            aria-invalid={!!errors.confirmPassword}
                                            aria-describedby="confirmPassword-error"
                                            placeholder={t('confirm-password')}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        {errors.confirmPassword && (
                                            <p
                                                id="confirmPassword-error"
                                                className="text-red-500 text-sm mt-1"
                                                role="alert"
                                            >
                                                {errors.confirmPassword}
                                            </p>
                                        )}
                                    </div>

                                    {error && isApiError(error) && <Error error={error.data.message} />}

                                    <div className="mb-4">
                                        <Button
                                            type="submit"
                                            isLoading={isLoading}
                                            fullWidth
                                            title={isLoading ? t('resetting-password') : t('reset-password')}
                                            disabled={!!errors.password || !!errors.confirmPassword || isLoading}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">{t('remember-password')} </span>
                                        <ReusableLink
                                            href="/auth/login"
                                            className="text-black dark:text-white font-bold"
                                        >
                                            {t('sign-in')}
                                        </ReusableLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPasswordForm
